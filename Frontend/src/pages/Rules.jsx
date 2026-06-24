import React from 'react';

const Rules = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold font-['Montserrat'] text-[var(--color-on-background)] mb-4">
          Reglas y Puntuación
        </h2>
        <p className="text-lg text-[var(--color-on-surface-variant)] font-medium">
          Todo lo que necesitas saber para coronarte campeón de la Quiniela Mundial 2026.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Section 1: Puntos */}
        <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-surface-variant)]">
          <div className="flex items-center gap-4 mb-6 border-b border-[var(--color-surface-variant)] pb-4">
            <div className="w-12 h-12 bg-[var(--color-primary-container)] rounded-xl flex items-center justify-center">
              <span className="text-2xl text-[var(--color-on-primary-container)]">🎯</span>
            </div>
            <h3 className="text-2xl font-bold font-['Montserrat'] text-[var(--color-on-surface)]">
              Sistema de Puntos
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[var(--radius-lg)]">
              <div className="text-3xl font-black text-[var(--color-primary)] mb-2">+3 Puntos</div>
              <h4 className="font-bold text-lg mb-2">Marcador Exacto</h4>
              <p className="text-[var(--color-on-surface-variant)] text-sm">
                Atinas al ganador y a la cantidad exacta de goles de ambos equipos. 
                <em>(Ejemplo: Predices 2-1 y el partido termina 2-1)</em>.
              </p>
            </div>

            <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-[var(--radius-lg)]">
              <div className="text-3xl font-black text-[var(--color-primary-fixed-dim)] mb-2">+1 Punto</div>
              <h4 className="font-bold text-lg mb-2">Acertar al Ganador / Empate</h4>
              <p className="text-[var(--color-on-surface-variant)] text-sm">
                Atinas qué equipo gana o si hay empate, pero fallas en los goles exactos.
                <em>(Ejemplo: Predices 2-0 y el partido termina 3-1)</em>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Dinámica */}
        <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-surface-variant)]">
          <div className="flex items-center gap-4 mb-6 border-b border-[var(--color-surface-variant)] pb-4">
            <div className="w-12 h-12 bg-[var(--color-secondary-container)] rounded-xl flex items-center justify-center">
              <span className="text-2xl text-[var(--color-on-secondary-container)]">⏳</span>
            </div>
            <h3 className="text-2xl font-bold font-['Montserrat'] text-[var(--color-on-surface)]">
              Tiempos y Bloqueos
            </h3>
          </div>
          
          <ul className="space-y-4 text-[var(--color-on-surface)] font-medium">
            <li className="flex gap-3">
              <span className="text-[var(--color-secondary)]">■</span>
              <span>Puedes cambiar tus predicciones las veces que quieras hasta <strong>10 minutos antes</strong> del inicio oficial de cada partido.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-secondary)]">■</span>
              <span>Una vez comenzado el partido, la predicción se bloquea y nadie podrá editarla.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-secondary)]">■</span>
              <span>Los resultados y los puntos se actualizan automáticamente al finalizar cada partido.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Empates */}
        <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-surface-variant)]">
          <div className="flex items-center gap-4 mb-6 border-b border-[var(--color-surface-variant)] pb-4">
            <div className="w-12 h-12 bg-[var(--color-tertiary-container)] rounded-xl flex items-center justify-center">
              <span className="text-2xl text-[var(--color-on-tertiary-container)]">⚖️</span>
            </div>
            <h3 className="text-2xl font-bold font-['Montserrat'] text-[var(--color-on-surface)]">
              Desempates en la Tabla
            </h3>
          </div>
          
          <p className="text-[var(--color-on-surface-variant)] mb-4 font-medium">
            Si dos o más jugadores terminan con la misma cantidad de puntos al final del Mundial, el dinero se dividirá usando estos criterios:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[var(--color-on-surface)] font-semibold ml-2">
            <li>Mayor cantidad de "Marcadores Exactos" (3 puntos) obtenidos.</li>
            <li>Si sigue el empate, mayor cantidad de puntos obtenidos en las rondas finales (Semifinal y Final).</li>
            <li>Si el empate persiste, el premio se divide en partes iguales.</li>
          </ol>
        </div>

      </div>
    </div>
  );
};

export default Rules;
