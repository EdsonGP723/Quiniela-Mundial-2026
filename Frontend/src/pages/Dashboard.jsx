import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function Dashboard() {
  const { user } = useAuth();
  const [nextMatch, setNextMatch] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [rank, setRank] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch matches
        const matchesData = await api.get('/matches/');
        const scheduled = matchesData.filter(m => m.status === 'SCHEDULED' || m.status === 'TIMED');
        if (scheduled.length > 0) {
          // Sort by date to get the closest one
          scheduled.sort((a, b) => new Date(a.date) - new Date(b.date));
          setNextMatch(scheduled[0]);
        }

        // Fetch predictions
        const predsData = await api.get('/predictions/mine/');
        setPredictions(predsData);

        // Fetch standings to calculate rank
        const standingsData = await api.get('/users/standings/');
        setTotalPlayers(standingsData.length);
        const myRank = standingsData.findIndex(p => p.username === user?.username) + 1;
        setRank(myRank > 0 ? myRank : '-');

      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Calculate Accuracy
  const finishedPreds = predictions.filter(p => p.points_earned !== null);
  const exactHits = finishedPreds.filter(p => p.points_earned === 3).length; // Assuming 3 points for exact
  const partialHits = finishedPreds.filter(p => p.points_earned === 1).length;
  const totalFinished = finishedPreds.length;
  
  let accuracy = 0;
  if (totalFinished > 0) {
    accuracy = Math.round(((exactHits + partialHits) / totalFinished) * 100);
  }

  const recentPredictions = [...finishedPreds].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);

  if (loading) {
    return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
      {/* Welcome Header */}
      <div className="md:col-span-12 mb-[var(--spacing-md)]">
        <h1 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-background)] mb-[var(--spacing-xs)]">Bienvenido, {user?.first_name || user?.username}!</h1>
        <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">El torneo está al rojo vivo. Así van tus resultados.</p>
      </div>

      {/* Stats Bento Grid (Top Row) */}
      <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)] mb-[var(--spacing-lg)]">
        {/* Points Card */}
        <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[var(--color-primary-container)]/5 transform rotate-12 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">sports_soccer</span>
          </div>
          <div>
            <h3 className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2">Puntos Totales</h3>
            <p className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-primary-container)]">{user?.points || 0}</p>
          </div>
          <div className="mt-4 flex items-center text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-medium text-xs">
            Actualizado en tiempo real
          </div>
        </div>

        {/* Global Rank Card */}
        <div className="bg-[var(--color-primary-container)] text-[var(--color-on-primary)] rounded-lg p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "12px 12px" }}
          ></div>
          <div className="relative z-10">
            <h3 className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-fixed)] uppercase tracking-wider mb-2">Ranking Global</h3>
            <p className="font-['Montserrat'] font-extrabold text-5xl">#{rank}</p>
          </div>
          <div className="relative z-10 mt-4 flex items-center text-[var(--color-on-primary)] font-['Work_Sans'] font-medium text-xs opacity-90">
            <span className="material-symbols-outlined mr-1 text-[16px]">group</span>
            De {totalPlayers} jugadores
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <h3 className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2">Precisión</h3>
            <div className="flex items-end gap-[var(--spacing-sm)]">
              <p className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-on-background)]">{accuracy}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-primary-container)] rounded-full" style={{ width: `${accuracy}%` }}></div>
            </div>
            <p className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] mt-2">{exactHits + partialHits}/{totalFinished} predicciones acertadas</p>
          </div>
        </div>
      </div>

      {/* Main Column (Left/Center) */}
      <div className="md:col-span-8 flex flex-col gap-[var(--spacing-lg)]">
        {/* Next Match Feature Card */}
        <section>
          <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
            <h2 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)]">Siguiente Partido</h2>
            <div className="flex items-center text-[var(--color-secondary)] font-['Work_Sans'] font-semibold text-sm bg-[var(--color-error-container)] px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse mr-2"></span>
              PRONTO
            </div>
          </div>
          
          {nextMatch ? (
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              {/* Match Header (Image/Stadium Vibe) */}
              <div className="h-32 relative bg-[var(--color-surface-dim)]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  alt="Stadium background" 
                  className="w-full h-full object-cover opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBkCrqsVj6mbNn6ih-QDb8J8CQt0NUN-zKyeLMurRGKx_5hpu7kSlhwGNbCnNvlCmoPFgUEgidhPLCxgaJEoNNrg6XCfSlmMSqjIlBEmm-042A7CfiQ1DDh3hXFZr4jig7GnaqZuBfDKBtl2KJGnz84xoe9gDW7NAbA-L2HcW-FdTeI9s4jjoR-1F9GWBQ00nBLqYcZZsfgxfBPeYfx92NNn1Z5WJWNUg4gCWWQYECiDbCBtVCAl6iCdMzQeKmjhlFGc_ZBb-Dlbsw"
                />
                <div className="absolute bottom-4 left-4 text-white font-['Work_Sans'] font-medium text-xs flex items-center gap-[var(--spacing-xs)] z-20">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span> {new Date(nextMatch.date).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
                <div className="absolute bottom-4 right-4 text-white font-['Work_Sans'] font-medium text-xs flex items-center gap-[var(--spacing-xs)] z-20">
                  <span className="material-symbols-outlined text-[16px]">stadium</span> {nextMatch.match_round}
                </div>
              </div>

              {/* Teams & Predict Action */}
              <div className="p-[var(--spacing-md)] md:p-[var(--spacing-lg)]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
                  {/* Team A */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] mb-3 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                      <img alt={nextMatch.team_a.name} className="w-full h-full object-contain" src={nextMatch.team_a.flag_url}/>
                    </div>
                    <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)] uppercase">{nextMatch.team_a.short_name}</span>
                    <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] text-center">{nextMatch.team_a.name}</span>
                  </div>
                  
                  {/* VS / Time */}
                  <div className="flex flex-col items-center justify-center px-[var(--spacing-lg)]">
                    <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1">VS</span>
                    <div className="font-['Montserrat'] font-bold text-2xl text-[var(--color-on-background)] bg-[var(--color-surface-container-high)] px-4 py-2 rounded border border-[var(--color-outline-variant)]">
                      - : -
                    </div>
                  </div>

                  {/* Team B */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] mb-3 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                      <img alt={nextMatch.team_b.name} className="w-full h-full object-contain" src={nextMatch.team_b.flag_url}/>
                    </div>
                    <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)] uppercase">{nextMatch.team_b.short_name}</span>
                    <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] text-center">{nextMatch.team_b.name}</span>
                  </div>
                </div>

                {/* Predict Action Area */}
                <div className="border-t border-[var(--color-outline-variant)] pt-[var(--spacing-md)] mt-[var(--spacing-sm)] flex flex-col md:flex-row items-center justify-between gap-[var(--spacing-md)]">
                  <div className="w-full md:w-auto text-center md:text-left">
                    <p className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)]">Haz tu predicción ahora y suma puntos.</p>
                  </div>
                  <Link to={`/predictions/${nextMatch.id}`} className="w-full md:w-auto text-center bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl uppercase px-8 py-3 rounded-lg hover:bg-[var(--color-on-primary-fixed-variant)] transition-colors shadow-md cursor-pointer">
                    Predecir
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl p-8 text-center text-[var(--color-on-surface-variant)]">
              No hay partidos próximos programados.
            </div>
          )}
        </section>
      </div>

      {/* Sidebar Column (Right) */}
      <div className="md:col-span-4 flex flex-col gap-[var(--spacing-lg)]">
        {/* Recent Results */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-[var(--spacing-md)]">
            <h2 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)]">Resultados Recientes</h2>
            <Link to="/predictions" className="font-['Work_Sans'] font-medium text-xs text-[var(--color-primary-container)] hover:underline">Ver Todos</Link>
          </div>
          
          <div className="flex flex-col gap-[var(--spacing-sm)]">
            {recentPredictions.length > 0 ? (
              recentPredictions.map(pred => (
                <div key={pred.id} className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded border border-[var(--color-outline-variant)]/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${pred.points_earned === 3 ? 'bg-[var(--color-surface-tint)]' : pred.points_earned === 1 ? 'bg-[var(--color-secondary-fixed-dim)]' : 'bg-[var(--color-error)]'}`}></div>
                    <div className="flex flex-col">
                      <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-background)]">Partido ID {pred.match}</span>
                      <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Predicción: {pred.team_a_score} - {pred.team_b_score}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-['Work_Sans'] font-semibold text-sm block ${pred.points_earned > 0 ? 'text-[var(--color-surface-tint)]' : 'text-[var(--color-on-surface-variant)]'}`}>+{pred.points_earned} pts</span>
                    <span className={`font-['Work_Sans'] font-medium text-[10px] px-2 py-0.5 rounded ${pred.points_earned === 3 ? 'text-[var(--color-primary-container)] bg-[var(--color-primary-fixed)]/30' : pred.points_earned === 1 ? 'text-[var(--color-on-surface-variant)] bg-[var(--color-surface-variant)]' : 'text-[var(--color-on-surface-variant)] bg-[var(--color-surface-variant)]'}`}>
                      {pred.points_earned === 3 ? 'Exacto' : pred.points_earned === 1 ? 'Ganador' : 'Fallo'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--color-on-surface-variant)] text-center py-4">No tienes predicciones finalizadas.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
