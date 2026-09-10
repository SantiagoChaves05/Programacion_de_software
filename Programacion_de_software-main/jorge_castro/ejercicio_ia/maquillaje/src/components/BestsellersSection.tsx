import React, { useState } from 'react';
import { Product, ProductShade } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BestsellersSectionProps {
  products: Product[];
  onAddToCart: (product: Product, shade: ProductShade) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  onViewAllCatalog: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onViewAllCatalog,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'labiales' | 'rostro' | 'ojos' | 'cuidado-facial'>('todos');

  const filteredProducts = activeFilter === 'todos'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#954832] dark:text-[#e5c392] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fórmulas de Culto</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
            Los Más Vendidos
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeFilter === 'todos'
                ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'bg-[#f6ebec] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] hover:bg-[#eae0e1]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveFilter('labiales')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeFilter === 'labiales'
                ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'bg-[#f6ebec] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] hover:bg-[#eae0e1]'
            }`}
          >
            Labios
          </button>
          <button
            onClick={() => setActiveFilter('rostro')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeFilter === 'rostro'
                ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'bg-[#f6ebec] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] hover:bg-[#eae0e1]'
            }`}
          >
            Rostro &amp; Tez
          </button>
          <button
            onClick={() => setActiveFilter('ojos')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeFilter === 'ojos'
                ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'bg-[#f6ebec] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] hover:bg-[#eae0e1]'
            }`}
          >
            Ojos
          </button>
          <button
            onClick={() => setActiveFilter('cuidado-facial')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeFilter === 'cuidado-facial'
                ? 'bg-[#4c1425] text-[#fff8f8] dark:bg-[#ffd9e0] dark:text-[#3b0619] shadow-xs'
                : 'bg-[#f6ebec] dark:bg-[#201519] text-[#524346] dark:text-[#a08b8e] hover:bg-[#eae0e1]'
            }`}
          >
            Skincare Prep
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.includes(product.id)}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Explore More CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={onViewAllCatalog}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#4c1425] dark:border-[#ffd9e0] text-[#4c1425] dark:text-[#ffd9e0] text-xs font-semibold uppercase tracking-widest hover:bg-[#4c1425] hover:text-white dark:hover:bg-[#ffd9e0] dark:hover:text-[#3b0619] transition-all shadow-xs"
        >
          <span>Ver Colección Completa en Catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
