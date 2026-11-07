import React from 'react';
import { Calendar, MapPin, Trophy, Users, ArrowRight, Flame } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onLeaderboardClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onLeaderboardClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-slate-800 bg-[#0B0F15]">
      {/* Background Image with Cinematic Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_crossfit_alcateia_1794091516280.jpg"
          alt="Arena do 1º Campeonato CrossFit Alcatéia"
          className="w-full h-full object-cover object-center opacity-35 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Scrim gradient ensuring 4.5:1+ contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-[#0B0F15]/80 to-[#0B0F15]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F15] via-[#0B0F15]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Quiet Kicker */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-amber-400 uppercase mb-4">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Inscrições Oficiais Abertas</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Box Alcatéia</span>
        </div>

        {/* Display Headline */}
        <div className="max-w-4xl">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]">
            O Uivo da Matilha. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              A Força da Comunidade.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
            Participe do Primeiro Campeonato Individual de CrossFit da Alcatéia. Dois dias intensos de superação, barras pesadas, torcida vibrante e confraternização entre boxes.
          </p>

          {/* Event Quick Specs */}
          <div className="mt-8 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>28 e 29 de Novembro de 2026</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Arena Alcatéia CrossFit</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Troféus, Medalhas & Premiação</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onRegisterClick}
              className="px-7 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 cursor-pointer"
            >
              <span>Inscrever-se no Torneio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLeaderboardClick}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Ver Leaderboard / Ranking</span>
            </button>
          </div>
        </div>

        {/* 4-Stat Strip Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-400 tabular-nums">
              140+
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Vagas de Atletas
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white tabular-nums">
              Individual
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Masc & Feminino
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-400 tabular-nums">
              3 WODs + Final
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Provas Esmagadoras
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white tabular-nums">
              R$ 8.000+
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Em Premiações & Brindes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
