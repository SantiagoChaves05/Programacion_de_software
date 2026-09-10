import React, { useState } from 'react';
import { Heart, Sparkles, Upload, Eye, X, Check, Filter } from 'lucide-react';
import { CommunityPhoto } from '../types';

interface CommunitySectionProps {
  photos: CommunityPhoto[];
  onOpenUploadModal: () => void;
  onLikePhoto: (id: string) => void;
  onDeletePhoto?: (id: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  photos,
  onOpenUploadModal,
  onLikePhoto,
  onDeletePhoto,
}) => {
  const [filter, setFilter] = useState<'todos' | 'calido' | 'frio' | 'neutro'>('todos');
  const [activeModalPhoto, setActiveModalPhoto] = useState<CommunityPhoto | null>(null);

  const filteredPhotos = filter === 'todos'
    ? photos
    : photos.filter(p => p.undertone === filter);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#954832] dark:text-[#e5c392] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Galería en la Nube &amp; Looks Reales</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
            Comunidad @leclatbeauty
          </h2>
          <p className="text-xs sm:text-sm text-[#524346] dark:text-[#a08b8e] mt-1">
            Explora cómo lucen los tonos en pieles reales o sube dinámicamente tu propia fotografía a la nube.
          </p>
        </div>

        {/* Actions: Filter and Upload CTA */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Subtone Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#f6ebec] dark:bg-[#201519] border border-[#d7c1c4]/40 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setFilter('todos')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'todos'
                  ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                  : 'text-[#524346] dark:text-[#a08b8e]'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('calido')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'calido'
                  ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                  : 'text-[#524346] dark:text-[#a08b8e]'
              }`}
            >
              Cálido
            </button>
            <button
              onClick={() => setFilter('frio')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'frio'
                  ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                  : 'text-[#524346] dark:text-[#a08b8e]'
              }`}
            >
              Frío
            </button>
            <button
              onClick={() => setFilter('neutro')}
              className={`px-3 py-1 rounded-full transition-all ${
                filter === 'neutro'
                  ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                  : 'text-[#524346] dark:text-[#a08b8e]'
              }`}
            >
              Neutro
            </button>
          </div>

          <button
            onClick={onOpenUploadModal}
            className="px-5 py-2.5 rounded-full bg-[#4c1425] hover:bg-[#672a3b] dark:bg-[#ffd9e0] dark:hover:bg-[#ffb1c2] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Subir Mi Look a la Nube</span>
          </button>
        </div>
      </div>

      {/* Grid of Community Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActiveModalPhoto(photo)}
            className="group relative rounded-xl overflow-hidden bg-[#f6ebec] dark:bg-[#1f1519] border border-[#f0e6e7] dark:border-[#2f2026] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-black/10">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Subtone Pill */}
              <span className="absolute top-2.5 left-2.5 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                {photo.undertone === 'calido' ? 'Cálido' : photo.undertone === 'frio' ? 'Frío' : 'Neutro'}
              </span>

              {/* Like Button on Photo */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLikePhoto(photo.id);
                }}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors flex items-center gap-1 text-[11px]"
                title="Me gusta"
              >
                <Heart className={`w-3.5 h-3.5 ${photo.likedByUser ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                <span>{photo.likes}</span>
              </button>

              {/* Quick Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                <p className="font-editorial text-sm font-semibold truncate leading-tight">
                  {photo.title}
                </p>
                <p className="text-[11px] text-white/80 truncate">
                  Por {photo.author}
                </p>
                <p className="text-[10px] text-[#ffd9e0] font-medium truncate mt-0.5">
                  {photo.shadeName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Look Detail Modal */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="bg-[#fff8f8] dark:bg-[#1a1215] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-[#f0e6e7] dark:border-[#332228] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Photo */}
            <div className="md:col-span-6 bg-black flex items-center justify-center max-h-[50vh] md:max-h-full">
              <img
                src={activeModalPhoto.imageUrl}
                alt={activeModalPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Details */}
            <div className="md:col-span-6 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#954832] dark:text-[#e5c392] font-semibold">
                      Subtono {activeModalPhoto.undertone} • {activeModalPhoto.createdAt}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#4c1425] dark:text-[#ffd9e0] leading-tight mt-0.5">
                      {activeModalPhoto.title}
                    </h3>
                    <p className="text-xs text-[#524346] dark:text-[#a08b8e]">
                      Creado por <span className="font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">{activeModalPhoto.author}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveModalPhoto(null)}
                    className="p-1 rounded-full text-[#857375] hover:text-[#1f1a1b] dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Comment / Review */}
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e] mb-1">
                    Experiencia &amp; Ritual:
                  </p>
                  <p className="text-xs sm:text-sm text-[#1f1a1b] dark:text-[#d7c1c4] leading-relaxed italic bg-[#fcf1f2] dark:bg-[#201519] p-3.5 rounded-xl border border-[#f0e6e7] dark:border-[#2d1e23]">
                    "{activeModalPhoto.comment}"
                  </p>
                </div>

                {/* Products Used */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#524346] dark:text-[#a08b8e]">
                    Productos L'Éclat Utilizados:
                  </p>
                  <div className="space-y-1.5">
                    {activeModalPhoto.productsUsed?.map((prod, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-white dark:bg-[#22161b] border border-[#f0e6e7] dark:border-[#2d1f24] text-xs font-medium text-[#4c1425] dark:text-[#ffd9e0] flex items-center gap-2"
                      >
                        <Sparkles className="w-3 h-3 text-[#954832] dark:text-[#e5c392]" />
                        <span>{prod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#f0e6e7] dark:border-[#2a1d22] flex items-center justify-between">
                <button
                  onClick={() => onLikePhoto(activeModalPhoto.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f6ebec] dark:bg-[#26191e] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold"
                >
                  <Heart className={`w-4 h-4 ${activeModalPhoto.likedByUser ? 'text-red-500 fill-red-500' : ''}`} />
                  <span>{activeModalPhoto.likes} Me gusta</span>
                </button>

                {onDeletePhoto && activeModalPhoto.id.startsWith('look-') && Number(activeModalPhoto.id.replace('look-', '')) > 1000 && (
                  <button
                    onClick={() => {
                      onDeletePhoto(activeModalPhoto.id);
                      setActiveModalPhoto(null);
                    }}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Eliminar foto de la nube
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
