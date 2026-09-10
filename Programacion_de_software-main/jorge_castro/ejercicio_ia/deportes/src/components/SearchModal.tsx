import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, Trophy, Sparkles, History, ArrowRight } from 'lucide-react';
import { HISTORIC_CLUBS, HISTORIC_GROUNDS, HISTORIC_RULES, ARCHIVE_DOCUMENTS } from '../data/historicalData';
import { TabType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  initialQuery?: string;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  initialQuery = '',
  onClose,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { clubs: [], grounds: [], rules: [], archives: [] };
    }

    const clubs = HISTORIC_CLUBS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.captain.toLowerCase().includes(q) ||
        c.motto.toLowerCase().includes(q) ||
        c.homeGround.toLowerCase().includes(q)
    );

    const grounds = HISTORIC_GROUNDS.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.grassType.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q)
    );

    const rules = HISTORIC_RULES.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );

    const archives = ARCHIVE_DOCUMENTS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.fullContent.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
    );

    return { clubs, grounds, rules, archives };
  }, [query]);

  const totalResults =
    results.clubs.length + results.grounds.length + results.rules.length + results.archives.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div 
        id="search-modal-container"
        className="w-full max-w-2xl bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#7c4a27] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative max-h-[85vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] dark:hover:bg-[#28372d] text-vintage-sepia dark:text-vintage-gold transition-colors"
          aria-label="Cerrar búsqueda"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b-2 border-vintage-gold pb-3 mb-4">
          <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> ÍNDICE GENERAL // ARCHIVO HISTÓRICO 1924-1960
          </span>
          <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
            Consulta en las Actas y Crónicas
          </h3>
        </div>

        {/* INPUT DE BÚSQUEDA */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vintage-muted dark:text-zinc-400 w-4 h-4" />
          <input
            id="modal-search-input"
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por club, cancha, césped, regla, capitán o crónica..."
            className="w-full bg-[#f4eedd] dark:bg-[#1f2a22] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] pl-9 pr-3 py-2.5 rounded-sm border-2 border-[#dcd0be] dark:border-[#384c3e] focus:outline-none focus:border-vintage-gold shadow-inner"
          />
        </div>

        {/* LISTADO DE RESULTADOS CON SCROLL */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-vintage-muted dark:text-[#b0cdbb] font-serif italic text-xs">
              Escriba una palabra clave (ej. "Bermuda", "Pradera", "Doce Paños", "Rodillo", "Caballeros") para consultar los anales de la Football Association.
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-vintage-sepia dark:text-vintage-gold font-serif italic text-xs">
              No se hallaron registros bajo "{query}" en los folios de 1924. Pruebe con términos botánicos o nombres de clubes.
            </div>
          ) : (
            <div className="space-y-4">
              {/* CLUBES */}
              {results.clubs.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] border-b border-vintage-gold/30 pb-1">
                    <Trophy className="w-3.5 h-3.5" /> Clubes Encontrados ({results.clubs.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.clubs.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onNavigateTab('clubes');
                          onClose();
                        }}
                        className="bg-[#f9f3e2] dark:bg-[#1a241d] p-2.5 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm hover:border-vintage-gold cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="font-display text-xs text-vintage-green dark:text-[#f4eedd]">
                            {c.name}
                          </strong>
                          <span className="text-[10px] font-mono text-vintage-sepia dark:text-vintage-gold font-bold">
                            {c.shortCode}
                          </span>
                        </div>
                        <p className="font-serif italic text-[10px] text-vintage-muted dark:text-[#b0cdbb] mt-0.5 line-clamp-1">
                          "{c.motto}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REGLAS */}
              {results.rules.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] border-b border-vintage-gold/30 pb-1">
                    <BookOpen className="w-3.5 h-3.5" /> Artículos del Reglamento ({results.rules.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.rules.map((r) => (
                      <div
                        key={r.number}
                        onClick={() => {
                          onNavigateTab('reglamento');
                          onClose();
                        }}
                        className="bg-[#f9f3e2] dark:bg-[#1a241d] p-2.5 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm hover:border-vintage-gold cursor-pointer transition-colors"
                      >
                        <strong className="block font-display text-xs text-vintage-green dark:text-[#f4eedd]">
                          Artículo {r.number}: {r.title}
                        </strong>
                        <p className="font-serif text-[11px] text-vintage-muted dark:text-[#b0cdbb] mt-0.5 line-clamp-2">
                          {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CAMPOS */}
              {results.grounds.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] border-b border-vintage-gold/30 pb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Campos y Praderas ({results.grounds.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.grounds.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          onNavigateTab('campos');
                          onClose();
                        }}
                        className="bg-[#f9f3e2] dark:bg-[#1a241d] p-2.5 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm hover:border-vintage-gold cursor-pointer transition-colors"
                      >
                        <strong className="block font-display text-xs text-vintage-green dark:text-[#f4eedd]">
                          {g.name}
                        </strong>
                        <p className="font-mono text-[10px] text-vintage-sepia dark:text-vintage-gold">
                          🌾 {g.grassType} • {g.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ARCHIVOS */}
              {results.archives.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-grotesque font-bold uppercase tracking-wider text-vintage-green dark:text-[#cbead7] border-b border-vintage-gold/30 pb-1">
                    <History className="w-3.5 h-3.5" /> Archivos & Despachos ({results.archives.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.archives.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onNavigateTab('archivo');
                          onClose();
                        }}
                        className="bg-[#f9f3e2] dark:bg-[#1a241d] p-2.5 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm hover:border-vintage-gold cursor-pointer transition-colors"
                      >
                        <strong className="block font-display text-xs text-vintage-green dark:text-[#f4eedd]">
                          {a.title} ({a.year})
                        </strong>
                        <p className="font-serif italic text-[11px] text-vintage-muted dark:text-[#b0cdbb] mt-0.5 line-clamp-2">
                          {a.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
