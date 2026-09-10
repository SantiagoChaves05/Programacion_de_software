import React, { useState, useMemo } from 'react';
import { Flame, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { AgeCategory, Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  selectedAge: AgeCategory;
  searchQuery: string;
  onOpenDetail: (product: Product) => void;
  onResetFilters: () => void;
}

type SortTab = 'todos' | 'populares' | 'ofertas';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  selectedAge,
  searchQuery,
  onOpenDetail,
  onResetFilters,
}) => {
  const [activeTab, setActiveTab] = useState<SortTab>('todos');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'ofertas') {
          if (!product.originalPrice && !product.discountPercent) return false;
        } else if (product.categorySlug !== selectedCategory) {
          return false;
        }
      }

      // Age filter
      if (selectedAge !== 'all' && product.ageCategory !== selectedAge) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // Tab filter
      if (activeTab === 'populares') {
        return product.rating >= 4.8;
      }
      if (activeTab === 'ofertas') {
        return Boolean(product.discountPercent || product.originalPrice);
      }

      return true;
    });
  }, [products, selectedCategory, selectedAge, searchQuery, activeTab]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedAge !== 'all' || searchQuery.trim() !== '' || activeTab !== 'todos';

  return (
    <section
      id="catalogo-productos"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header with Title & Sort Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#FF2A55] fill-[#FF2A55]" />
            <span className="text-[#FF2A55] font-display font-black text-xs sm:text-sm uppercase tracking-wider">
              Lo Más Deseado
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#12131A] dark:text-white uppercase tracking-tight mt-1">
            Top Ventas de la Semana
          </h2>
        </div>

        {/* Quick Sorting Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-[#F4F2FD] dark:bg-[#1E202E] p-1.5 rounded-full border-2 border-[#12131A] dark:border-[#383C56] shadow-brutal-sm self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3.5 py-1 rounded-full font-display font-black text-xs uppercase transition-all ${
              activeTab === 'todos'
                ? 'bg-[#FFD000] text-[#12131A] shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#12131A] dark:hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('populares')}
            className={`px-3.5 py-1 rounded-full font-display font-black text-xs uppercase transition-all ${
              activeTab === 'populares'
                ? 'bg-[#FFD000] text-[#12131A] shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#12131A] dark:hover:text-white'
            }`}
          >
            Más Populares
          </button>
          <button
            onClick={() => setActiveTab('ofertas')}
            className={`px-3.5 py-1 rounded-full font-display font-black text-xs uppercase transition-all ${
              activeTab === 'ofertas'
                ? 'bg-[#FFD000] text-[#12131A] shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-[#12131A] dark:hover:text-white'
            }`}
          >
            En Oferta
          </button>
        </div>
      </div>

      {/* Filter Status / Reset Bar if filters active */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF5] dark:bg-[#1E202E] p-3 rounded-2xl border-2 border-[#12131A] dark:border-[#383C56]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
            <span>Filtros activos:</span>
            {selectedCategory !== 'all' && (
              <span className="bg-[#C9D3FF] dark:bg-[#1C2642] text-[#0050E3] dark:text-[#60A5FA] px-2 py-0.5 rounded-full border border-[#12131A] uppercase">
                Categoría: {selectedCategory}
              </span>
            )}
            {selectedAge !== 'all' && (
              <span className="bg-[#FFE082] dark:bg-[#3D3517] text-[#12131A] dark:text-[#FFE082] px-2 py-0.5 rounded-full border border-[#12131A] uppercase">
                Edad: {selectedAge}
              </span>
            )}
            {searchQuery && (
              <span className="bg-[#FFDADA] dark:bg-[#401C25] text-[#BA0035] dark:text-[#FF8095] px-2 py-0.5 rounded-full border border-[#12131A]">
                Búsqueda: &ldquo;{searchQuery}&rdquo;
              </span>
            )}
            <span className="text-gray-500">
              ({filteredProducts.length} juguete{filteredProducts.length === 1 ? '' : 's'} encontrado{filteredProducts.length === 1 ? '' : 's'})
            </span>
          </div>

          <button
            onClick={onResetFilters}
            className="text-xs font-black uppercase text-[#FF2A55] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer Filtros
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#1A1B28] rounded-3xl border-[3px] border-[#12131A] dark:border-[#383C56] shadow-brutal p-8">
          <div className="w-16 h-16 rounded-full bg-[#FFE082] border-2 border-[#12131A] flex items-center justify-center mx-auto mb-4 text-3xl">
            🔍
          </div>
          <h3 className="font-display font-black text-2xl uppercase text-[#12131A] dark:text-white">
            ¡Uy! No encontramos juguetes con ese criterio
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto">
            Intenta buscando con palabras más generales o prueba a restablecer los filtros para ver todo nuestro catálogo mágico.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-6 px-6 py-2.5 bg-[#FFD000] text-[#12131A] font-display font-black text-xs uppercase rounded-xl border-2 border-[#12131A] shadow-brutal-sm btn-pressable"
          >
            Ver Todos los Juguetes
          </button>
        </div>
      )}
    </section>
  );
};
