import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function Predictions() {
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [matchesData, predsData] = await Promise.all([
          api.get('/matches/'),
          api.get('/predictions/mine/')
        ]);
        
        // Ordenar partidos por fecha
        matchesData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setMatches(matchesData);

        // Map predictions by match ID
        const predsMap = {};
        predsData.forEach(p => {
          predsMap[p.match] = p;
        });
        setPredictions(predsMap);
      } catch (error) {
        console.error("Error cargando predicciones:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  // Agrupar por fecha
  const groupedMatches = matches.reduce((acc, match) => {
    const date = new Date(match.date);
    // capitalize
    let dateStr = date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' });
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(match);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] pb-32">
      {/* Header Section */}
      <header className="mb-[var(--spacing-lg)]">
        <h1 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)] mb-[var(--spacing-xs)]">Predicciones de Partidos</h1>
        <p className="font-['Work_Sans'] text-lg text-[var(--color-on-surface-variant)]">Haz clic en un partido para ingresar o modificar tu predicción.</p>
      </header>

      {/* Match List grouped by Date */}
      <div className="space-y-[var(--spacing-xl)]">
        {Object.keys(groupedMatches).map(dateStr => (
          <section key={dateStr}>
            <div className="flex items-center gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
              <h2 className="font-['Montserrat'] font-bold text-xl text-[var(--color-primary-container)]">{dateStr}</h2>
              <div className="h-px bg-[var(--color-outline-variant)] flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-gutter)]">
              {groupedMatches[dateStr].map(match => {
                const isLocked = match.status !== 'SCHEDULED';
                const pred = predictions[match.id];
                const matchDate = new Date(match.date);

                return (
                  <Link 
                    to={`/predictions/${match.id}`} 
                    key={match.id}
                    className={`bg-[var(--color-surface-container-lowest)] rounded border ${pred ? 'border-[var(--color-primary)]' : 'border-[var(--color-outline-variant)]'} shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row items-center relative group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow`}
                  >
                    <div className="absolute top-[var(--spacing-sm)] right-[var(--spacing-sm)] flex items-center gap-[var(--spacing-xs)] z-10">
                      {isLocked ? (
                        <span className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-medium text-xs px-2 py-1 rounded-full uppercase">Terminado</span>
                      ) : (
                        <span className="font-['Work_Sans'] font-medium text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">{matchDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
                      )}
                    </div>
                    
                    {/* Team A */}
                    <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-r border-[var(--color-outline-variant)]/50 w-full md:w-auto relative z-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm bg-[var(--color-surface-container)] flex items-center justify-center p-2">
                        <img alt={match.team_a.name} className="w-full h-full object-contain" src={match.team_a.flag_url}/>
                      </div>
                      <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">{match.team_a.name}</h3>
                      <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] uppercase">{match.team_a.short_name}</span>
                    </div>
                    
                    {/* Prediction Center */}
                    <div className="px-[var(--spacing-md)] py-[var(--spacing-lg)] flex flex-col items-center justify-center w-full md:w-auto bg-[var(--color-surface-container)]/30 min-w-[150px]">
                      {pred ? (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-[var(--spacing-sm)]">
                            <span className="w-12 text-center font-['Montserrat'] font-extrabold text-4xl text-[var(--color-primary-container)]">{pred.team_a_score}</span>
                            <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface-variant)]">-</span>
                            <span className="w-12 text-center font-['Montserrat'] font-extrabold text-4xl text-[var(--color-primary-container)]">{pred.team_b_score}</span>
                          </div>
                          {pred.points_earned !== null && (
                            <span className={`mt-2 font-['Work_Sans'] font-medium text-xs px-2 py-1 rounded-full ${pred.points_earned > 0 ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary)]' : 'bg-[var(--color-error)] text-[var(--color-on-error)]'}`}>
                              +{pred.points_earned} pts
                            </span>
                          )}
                          <div className="mt-2 text-[var(--color-on-surface-variant)] text-xs font-semibold font-['Work_Sans'] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">payments</span>
                            Bolsa: ${match.prize_pool}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="font-['Work_Sans'] text-sm text-[var(--color-on-surface-variant)] mb-2">Sin predicción</span>
                          {!isLocked && (
                            <span className="bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Work_Sans'] font-medium text-xs px-3 py-1 rounded-full uppercase shadow-sm">
                              Predecir
                            </span>
                          )}
                          <div className="mt-2 text-[var(--color-on-surface-variant)] text-xs font-semibold font-['Work_Sans'] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">monetization_on</span>
                            Apuesta: ${match.entry_fee}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Team B */}
                    <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-l border-[var(--color-outline-variant)]/50 w-full md:w-auto relative z-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm bg-[var(--color-surface-container)] flex items-center justify-center p-2">
                        <img alt={match.team_b.name} className="w-full h-full object-contain" src={match.team_b.flag_url}/>
                      </div>
                      <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">{match.team_b.name}</h3>
                      <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] uppercase">{match.team_b.short_name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
        {matches.length === 0 && (
          <div className="text-center py-12 text-[var(--color-on-surface-variant)]">No hay partidos disponibles.</div>
        )}
      </div>
    </div>
  );
}
