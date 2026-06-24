import React from 'react';
import { Link } from 'react-router-dom';

export default function Predictions() {
  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] pb-32">
      {/* Header Section */}
      <header className="mb-[var(--spacing-lg)]">
        <h1 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)] mb-[var(--spacing-xs)]">Predicciones de Partidos</h1>
        <p className="font-['Work_Sans'] text-lg text-[var(--color-on-surface-variant)]">Ingresa tus predicciones para los próximos partidos. Las predicciones se cierran 15 minutos antes del inicio del partido.</p>
      </header>

      {/* Match List grouped by Date */}
      <div className="space-y-[var(--spacing-xl)]">
        
        {/* Date Group 1 */}
        <section>
          <div className="flex items-center gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
            <h2 className="font-['Montserrat'] font-bold text-xl text-[var(--color-primary-container)]">Viernes, 24 Nov</h2>
            <div className="h-px bg-[var(--color-outline-variant)] flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-gutter)]">
            
            {/* Match Card 1 */}
            <article className="bg-[var(--color-surface-container-lowest)] rounded border border-[var(--color-outline-variant)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row items-center relative group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              {/* Live Indicator (Absolute) */}
              <div className="absolute top-[var(--spacing-sm)] right-[var(--spacing-sm)] flex items-center gap-[var(--spacing-xs)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></div>
                <span className="font-['Work_Sans'] font-semibold text-[10px] text-[var(--color-secondary)] uppercase tracking-widest">Live 65'</span>
              </div>
              
              {/* Team A */}
              <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-r border-[var(--color-outline-variant)]/50 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm">
                  <img alt="Mexico Flag" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGqj12qqHnt-8u472Auy722M9gRx00hwuI8fOfK99Ey8I2Sl2OTUWsDjOcB6GRtnHoipwdcgEdiuAkIidJu3_9CDq8ZPk9pgy4QhzT97PdNpcPnrw2W83jTcM2vueW1oAuf8aDtqJ7tDJia5wsIZKzKeXOwt46pkl8OxjmyUActB8Bvk4oXB7SL5aayFrIMFl9tkgosAtXuYPHJobyAFNPHIwOuxkBp70vXY3lnu2fIT1b9RYBbL_aQW_Y6G4gADzaASP94pSPFpA"/>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">México</h3>
                <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Local</span>
              </div>
              
              {/* Prediction Center */}
              <div className="px-[var(--spacing-md)] py-[var(--spacing-lg)] flex flex-col items-center justify-center w-full md:w-auto bg-[var(--color-surface-container)]/30">
                <div className="flex items-center gap-[var(--spacing-sm)]">
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-extrabold text-5xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline)] text-[var(--color-on-surface)] rounded focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-[var(--color-primary-container)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" max="99" min="0" type="number" defaultValue="2" disabled />
                  <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface-variant)]">-</span>
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-extrabold text-5xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline)] text-[var(--color-on-surface)] rounded focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-[var(--color-primary-container)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" max="99" min="0" type="number" defaultValue="1" disabled />
                </div>
                <div className="mt-[var(--spacing-sm)] flex gap-[var(--spacing-xs)]">
                  <span className="bg-[var(--color-primary-container)] text-[var(--color-on-primary)] font-['Work_Sans'] font-medium text-xs px-2 py-1 rounded-full uppercase">Bloqueado</span>
                </div>
              </div>
              
              {/* Team B */}
              <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-l border-[var(--color-outline-variant)]/50 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm">
                  <img alt="Poland Flag" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDcPgsJHw86DDDHv4Izl-KvXDYgr4e8lUgD-SByiIHRrii6NIZMgJ8SXechgSazvax6RBLLmQXC8e5h_uWTP4cyzGcNoTeNW_qw5NgttNtqwJUzApz385sMrN6ieja93veh7JWpjcvSYPIwfLt6n0Vv9gBRM6tXF6RqNqaK_S_f7jILiYQZEV4Qhz4K4tFCfTh8lL_T_DDiTt6_ILk7qcs0AMBsY2ZQ08MAcP2kR1Spj1I3t9N1YoXpFyzFef21WIeEvdNGXyhPUh"/>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">Polonia</h3>
                <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Visitante</span>
              </div>
            </article>

            {/* Match Card 2 */}
            <Link to="/predictions/2" className="bg-[var(--color-surface-container-lowest)] rounded border border-[var(--color-outline-variant)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row items-center relative group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="absolute top-[var(--spacing-sm)] right-[var(--spacing-sm)] flex items-center gap-[var(--spacing-xs)]">
                <span className="font-['Work_Sans'] font-medium text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">14:00 CST</span>
              </div>
              
              {/* Team A */}
              <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-r border-[var(--color-outline-variant)]/50 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm">
                  <img alt="Argentina Flag" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTVFFyTOLjGfROydkfF9-HRTjbAl133rzllaH1JuX0YumidaQOkZvDp2iETttjDR3htHJNLhWRoBV9yQAq9Lr9Bl1ORKOBr0z3hLV05guPyiQhFkG124Z0oYJrhVXHDnOcsFkzCRTeqFh0yLf47uW_GIrHRH6dyxPz1NIU4Kxd19ivbHXIekCmGs45szWN1vJYWuL0xXstQGNueXsgCb5bQKPr9eFe9m-NYpnIda6yJbwfNB7eeR9zbggpYHUKSnrY7WzZW-cUvSqO"/>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">Argentina</h3>
                <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Local</span>
              </div>
              
              {/* Prediction Center */}
              <div className="px-[var(--spacing-md)] py-[var(--spacing-lg)] flex flex-col items-center justify-center w-full md:w-auto bg-[var(--color-surface-container)]/30">
                <div className="flex items-center gap-[var(--spacing-sm)]">
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-extrabold text-5xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-[var(--color-primary-container)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-pointer" max="99" min="0" placeholder="-" type="number" />
                  <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface-variant)]">-</span>
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-extrabold text-5xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-[var(--color-primary-container)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-pointer" max="99" min="0" placeholder="-" type="number" />
                </div>
              </div>
              
              {/* Team B */}
              <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-l border-[var(--color-outline-variant)]/50 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm">
                  <img alt="Saudi Arabia Flag" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALcj2fUU8CC9RtjiSojswL9-wTnoIEjuIYhmZPSCZKjnyN2OQxHhG7HedKQg0zNY-Kg8TvXOBnCvvzCB1AJgq6NqGKkpUb3NBPeQa1Reei-QljvlffBiOjkpGhpCxpUlAVAxpTGr_DZkuZ2vZEopwMHr-mc4JPpA68tB-lJYxdBdWRvCvPkOudZwezOU5EjuuUPmlwQtbe0YCqe1TxYKE31MVlutaIAiM42ClPzqzIb4I4Ot3yngObiHMynI8K2tYyS06zmZojibCK"/>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">Arabia Saudita</h3>
                <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Visitante</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Date Group 2 */}
        <section>
          <div className="flex items-center gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
            <h2 className="font-['Montserrat'] font-bold text-xl text-[var(--color-primary-container)]">Sábado, 25 Nov</h2>
            <div className="h-px bg-[var(--color-outline-variant)] flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-gutter)]">
            {/* Match Card 3 */}
            <article className="bg-[var(--color-surface-container-lowest)] rounded border border-[var(--color-outline-variant)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row items-center relative group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="absolute top-[var(--spacing-sm)] right-[var(--spacing-sm)] flex items-center gap-[var(--spacing-xs)]">
                <span className="font-['Work_Sans'] font-medium text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">10:00 CST</span>
              </div>
              
              {/* Team A */}
              <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-r border-[var(--color-outline-variant)]/50 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm">
                  <img alt="France Flag" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoa5Qoow9LcPC3VGsc8iyS3RCYQmiDz8yi5dSmcp6lOqAvRPKR9YXYtzPAmU_9tavtH9ax9mhi2o7GL514qNkcmr9Vj0Uj38Hg5tQFym9Erd8dA461e9XHOYUzvYfI63jabi70JODp0i1ah7QyI7eqRTlt_AE9bOIBgc_8tDBsSk5MF8_PPUMLOBXAY92FW2TDdRz3g3-HMCJRbYtfCfsRArHviMFrFTZBad3EBCzdaaZKSgDar7TMCdqhHpArpJc9j_PSqFtwgGJQ"/>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">Francia</h3>
                <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Local</span>
              </div>
              
              {/* Prediction Center */}
              <div className="px-[var(--spacing-md)] py-[var(--spacing-lg)] flex flex-col items-center justify-center w-full md:w-auto bg-[var(--color-surface-container)]/30">
                <div className="flex items-center gap-[var(--spacing-sm)]">
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-extrabold text-5xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-[var(--color-primary-container)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" max="99" min="0" placeholder="-" type="number" />
                  <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface-variant)]">-</span>
                  <input className="w-16 h-16 text-center font-['Montserrat'] font-extrabold text-5xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded focus:ring-2 focus:ring-[var(--color-primary-container)] focus:border-[var(--color-primary-container)] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" max="99" min="0" placeholder="-" type="number" />
                </div>
              </div>
              
              {/* Team B */}
              <div className="flex-1 flex flex-col items-center p-[var(--spacing-md)] md:border-l border-[var(--color-outline-variant)]/50 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--color-outline-variant)] mb-[var(--spacing-sm)] shadow-sm">
                  <img alt="Denmark Flag" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD5Le1egfVkpabF8Qd7Ut0EDSWP6NmmDwKGK9fGVBn-F4eJKdQkhrS50aYjhg7ElqiNiF721w013jkXvOx-CxwWyXkw6otvky80YR-IdYbGYF9K4R1V5wtNF2__cSPLSqPwr_PnD5GCinP7Pcvr-UamsKQK1v1UwYRgEgQnR4rFqfrJMhyVOZ58vuNvdapjUZZQgfUn8qypwA7V-ey7n5XRq9jmJCTBe3xoIK4VTOO8MD3yksIdSTDg2HVlE07sUn5ZaZiCltRYl_r"/>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)] text-center mb-[var(--spacing-xs)]">Dinamarca</h3>
                <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface-variant)]">Visitante</span>
              </div>
            </article>
          </div>
        </section>
      </div>

      {/* Floating Action Button (Save) */}
      <button className="fixed bottom-[var(--spacing-md)] md:bottom-[var(--spacing-lg)] right-[var(--spacing-margin-mobile)] md:right-[var(--spacing-margin-desktop)] bg-[var(--color-primary-container)] hover:bg-[var(--color-on-primary-fixed-variant)] text-[var(--color-on-primary)] rounded-full px-[var(--spacing-md)] py-[var(--spacing-sm)] flex items-center gap-[var(--spacing-sm)] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] transition-all z-40 transform hover:-translate-y-1 cursor-pointer">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
        <span className="font-['Work_Sans'] font-semibold text-sm uppercase tracking-wide">Guardar Predicciones</span>
      </button>
    </div>
  );
}
