import { Image as ImageIcon, Link, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistCreated?: (playlistId: string) => void;
}

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
];

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onPlaylistCreated,
}) => {
  const { createCustomPlaylist } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState(PRESET_COVERS[0]);
  const [imgError, setImgError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPl = createCustomPlaylist(title.trim(), description.trim(), coverUrl);
    setTitle('');
    setDescription('');
    onClose();
    if (onPlaylistCreated) {
      onPlaylistCreated(newPl.id);
    }
  };

  return (
    <div
      id="create-playlist-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#181818] dark:bg-[#181818] light:bg-white border border-white/10 dark:border-white/10 light:border-neutral-300 rounded-xl shadow-2xl p-6 text-white dark:text-white light:text-neutral-900"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-[#1DB954]" />
          <h2 className="text-xl font-bold tracking-tight">Crear Nueva Playlist</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Live Image Preview & Link */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 rounded-md overflow-hidden bg-neutral-800 border border-white/15 shadow-md group">
                <img
                  src={coverUrl}
                  alt="Portada de playlist"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  onLoad={() => setImgError(false)}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-semibold text-white">
                  Vista Previa
                </div>
              </div>
              {imgError && (
                <p className="text-[11px] text-amber-400 mt-1 text-center">
                  Error cargando URL, usando respaldo
                </p>
              )}
            </div>

            {/* Title and Description */}
            <div className="sm:col-span-2 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#B3B3B3] mb-1">
                  Nombre de la playlist *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mi Playlist Favorita"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#242424] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B3B3B3] mb-1">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  placeholder="Añade una descripción opcional..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#242424] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1DB954] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Direct HTML / Web Image Linking */}
          <div>
            <label className="block text-xs font-semibold text-[#B3B3B3] mb-1">
              <span className="flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-[#1DB954]" />
                <span>Vincular Imagen desde URL / HTML</span>
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={coverUrl}
                onChange={e => setCoverUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-[#242424] border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>
          </div>

          {/* Preset Image Options */}
          <div>
            <label className="block text-xs font-semibold text-[#B3B3B3] mb-2 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
              <span>O elige una portada sugerida:</span>
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {PRESET_COVERS.map((url, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverUrl(url)}
                  className={`relative w-12 h-12 rounded-sm overflow-hidden shrink-0 border-2 transition-transform hover:scale-105 ${
                    coverUrl === url ? 'border-[#1DB954] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-6 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold transition-all disabled:opacity-40"
            >
              Guardar Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
