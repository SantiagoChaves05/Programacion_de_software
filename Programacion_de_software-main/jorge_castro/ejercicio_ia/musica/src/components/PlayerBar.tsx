import {
  Heart,
  ListMusic,
  Maximize2,
  Mic2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';

export const PlayerBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    togglePlay,
    playNext,
    playPrev,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLyrics,
    toggleQueue,
    isLyricsOpen,
    isQueueOpen,
  } = usePlayer();

  const { isTrackLiked, toggleLikeTrack } = useAuth();
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);

  if (!currentTrack) return null;

  const isLiked = isTrackLiked(currentTrack.id);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentDisplayTime = isScrubbing ? scrubValue : currentTime;
  const progressPercent = duration > 0 ? (currentDisplayTime / duration) * 100 : 0;

  return (
    <footer
      id="bottom-player-dock"
      aria-label="Reproductor de audio"
      className="fixed bottom-0 md:bottom-0 left-0 right-0 z-30 h-20 md:h-[90px] bg-black/95 dark:bg-black/95 light:bg-neutral-900 border-t border-white/10 px-3 sm:px-6 flex items-center justify-between text-white select-none backdrop-blur-xl mb-[52px] md:mb-0"
    >
      {/* 1. Left: Track Meta & Cover */}
      <div className="flex items-center gap-3 w-1/4 min-w-[140px] max-w-[280px]">
        <div className="relative group shrink-0">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-12 h-12 md:w-14 md:h-14 rounded-sm object-cover shadow-md"
            onError={e => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm font-semibold truncate leading-tight hover:underline cursor-pointer">
            {currentTrack.title}
          </p>
          <p className="text-[11px] md:text-xs text-[#B3B3B3] truncate leading-tight mt-0.5 hover:underline cursor-pointer">
            {currentTrack.artist}
          </p>
        </div>

        <button
          id="player-fav-btn"
          onClick={() => toggleLikeTrack(currentTrack.id)}
          aria-label={isLiked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
              isLiked ? 'fill-[#FF2E4C] text-[#FF2E4C] scale-110' : 'hover:scale-110'
            }`}
          />
        </button>
      </div>

      {/* 2. Center: Transport & Progress Scrubber */}
      <div className="flex flex-col items-center max-w-xl w-2/4 px-2">
        {/* Buttons */}
        <div className="flex items-center gap-3 sm:gap-5 mb-1.5">
          {/* Shuffle */}
          <button
            id="player-shuffle-btn"
            onClick={toggleShuffle}
            aria-label="Modo aleatorio"
            className={`transition-colors hidden sm:block ${
              isShuffled ? 'text-[#1DB954]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Previous */}
          <button
            id="player-prev-btn"
            onClick={playPrev}
            aria-label="Pista anterior"
            className="text-neutral-300 hover:text-white transition-transform active:scale-95"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Play / Pause Main Button */}
          <button
            id="player-play-pause-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar reproducción' : 'Iniciar reproducción'}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white hover:bg-[#1ed760] hover:scale-105 active:scale-95 text-black flex items-center justify-center transition-all duration-150 shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            id="player-next-btn"
            onClick={playNext}
            aria-label="Siguiente pista"
            className="text-neutral-300 hover:text-white transition-transform active:scale-95"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Repeat */}
          <button
            id="player-repeat-btn"
            onClick={toggleRepeat}
            aria-label="Modo repetición"
            className={`transition-colors hidden sm:block ${
              repeatMode !== 'off' ? 'text-[#1DB954]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {repeatMode === 'one' ? (
              <Repeat1 className="w-4 h-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Progress Bar & Timestamps */}
        <div className="w-full flex items-center gap-2">
          <span className="tabular-nums text-[11px] text-[#B3B3B3] w-9 text-right hidden sm:inline">
            {formatTime(currentDisplayTime)}
          </span>

          {/* Scrubber slider track */}
          <div className="relative flex-1 py-1 group cursor-pointer">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentDisplayTime}
              onMouseDown={() => setIsScrubbing(true)}
              onTouchStart={() => setIsScrubbing(true)}
              onChange={e => setScrubValue(parseFloat(e.target.value))}
              onMouseUp={e => {
                setIsScrubbing(false);
                seekTo(parseFloat((e.target as HTMLInputElement).value));
              }}
              onTouchEnd={e => {
                setIsScrubbing(false);
                seekTo(parseFloat((e.target as HTMLInputElement).value));
              }}
              aria-label="Línea de tiempo de la canción"
              className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
            />
            {/* Background track */}
            <div className="w-full h-1 bg-[#4D4D4D] rounded-full overflow-hidden group-hover:h-1.5 transition-all">
              <div
                className="h-full bg-white group-hover:bg-[#1DB954] transition-colors rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <span className="tabular-nums text-[11px] text-[#B3B3B3] w-9 hidden sm:inline">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* 3. Right: Lyrics, Queue, Volume */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[120px]">
        {/* Synchronized Lyrics */}
        <button
          id="player-lyrics-btn"
          onClick={toggleLyrics}
          title="Letras en tiempo real"
          aria-label="Ver letras en tiempo real"
          className={`p-1.5 rounded-full transition-colors ${
            isLyricsOpen ? 'text-[#FF2E4C] bg-white/10' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Mic2 className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Queue */}
        <button
          id="player-queue-btn"
          onClick={toggleQueue}
          title="Cola de reproducción"
          aria-label="Abrir cola de reproducción"
          className={`p-1.5 rounded-full transition-colors hidden sm:block ${
            isQueueOpen ? 'text-[#1DB954] bg-white/10' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ListMusic className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Volume Controls (desktop) */}
        <div className="hidden lg:flex items-center gap-2 group w-28">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <div className="relative flex-1 py-1">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              aria-label="Control de volumen"
              className="w-full h-1 bg-[#4D4D4D] accent-[#1DB954] rounded-full cursor-pointer hover:accent-[#1ed760]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
