import React from 'react';
import wolfMark from '../assets/images/alcateia-wolf-mark.png';

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
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-28 h-28',
  };

  const textMap = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={'flex items-center gap-3 select-none ' + className}>
      <div className={'relative shrink-0 overflow-hidden rounded-full bg-[#080d11] ring-2 ring-slate-600 shadow-[0_0_22px_rgba(239,43,45,0.18)] ' + sizeMap[size]}>
        <img
          src={wolfMark}
          alt="Símbolo do lobo da Alcateia Fitness"
          className="h-full w-full object-cover"
        />
      </div>

      {showText && (
        <div className="flex min-w-0 flex-col border-l-2 border-red-600 pl-3">
          <div className="flex items-baseline gap-2">
            <span className={'font-heading font-bold tracking-[0.08em] text-white uppercase leading-none ' + textMap[size]}>
              Alcateia
            </span>
            <span className="font-heading text-[10px] font-bold tracking-[0.22em] text-red-500 uppercase">
              Fitness
            </span>
          </div>
          <span className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Campeonato da Matilha
          </span>
        </div>
      )}
    </div>
  );
};
