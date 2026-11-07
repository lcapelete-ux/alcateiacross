import React, { useCallback, useEffect, useRef, useState } from 'react';
import wolfMark from '../assets/images/alcateia-wolf-mark.png';

interface IntroSplashProps {
  onFinish: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onFinish }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const isLeavingRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const finishIntro = useCallback(() => {
    if (isLeavingRef.current) return;
    isLeavingRef.current = true;
    setIsLeaving(true);
    window.setTimeout(() => onFinishRef.current(), 650);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(finishIntro, 5200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [finishIntro]);

  return (
    <div
      className={`alcateia-intro ${isLeaving ? 'alcateia-intro--leaving' : ''}`}
      role="dialog"
      aria-label="Abertura do Primeiro Campeonato de Cross da Alcateia"
    >
      <div className="alcateia-intro__glow" aria-hidden="true" />
      <div className="alcateia-intro__slash alcateia-intro__slash--one" aria-hidden="true" />
      <div className="alcateia-intro__slash alcateia-intro__slash--two" aria-hidden="true" />

      <button type="button" className="alcateia-intro__skip" onClick={finishIntro}>
        Pular intro
      </button>

      <div className="alcateia-intro__content">
        <div className="alcateia-intro__kicker">Arena 2026 · A matilha está pronta</div>

        <div className="alcateia-intro__stage" aria-hidden="true">
          <div className="alcateia-intro__pulse" />
          <svg
            className="alcateia-intro__athlete"
            viewBox="0 0 400 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="intro-wolf-clip">
                <circle cx="200" cy="119" r="43" />
              </clipPath>
            </defs>
            <ellipse className="intro-shadow" cx="200" cy="306" rx="102" ry="14" fill="black" />

            <g className="intro-athlete-rise">
              <g className="intro-bar">
                <rect x="52" y="50" width="296" height="10" rx="5" fill="#F7F7F4" />
                <rect x="28" y="25" width="28" height="60" rx="5" fill="#EF2B2D" />
                <rect x="15" y="34" width="13" height="42" rx="4" fill="#B91C1C" />
                <rect x="344" y="25" width="28" height="60" rx="5" fill="#EF2B2D" />
                <rect x="372" y="34" width="13" height="42" rx="4" fill="#B91C1C" />
              </g>

              <path d="M169 155L123 92L137 76L184 129" stroke="#F7F7F4" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M231 155L277 92L263 76L216 129" stroke="#F7F7F4" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="129" cy="77" r="12" fill="#EF2B2D" />
              <circle cx="271" cy="77" r="12" fill="#EF2B2D" />

              <path d="M158 151L200 126L242 151L232 238H168L158 151Z" fill="#171717" stroke="#EF2B2D" strokeWidth="6" />
              <path d="M172 238L134 292" stroke="#F7F7F4" strokeWidth="27" strokeLinecap="round" />
              <path d="M228 238L266 292" stroke="#F7F7F4" strokeWidth="27" strokeLinecap="round" />
              <path d="M112 299H153" stroke="#EF2B2D" strokeWidth="16" strokeLinecap="round" />
              <path d="M247 299H288" stroke="#EF2B2D" strokeWidth="16" strokeLinecap="round" />

              <circle cx="200" cy="119" r="48" fill="#080D11" stroke="#596574" strokeWidth="5" />
              <image href={wolfMark} x="157" y="76" width="86" height="86" preserveAspectRatio="xMidYMid slice" clipPath="url(#intro-wolf-clip)" />
            </g>
          </svg>
        </div>

        <div className="alcateia-intro__copy">
          <span>1º Campeonato de Cross</span>
          <h1>Alcateia</h1>
          <p>Força individual. Espírito de matilha.</p>
        </div>

        <div className="alcateia-intro__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
};
