export type AgeCategory = 'all' | '0-2' | '3-5' | '6-8' | '9-12' | 'collectors';

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: 'robotica' | 'bloques' | 'peluches' | 'pistas' | 'creatividad' | 'juegos-de-mesa' | 'figuras';
  ageRange: string;
  ageCategory: AgeCategory;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  badge?: string;
  badgeType?: 'sale' | 'new' | 'popular' | 'speed' | 'sparkle';
  description: string;
  features: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryCard {
  id: string;
  slug: string;
  name: string;
  tag: string;
  itemCount: string;
  image: string;
  bgClass: string;
  darkBgClass: string;
  badgeBg: string;
}

export interface MakerSubmission {
  id: string;
  title: string;
  author: string;
  age: number;
  likes: number;
  image: string;
  toyCategory: string;
  featured?: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  iconType?: 'cart' | 'heart' | 'ticket' | 'sparkles';
}
