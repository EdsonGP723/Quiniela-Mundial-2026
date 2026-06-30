import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Standings() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchStandings() {
      try {
        const data = await api.get('/users/standings/');
        // Assign ranks based on array order
        const rankedUsers = data.map((u, index) => ({
          ...u,
          rank: index + 1
        }));
        setUsers(rankedUsers);
      } catch (error) {
        console.error("Error cargando ranking:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  // Filter by search
  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const myStanding = users.find(u => u.id === currentUser?.id);

  if (loading) {
    return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto py-[var(--spacing-lg)] px-4 animate-fade-in">
      <header className="mb-[var(--spacing-lg)] flex flex-col md:flex-row md:justify-between md:items-end border-b border-[var(--color-surface-variant)] pb-[var(--spacing-md)]">
        <div>
          <h1 className="font-['Montserrat'] font-extrabold text-5xl text-[var(--color-primary)] mb-[var(--spacing-xs)]">Ranking Global</h1>
          <p className="font-['Work_Sans'] text-lg text-[var(--color-on-surface-variant)]">Descubre tu posición entre los aficionados más apasionados.</p>
        </div>
      </header>

      {/* Current User Highlight Card */}
      {myStanding && (
        <section className="bg-[var(--color-primary-container)] text-[var(--color-on-primary)] rounded-[var(--radius-xl)] p-[var(--spacing-md)] mb-[var(--spacing-lg)] shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between border-l-4 border-[var(--color-secondary)]">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "16px 16px" }}
          ></div>
          <div className="flex items-center gap-[var(--spacing-md)] w-full md:w-auto mb-[var(--spacing-md)] md:mb-0 relative z-10">
            <div className="font-['Montserrat'] font-extrabold text-5xl w-16 text-center text-[var(--color-primary-fixed)]">{myStanding.rank}</div>
            {myStanding.avatar ? (
              <img className="w-16 h-16 rounded-full border-2 border-[var(--color-primary-fixed)] object-cover" src={myStanding.avatar} alt="Mi Avatar" />
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-[var(--color-primary-fixed)] bg-[var(--color-surface)] flex items-center justify-center text-2xl">👤</div>
            )}
            <div>
              <h2 className="font-['Montserrat'] font-bold text-xl">Tu Posición</h2>
              <p className="font-['Work_Sans'] font-semibold text-sm text-[var(--color-primary-fixed)]">{myStanding.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-[var(--spacing-lg)] w-full md:w-auto relative z-10">
            <div className="text-center md:text-right">
              <p className="font-['Work_Sans'] font-medium text-xs text-[var(--color-primary-fixed)] uppercase tracking-wide">Puntos Totales</p>
              <p className="font-['Montserrat'] font-bold text-3xl">{myStanding.points}</p>
            </div>
          </div>
        </section>
      )}

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-on-surface-variant)]">
          🔍
        </div>
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface-container-lowest)] border-2 border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:outline-none transition-colors shadow-sm text-[var(--color-on-surface)]"
        />
      </div>

      {/* Leaderboard Table */}
      <section className="bg-[var(--color-surface-container-lowest)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-surface-variant)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--color-surface-container-high)] border-b border-[var(--color-surface-variant)]">
              <tr>
                <th className="py-[var(--spacing-sm)] px-[var(--spacing-md)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] w-20 text-center">Rank</th>
                <th className="py-[var(--spacing-sm)] px-[var(--spacing-md)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)]">Jugador</th>
                <th className="py-[var(--spacing-sm)] px-[var(--spacing-md)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] text-right">Puntos</th>
                <th className="py-[var(--spacing-sm)] px-[var(--spacing-md)] font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)] text-center w-24">Tendencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-surface-variant)]">
              {currentUsers.length > 0 ? (
                currentUsers.map((u) => {
                  
                  // Top 3 specific styling
                  let rankColor = "text-[var(--color-on-surface-variant)]";
                  let rowBg = "bg-[var(--color-surface-container-lowest)]";
                  
                  if (u.rank === 1) { rankColor = "text-[#FFD700] drop-shadow-sm"; rowBg = "bg-[#fff9e6]"; }
                  else if (u.rank === 2) { rankColor = "text-[#C0C0C0]"; rowBg = "bg-[#f5f5f5]"; }
                  else if (u.rank === 3) { rankColor = "text-[#CD7F32]"; rowBg = "bg-[#fcf3ea]"; }

                  let trendIcon = "—";
                  let trendColor = "text-[var(--color-on-surface-variant)]";
                  if (u.trend === 'trending_up') { trendIcon = "↑"; trendColor = "text-[var(--color-primary-container)] font-bold"; }
                  if (u.trend === 'trending_down') { trendIcon = "↓"; trendColor = "text-[var(--color-error)] font-bold"; }

                  return (
                    <tr key={u.id} className={`${rowBg} hover:bg-[var(--color-surface-container)] transition-colors`}>
                      <td className={`py-[var(--spacing-sm)] px-[var(--spacing-md)] font-['Montserrat'] font-bold text-xl text-center ${rankColor}`}>
                        {u.rank}
                      </td>
                      <td className="py-[var(--spacing-sm)] px-[var(--spacing-md)] flex items-center gap-[var(--spacing-sm)]">
                        {u.avatar ? (
                          <img alt="Avatar" className="w-10 h-10 rounded-full border border-[var(--color-surface-variant)] object-cover" src={u.avatar}/>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-variant)] flex items-center justify-center font-['Work_Sans'] font-semibold text-sm text-[var(--color-on-surface-variant)]">
                            {u.username.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="font-['Work_Sans'] font-bold text-base text-[var(--color-on-surface)]">{u.username}</span>
                      </td>
                      <td className="py-[var(--spacing-sm)] px-[var(--spacing-md)] font-['Work_Sans'] text-base text-right font-bold text-[var(--color-primary)]">
                        {u.points}
                      </td>
                      <td className={`py-[var(--spacing-sm)] px-[var(--spacing-md)] text-center text-lg ${trendColor}`}>
                        {trendIcon}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-[var(--color-on-surface-variant)]">
                    No se encontraron jugadores con ese nombre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-[var(--spacing-md)] bg-[var(--color-surface-container-high)] border-t border-[var(--color-surface-variant)] flex justify-between items-center">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 rounded-[var(--radius-md)] font-semibold text-sm bg-[var(--color-surface)] border border-[var(--color-outline-variant)] disabled:opacity-50 hover:bg-[var(--color-surface-variant)] transition-colors cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-sm font-semibold text-[var(--color-on-surface-variant)]">
              Página {currentPage} de {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 rounded-[var(--radius-md)] font-semibold text-sm bg-[var(--color-surface)] border border-[var(--color-outline-variant)] disabled:opacity-50 hover:bg-[var(--color-surface-variant)] transition-colors cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
