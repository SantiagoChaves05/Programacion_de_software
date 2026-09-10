export type TabType = 'inicio' | 'clubes' | 'campos' | 'reglamento' | 'archivo';

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface Club {
  id: string;
  name: string;
  shortCode: string;
  founded: number;
  badgeColor: string;
  borderAccent: string;
  division: 'Primera de Honor' | 'Cuadro Sabatino' | 'Copa Fundadores';
  homeGround: string;
  captain: string;
  titles: number;
  fairPlayRating: number;
  motto: string;
  description: string;
  kitColors: string;
}

export interface Ground {
  id: string;
  name: string;
  established: number;
  location: string;
  grassType: string;
  drainage: string;
  capacity: string;
  rollingRoutine: string;
  wateringSource: string;
  description: string;
  dimensions: string;
  historicEvent: string;
  photoUrl: string;
}

export interface RuleItem {
  number: number;
  title: string;
  year: number;
  category: 'Césped & Terreno' | 'Balón & Botines' | 'Caballerosidad' | 'Reglas de Juego';
  text: string;
  penaltyClause: string;
}

export interface ArchiveDocument {
  id: string;
  year: number;
  vol: string;
  title: string;
  type: 'Despacho Telegráfico' | 'Crónica de Prensa' | 'Acta Federativa' | 'Pliego Conmemorativo';
  summary: string;
  fullContent: string;
  author: string;
}

export interface MatchFixture {
  id: string;
  teamA: string;
  codeA: string;
  teamB: string;
  codeB: string;
  time: string;
  day: string;
  venue: string;
  group: string;
  ticketAvailable: boolean;
}
