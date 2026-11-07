import React from 'react';
import { WolfLogo } from './WolfLogo';
import { MapPin, Phone, Mail, Instagram, Shield } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onAdminClick }) => {
  return (
    <footer className="w-full bg-[#080B10] border-t border-slate-800/80 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-4">
            <WolfLogo size="md" />
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              O 1º Campeonato Oficial de CrossFit da Alcatéia une a força individual de cada atleta ao espírito inquebrantável da matilha.
            </p>
            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Rua dos Atletas, 1200 - Arena Alcatéia</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase text-white tracking-wider mb-3">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-amber-400 transition"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('register')}
                  className="hover:text-amber-400 transition"
                >
                  Inscrições de Atletas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('leaderboard')}
                  className="hover:text-amber-400 transition"
                >
                  Leaderboard & Ranking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('news')}
                  className="hover:text-amber-400 transition"
                >
                  Feed de Notícias & Briefings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-amber-400 transition"
                >
                  Sobre a Matilha
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Admin Access */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase text-white tracking-wider mb-3">
              Organização
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>(41) 99881-ALCA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>campeonato@crossfitalcateia.com.br</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onAdminClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Acesso do Administrador</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Alcatéia CrossFit. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-3">
            <span>Arbitragem Oficial</span>
            <span aria-hidden="true">·</span>
            <span>Regulamento Padrão CrossFit</span>
            <span aria-hidden="true">·</span>
            <span>Chave PIX Registrada</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
