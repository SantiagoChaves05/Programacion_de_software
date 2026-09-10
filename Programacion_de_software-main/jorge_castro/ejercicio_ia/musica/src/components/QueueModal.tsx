import { ListMusic, Play, Trash2, X } from 'lucide-react';
import React from 'react';
import { usePlayer } from '../context/PlayerContext';

export const QueueModal: React.FC = () => {
  const { queue, currentTrack, isQueueOpen, toggleQueue, playTrack } = usePlayer();

  if (!isQueueOpen) return null;

  return (
    <div
      id="queue-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={toggleQueue}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#181818] border-l border-white/10 p-5 flex flex-col shadow-2xl text-white overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-[#1DB954]" />
            <h2 className="font-bold text-lg">Cola de Reproducción</h2>
          </div>
          <button
            onClick={toggleQueue}
            aria-label="Cerrar cola"
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current track section */}
        {currentTrack && (
          <div className="mb-5">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#B3B3B3] mb-2">
              Reproduciendo Ahora
            </h3>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/10 border border-[#1DB954]/30">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-sm object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm text-[#1DB954] truncate">{currentTrack.title}</p>
                <p className="text-xs text-[#B3B3B3] truncate">{currentTrack.artist}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next up */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          <h3 className="text-xs uppercase font-bold tracking-wider text-[#B3B3B3] mb-2">
            A continuación ({queue.length} canciones)
          </h3>
          {queue.map((track, idx) => {
            const isCurrent = track.id === currentTrack?.id;
            return (
              <div
                key={`${track.id}-${idx}`}
                onClick={() => playTrack(track)}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                  isCurrent ? 'bg-white/5 border-l-2 border-[#1DB954]' : 'hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-xs text-neutral-500 w-4 text-center tabular-nums">
                    {idx + 1}
                  </span>
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-9 h-9 rounded-xs object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-medium truncate ${
                        isCurrent ? 'text-[#1DB954]' : 'text-white'
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="text-[11px] text-[#B3B3B3] truncate">{track.artist}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
