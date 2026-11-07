import React from 'react';
import { Shield, Users, HeartHandshake, Flame, MapPin, Award } from 'lucide-react';
import { WolfLogo } from './WolfLogo';

interface AboutSectionProps {
  onRegisterClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRegisterClick }) => {
  return (
    <div className="alcateia-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* 2-Column Split: Story + Real Community Photography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>A Origem da Alcatéia</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            Nenhum Lobo Luta Sozinho. <br />
            <span className="text-amber-400">A Força da Matilha.</span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            A academia <strong>Alcatéia CrossFit</strong> nasceu com um princípio fundamental: na arena, a vitória de um atleta é a celebração de toda a matilha. Nosso primeiro campeonato oficial foi desenhado para testar os limites físicos e mentais de cada competidor em um ambiente de camaradagem inabalável.
          </p>

          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Desde o atleta Scale que fará sua primeira subida na corda até o competidor RX que busca a carga máxima no levantamento olímpico, aqui todos recebem o mesmo incentivo ensurdecedor na última repetição.
          </p>

          {/* Core Values */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="alcateia-cut p-4 bg-[#121212] border border-white/10">
              <div className="flex items-center gap-2 text-white font-heading text-base font-bold uppercase">
                <Users className="w-4 h-4 text-amber-400" />
                <span>União & Matilha</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Acolhemos atletas de todos os boxes e níveis de experiência.
              </p>
            </div>

            <div className="alcateia-cut p-4 bg-[#121212] border border-white/10">
              <div className="flex items-center gap-2 text-white font-heading text-base font-bold uppercase">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Superação Real</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                WODs desenhados para testar potência, resistência e estratégia.
              </p>
            </div>

            <div className="alcateia-cut p-4 bg-[#121212] border border-white/10">
              <div className="flex items-center gap-2 text-white font-heading text-base font-bold uppercase">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Arbitragem Justa</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Árbitros certificados e critérios rigorosos de repetição válida.
              </p>
            </div>

            <div className="alcateia-cut p-4 bg-[#121212] border border-white/10">
              <div className="flex items-center gap-2 text-white font-heading text-base font-bold uppercase">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Estrutura Completa</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Mais de 1.200m² de arena, rigs oficiais e recovery com gelo.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onRegisterClick}
              className="alcateia-button px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-xs shadow-md transition"
            >
              Fazer Parte da Disputa
            </button>
          </div>
        </div>

        {/* Community Photographic Showcase */}
        <div className="alcateia-cut relative overflow-hidden border border-white/15 shadow-2xl group">
          <img
            src="/src/assets/images/community_athletes_wod_1794091516520.jpg"
            alt="Atletas da Alcatéia comemorando após treino pesado de CrossFit"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-[500px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Comunidade Alcatéia
            </div>
            <div className="font-heading text-xl font-bold uppercase mt-0.5">
              "O lobo solitário perece. A matilha sobrevive e reina."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
