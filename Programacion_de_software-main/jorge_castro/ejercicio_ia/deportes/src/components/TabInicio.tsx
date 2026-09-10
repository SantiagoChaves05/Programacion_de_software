import React, { useState } from 'react';
import { 
  PITCH_PHOTO_URL, 
  UPCOMING_FIXTURES 
} from '../data/historicalData';
import { MatchFixture, TabType } from '../types';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Ruler, 
  Edit3, 
  Ticket as TicketIcon, 
  Sparkles, 
  Trophy, 
  Award, 
  BookOpen, 
  Send,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface TabInicioProps {
  onOpenInscribe: () => void;
  onOpenPlan: () => void;
  onOpenTicket: (fixture: MatchFixture) => void;
  onOpenLetter: () => void;
  onOpenMembership: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const TabInicio: React.FC<TabInicioProps> = ({
  onOpenInscribe,
  onOpenPlan,
  onOpenTicket,
  onOpenLetter,
  onOpenMembership,
  onNavigateTab,
}) => {
  const [radioActive, setRadioActive] = useState(false);
  const [radioTicker, setRadioTicker] = useState<string>('Transmisión telegráfica en sintonía: señal nítida desde el talud central.');
  const [bootManualExpanded, setBootManualExpanded] = useState(false);

  // Sintetizador Web Audio API de sonido retro telegrafía / radiocrónica
  const toggleRadio = () => {
    if (!radioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(640, ctx.currentTime);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();

          // Secuencia corta de pitidos telegráficos Morse
          setTimeout(() => {
            gain.gain.setValueAtTime(0, ctx.currentTime);
            osc.stop();
          }, 350);
        }
      } catch (err) {
        console.warn('Audio contextual no disponible', err);
      }
      setRadioActive(true);
      setRadioTicker('MIN 71: ¡Disparo rasante de Mateo Rivas! El balón patina sobre la hierba húmeda y roza el madero.');
    } else {
      setRadioActive(false);
      setRadioTicker('Receptor en silencio. Despachos grabados en cinta de papel.');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* ========================================================================= */}
      {/* BANNER INTRODUCTORIO DE LA GACETA (TITULAR DE PORTADA) */}
      {/* ========================================================================= */}
      <div className="w-full border-b border-[#dcd0be] dark:border-[#243329] bg-[#fdfaf1] dark:bg-[#131a15] py-4 rounded-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-3 border-[#e5dcce] dark:border-[#26352b]">
            <div>
              <div className="inline-flex items-center gap-1.5 font-grotesque text-[11px] tracking-widest text-vintage-sepia dark:text-vintage-gold uppercase font-bold mb-1">
                <span className="w-2 h-2 rounded-sm bg-vintage-gold" />
                Crónica de la Liga Tradicional // Boletín Extraordinario
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight text-vintage-green dark:text-[#f4eedd] leading-none">
                ALMANAQUE DE FOOTBALL & CÉSPED NATURAL
              </h1>
              <p className="font-serif italic text-sm text-vintage-muted dark:text-[#b0cdbb] mt-1.5 max-w-2xl">
                Compendio de competiciones dominicales sobre praderas cuidadas al estilo clásico inglés, balones cosidos a mano y código de caballeros.
              </p>
            </div>

            {/* PASTILLA CON DATOS TABULARES RETRO */}
            <div className="flex items-center gap-3 bg-[#f4eedd] dark:bg-[#1a231d] border-2 border-[#dcd0be] dark:border-[#2b3a30] px-3.5 py-2 rounded-sm shadow-inner shrink-0">
              <div className="text-center px-1">
                <span className="block font-grotesque font-bold text-sm text-vintage-green dark:text-[#b0cdbb]">
                  100%
                </span>
                <span className="block text-[9px] font-grotesque uppercase text-vintage-muted dark:text-zinc-400">
                  Grama Viva
                </span>
              </div>
              <span className="text-vintage-aged dark:text-zinc-600">/</span>
              <div className="text-center px-1">
                <span className="block font-grotesque font-bold text-sm text-vintage-sepia dark:text-vintage-gold">
                  42
                </span>
                <span className="block text-[9px] font-grotesque uppercase text-vintage-muted dark:text-zinc-400">
                  Cuadros Oficiales
                </span>
              </div>
              <span className="text-vintage-aged dark:text-zinc-600">/</span>
              <div className="text-center px-1">
                <span className="block font-grotesque font-bold text-sm text-vintage-terracotta dark:text-[#ffdad2]">
                  12.8K
                </span>
                <span className="block text-[9px] font-grotesque uppercase text-vintage-muted dark:text-zinc-400">
                  Socios de Honor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CUERPO PRINCIPAL: 3 COLUMNAS HISTÓRICAS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* ===================================================================== */}
        {/* CUERPO 1: TORNEO CENTRAL / COPA CÉSPED NATURAL 1924 */}
        {/* ===================================================================== */}
        <section 
          id="section-copa-fundadores"
          className="bg-[#f9f3e2] dark:bg-[#161e18] border-2 border-[#dcd0be] dark:border-[#28372d] rounded-sm p-4 shadow-md flex flex-col gap-4 relative"
        >
          {/* Detalle de esquina vintage */}
          <div className="absolute top-2 right-2 text-[10px] font-serif italic text-vintage-aged dark:text-zinc-500">
            Vol. XXIV
          </div>

          <div className="border-b-2 border-vintage-green/20 dark:border-[#b0cdbb]/20 pb-2">
            <div className="flex items-center gap-1.5 text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
              <Trophy className="w-3.5 h-3.5 text-vintage-gold" />
              C-01 // COPA FUNDADORES DE 1924
            </div>
            <h2 className="font-display font-bold text-xl text-vintage-green dark:text-[#f4eedd] mt-0.5">
              COPA CÉSPED NATURAL 1924
            </h2>
            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1">
              Certamen tradicional a once jugadores sobre pasto rey trillado con rodillo de fundición y trazado con cal viva de mina.
            </p>
          </div>

          {/* TARJETA CON LA IMAGEN VINTAGE DE LA CANCHA */}
          <div className="border-2 border-[#dcd0be] dark:border-[#314337] bg-[#fffdf7] dark:bg-[#1b251e] p-2.5 rounded-sm space-y-2.5 shadow-sm">
            <div className="relative overflow-hidden border border-[#dcd0be] dark:border-[#3a4f41] rounded-sm bg-black group">
              <img
                src={PITCH_PHOTO_URL}
                alt="Cancha histórica de césped con portería clásica y sol del atardecer"
                className="w-full h-44 object-cover sepia-photo transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-[#1e382b]/90 text-[#fff9e9] border border-vintage-gold/50 px-2 py-0.5 text-[10px] font-grotesque font-bold uppercase tracking-wider backdrop-blur-xs">
                GRAMA BERMUDA PURA • 1924
              </div>
              <div className="absolute bottom-2 right-2 bg-[#fff9e9]/95 dark:bg-[#101512]/95 text-vintage-ink dark:text-vintage-gold border border-vintage-sepia/30 px-2 py-0.5 text-[10px] font-grotesque font-bold tracking-tight">
                ESTADIO VALLE CENTRAL
              </div>
            </div>

            {/* Epígrafe y Datos del Torneo */}
            <div className="space-y-1">
              <h3 className="font-display font-bold text-sm text-vintage-green dark:text-[#f4eedd] leading-snug">
                Gran Apertura en el Campo Histórico de los Olmos
              </h3>
              <p className="font-serif text-xs text-vintage-muted dark:text-[#b0cdbb] leading-relaxed">
                Cancha regada al amanecer con agua de manantial. Terreno nivelado con pendiente natural para desagüe pluvial sin drenajes plásticos.
              </p>
            </div>

            {/* Ficha de Inscripción Antigua */}
            <div className="border-t border-dashed border-[#dcd0be] dark:border-[#314337] pt-2 flex items-center justify-between text-[11px] font-grotesque">
              <div>
                <span className="text-vintage-aged dark:text-zinc-400 block text-[9px] uppercase">
                  FECHA SEÑALADA
                </span>
                <strong className="text-vintage-sepia dark:text-vintage-gold">SÁBADO 12 DE ABRIL</strong>
              </div>
              <div className="text-right">
                <span className="text-vintage-aged dark:text-zinc-400 block text-[9px] uppercase">
                  CUADROS DISPONIBLES
                </span>
                <strong className="text-vintage-green dark:text-[#cbead7]">14 / 24 CLUBES</strong>
              </div>
            </div>

            {/* Botones de Acción Clásicos */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="btn-inscribir-once"
                type="button"
                onClick={onOpenInscribe}
                className="py-1.5 px-2 bg-[#1e382b] hover:bg-[#284a39] text-[#fff9e9] border border-vintage-gold/40 text-[11px] font-grotesque font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[1px_1px_0px_#082217] cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-vintage-gold" />
                Inscribir Once
              </button>
              <button
                id="btn-ver-el-plano"
                type="button"
                onClick={onOpenPlan}
                className="py-1.5 px-2 bg-[#eee8d7] dark:bg-[#243128] hover:bg-[#e4dcce] dark:hover:bg-[#2e3e34] text-vintage-ink dark:text-[#eedfc8] border border-[#c5baaa] dark:border-[#3a4f41] text-[11px] font-grotesque font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-vintage-sepia dark:text-vintage-gold" />
                Ver el Plano
              </button>
            </div>
          </div>

          {/* LISTA DE ENCUENTROS DE CALENDARIO RETRO */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-grotesque font-bold uppercase tracking-wider text-vintage-muted dark:text-zinc-400">
              EMPAREJAMIENTOS DE LA SEMANA // FECHA 01
            </div>

            <div className="bg-[#fffdf7] dark:bg-[#1b251e] p-2 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-sm border border-vintage-gold bg-[#eee8d7] dark:bg-[#26352c] text-vintage-green dark:text-vintage-gold font-grotesque font-black text-xs flex items-center justify-center shrink-0">
                  DH
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-xs text-vintage-ink dark:text-[#f4eedd] truncate">
                    Deportivo Humus vs Atlético Raíces
                  </p>
                  <p className="font-serif text-[10px] italic text-vintage-muted dark:text-[#b0cdbb]">
                    Pradera Norte • 10:30 hs
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-grotesque font-bold text-vintage-sepia dark:text-vintage-gold bg-[#eee8d7] dark:bg-[#28362d] px-1.5 py-0.5 border border-[#dcd0be] dark:border-[#3a4d40] shrink-0">
                TABLA A
              </span>
            </div>

            <div className="bg-[#fffdf7] dark:bg-[#1b251e] p-2 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-sm border border-vintage-terracotta bg-[#eee8d7] dark:bg-[#26352c] text-vintage-terracotta font-grotesque font-black text-xs flex items-center justify-center shrink-0">
                  VB
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-xs text-vintage-ink dark:text-[#f4eedd] truncate">
                    Valle F.C. vs Bosque United
                  </p>
                  <p className="font-serif text-[10px] italic text-vintage-muted dark:text-[#b0cdbb]">
                    Cancha El Roble • 16:00 hs
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-grotesque font-bold text-vintage-sepia dark:text-vintage-gold bg-[#eee8d7] dark:bg-[#28362d] px-1.5 py-0.5 border border-[#dcd0be] dark:border-[#3a4d40] shrink-0">
                TABLA B
              </span>
            </div>
          </div>

          <div className="pt-1 text-center">
            <button
              id="link-examina-partidas"
              type="button"
              onClick={() => onNavigateTab('archivo')}
              className="font-serif italic text-xs text-vintage-sepia dark:text-vintage-gold hover:underline inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              Examinar el rol completo de partidas históricas →
            </button>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* CUERPO 2: EL ENCUENTRO DE LA JORNADA / TELÉGRAFO & RADIODIFUSIÓN */}
        {/* ===================================================================== */}
        <section 
          id="section-partido-fecha"
          className="bg-[#f9f3e2] dark:bg-[#161e18] border-2 border-[#dcd0be] dark:border-[#28372d] rounded-sm p-4 shadow-md flex flex-col gap-4 relative"
        >
          <div className="border-b-2 border-vintage-sepia/30 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-terracotta dark:text-[#ffb4a2]">
                <Radio className="w-3.5 h-3.5" />
                C-02 // TRANSMISIÓN POR TELÉGRAFO
              </div>
              <span className="text-[9px] font-grotesque font-bold bg-[#862912] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> AL AIRE
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-vintage-green dark:text-[#f4eedd] mt-0.5">
              PARTIDO DE LA FECHA
            </h2>
            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1">
              Despacho en directo de los 90 minutos de brega campestre entre dos escuadras pioneras.
            </p>
          </div>

          {/* PIZARRA / TABLERO DE RESULTADOS DE ÉPOCA */}
          <div className="border-4 border-[#3a281c] bg-[#1a201b] text-[#f4eedd] p-3 rounded-sm shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-grotesque tracking-widest text-vintage-gold border-b border-[#2c382f] pb-1.5">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-vintage-gold" /> ONDA CORTA 720 KHZ
              </span>
              <span className="bg-[#2a382e] text-[#f4eedd] px-1.5 py-0.5 rounded-sm border border-[#3e5344] flex items-center gap-1 font-mono">
                MINUTO 68'
              </span>
            </div>

            {/* MARCADOR CON TABLILLAS CLÁSICAS */}
            <div className="grid grid-cols-7 items-center gap-1 py-2">
              {/* Equipo Local */}
              <div className="col-span-3 text-center space-y-1">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#27352b] border-2 border-vintage-gold flex items-center justify-center font-grotesque font-black text-sm text-vintage-gold shadow-md">
                  CAP
                </div>
                <h4 className="font-display font-bold text-xs text-[#fff9e9] leading-tight">
                  C.A. PRADERA
                </h4>
                <p className="text-[10px] font-mono text-zinc-400">1° en Tabla</p>
              </div>

              {/* Tanteador Central */}
              <div className="col-span-1 text-center">
                <div className="scoreboard-chalk bg-[#0e1310] border-2 border-[#4b3c2c] py-1 px-1 rounded text-2xl lg:text-3xl font-bold text-[#fffdf7] tracking-tighter shadow-inner">
                  2:1
                </div>
                <span className="block text-[8px] font-grotesque text-vintage-gold uppercase mt-1">
                  2° TIEMPO
                </span>
              </div>

              {/* Equipo Visitante */}
              <div className="col-span-3 text-center space-y-1">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#27352b] border-2 border-vintage-terracotta flex items-center justify-center font-grotesque font-black text-sm text-[#ffb4a2] shadow-md">
                  DPS
                </div>
                <h4 className="font-display font-bold text-xs text-[#fff9e9] leading-tight">
                  DEP. SIERRA
                </h4>
                <p className="text-[10px] font-mono text-zinc-400">2° en Tabla</p>
              </div>
            </div>

            {/* BOLETÍN METEOROLÓGICO Y CONDICIONES DEL SUELO */}
            <div className="bg-[#121714] border border-[#2e3d32] p-2 rounded text-[10px] font-mono text-zinc-300 space-y-1.5">
              <div className="flex justify-between text-vintage-gold font-bold">
                <span>🌾 HUMEDAD GRAMA: 84%</span>
                <span>🌡️ TEMP: 21°C</span>
                <span>⚖️ TRACCIÓN: FIRME</span>
              </div>
              <div className="w-full bg-[#263329] h-1.5 rounded-full overflow-hidden flex">
                <div className="bg-vintage-gold h-full" style={{ width: '60%' }} />
                <div className="bg-vintage-terracotta h-full" style={{ width: '40%' }} />
              </div>
              <p className="text-[9px] text-zinc-400 italic text-center pt-0.5">
                "Terreno pesado en el círculo central por las lluvias matutinas de mayo."
              </p>
            </div>

            {/* TICKER DE TRANSMISIÓN TELEGRÁFICA */}
            {radioActive && (
              <div className="p-2 bg-[#0c1811] border border-vintage-gold/40 rounded text-[10px] font-mono text-emerald-300 space-y-0.5 animate-pulse">
                <div className="flex items-center justify-between text-[8px] text-vintage-gold uppercase">
                  <span>DESPACHO TELEGRÁFICO ACTIVO</span>
                  <span>720 KHZ</span>
                </div>
                <p>{radioTicker}</p>
              </div>
            )}

            {/* Botón de Sintonía Telegráfica */}
            <button
              id="btn-sintonizar-radio"
              type="button"
              onClick={toggleRadio}
              className={`w-full py-2 font-grotesque font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                radioActive
                  ? 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                  : 'bg-vintage-gold hover:bg-[#d8b548] text-vintage-green'
              }`}
            >
              {radioActive ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  Pausar Radiocrónica Telegráfica
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  Sintonizar Radiocrónica en Vivo
                </>
              )}
            </button>
          </div>

          {/* PRÓXIMAS DISPUTAS DOMINICALES */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-grotesque font-bold uppercase tracking-wider text-vintage-muted dark:text-zinc-400">
              PRÓXIMAS JORNADAS DOMINICALES
            </div>

            {UPCOMING_FIXTURES.slice(3, 5).map((f) => (
              <div
                key={f.id}
                className="bg-[#fffdf7] dark:bg-[#1b251e] p-2 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm flex items-center justify-between text-xs shadow-xs"
              >
                <div>
                  <p className="font-display font-bold text-vintage-ink dark:text-[#f4eedd]">
                    {f.teamA} vs {f.teamB}
                  </p>
                  <p className="font-serif text-[10px] italic text-vintage-sepia dark:text-vintage-gold">
                    {f.day.split(' ')[0]} {f.time} • {f.venue}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenTicket(f)}
                  className="px-2.5 py-1 bg-[#eee8d7] dark:bg-[#28362d] text-vintage-green dark:text-[#cbead7] border border-[#c4b8a7] dark:border-[#3c5042] text-[10px] font-grotesque font-bold uppercase hover:bg-vintage-gold/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <TicketIcon className="w-3 h-3 text-vintage-sepia dark:text-vintage-gold" />
                  Boleto
                </button>
              </div>
            ))}
          </div>

          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => onNavigateTab('clubes')}
              className="font-serif italic text-xs text-vintage-terracotta dark:text-[#ffdad2] hover:underline inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              Consultar la tabla general de posiciones →
            </button>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* CUERPO 3: GACETA DE JUGADORES & BOTÁNICA TRADICIONAL */}
        {/* ===================================================================== */}
        <section 
          id="section-hub-jugadores"
          className="bg-[#f9f3e2] dark:bg-[#161e18] border-2 border-[#dcd0be] dark:border-[#28372d] rounded-sm p-4 shadow-md flex flex-col gap-4 relative md:col-span-2 lg:col-span-1"
        >
          <div className="border-b-2 border-vintage-gold/40 pb-2">
            <div className="flex items-center gap-1.5 text-[10px] font-grotesque font-bold uppercase tracking-widest text-vintage-sepia dark:text-vintage-gold">
              <BookOpen className="w-3.5 h-3.5 text-vintage-gold" />
              C-03 // GACETA & BOTÁNICA DEL BOTÍN
            </div>
            <h2 className="font-display font-bold text-xl text-vintage-green dark:text-[#f4eedd] mt-0.5">
              HUB DE LOS JUGADORES
            </h2>
            <p className="font-serif italic text-xs text-vintage-muted dark:text-[#b0cdbb] mt-1">
              Tratados de conservación de botas, registro de caballeros y tablón de reclutamiento de época.
            </p>
          </div>

          {/* MANUAL PRÁCTICO DEL JUGADOR TRADICIONAL */}
          <div className="border-l-4 border-vintage-sepia bg-[#fffdf7] dark:bg-[#1b251e] border-y border-r border-[#dcd0be] dark:border-[#2b3a30] p-3 rounded-sm space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-grotesque">
              <span className="font-bold text-vintage-sepia dark:text-vintage-gold uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> TRATADO DE BOTAS DE CUERO
              </span>
              <span className="text-vintage-aged dark:text-zinc-500 italic font-serif">AÑO 1928</span>
            </div>
            <h3 className="font-display font-bold text-xs text-vintage-green dark:text-[#f4eedd] leading-snug">
              Engrasado de botines con cera virgen de abejas y grasa de buey
            </h3>
            <p className="font-serif text-[11px] text-vintage-muted dark:text-[#b0cdbb] leading-relaxed">
              Conserve la flexibilidad del empeine de cuero curtido y evite el agrietamiento por la humedad del césped frotando paño de lana tibia tras cada encuentro.
            </p>

            {bootManualExpanded ? (
              <div className="mt-2 pt-2 border-t border-dashed border-[#dcd0be] dark:border-[#334439] text-[11px] font-serif italic text-vintage-ink dark:text-[#eedfc8] space-y-1">
                <p>
                  1. Retire los terrones con espátula de boj sin arañar el flor del cuero.
                </p>
                <p>
                  2. Caliente la grasa en cazuela a fuego mortecino y aplique con brocha de cerda de caballo.
                </p>
                <p>
                  3. Deje orear sobre un estante de ciprés en lugar ventilado y nunca junto al carbón encendido.
                </p>
                <button
                  type="button"
                  onClick={() => setBootManualExpanded(false)}
                  className="text-[10px] font-grotesque uppercase font-bold text-vintage-sepia dark:text-vintage-gold underline mt-1"
                >
                  Plegar manual ↑
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setBootManualExpanded(true)}
                className="font-serif italic text-[11px] text-vintage-sepia dark:text-vintage-gold hover:underline inline-flex items-center gap-1 pt-0.5 cursor-pointer"
              >
                Leer manual de guarnicionería →
              </button>
            )}
          </div>

          {/* CUADRO DE HONOR Y JUEGO LIMPIO (CABALLEROSIDAD) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-grotesque font-bold uppercase tracking-wider text-vintage-muted dark:text-zinc-400">
              <span>MEDALLERO DE CABALLEROSIDAD</span>
              <span className="text-vintage-sepia dark:text-vintage-gold">SIN SANCIONES</span>
            </div>

            <div className="space-y-1 text-xs">
              {/* 01 */}
              <div className="bg-[#fffdf7] dark:bg-[#1b251e] p-2 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-vintage-gold">01</span>
                  <div className="w-6 h-6 rounded-full bg-[#eee8d7] dark:bg-[#28372d] border border-vintage-gold text-vintage-green dark:text-vintage-gold font-grotesque font-bold text-[10px] flex items-center justify-center">
                    MR
                  </div>
                  <div>
                    <p className="font-display font-bold text-vintage-ink dark:text-[#f4eedd] leading-tight">
                      Mateo Rivas
                    </p>
                    <p className="font-serif text-[10px] text-vintage-muted dark:text-zinc-400">
                      14 Tantos • 0 Faltas • C.A. Pradera
                    </p>
                  </div>
                </div>
                <Award className="w-4 h-4 text-vintage-gold shrink-0" />
              </div>

              {/* 02 */}
              <div className="bg-[#fffdf7] dark:bg-[#1b251e] p-2 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-vintage-aged">02</span>
                  <div className="w-6 h-6 rounded-full bg-[#eee8d7] dark:bg-[#28372d] border border-zinc-400 text-vintage-green dark:text-zinc-300 font-grotesque font-bold text-[10px] flex items-center justify-center">
                    LS
                  </div>
                  <div>
                    <p className="font-display font-bold text-vintage-ink dark:text-[#f4eedd] leading-tight">
                      Lucas Salcedo
                    </p>
                    <p className="font-serif text-[10px] text-vintage-muted dark:text-zinc-400">
                      11 Tantos • 0 Faltas • Dep. Sierra
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">II</span>
              </div>

              {/* 03 */}
              <div className="bg-[#fffdf7] dark:bg-[#1b251e] p-2 border border-[#dcd0be] dark:border-[#2b3a30] rounded-sm flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-vintage-aged">03</span>
                  <div className="w-6 h-6 rounded-full bg-[#eee8d7] dark:bg-[#28372d] border border-amber-700 text-vintage-terracotta font-grotesque font-bold text-[10px] flex items-center justify-center">
                    EB
                  </div>
                  <div>
                    <p className="font-display font-bold text-vintage-ink dark:text-[#f4eedd] leading-tight">
                      Esteban Benítez
                    </p>
                    <p className="font-serif text-[10px] text-vintage-muted dark:text-zinc-400">
                      9 Tantos • 1 Advertencia • Valle F.C.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-700 font-bold">III</span>
              </div>
            </div>
          </div>

          {/* AVISO DE PRENSA / CONVOCATORIA DE CUADRO */}
          <div className="bg-[#f2ebda] dark:bg-[#1f2a22] p-3 rounded-sm border border-[#cfc4b2] dark:border-[#36493c] space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-grotesque font-bold">
              <span className="text-vintage-sepia dark:text-vintage-gold uppercase">
                AVISO DE RECLUTAMIENTO
              </span>
              <span className="text-vintage-aged dark:text-zinc-400">LIGA SABATINA</span>
            </div>
            <h4 className="font-display font-bold text-xs text-vintage-ink dark:text-[#f4eedd]">
              Raíces del Valle busca Mediocampista de Buen Pie
            </h4>
            <p className="font-serif text-[11px] text-vintage-muted dark:text-[#b0cdbb] leading-tight">
              Para disputa en campos de tierra fértil y tertulia posterior obligatoria de confraternidad.
            </p>
            <button
              id="btn-remitir-carta"
              type="button"
              onClick={onOpenLetter}
              className="w-full mt-1 py-1.5 bg-[#fffdf7] dark:bg-[#28372d] hover:bg-[#eee8d7] text-vintage-green dark:text-[#eedfc8] border border-[#c4b7a3] dark:border-[#3e5344] font-grotesque font-bold text-[10px] uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <Send className="w-3 h-3 text-vintage-sepia dark:text-vintage-gold" />
              Remitir Carta al Capitán
            </button>
          </div>

          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={onOpenMembership}
              className="font-serif italic text-xs text-vintage-green dark:text-[#b0cdbb] hover:underline inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              Acceder al tablón general de socios →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
