import React, { useState } from 'react';
import { WolfLogo } from './WolfLogo';
import { useChampionship } from '../context/ChampionshipContext';
import { ShieldCheck, UserCheck, Menu, X, LogIn } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdminModal,
}) => {
  const { isAdmin, athletes } = useChampionship();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingPaymentsCount = athletes.filter((a) => a.paymentStatus === 'pendente').length;

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'register', label: 'Inscrição' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'news', label: 'Feed & Avisos' },
    { id: 'about', label: 'Sobre a Matilha' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 h-px w-1/4 bg-red-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.75rem] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark / Emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none group shrink-0"
        >
          <WolfLogo size="md" />
        </button>

        {/* Zone 2: 4-5 single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-[0.09em] text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
                  isActive ? 'text-red-500' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[1.8rem] left-0 right-0 h-1 bg-red-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Admin Area / Inscrição) */}
        <div className="flex items-center gap-3 shrink-0">
          {isAdmin ? (
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 border ${
                activeTab === 'admin'
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-950/40'
                  : 'bg-red-600/10 text-red-300 border-red-500/30 hover:bg-red-500/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>Painel Admin</span>
              {pendingPaymentsCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {pendingPaymentsCount}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-1.5 border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-red-500/50 hover:text-white whitespace-nowrap shrink-0"
              title="Acesso de Administrador da Alcatéia"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-400" />
              <span>Área Admin</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('register')}
            className="alcateia-button hidden sm:flex items-center gap-2 bg-red-600 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.11em] text-white transition-all shadow-md shadow-red-950/40 whitespace-nowrap shrink-0 hover:bg-red-500 active:scale-[0.98]"
          >
            <UserCheck className="w-3.5 h-3.5 text-white" />
            <span>Inscrever Atleta</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-b border-white/10 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('register')}
              className="alcateia-button w-full bg-red-600 py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500 shadow"
            >
              Inscrever Atleta Agora
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdmin) {
                  setActiveTab('admin');
                } else {
                  onOpenAdminModal();
                }
              }}
              className="w-full py-2 text-xs text-center text-slate-400 hover:text-white"
            >
              {isAdmin ? 'Acessar Painel Admin' : 'Login Administrativo'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
