import React, { useState, useMemo } from 'react';
import { HISTORIC_CLUBS } from '../data/historicalData';
import { Club } from '../types';
import { Trophy, Shield, Search, Award, MapPin, Users, Sparkles, X } from 'lucide-react';

export const TabClubes: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>('Todas');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeClubModal, setActiveClubModal] = useState<Club | null>(null);

  const filteredClubs = useMemo(() => {
    return HISTORIC_CLUBS.filter((club) => {
      const matchesDivision =
        selectedDivision === 'Todas' || club.division === selectedDivision;
      const matchesSearch =
        club.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        club.captain.toLowerCase().includes(searchFilter.toLowerCase()) ||
        club.homeGround.toLowerCase().includes(searchFilter.toLowerCase());
      return matchesDivision && matchesSearch;
    });
  }, [selectedDivision, searchFilter]);

  return (
    <div className="w-full space-y-6">
      {/* CABECERA DE SECCIÓN */}
      <div className="border-b-2 border-vintage-gold/50 bg-[#fdfaf1] dark:bg-[#131a15] p-4 rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-grotesque text-[11px] tracking-widest text-vintage-sepia dark:text-vintage-gold uppercase font-bold mb-1">
              <Trophy className="w-3.5 h-3.5" />
              REGISTRO FEDERATIVO // ANUARIO DE CUADROS HISTÓRICOS
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-vintage-green dark:text-[#f4eedd]">
              Registro Oficial de los 42 Clubes Fundadores
            </h2>
            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1">
              Nómina de escuadras comprometidas con la hierba virgen, los taquetes reglamentarios y el juego viril sin desdoro.
            </p>
          </div>

          {/* FILTROS RÁPIDOS */}
          <div className="flex flex-wrap items-center gap-2">
            {['Todas', 'Primera de Honor', 'Cuadro Sabatino', 'Copa Fundadores'].map((div) => (
              <button
                key={div}
                type="button"
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1 text-xs font-grotesque font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  selectedDivision === div
                    ? 'bg-[#1e382b] text-[#fff9e9] border border-vintage-gold/60 shadow-sm'
                    : 'bg-[#eee8d7] dark:bg-[#202b24] text-vintage-green dark:text-[#eedfc8] hover:bg-vintage-gold/20'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        {/* BUSCADOR DE CLUB */}
        <div className="mt-4 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vintage-muted dark:text-zinc-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Buscar por club, capitán o pradera..."
            className="w-full bg-[#fffdf7] dark:bg-[#1a251e] text-xs font-serif text-vintage-ink dark:text-[#eedfc8] pl-9 pr-3 py-2 rounded-sm border border-[#dcd0be] dark:border-[#334439] focus:outline-none focus:border-vintage-gold"
          />
        </div>
      </div>

      {/* GRID DE CLUBES TRADICIONALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            id={`card-club-${club.id}`}
            onClick={() => setActiveClubModal(club)}
            className="bg-[#f9f3e2] dark:bg-[#161e18] border-2 border-[#dcd0be] dark:border-[#28372d] hover:border-vintage-gold rounded-sm p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group"
          >
            <div>
              {/* CABECERA DE TARJETA CON MONOGRAMA */}
              <div className="flex items-start justify-between gap-2 border-b border-[#dcd0be] dark:border-[#2a3a30] pb-2.5">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-sm border-2 flex items-center justify-center font-grotesque font-black text-sm text-[#fff9e9] shadow-md group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: club.badgeColor, borderColor: club.borderAccent }}
                  >
                    {club.shortCode}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-vintage-green dark:text-[#f4eedd] group-hover:text-vintage-sepia dark:group-hover:text-vintage-gold transition-colors">
                      {club.name}
                    </h3>
                    <span className="text-[10px] font-grotesque text-vintage-sepia dark:text-vintage-gold uppercase font-bold">
                      Fundado en {club.founded} • {club.division}
                    </span>
                  </div>
                </div>
              </div>

              {/* LEMA Y DETALLES */}
              <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] my-2 leading-relaxed">
                "{club.motto}"
              </p>

              <div className="space-y-1.5 text-xs font-serif pt-1">
                <div className="flex items-center gap-1.5 text-vintage-ink dark:text-[#eedfc8]">
                  <MapPin className="w-3.5 h-3.5 text-vintage-sepia dark:text-vintage-gold shrink-0" />
                  <span className="truncate">Sede: <strong>{club.homeGround}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-vintage-ink dark:text-[#eedfc8]">
                  <Users className="w-3.5 h-3.5 text-vintage-sepia dark:text-vintage-gold shrink-0" />
                  <span>Capitán: <strong>{club.captain}</strong></span>
                </div>
              </div>
            </div>

            {/* PIE DE TARJETA CON ÍNDICES */}
            <div className="border-t border-dashed border-[#dcd0be] dark:border-[#2a3a30] pt-2.5 flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-1 text-vintage-green dark:text-[#cbead7]">
                <Award className="w-3.5 h-3.5 text-vintage-gold" />
                <span>{club.titles} Coronas</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase text-vintage-aged block">JUEGO LIMPIO</span>
                <strong className="text-vintage-sepia dark:text-vintage-gold">{club.fairPlayRating} / 100</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DETALLE DE CLUB */}
      {activeClubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-[#fffdf7] dark:bg-[#151d17] border-4 border-[#1e382b] text-vintage-ink dark:text-[#eedfc8] rounded-sm p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveClubModal(null)}
              className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-[#eee8d7] text-vintage-sepia dark:text-vintage-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b-2 border-vintage-gold pb-3 mb-4">
              <div 
                className="w-14 h-14 rounded-sm border-2 flex items-center justify-center font-grotesque font-black text-lg text-white shadow"
                style={{ backgroundColor: activeClubModal.badgeColor, borderColor: activeClubModal.borderAccent }}
              >
                {activeClubModal.shortCode}
              </div>
              <div>
                <span className="text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
                  ACTA DE AFILIACIÓN Nº {activeClubModal.founded}
                </span>
                <h3 className="font-display font-black text-xl text-vintage-green dark:text-[#f4eedd]">
                  {activeClubModal.name}
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs font-serif">
              <div className="p-2.5 bg-[#f4eedd] dark:bg-[#1c2620] border border-[#dcd0be] dark:border-[#324538] rounded-sm italic">
                "{activeClubModal.motto}"
              </div>

              <p className="leading-relaxed">
                {activeClubModal.description}
              </p>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                <div className="p-2 bg-[#f9f3e2] dark:bg-[#1b251e] border border-[#dcd0be] rounded-sm">
                  <span className="text-vintage-aged block text-[9px] uppercase">DIVISIÓN:</span>
                  <strong>{activeClubModal.division}</strong>
                </div>
                <div className="p-2 bg-[#f9f3e2] dark:bg-[#1b251e] border border-[#dcd0be] rounded-sm">
                  <span className="text-vintage-aged block text-[9px] uppercase">CAMPO REGISTRADO:</span>
                  <strong>{activeClubModal.homeGround}</strong>
                </div>
                <div className="p-2 bg-[#f9f3e2] dark:bg-[#1b251e] border border-[#dcd0be] rounded-sm">
                  <span className="text-vintage-aged block text-[9px] uppercase">CAPITÁN:</span>
                  <strong>{activeClubModal.captain}</strong>
                </div>
                <div className="p-2 bg-[#f9f3e2] dark:bg-[#1b251e] border border-[#dcd0be] rounded-sm">
                  <span className="text-vintage-aged block text-[9px] uppercase">INDUMENTARIA:</span>
                  <span className="truncate block font-serif italic text-xs">{activeClubModal.kitColors}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveClubModal(null)}
                className="px-4 py-1.5 bg-[#1e382b] text-[#fff9e9] text-xs font-grotesque font-bold uppercase rounded-sm hover:bg-[#284a39]"
              >
                Volver al Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
