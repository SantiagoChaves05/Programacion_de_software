import { Activity, Disc, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';

export const LyricsModal: React.FC = () => {
  const { currentTrack, currentTime, isLyricsOpen, toggleLyrics, isPlaying } = usePlayer();
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  const lyrics = currentTrack?.lyrics || [
    { time: 0, text: 'Disfrutando la atmósfera sonora...' },
    { time: 10, text: 'Sintiendo cada detalle y frecuencia en alta fidelidad.' },
    { time: 25, text: 'VIBE Obsidian Sonic Master Audio.' },
    { time: 45, text: 'Música en estado puro sin compresión.' },
  ];

  // Find active line index
  let activeIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    }
  }

  // Scroll active line into center
  useEffect(() => {
    if (!isLyricsOpen) return;
    const activeEl = document.getElementById(`lyric-line-${activeIndex}`);
    if (activeEl && lyricsContainerRef.current) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex, isLyricsOpen]);

  if (!isLyricsOpen || !currentTrack) return null;

  return (
    <div
      id="lyrics-view-overlay"
      className="fixed inset-0 z-50 bg-[#131313]/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FF2E4C 0%, #1DB954 60%, transparent 80%)',
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-sm object-cover shadow-md"
          />
          <div>
            <h2 className="font-bold text-white text-base leading-tight truncate max-w-xs md:max-w-md">
              {currentTrack.title}
            </h2>
            <p className="text-xs text-[#B3B3B3] truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-white">
            <Activity className="w-3.5 h-3.5 text-[#1DB954] animate-pulse" />
            <span>Hi-Fi 96kHz Sincronizado</span>
          </div>
          <button
            onClick={toggleLyrics}
            aria-label="Cerrar letras"
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Synchronized Lyrics Container */}
      <div
        ref={lyricsContainerRef}
        className="relative z-10 flex-1 overflow-y-auto px-6 py-12 max-w-3xl mx-auto w-full space-y-8 text-center sm:text-left scroll-smooth"
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1DB954] mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Letras en tiempo real</span>
        </div>

        {lyrics.map((line, idx) => {
          const isCurrent = idx === activeIndex;
          const isPassed = idx < activeIndex;

          return (
            <p
              id={`lyric-line-${idx}`}
              key={idx}
              className={`transition-all duration-300 cursor-pointer font-bold leading-relaxed tracking-tight ${
                isCurrent
                  ? 'text-white text-2xl sm:text-4xl scale-[1.02] sm:translate-x-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : isPassed
                  ? 'text-neutral-500 text-lg sm:text-2xl hover:text-neutral-300'
                  : 'text-neutral-600 text-lg sm:text-2xl hover:text-neutral-400'
              }`}
            >
              {line.text}
            </p>
          );
        })}

        {/* Audio frequency wave visualizer */}
        <div className="pt-16 pb-8 flex items-center justify-center gap-1.5 opacity-70">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t from-[#1DB954] to-[#FF2E4C] transition-all duration-150 ${
                isPlaying ? 'animate-pulse' : 'h-2'
              }`}
              style={{
                height: isPlaying ? `${Math.max(6, Math.sin(i + currentTime * 3) * 36 + 20)}px` : '4px',
                animationDelay: `${(i % 5) * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
