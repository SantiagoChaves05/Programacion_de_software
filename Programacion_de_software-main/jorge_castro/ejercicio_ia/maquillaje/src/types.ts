export interface ProductShade {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'labiales' | 'rostro' | 'ojos' | 'cuidado-facial';
  categoryLabel: string;
  finish: 'Seda / Matte' | 'Larga Duración / Glow' | 'Acabado Rocío' | 'Pigmentos Puros' | 'Botánico Nutritivo';
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'bestseller' | 'discount' | 'new';
  image: string;
  shades: ProductShade[];
  undertoneRecommendation?: 'calido' | 'frio' | 'neutro' | 'todos';
  ingredients?: string[];
  benefits?: string[];
}

export interface CartItem {
  product: Product;
  selectedShade: ProductShade;
  quantity: number;
}

export interface CommunityPhoto {
  id: string;
  title: string;
  author: string;
  undertone: 'calido' | 'frio' | 'neutro';
  shadeName: string;
  imageUrl: string;
  likes: number;
  likedByUser?: boolean;
  createdAt: string;
  comment?: string;
  productsUsed: string[];
}

export interface ShadeMatchResult {
  undertone: 'calido' | 'frio' | 'neutro';
  undertoneLabel: string;
  depthLabel: string;
  confidence: number;
  hexDetected: string;
  recommendedFoundation: {
    productName: string;
    shadeName: string;
    shadeHex: string;
    description: string;
  };
  recommendedLipstick: {
    productName: string;
    shadeName: string;
    shadeHex: string;
  };
  lightingAdvice: string;
}

export type ActiveTab = 'inicio' | 'catalogo' | 'shadematch' | 'comunidad' | 'wishlist';

export type ThemeMode = 'auto' | 'light' | 'dark';
