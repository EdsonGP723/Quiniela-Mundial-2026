import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function PredictionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [teamAScore, setTeamAScore] = useState('');
  const [teamBScore, setTeamBScore] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [matchData, predsData] = await Promise.all([
          api.get(`/matches/${id}/`),
          api.get('/predictions/mine/')
        ]);
        
        setMatch(matchData);
        
        const existingPred = predsData.find(p => p.match === parseInt(id));
        if (existingPred) {
          setPrediction(existingPred);
          setTeamAScore(existingPred.team_a_score.toString());
          setTeamBScore(existingPred.team_b_score.toString());
        }
      } catch (err) {
        console.error("Error cargando detalle:", err);
        setError("Error al cargar los datos del partido");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handlePredict = async (e) => {
    e.preventDefault();
    if (teamAScore === '' || teamBScore === '') {
      setError("Debes ingresar un marcador para ambos equipos");
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      await api.post('/predictions/mine/', {
        match: parseInt(id),
        team_a_score: parseInt(teamAScore),
        team_b_score: parseInt(teamBScore)
      });
      // Volver a dashboard o lista de predicciones tras éxito
      navigate('/predictions');
    } catch (err) {
      console.error(err);
      setError(err.data?.non_field_errors?.[0] || err.data?.detail || "Error al guardar la predicción");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!match) {
    return <div className="text-center p-20 text-[var(--color-on-background)]">Partido no encontrado</div>;
  }

  const isLocked = match.status !== 'SCHEDULED';
  const matchDate = new Date(match.date);

  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-gutter)]">
      {/* Left Column: Match Info */}
      <div className="lg:col-span-8 flex flex-col gap-[var(--spacing-md)]">
        {/* Match Header Card */}
        <section className="bg-white/95 backdrop-blur-[10px] border border-[var(--color-outline-variant)]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden relative">
          <div className="bg-[var(--color-surface-container-high)] p-[var(--spacing-sm)] flex items-center justify-between border-b border-[var(--color-outline-variant)]/30">
            <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-medium text-xs">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>{matchDate.toLocaleDateString('es-MX', { weekday: 'short', month: 'short', day: 'numeric' })} • {matchDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-medium text-xs uppercase">
              <span className="material-symbols-outlined text-sm">stadium</span>
              <span>{match.match_round}</span>
            </div>
          </div>
          <div className="p-[var(--spacing-lg)] relative">
            {/* Subtle background logo/pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontSize: '200px' }}>sports_soccer</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-[var(--spacing-lg)] md:gap-4">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-[var(--spacing-sm)] w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-[var(--color-surface-container)] overflow-hidden shadow-md border-4 border-[var(--color-surface)] p-2">
                  <img className="w-full h-full object-contain" alt={match.team_a.name} src={match.team_a.flag_url}/>
                </div>
                <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)] text-center">{match.team_a.name.toUpperCase()}</h2>
              </div>
              
              {/* VS / Score */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/3 gap-[var(--spacing-sm)]">
                <div className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-tertiary-fixed-dim)]">VS</div>
                <div className="text-[var(--color-secondary)] font-['Work_Sans'] font-semibold text-sm flex items-center gap-1">
                  {isLocked ? (
                    <span className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] px-3 py-1 rounded-full text-xs">CERRADO</span>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
                      ABIERTO
                    </>
                  )}
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-[var(--spacing-sm)] w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-[var(--color-surface-container)] overflow-hidden shadow-md border-4 border-[var(--color-surface)] p-2">
                  <img className="w-full h-full object-contain" alt={match.team_b.name} src={match.team_b.flag_url}/>
                </div>
                <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)] text-center">{match.team_b.name.toUpperCase()}</h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Prediction Form */}
      <div className="lg:col-span-4 flex flex-col gap-[var(--spacing-md)]">
        <section className="bg-white/95 backdrop-blur-[10px] border border-[var(--color-outline-variant)]/50 shadow-md rounded-lg p-[var(--spacing-md)] border-t-4 border-t-[var(--color-primary-container)] sticky top-28">
          <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] mb-[var(--spacing-md)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary-container)]">psychology</span>
            Tu Predicción
          </h3>

          {error && (
            <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-3 rounded text-sm font-semibold mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handlePredict}>
            {/* Exact Score Input */}
            <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)]/50 shadow-sm rounded-lg p-[var(--spacing-md)] flex flex-col gap-[var(--spacing-md)] mb-6">
              <div className="flex items-center justify-between mt-auto px-4 relative z-10">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]">{match.team_a.short_name}</span>
                  <input 
                    className="w-16 h-16 text-center font-['Montserrat'] font-bold text-3xl bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg focus:border-[var(--color-primary-container)] focus:ring-1 focus:ring-[var(--color-primary-container)] text-[var(--color-on-surface)] shadow-inner p-0" 
                    max="99" min="0" type="number" 
                    value={teamAScore}
                    onChange={(e) => setTeamAScore(e.target.value)}
                    disabled={isLocked}
                    required
                  />
                </div>
                <span className="font-['Montserrat'] font-bold text-2xl text-[var(--color-tertiary-fixed-dim)]">-</span>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]">{match.team_b.short_name}</span>
                  <input 
                    className="w-16 h-16 text-center font-['Montserrat'] font-bold text-3xl bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg focus:border-[var(--color-primary-container)] focus:ring-1 focus:ring-[var(--color-primary-container)] text-[var(--color-on-surface)] shadow-inner p-0" 
                    max="99" min="0" type="number" 
                    value={teamBScore}
                    onChange={(e) => setTeamBScore(e.target.value)}
                    disabled={isLocked}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[var(--color-surface-container-low)] rounded p-4 mb-[var(--spacing-lg)]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Acierto Exacto</span>
                <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-container)]">+3 Puntos</span>
              </div>
              <div className="flex justify-between items-center border-t border-[var(--color-outline-variant)]/30 pt-2 mt-2">
                <span className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Acierto Ganador</span>
                <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-container)] flex items-center gap-1">
                  +1 Punto
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button 
              type="submit" 
              disabled={isLocked || saving}
              className={`w-full bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl py-4 rounded-lg uppercase tracking-wider transition-all shadow-md flex justify-center items-center gap-2 group cursor-pointer text-center ${isLocked ? 'opacity-50 cursor-not-allowed bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)]' : 'hover:bg-[var(--color-primary)] active:scale-95'}`}
            >
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                {saving ? 'hourglass_empty' : (isLocked ? 'lock' : 'send')}
              </span>
              {saving ? 'Guardando...' : (isLocked ? 'Cerrado' : 'Guardar Predicción')}
            </button>
          </form>
          
          <p className="text-center font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] mt-4">
            Asegúrate de guardar antes de que inicie el partido.
          </p>
        </section>
      </div>
    </div>
  );
}
