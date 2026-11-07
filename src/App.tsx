/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChampionshipProvider, useChampionship } from './context/ChampionshipContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegistrationForm } from './components/RegistrationForm';
import { Leaderboard } from './components/Leaderboard';
import { NewsFeed } from './components/NewsFeed';
import { AboutSection } from './components/AboutSection';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { IntroSplash } from './components/IntroSplash';
import { Flame, Trophy, Newspaper, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

function ChampionshipApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('alcateia-intro-seen') !== 'true';
  });
  const { categories, workouts, news, athletes, isAdmin } = useChampionship();

  const handleTabChange = (tab: string) => {
    if (tab === 'admin' && !isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntroFinish = () => {
    sessionStorage.setItem('alcateia-intro-seen', 'true');
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      {showIntro && <IntroSplash onFinish={handleIntroFinish} />}
      {/* Navbar with 3-Zone Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onRegisterClick={() => handleTabChange('register')}
              onLeaderboardClick={() => handleTabChange('leaderboard')}
            />

            {/* Section: Official Categories */}
            <section className="alcateia-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Divisões de Disputa Individual</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mt-1">
                    Categorias Oficiais
                  </h2>
                  <p className="mt-1 text-sm text-slate-400 max-w-xl">
                    Cada atleta compete em sua respectiva faixa de habilidade técnica e carga, garantindo uma disputa equilibrada e emocionante.
                  </p>
                </div>

                <button
                  onClick={() => handleTabChange('register')}
                  className="alcateia-button px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-xs shadow-sm transition flex items-center gap-2 self-start md:self-auto cursor-pointer"
                >
                  <span>Garantir Minha Vaga</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.slice(0, 4).map((cat) => {
                  const registeredCount = athletes.filter((a) => a.categoryId === cat.id).length;
                  const spotsLeft = Math.max(0, cat.maxSpots - registeredCount);

                  return (
                    <div
                      key={cat.id}
                      className="alcateia-cut p-5 bg-[#121212] border border-white/10 hover:border-red-500/60 transition-all flex flex-col justify-between shadow-lg group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="font-mono text-amber-400 font-semibold uppercase text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                            {cat.gender === 'M' ? 'Masculino' : cat.gender === 'F' ? 'Feminino' : 'Open'}
                          </span>
                          <span className="font-mono font-bold text-white text-sm tabular-nums">
                            R$ {cat.price.toFixed(2)}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-amber-400 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>

                        {cat.standards && cat.standards.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-slate-800/80">
                            <span className="text-[10px] uppercase font-semibold text-slate-500">
                              Movimentos:
                            </span>
                            <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                              {cat.standards.join(' · ')}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Vagas: <strong className="text-white">{spotsLeft}</strong> restantes
                        </span>
                        <button
                          onClick={() => handleTabChange('register')}
                          className="text-amber-400 font-bold hover:underline"
                        >
                          Inscrever →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section: WODs Announcement */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10">
              <div className="absolute left-4 top-0 h-1 w-24 bg-red-600 sm:left-6 lg:left-8" />
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Provas Oficiais do Campeonato</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mt-1">
                  Desafios da Matilha
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Provas elaboradas pela comissão técnica para testar força pura, resistência cardiovascular e velocidade sob fadiga.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workouts.map((wod) => (
                  <div
                    key={wod.id}
                    className="alcateia-cut p-6 bg-[#121212] border border-white/10 hover:border-red-500/50 transition shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="font-mono text-amber-400 font-bold uppercase">
                          WOD #{wod.number}
                        </span>
                        <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                          Cap: {wod.timeCap}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-white">
                        {wod.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                        {wod.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                      <span>Critério de Pontuação:</span>
                      <strong className="text-amber-400">{wod.scoreTypeDesc}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Latest News Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
                    <Newspaper className="w-4 h-4 text-amber-400" />
                    <span>Comunicados Recentes</span>
                  </div>
                  <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white mt-1">
                    Feed de Atualizações
                  </h2>
                </div>

                <button
                  onClick={() => handleTabChange('news')}
                  className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Ver Todos os Avisos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleTabChange('news')}
                    className="alcateia-cut p-6 bg-[#121212] border border-white/10 hover:border-red-500/60 transition cursor-pointer shadow-lg group"
                  >
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
                      <span className="uppercase">{item.tag}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400 font-normal">{item.date}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: REGISTRATION FORM */}
        {activeTab === 'register' && (
          <RegistrationForm onSuccessRedirect={() => handleTabChange('leaderboard')} />
        )}

        {/* VIEW 3: LEADERBOARD / RANKING */}
        {activeTab === 'leaderboard' && <Leaderboard />}

        {/* VIEW 4: NEWS FEED */}
        {activeTab === 'news' && <NewsFeed />}

        {/* VIEW 5: ABOUT BOX ALCATEIA */}
        {activeTab === 'about' && (
          <AboutSection onRegisterClick={() => handleTabChange('register')} />
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleTabChange}
        onAdminClick={() => {
          if (isAdmin) {
            handleTabChange('admin');
          } else {
            setIsAdminModalOpen(true);
          }
        }}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={() => {
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ChampionshipProvider>
      <ChampionshipApp />
    </ChampionshipProvider>
  );
}
