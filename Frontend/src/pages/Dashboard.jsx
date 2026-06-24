import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
      {/* Welcome Header */}
      <div className="md:col-span-12 mb-[var(--spacing-md)]">
        <h1 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-background)] mb-[var(--spacing-xs)]">Bienvenido, Fanático!</h1>
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
            <p className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-primary-container)]">1,250</p>
          </div>
          <div className="mt-4 flex items-center text-[var(--color-primary-container)] font-['Work_Sans'] font-medium text-xs">
            <span className="material-symbols-outlined mr-1 text-[16px]">trending_up</span>
            +150 en el último partido
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
            <p className="font-['Montserrat'] font-extrabold text-5xl">#42</p>
          </div>
          <div className="relative z-10 mt-4 flex items-center text-[var(--color-on-primary)] font-['Work_Sans'] font-medium text-xs opacity-90">
            <span className="material-symbols-outlined mr-1 text-[16px]">emoji_events</span>
            Top 1% de todos los jugadores
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between">
          <div>
            <h3 className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2">Precisión</h3>
            <div className="flex items-end gap-[var(--spacing-sm)]">
              <p className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-on-background)]">65%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-primary-container)] rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] mt-2">13/20 predicciones correctas</p>
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
                <span className="material-symbols-outlined text-[16px]">calendar_today</span> Nov 26, 2024 • 13:00 CST
              </div>
              <div className="absolute bottom-4 right-4 text-white font-['Work_Sans'] font-medium text-xs flex items-center gap-[var(--spacing-xs)] z-20">
                <span className="material-symbols-outlined text-[16px]">stadium</span> Estadio Azteca
              </div>
            </div>

            {/* Teams & Predict Action */}
            <div className="p-[var(--spacing-md)] md:p-[var(--spacing-lg)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
                {/* Team A (Mexico) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] mb-3 flex items-center justify-center p-2 shadow-sm">
                    <img alt="Mexico Flag" className="w-full h-full object-contain rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN5J0vZ1me7j75bo3VlB2G3i-tLpXFs5j5R8hve-hm5sPNZ-Ht2lEi5PIsXjus-GjtbrBs-D_r6XovjoyErU4Gbn3uSbeBjjeFDMC2uWEO5SHz8OuGvjEAWyh_flTCiRVnvaoDkLKhZD08fgWoRiVQ-cQvbNUvn5lZs7qTMTB0Nx2Gq3GbJsUJgyvqGoUnkOKTKhLC8MxWKQGkM7JS5sOHfeBVkIjGJUqTO1tj139yGy3Ix8qPbI2xutXHRtpfmsYYA5SrXzKKkmcL"/>
                  </div>
                  <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)] uppercase">MEX</span>
                  <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">México</span>
                </div>
                
                {/* VS / Time */}
                <div className="flex flex-col items-center justify-center px-[var(--spacing-lg)]">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-1">VS</span>
                  <div className="font-['Montserrat'] font-bold text-2xl text-[var(--color-on-background)] bg-[var(--color-surface-container-high)] px-4 py-2 rounded border border-[var(--color-outline-variant)]">
                    00 : 00
                  </div>
                </div>

                {/* Team B (Argentina) */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] mb-3 flex items-center justify-center p-2 shadow-sm">
                    <img alt="Argentina Flag" className="w-full h-full object-contain rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQA9LfPCteHdaaPZWIIM2M0RYYjQlZON4ya1YSdPv5XgcmMhJ75ZhAd1PXc31_2A-BDWgUd8B9IAjNJViTkGsNz4dGzUlhDVOqv_mqrLV18L0Z75ITfCOCxYlGHhqUnm18fix6iAOHTh0pfOGurvxsmetSRhWFzw5KeQVljXN5WlvayCNXUVrZQaKTN0CQuBDU3kikXnIPOeil9SJpjRaGONU2DS1gXsxVgSY1u7L1VLpetiz9ezwaoaOWHBAOIuxUmuhRg4C7QgRj"/>
                  </div>
                  <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)] uppercase">ARG</span>
                  <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Argentina</span>
                </div>
              </div>

              {/* Predict Action Area */}
              <div className="border-t border-[var(--color-outline-variant)] pt-[var(--spacing-md)] mt-[var(--spacing-sm)] flex flex-col md:flex-row items-center justify-between gap-[var(--spacing-md)]">
                <div className="w-full md:w-auto text-center md:text-left">
                  <p className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)]">Haz tu predicción ahora y gana hasta 100 pts.</p>
                </div>
                <Link to="/predictions/1" className="w-full md:w-auto text-center bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl uppercase px-8 py-3 rounded-lg hover:bg-[var(--color-on-primary-fixed-variant)] transition-colors shadow-md cursor-pointer">
                  Predecir
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar Column (Right) */}
      <div className="md:col-span-4 flex flex-col gap-[var(--spacing-lg)]">
        {/* Recent Results */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-[var(--spacing-md)]">
            <h2 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-background)]">Resultados</h2>
            <Link to="/predictions" className="font-['Work_Sans'] font-medium text-xs text-[var(--color-primary-container)] hover:underline">Ver Todos</Link>
          </div>
          <div className="flex flex-col gap-[var(--spacing-sm)]">
            {/* Result Item 1 (Win) */}
            <div className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded border border-[var(--color-outline-variant)]/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-surface-tint)]"></div>
                <div className="flex flex-col">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-background)]">MEX 2 - 1 POL</span>
                  <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Predicción: 2 - 1</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-surface-tint)] block">+50 pts</span>
                <span className="font-['Work_Sans'] font-medium text-[10px] text-[var(--color-primary-container)] bg-[var(--color-primary-fixed)]/30 px-2 py-0.5 rounded">Exacto</span>
              </div>
            </div>

            {/* Result Item 2 (Loss) */}
            <div className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded border border-[var(--color-outline-variant)]/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-error)]"></div>
                <div className="flex flex-col">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-background)]">FRA 3 - 1 AUS</span>
                  <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Predicción: 1 - 1</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] block">+0 pts</span>
                <span className="font-['Work_Sans'] font-medium text-[10px] text-[var(--color-on-surface-variant)] bg-[var(--color-surface-variant)] px-2 py-0.5 rounded">Fallo</span>
              </div>
            </div>

            {/* Result Item 3 (Partial) */}
            <div className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded border border-[var(--color-outline-variant)]/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-fixed-dim)]"></div>
                <div className="flex flex-col">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-background)]">GER 1 - 2 JPN</span>
                  <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Predicción: 0 - 1</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] block">+10 pts</span>
                <span className="font-['Work_Sans'] font-medium text-[10px] text-[var(--color-on-surface-variant)] bg-[var(--color-surface-variant)] px-2 py-0.5 rounded">Ganador</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
