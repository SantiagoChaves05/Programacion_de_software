import React from 'react';

interface VibeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const VibeLogo: React.FC<VibeLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-xl tracking-tighter',
    md: 'text-2xl tracking-tighter',
    lg: 'text-4xl tracking-tighter',
  };

  return (
    <div
      id="vibe-logo-brand"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      {/* Soundwave Glowing Icon */}
      <div
        className={`relative ${iconSizes[size]} rounded-full flex items-center justify-center bg-gradient-to-tr from-[#E60026] via-[#FF2E4C] to-[#FF5E78] shadow-[0_0_18px_rgba(255,46,76,0.65)] group-hover:shadow-[0_0_24px_rgba(255,46,76,0.85)] transition-all duration-300 transform group-hover:scale-105 shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[65%] h-[65%] text-white fill-none"
        >
          {/* Wave 1 (outer) */}
          <path
            d="M 22 42 A 38 38 0 0 1 78 42"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Wave 2 (middle) */}
          <path
            d="M 32 54 A 25 25 0 0 1 68 54"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Wave 3 (inner) */}
          <path
            d="M 42 66 A 12 12 0 0 1 58 66"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 leading-none flex items-baseline font-['Inter'] ${textSizes[size]}`}
        >
          <span>VIBE</span>
          <span className="text-[#FF2E4C] text-[1.25em] leading-none ml-[1px]">.</span>
        </span>
      )}
    </div>
  );
};
