import React, { useState } from 'react';
import { Product, ProductShade } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, Search, X } from 'lucide-react';

interface CatalogViewProps {
  products: Product[];
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  onAddToCart: (product: Product, shade: ProductShade) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  searchQuery,
  setSearchQuery,
}) => {
  const [undertoneFilter, setUndertoneFilter] = useState<'todos' | 'calido' | 'frio' | 'neutro'>('todos');
  const [finishFilter, setFinishFilter] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'destacados' | 'precio-asc' | 'precio-desc' | 'rating'>('destacados');

  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
      const matchesShades = product.shades.some(s => s.name.toLowerCase().includes(q));
      if (!matchesName && !matchesDesc && !matchesCategory && !matchesShades) {
        return false;
      }
    }
    // Undertone match
    if (undertoneFilter !== 'todos') {
      if (product.undertoneRecommendation && product.undertoneRecommendation !== 'todos' && product.undertoneRecommendation !== undertoneFilter) {
        return false;
      }
    }
    // Finish match
    if (finishFilter !== 'todos' && !product.finish.includes(finishFilter)) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[70vh]">
      {/* Catalog Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#f0e6e7] dark:border-[#2a1d22] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#954832] dark:text-[#e5c392] font-semibold block mb-1">
            Boutique &amp; Alta Fórmulación
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#4c1425] dark:text-[#ffd9e0] font-semibold">
            {selectedCategory === 'labiales'
              ? 'Labiales & Pigmentos Seda'
              : selectedCategory === 'rostro'
              ? 'Bases & Perfección de Tez'
              : selectedCategory === 'ojos'
              ? 'Sombras & Minerales de Ojos'
              : selectedCategory === 'cuidado-facial'
              ? 'Skincare Prep & Elíxires'
              : 'Catálogo Completo'}
          </h1>
          <p className="text-xs sm:text-sm text-[#524346] dark:text-[#a08b8e] mt-1">
            Mostrando {filteredProducts.length} formulaciones orgánicas y veganas disponibles.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <span className="text-xs font-semibold text-[#524346] dark:text-[#a08b8e] uppercase tracking-wider">
            Ordenar por:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#fff8f8] dark:bg-[#201519] border border-[#d7c1c4] dark:border-[#38262c] text-xs font-medium rounded-lg px-3 py-2 text-[#1f1a1b] dark:text-[#f9eeef] focus:outline-hidden"
          >
            <option value="destacados">Destacados L'Éclat</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mayor Calificación</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-[#fcf1f2] dark:bg-[#1a1215] p-4 rounded-2xl border border-[#f0e6e7] dark:border-[#2f2025] mb-8 space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                : 'bg-[#fff8f8] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e] hover:bg-[#f6ebec]'
            }`}
          >
            Todas las Categorías
          </button>
          <button
            onClick={() => onSelectCategory('labiales')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === 'labiales'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                : 'bg-[#fff8f8] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e] hover:bg-[#f6ebec]'
            }`}
          >
            Labiales
          </button>
          <button
            onClick={() => onSelectCategory('rostro')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === 'rostro'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                : 'bg-[#fff8f8] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e] hover:bg-[#f6ebec]'
            }`}
          >
            Rostro &amp; Bases
          </button>
          <button
            onClick={() => onSelectCategory('ojos')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === 'ojos'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                : 'bg-[#fff8f8] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e] hover:bg-[#f6ebec]'
            }`}
          >
            Ojos &amp; Sombras
          </button>
          <button
            onClick={() => onSelectCategory('cuidado-facial')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === 'cuidado-facial'
                ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                : 'bg-[#fff8f8] dark:bg-[#22171b] text-[#524346] dark:text-[#a08b8e] hover:bg-[#f6ebec]'
            }`}
          >
            Cuidado Facial
          </button>
        </div>

        {/* Sub-Filters: Undertone */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#f0e6e7] dark:border-[#281c20] text-xs">
          <span className="font-semibold text-[#524346] dark:text-[#a08b8e] uppercase tracking-wider">
            Subtono Recomendado:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['todos', 'calido', 'frio', 'neutro'] as const).map((tone) => (
              <button
                key={tone}
                onClick={() => setUndertoneFilter(tone)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                  undertoneFilter === tone
                    ? 'bg-[#4c1425] text-white dark:bg-[#ffd9e0] dark:text-[#3b0619]'
                    : 'bg-white dark:bg-[#22161b] text-[#524346] dark:text-[#a08b8e] border border-[#d7c1c4]/40'
                }`}
              >
                {tone === 'todos' ? 'Todos los Subtonos' : tone}
              </button>
            ))}
          </div>

          {searchQuery && (
            <div className="ml-auto flex items-center gap-2 bg-[#fff8f8] dark:bg-[#201519] px-3 py-1 rounded-full border border-[#d7c1c4]">
              <span className="text-[11px] text-[#524346] dark:text-[#a08b8e]">
                Búsqueda: <strong className="text-[#4c1425] dark:text-[#ffd9e0]">"{searchQuery}"</strong>
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#857375] hover:text-[#4c1425]"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-[#857375] dark:text-[#a08b8e] space-y-3">
          <Sparkles className="w-12 h-12 mx-auto text-[#d7c1c4] dark:text-[#3e2b32]" />
          <p className="font-editorial text-xl font-semibold text-[#1f1a1b] dark:text-[#f9eeef]">
            No encontramos productos con estos filtros
          </p>
          <p className="text-xs max-w-sm mx-auto">
            Prueba restableciendo los filtros de subtono o buscando otro término.
          </p>
          <button
            onClick={() => {
              onSelectCategory(null);
              setUndertoneFilter('todos');
              setSearchQuery('');
            }}
            className="mt-3 px-6 py-2.5 rounded-full bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-xs font-semibold uppercase tracking-wider"
          >
            Ver Todo el Catálogo
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};
