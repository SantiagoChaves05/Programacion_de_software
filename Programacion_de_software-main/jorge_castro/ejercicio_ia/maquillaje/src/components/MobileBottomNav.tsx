import React from 'react';
import { Home, Sparkles, Camera, ShoppingBag, Heart } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  wishlistCount,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f8]/95 dark:bg-[#140f11]/95 backdrop-blur-md border-t border-[#f0e6e7] dark:border-[#281c20] px-3 py-2 transition-colors duration-200">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            activeTab === 'inicio'
              ? 'text-[#4c1425] dark:text-[#ffd9e0]'
              : 'text-[#857375] dark:text-[#a08b8e]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => setActiveTab('catalogo')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            activeTab === 'catalogo'
              ? 'text-[#4c1425] dark:text-[#ffd9e0]'
              : 'text-[#857375] dark:text-[#a08b8e]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Catálogo</span>
        </button>

        {/* Central Prominent Action: Shade Match & Foto */}
        <button
          onClick={() => setActiveTab('shadematch')}
          className="flex flex-col items-center -mt-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border-2 border-white dark:border-[#140f11]">
            <Camera className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#4c1425] dark:text-[#ffd9e0] mt-0.5">
            Foto Tono
          </span>
        </button>

        <button
          onClick={() => setActiveTab('comunidad')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            activeTab === 'comunidad'
              ? 'text-[#4c1425] dark:text-[#ffd9e0]'
              : 'text-[#857375] dark:text-[#a08b8e]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Looks</span>
        </button>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 p-1 text-[10px] font-semibold uppercase tracking-wider text-[#857375] dark:text-[#a08b8e] relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#4c1425] dark:bg-[#ffd9e0] text-white dark:text-[#3b0619] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span>Bolsa</span>
        </button>
      </div>
    </div>
  );
};
