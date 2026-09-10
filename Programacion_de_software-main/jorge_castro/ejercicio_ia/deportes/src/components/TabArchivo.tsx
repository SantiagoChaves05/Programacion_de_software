import React, { useState } from 'react';
import { ARCHIVE_DOCUMENTS } from '../data/historicalData';
import { ArchiveDocument } from '../types';
import { History, FileText, Radio, Stamp, Award, BookOpen, X, Printer } from 'lucide-react';
import { OFFICIAL_BADGE_URL } from '../data/historicalData';

export const TabArchivo: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<ArchiveDocument | null>(null);
  const [filterType, setFilterType] = useState<string>('Todos');

  const types = ['Todos', 'Acta Federativa', 'Despacho Telegráfico', 'Pliego Conmemorativo', 'Crónica de Prensa'];

  const filteredDocs = ARCHIVE_DOCUMENTS.filter(
    (d) => filterType === 'Todos' || d.type === filterType
  );

  return (
    <div className="w-full space-y-6">
      {/* CABECERA DEL ARCHIVO */}
      <div className="border-b-2 border-vintage-gold/50 bg-[#fdfaf1] dark:bg-[#131a15] p-4 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-grotesque text-[11px] tracking-widest text-vintage-sepia dark:text-vintage-gold uppercase font-bold mb-1">
              <History className="w-3.5 h-3.5" />
              HEMEROTECA & REGISTROS // EPISODIOS 1924 - 1960
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-vintage-green dark:text-[#f4eedd]">
              El Archivo Histórico de la Asociación
            </h2>
            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1 max-w-2xl">
              Despachos telegráficos de victorias memorables, pliegos gremiales de guarnicionería y actas fundacionales conservadas bajo atmósfera libre de humedad.
            </p>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap items-center gap-1.5">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  filterType === t
                    ? 'bg-[#1e382b] text-[#fff9e9] border border-vintage-gold/60 shadow-sm'
                    : 'bg-[#eee8d7] dark:bg-[#202b24] text-vintage-green dark:text-[#eedfc8] hover:bg-vintage-gold/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LISTADO DE DOCUMENTOS EN ESTILO PRENSA HISTÓRICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            id={`archive-item-${doc.id}`}
            className="bg-[#f9f3e2] dark:bg-[#161e18] border-2 border-[#dcd0be] dark:border-[#28372d] hover:border-vintage-gold rounded-sm p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-vintage-gold/30 pb-2">
                <span className="text-[10px] font-mono text-vintage-sepia dark:text-vintage-gold uppercase font-bold">
                  {doc.vol} • AÑO {doc.year}
                </span>
                <span className="text-[9px] font-grotesque uppercase px-1.5 py-0.5 rounded-xs bg-[#eee8d7] dark:bg-[#223027] text-vintage-green dark:text-[#cbead7] font-bold border border-[#dcd0be] dark:border-[#384c3e]">
                  {doc.type}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-vintage-green dark:text-[#f4eedd] leading-snug">
                {doc.title}
              </h3>

              <p className="font-serif text-xs text-vintage-muted dark:text-[#b0cdbb] leading-relaxed">
                {doc.summary}
              </p>

              <div className="text-[11px] font-serif italic text-vintage-sepia dark:text-vintage-gold pt-1">
                Autor: {doc.author}
              </div>
            </div>

            <div className="border-t border-dashed border-[#dcd0be] dark:border-[#28372d] pt-3 flex items-center justify-between">
              <span className="text-[10px] font-mono text-vintage-aged">
                DOCUMENTO PRESERVADO
              </span>
              <button
                type="button"
                onClick={() => setSelectedDoc(doc)}
                className="px-3.5 py-1.5 bg-[#7c4a27] hover:bg-[#633b1f] text-[#fff9e9] text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-vintage-gold" />
                Desplegar Manuscrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL LECTOR DE MANUSCRITO */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-xl bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#7c4a27] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] text-vintage-sepia dark:text-vintage-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-vintage-gold pb-3 mb-4 space-y-1">
              <span className="text-[10px] font-mono text-vintage-sepia dark:text-vintage-gold uppercase font-bold">
                {selectedDoc.vol} • {selectedDoc.type} • {selectedDoc.year}
              </span>
              <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
                {selectedDoc.title}
              </h3>
              <p className="text-xs font-serif italic text-vintage-muted dark:text-[#b0cdbb]">
                Redactado por: {selectedDoc.author}
              </p>
            </div>

            {/* TRANSCRIPCIÓN LITERAL */}
            <div className="border-2 border-dashed border-[#7c4a27]/50 bg-[#fdfaf1] dark:bg-[#1c2620] p-5 rounded-sm shadow-inner space-y-3 font-serif text-sm leading-relaxed">
              <p className="first-letter:text-3xl first-letter:font-display first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-vintage-sepia dark:first-letter:text-vintage-gold">
                {selectedDoc.fullContent}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 border border-vintage-sepia text-xs font-grotesque font-bold uppercase rounded-sm flex items-center gap-1.5 hover:bg-[#eee8d7]"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Copia
              </button>

              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-1.5 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#284a39]"
              >
                Cerrar Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
