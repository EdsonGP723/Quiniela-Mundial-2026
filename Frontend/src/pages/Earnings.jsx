import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Earnings() {
  const { user } = useAuth();
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [matchesData, predsData] = await Promise.all([
          api.get('/matches/'),
          api.get('/predictions/mine/')
        ]);
        
        // Filter finished matches
        const finished = matchesData.filter(m => m.status === 'FINISHED' || m.status === 'IN_PLAY' || m.status === 'PAUSED');
        finished.sort((a, b) => new Date(b.date) - new Date(a.date)); // Recent first
        setFinishedMatches(finished);

        // Map predictions by match ID
        const predsMap = {};
        predsData.forEach(p => {
          predsMap[p.match] = p;
        });
        setPredictions(predsMap);
      } catch (error) {
        console.error("Error cargando resultados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  // Calculate total points from finished matches (where points_earned is not null)
  const totalEarnedPoints = Object.values(predictions).reduce((acc, pred) => acc + (pred.points_earned || 0), 0);
  const totalMoneyEarned = Object.values(predictions).reduce((acc, pred) => acc + parseFloat(pred.earnings || 0), 0);

  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
      {/* Left Column (Match Summary & Stats) */}
      <div className="col-span-1 md:col-span-8 flex flex-col gap-[var(--spacing-lg)]">
        
        {/* Betting Pool Stats / Points Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-md)]">
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[var(--color-primary-container)] text-4xl mb-[var(--spacing-sm)]">stars</span>
            <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)] uppercase tracking-wider mb-[var(--spacing-xs)]">Puntos Totales Obtenidos</span>
            <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-primary-container)]">{totalEarnedPoints}</span>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm flex flex-col items-center justify-center text-center border-b-4 border-b-[var(--color-secondary-container)]">
            <span className="material-symbols-outlined text-[var(--color-secondary-container)] text-4xl mb-[var(--spacing-sm)]">fact_check</span>
            <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)] uppercase tracking-wider mb-[var(--spacing-xs)]">Predicciones Finalizadas</span>
            <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-secondary-container)]">
              {Object.values(predictions).filter(p => p.points_earned !== null).length}
            </span>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm flex flex-col items-center justify-center text-center border-b-4 border-b-[#10b981]">
            <span className="material-symbols-outlined text-[#10b981] text-4xl mb-[var(--spacing-sm)]">payments</span>
            <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)] uppercase tracking-wider mb-[var(--spacing-xs)]">Dinero Ganado</span>
            <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#10b981]">
              ${totalMoneyEarned.toFixed(2)}
            </span>
          </div>
        </section>

        {/* Finished Matches List */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[var(--color-surface-container-low)] px-[var(--spacing-md)] py-[var(--spacing-sm)] border-b border-[var(--color-outline-variant)] flex items-center gap-[var(--spacing-sm)]">
            <span className="material-symbols-outlined text-[var(--color-on-surface)]">history</span>
            <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)]">Resultados Recientes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-bright)]">
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)]">Partido</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-center">Marcador Final</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-center">Tu Predicción</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-right">Puntos</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-right">Ganancia</th>
                </tr>
              </thead>
              <tbody className="font-['Work_Sans'] text-base">
                {finishedMatches.length > 0 ? finishedMatches.map(match => {
                  const pred = predictions[match.id];
                  const hasPred = !!pred;
                  const earned = pred?.points_earned ?? 0;
                  
                  return (
                    <tr key={match.id} className="border-b border-[var(--color-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
                      <td className="p-[var(--spacing-sm)] font-medium text-[var(--color-on-surface)]">
                        <div className="flex items-center gap-2">
                          <img src={match.team_a.flag_url} alt={match.team_a.short_name} className="w-6 h-6 object-contain" />
                          <span>{match.team_a.short_name} vs {match.team_b.short_name}</span>
                          <img src={match.team_b.flag_url} alt={match.team_b.short_name} className="w-6 h-6 object-contain" />
                        </div>
                      </td>
                      <td className="p-[var(--spacing-sm)] text-center">
                        <span className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] rounded font-['Work_Sans'] font-semibold text-sm">
                          {match.team_a_score ?? '-'} : {match.team_b_score ?? '-'}
                        </span>
                      </td>
                      <td className="p-[var(--spacing-sm)] text-center">
                        {hasPred ? (
                          <span className="bg-[var(--color-primary-fixed-dim)] text-[var(--color-on-primary-fixed)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] rounded font-['Work_Sans'] font-semibold text-sm">
                            {pred.team_a_score} - {pred.team_b_score}
                          </span>
                        ) : (
                          <span className="text-[var(--color-outline)] text-sm">Sin predicción</span>
                        )}
                      </td>
                      <td className="p-[var(--spacing-sm)] text-right font-['Montserrat'] font-bold text-xl">
                        {hasPred && earned > 0 ? (
                          <span className="text-[var(--color-primary-container)]">+{earned} pts</span>
                        ) : (
                          <span className="text-[var(--color-outline)]">0 pts</span>
                        )}
                      </td>
                      <td className="p-[var(--spacing-sm)] text-right font-['Montserrat'] font-bold text-lg text-[#10b981]">
                        {hasPred && parseFloat(pred.earnings) > 0 ? (
                          `+$${parseFloat(pred.earnings).toFixed(2)}`
                        ) : (
                          <span className="text-[var(--color-outline)]">-</span>
                        )}
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-[var(--color-outline)]">No hay partidos finalizados aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Right Column (Logic Info) */}
      <div className="col-span-1 md:col-span-4 flex flex-col gap-[var(--spacing-lg)]">
        
        {/* Payout Calculation Logic */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm sticky top-28">
          <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-md)] pb-[var(--spacing-sm)] border-b border-[var(--color-surface-variant)]">
            <span className="material-symbols-outlined text-[var(--color-primary-container)]">info</span>
            <h4 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)]">Sistema de Puntos</h4>
          </div>
          <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)] mb-[var(--spacing-md)]">
            Gana puntos acertando el resultado y el marcador exacto de cada partido.
          </p>
          
          <div className="bg-[var(--color-surface-container)] rounded p-[var(--spacing-sm)] flex flex-col gap-[var(--spacing-sm)] font-['Work_Sans'] font-medium text-sm text-[var(--color-on-surface)]">
            <div className="flex justify-between items-center border-b border-[var(--color-outline-variant)]/50 pb-2">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[var(--color-primary-container)] text-sm">check_circle</span> Acierto Exacto:</span>
              <span className="font-bold text-[var(--color-primary-container)]">+3 pts</span>
            </div>
            <div className="flex justify-between items-center pb-1 text-[var(--color-on-surface-variant)]">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">done</span> Acierto Ganador/Empate:</span>
              <span className="font-bold">+1 pt</span>
            </div>
            
            <div className="mt-4 text-xs text-[var(--color-outline)] text-center border-t border-[var(--color-outline-variant)]/50 pt-3">
              Los puntos se calculan automáticamente al finalizar el partido.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
