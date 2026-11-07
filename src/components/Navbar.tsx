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
    <header className="sticky top-0 z-40 w-full bg-[#0B0F15]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark / Emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none group shrink-0"
        >
          <WolfLogo size="md" />
        </button>

        {/* Zone 2: 4-5 single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
                  isActive ? 'text-amber-400 font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
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
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Acesso de Administrador da Alcatéia"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-400" />
              <span>Área Admin</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('register')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md shadow-amber-500/15 whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-950" />
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
        <div className="md:hidden bg-[#0F141C] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow"
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
