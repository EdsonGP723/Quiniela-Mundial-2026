import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PredictionDetail() {
  const { id } = useParams();

  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-gutter)]">
      {/* Left Column: Match & Predictions */}
      <div className="lg:col-span-8 flex flex-col gap-[var(--spacing-md)]">
        {/* Match Header Card */}
        <section className="bg-white/95 backdrop-blur-[10px] border border-[var(--color-outline-variant)]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-lg overflow-hidden relative">
          <div className="bg-[var(--color-surface-container-high)] p-[var(--spacing-sm)] flex items-center justify-between border-b border-[var(--color-outline-variant)]/30">
            <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-medium text-xs">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>Nov 22, 2024 • 10:00 AM</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-medium text-xs">
              <span className="material-symbols-outlined text-sm">stadium</span>
              <span>Estadio 974, Doha</span>
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
                <div className="w-24 h-24 rounded-full bg-[var(--color-surface-container)] overflow-hidden shadow-md border-4 border-[var(--color-surface)]">
                  <img className="w-full h-full object-cover" alt="Mexico Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN8-sEH39Mv6E6316GvH5kcTtoXlczadQ1D0KWfwxBTbYY6Et2RJYVGeNLGi6u7SxdDaYRM6XgspTNR8kbp5NSZ_OoDKVCWrw6Fi5kshr2cXKviyQM_9UJ1CBjluFNYNvcsYa9NSHfERoRAj9IAyFDL0TU2CK-QmWRWaCNMmje-mfRGTC1XaQFBhpreAECHdtRSO1tK2TDg08BwDkyLJbb7ualNmJjKzH8ysFxLM_bJXnuHTleqsPI-XmR8K4LgcO6t5pXUQ9OOTL0"/>
                </div>
                <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)] text-center">MÉXICO</h2>
              </div>
              
              {/* VS / Score */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/3 gap-[var(--spacing-sm)]">
                <div className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] px-4 py-1 rounded-full font-['Work_Sans'] font-semibold text-xs uppercase tracking-widest">
                  Jornada 1
                </div>
                <div className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-tertiary-fixed-dim)]">VS</div>
                <div className="text-[var(--color-secondary)] font-['Work_Sans'] font-semibold text-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
                  PRÓXIMO
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-[var(--spacing-sm)] w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-[var(--color-surface-container)] overflow-hidden shadow-md border-4 border-[var(--color-surface)]">
                  <img className="w-full h-full object-cover" alt="Poland Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJVnxFKjEQxN_rOizfi5KrwV_-sUQx4NCCk1FQcmiGA4wV9eNZhJtE9Jrs-jmZ7F0wFxST0mg8I-dFc9BclZAEjx_-r8qbblWIG3W5QWAQiLf58UbE841ZsU04fveA29jtjpt3gFZ07hytDBlK80wwcf2wrcG0GAm6mA5k6lGOJEM29F8BfLpq2zMgo4UR9WDmY4mjBsYvwjpCtzIhPnpeWYdHfLDp3oFqOXH6NeOHZ2ntAF17k-weQCS9tdkWIk-15E9FVLag1pU9"/>
                </div>
                <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)] text-center">POLONIA</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Prediction Section */}
        <section className="flex flex-col gap-[var(--spacing-md)]">
          <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary-container)]">psychology</span>
            Haz tu predicción
          </h3>

          {/* Bento Grid for Predictions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
            
            {/* Outcome Selection */}
            <div className="bg-white/95 backdrop-blur-[10px] border border-[var(--color-outline-variant)]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-lg p-[var(--spacing-md)] flex flex-col gap-[var(--spacing-md)]">
              <div className="flex justify-between items-start">
                <h4 className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider">Resultado (1X2)</h4>
                <span className="bg-[var(--color-primary-fixed)]/20 text-[var(--color-primary-container)] px-2 py-1 rounded text-xs font-bold">+50 Pts</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-auto">
                <button className="flex flex-col items-center justify-center p-3 rounded border border-[var(--color-outline-variant)] bg-[var(--color-surface)] hover:border-[var(--color-primary-container)] hover:bg-[var(--color-surface-container)] transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-transparent cursor-pointer">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)] group-hover:text-[var(--color-primary-container)]">MEX</span>
                  <span className="text-xs text-[var(--color-on-surface-variant)]">2.10</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded border-2 border-[var(--color-primary-container)] bg-[var(--color-primary-container)]/5 transition-all group focus:outline-none shadow-sm relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 bg-[var(--color-primary-container)] text-[var(--color-on-primary)] w-4 h-4 flex items-center justify-center rounded-bl-lg">
                    <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-container)]">EMPATE</span>
                  <span className="text-xs text-[var(--color-primary-container)] font-medium">3.20</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 rounded border border-[var(--color-outline-variant)] bg-[var(--color-surface)] hover:border-[var(--color-primary-container)] hover:bg-[var(--color-surface-container)] transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-transparent cursor-pointer">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)] group-hover:text-[var(--color-primary-container)]">POL</span>
                  <span className="text-xs text-[var(--color-on-surface-variant)]">3.50</span>
                </button>
              </div>
            </div>

            {/* Exact Score Input */}
            <div className="bg-white/95 backdrop-blur-[10px] border border-[var(--color-outline-variant)]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-lg p-[var(--spacing-md)] flex flex-col gap-[var(--spacing-md)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-container)]/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              <div className="flex justify-between items-start">
                <h4 className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] uppercase tracking-wider">Marcador Exacto</h4>
                <span className="bg-[var(--color-primary-container)] text-[var(--color-on-primary)] px-2 py-1 rounded text-xs font-bold shadow-sm">+150 Pts Max</span>
              </div>
              <div className="flex items-center justify-between mt-auto px-4 relative z-10">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]">MEX</span>
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-bold text-3xl bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg focus:border-[var(--color-primary-container)] focus:ring-1 focus:ring-[var(--color-primary-container)] text-[var(--color-on-surface)] shadow-inner p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" max="99" min="0" type="number" defaultValue="1" />
                </div>
                <span className="font-['Montserrat'] font-bold text-2xl text-[var(--color-tertiary-fixed-dim)]">-</span>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]">POL</span>
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-bold text-3xl bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg focus:border-[var(--color-primary-container)] focus:ring-1 focus:ring-[var(--color-primary-container)] text-[var(--color-on-surface)] shadow-inner p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" max="99" min="0" type="number" defaultValue="1" />
                </div>
              </div>
            </div>
            
          </div>
        </section>
      </div>

      {/* Right Column: Betting & Summary */}
      <div className="lg:col-span-4 flex flex-col gap-[var(--spacing-md)]">
        <section className="bg-white/95 backdrop-blur-[10px] border border-[var(--color-outline-variant)]/50 shadow-md rounded-lg p-[var(--spacing-md)] border-t-4 border-t-[var(--color-primary-container)] sticky top-28">
          <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] mb-[var(--spacing-md)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--color-primary-container)]">payments</span>
            Monto a Apostar
          </h3>

          {/* Bet Amount Input */}
          <div className="mb-[var(--spacing-lg)]">
            <label className="block font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] mb-2" htmlFor="bet-amount">Monto (MXN)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface-variant)]">$</span>
              <input className="w-full pl-8 pr-4 py-3 bg-[var(--color-surface)] border border-[var(--color-outline-variant)] rounded-lg font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] focus:border-[var(--color-primary-container)] focus:ring-1 focus:ring-[var(--color-primary-container)] transition-colors shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" id="bet-amount" type="number" defaultValue="500" />
            </div>
            {/* Quick Select Chips */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <button className="px-3 py-1 rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[12px] font-medium font-['Work_Sans'] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] whitespace-nowrap cursor-pointer">+100</button>
              <button className="px-3 py-1 rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[12px] font-medium font-['Work_Sans'] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] whitespace-nowrap cursor-pointer">+500</button>
              <button className="px-3 py-1 rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[12px] font-medium font-['Work_Sans'] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] whitespace-nowrap cursor-pointer">+1000</button>
              <button className="px-3 py-1 rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface)] text-[12px] font-medium font-['Work_Sans'] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] whitespace-nowrap cursor-pointer">MAX</button>
            </div>
          </div>

          <hr className="border-[var(--color-outline-variant)]/50 mb-[var(--spacing-md)]"/>

          {/* Summary */}
          <div className="bg-[var(--color-surface-container-low)] rounded p-4 mb-[var(--spacing-lg)]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Cuota Actual</span>
              <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface)]">3.20 (Empate)</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)]">Puntos Potenciales</span>
              <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-container)] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">toll</span>
                200
              </span>
            </div>
            <div className="flex justify-between items-end border-t border-[var(--color-outline-variant)]/30 pt-3 mt-3">
              <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)]">Ganancia Potencial</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-[var(--color-primary-container)]">$1,600.00</span>
            </div>
          </div>

          {/* Action Button */}
          <Link to="/predictions" className="w-full bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Montserrat'] font-bold text-xl py-4 rounded-lg uppercase tracking-wider hover:bg-[var(--color-primary)] transition-all active:scale-95 shadow-md flex justify-center items-center gap-2 group cursor-pointer text-center">
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">send</span>
            Apostar
          </Link>
          
          <p className="text-center font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)] mt-4">
            Al realizar esta predicción, aceptas las <a className="underline hover:text-[var(--color-primary-container)]" href="#">Reglas de Apuestas</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
