import React from 'react';
import { Calendar, MapPin, Trophy, ArrowRight, Flame, Swords } from 'lucide-react';
import wolfMark from '../assets/images/alcateia-wolf-mark.png';
import heroPhoto from '../assets/images/hero_crossfit_alcateia_1794091516280.jpg';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onLeaderboardClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onLeaderboardClick,
}) => {
  return (
    <section className="alcateia-grid alcateia-grain relative overflow-hidden border-b border-white/10 bg-[#080808]">
      <div className="absolute inset-0">
        <img
          src={heroPhoto}
          alt=""
          className="h-full w-full object-cover object-center opacity-25 grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,.94)_48%,rgba(8,8,8,.56)_100%)]" />
        <div className="absolute -right-20 top-0 h-full w-[46%] skew-x-[-12deg] bg-red-600/10" />
        <div className="absolute right-[20%] top-0 h-full w-1 skew-x-[-12deg] bg-red-600/70" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.18fr_.82fr] lg:px-8 lg:py-20">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-500">
            <Flame className="h-4 w-4" />
            <span>Inscrições oficiais abertas</span>
            <span className="text-white/30">/</span>
            <span className="text-white/65">Arena Alcateia</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.4em] text-white/55">
              1º campeonato individual
            </div>
            <h1 className="font-heading text-5xl font-bold uppercase leading-[0.88] tracking-[-0.025em] text-white sm:text-7xl lg:text-[5.8rem]">
              Entre na
              <span className="relative mt-1 block w-fit pr-5 text-red-500">
                Alcateia
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-red-600" />
              </span>
            </h1>

            <p className="mt-8 max-w-2xl border-l-2 border-red-600 pl-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Dois dias de força, estratégia e união. Cada atleta entra sozinho na arena,
              mas ninguém compete sem a energia da matilha.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wide text-slate-300 sm:text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-500" />
                28 e 29 de novembro de 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                Arena Alcateia Fitness
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={onRegisterClick}
                className="alcateia-button flex items-center gap-3 bg-red-600 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_12px_40px_rgba(239,43,45,.28)] transition hover:bg-red-500"
              >
                Garantir minha vaga
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onLeaderboardClick}
                className="alcateia-button flex items-center gap-2 border border-white/25 bg-black/55 px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:border-red-500 hover:text-red-400"
              >
                <Trophy className="h-4 w-4 text-red-500" />
                Ver ranking
              </button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="alcateia-cut relative aspect-[4/5] overflow-hidden border border-white/15 bg-[#101010] shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-2 bg-red-600" />
            <div className="absolute -right-16 -top-16 h-48 w-48 rotate-45 border-[30px] border-red-600/20" />

            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-600/20 blur-3xl" />
                <img
                  src={wolfMark}
                  alt="Lobo da Alcateia Fitness"
                  className="relative mx-auto w-48 rounded-full ring-4 ring-white/10 sm:w-56"
                />
              </div>

              <div className="mt-7 font-heading text-3xl font-bold uppercase tracking-[0.16em] text-white">
                Força de matilha
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
                Alcateia Fitness
              </div>

              <div className="mt-8 grid w-full grid-cols-3 border-y border-white/10 py-4">
                <div>
                  <div className="font-heading text-2xl font-bold text-white">140+</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/45">atletas</div>
                </div>
                <div className="border-x border-white/10">
                  <div className="font-heading text-2xl font-bold text-red-500">4</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/45">categorias</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-white">3+1</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/45">WODs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 top-8 flex items-center gap-2 bg-red-600 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-white shadow-xl">
            <Swords className="h-4 w-4" />
            Arena 2026
          </div>
        </div>
      </div>
    </section>
  );
};
