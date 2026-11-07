import React from 'react';

interface WolfLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const WolfLogo: React.FC<WolfLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const textMap = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Wolf Crest Emblem Container */}
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-lg overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/10 bg-slate-900 group`}>
        <img
          src="/src/assets/images/wolf_crest_emblem_1794091516936.jpg"
          alt="Alcatéia CrossFit Crest"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant SVG fallback if asset fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Subtle inner gold rim */}
        <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/20 pointer-events-none rounded-lg" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading font-bold tracking-wider text-white uppercase ${textMap[size]} leading-none`}
            >
              ALCATÉIA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 font-semibold uppercase px-1 py-0.5 bg-amber-400/10 border border-amber-400/30 rounded">
              CHAMP
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium mt-0.5">
            1º Campeonato Oficial
          </span>
        </div>
      )}
    </div>
  );
};
