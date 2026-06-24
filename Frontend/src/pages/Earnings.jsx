import React from 'react';

export default function Earnings() {
  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-gutter)]">
      {/* Left Column (Match Summary & Stats) */}
      <div className="col-span-1 md:col-span-8 flex flex-col gap-[var(--spacing-lg)]">
        {/* Match Summary Header */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-lg)] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-secondary-container)]"></div>
          <div className="text-center mb-[var(--spacing-md)]">
            <span className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] uppercase tracking-widest">Resultado Final • Grupo C</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center gap-[var(--spacing-sm)]">
              <img className="w-20 h-20 rounded-full shadow-sm object-cover" alt="Mexico Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn9bzu0pZ1cj_ZLCJTk2szjSzfK3fsOusfV-Qq6FpgYiHOH-ZbEIgIPTPryb97DmFVMrbPOieqs_QCYh54wUxsR7mY5E78YaGH2UY_TW-d7zx0Xs6W9MWUAjtJU4i9_XitNGkJBOUDqHCPz2TPyj14oZhVGpTwMGWryeVYqIuudy78SVK5j96Qv0xq2GChaq-F7F9IecyYDluU7VYjGfjefTs1K7Q-_BaHWHYTmlh5Kz3PeNA4GZ1eUQedT473HzoXdHpVJRmgncki"/>
              <span className="font-['Montserrat'] font-bold text-3xl text-[var(--color-primary-container)]">MEX</span>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-[var(--spacing-md)]">
                <span className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-on-surface)]">2</span>
                <span className="font-['Montserrat'] font-bold text-2xl text-[var(--color-outline)]">-</span>
                <span className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-on-surface)]">1</span>
              </div>
              <span className="bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] font-['Work_Sans'] font-semibold text-sm px-3 py-1 rounded-full mt-[var(--spacing-sm)]">FINAL</span>
            </div>
            
            <div className="flex flex-col items-center gap-[var(--spacing-sm)]">
              <img className="w-20 h-20 rounded-full shadow-sm object-cover" alt="Poland Flag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFs11YOtx6c3AFluIjbEXNgi7RJehgOPaiuJUHSj-OvN6RbblMqD0UNuAggTZnHdZh-hcXwArtbwfOPQ8vz3TN7_Rq9gQP9ZRhzv6Wh7ihJ59InqI3mJzNZQcRQsZJYNGdsICr7iuxRNMa-ZTi87EU-SAGNuSIJB-1UUSxdYA-BPyPFl6n8M_3v93et3cm2wdZWJwVnQb3HUZ79cbSwxI6wd55RH3yikJnhL-M7qB-ERbAWtgWlnvngloeZC1l0pYVCRk7JW1kV-2M"/>
              <span className="font-['Montserrat'] font-bold text-3xl text-[var(--color-outline)]">POL</span>
            </div>
          </div>
        </section>

        {/* Betting Pool Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-md)]">
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[var(--color-primary-container)] text-4xl mb-[var(--spacing-sm)]">payments</span>
            <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)] uppercase tracking-wider mb-[var(--spacing-xs)]">Bolsa Acumulada</span>
            <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-primary-container)]">$15,000 MXN</span>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[var(--color-outline)] text-4xl mb-[var(--spacing-sm)]">groups</span>
            <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)] uppercase tracking-wider mb-[var(--spacing-xs)]">Participantes</span>
            <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-surface)]">1,250</span>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm flex flex-col items-center justify-center text-center border-b-4 border-b-[var(--color-secondary-container)]">
            <span className="material-symbols-outlined text-[var(--color-secondary-container)] text-4xl mb-[var(--spacing-sm)]">trophy</span>
            <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-outline)] uppercase tracking-wider mb-[var(--spacing-xs)]">Ganadores (Marcador Exacto)</span>
            <span className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-secondary-container)]">3</span>
          </div>
        </section>

        {/* Winners Table */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[var(--color-surface-container-low)] px-[var(--spacing-md)] py-[var(--spacing-sm)] border-b border-[var(--color-outline-variant)] flex items-center gap-[var(--spacing-sm)]">
            <span className="material-symbols-outlined text-[var(--color-on-surface)]">leaderboard</span>
            <h3 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)]">Participantes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[var(--color-outline-variant)] bg-[var(--color-surface-bright)]">
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)]">Pos</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)]">Usuario</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-center">Predicción</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-right">Apostado</th>
                  <th className="p-[var(--spacing-sm)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-outline)] text-right">Ganancia</th>
                </tr>
              </thead>
              <tbody className="font-['Work_Sans'] text-base">
                <tr className="border-b border-[var(--color-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-primary-container)] text-[var(--color-on-primary)] w-6 h-6 inline-flex items-center justify-center rounded-full font-['Work_Sans'] font-medium text-xs">1</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] font-medium text-[var(--color-on-surface)]">ElChicharito14</td>
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-primary-fixed-dim)] text-[var(--color-on-primary-fixed)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] rounded font-['Work_Sans'] font-semibold text-sm">2 - 1</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] text-right text-[var(--color-on-surface-variant)]">$500 MXN</td>
                  <td className="p-[var(--spacing-sm)] text-right font-['Montserrat'] font-bold text-xl text-[var(--color-primary-container)]">$5,000 MXN</td>
                </tr>
                
                <tr className="border-b border-[var(--color-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] w-6 h-6 inline-flex items-center justify-center rounded-full font-['Work_Sans'] font-medium text-xs">2</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] font-medium text-[var(--color-on-surface)]">AztecaEagle</td>
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-primary-fixed-dim)] text-[var(--color-on-primary-fixed)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] rounded font-['Work_Sans'] font-semibold text-sm">2 - 1</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] text-right text-[var(--color-on-surface-variant)]">$500 MXN</td>
                  <td className="p-[var(--spacing-sm)] text-right font-['Montserrat'] font-bold text-xl text-[var(--color-primary-container)]">$5,000 MXN</td>
                </tr>
                
                <tr className="border-b border-[var(--color-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] w-6 h-6 inline-flex items-center justify-center rounded-full font-['Work_Sans'] font-medium text-xs">3</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] font-medium text-[var(--color-on-surface)]">OchoaFan99</td>
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-primary-fixed-dim)] text-[var(--color-on-primary-fixed)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] rounded font-['Work_Sans'] font-semibold text-sm">2 - 1</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] text-right text-[var(--color-on-surface-variant)]">$500 MXN</td>
                  <td className="p-[var(--spacing-sm)] text-right font-['Montserrat'] font-bold text-xl text-[var(--color-primary-container)]">$5,000 MXN</td>
                </tr>

                <tr className="border-b border-[var(--color-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] w-6 h-6 inline-flex items-center justify-center rounded-full font-['Work_Sans'] font-medium text-xs">4</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] font-medium text-[var(--color-on-surface)]">MexicoCity_Fan</td>
                  <td className="p-[var(--spacing-sm)] text-center">
                    <span className="bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] rounded font-['Work_Sans'] font-semibold text-sm">1 - 1</span>
                  </td>
                  <td className="p-[var(--spacing-sm)] text-right text-[var(--color-on-surface-variant)]">$200 MXN</td>
                  <td className="p-[var(--spacing-sm)] text-right font-['Montserrat'] font-bold text-xl text-[var(--color-outline)]">$0 MXN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Right Column (Personal Result & Logic) */}
      <div className="col-span-1 md:col-span-4 flex flex-col gap-[var(--spacing-lg)]">
        {/* Personal Result Card (Lost State Example) */}
        <section className="bg-[var(--color-error-container)] border border-[var(--color-error)]/20 rounded-lg p-[var(--spacing-lg)] shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiPjwvcmVjdD48Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0iIzAwMCI+PC9jaXJjbGU+PC9zdmc+')]"></div>
          <span className="material-symbols-outlined text-[var(--color-on-error-container)] text-5xl mb-[var(--spacing-sm)] relative z-10">cancel</span>
          <h3 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[var(--color-on-error-container)] mb-[var(--spacing-xs)] relative z-10">Sin suerte esta vez</h3>
          <p className="font-['Work_Sans'] text-base text-[var(--color-on-error-container)]/80 mb-[var(--spacing-md)] relative z-10">Tu predicción no coincidió con el marcador final.</p>
          
          <div className="bg-[var(--color-surface-container-lowest)]/50 w-full rounded p-[var(--spacing-sm)] flex justify-between items-center relative z-10">
            <div className="flex flex-col items-start">
              <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-error-container)] uppercase">Tu Elección</span>
              <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-error-container)]">MEX 3 - 0 POL</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-['Work_Sans'] font-medium text-xs text-[var(--color-on-error-container)] uppercase">Ganancia</span>
              <span className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-error-container)]">$0 MXN</span>
            </div>
          </div>
        </section>

        {/* Payout Calculation Logic */}
        <section className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg p-[var(--spacing-md)] shadow-sm">
          <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-md)] pb-[var(--spacing-sm)] border-b border-[var(--color-surface-variant)]">
            <span className="material-symbols-outlined text-[var(--color-primary-container)]">info</span>
            <h4 className="font-['Montserrat'] font-bold text-xl text-[var(--color-on-surface)]">Lógica de Pagos</h4>
          </div>
          <p className="font-['Work_Sans'] text-base text-[var(--color-on-surface-variant)] mb-[var(--spacing-md)]">
            La bolsa total se divide equitativamente entre los participantes que predijeron el <strong>marcador exacto</strong>.
          </p>
          
          <div className="bg-[var(--color-surface-container)] rounded p-[var(--spacing-sm)] flex flex-col gap-[var(--spacing-xs)] font-['Work_Sans'] font-medium text-xs text-[var(--color-on-surface)]">
            <div className="flex justify-between">
              <span>Bolsa Total:</span>
              <span className="font-bold">$15,000 MXN</span>
            </div>
            <div className="flex justify-between text-[var(--color-outline)]">
              <span>÷ Número de Ganadores:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between border-t border-[var(--color-outline-variant)] mt-[var(--spacing-xs)] pt-[var(--spacing-xs)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-container)]">
              <span>Pago por Ganador:</span>
              <span>$5,000 MXN</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
