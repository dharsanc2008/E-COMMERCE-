import React, { useState } from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigateStory,
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#EAE6DF] transition-all">
      {/* Slim Dismissible Top Notification Bar */}
      {showPromo && (
        <div className="bg-[#232220] text-[#F3EFE6] px-4 py-2 text-xs flex items-center justify-between tracking-wide font-sans-clean">
          <div className="w-6 hidden sm:block" />
          <p className="text-center w-full truncate">
            Complimentary insured global delivery on design orders over $300 · Use code <span className="underline font-semibold">ATELIER10</span> for 10% off
          </p>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss banner"
            className="text-[#A59F95] hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1-2 Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl sm:text-3xl font-serif-luxury tracking-tight text-[#1C1A18] hover:opacity-85 transition-opacity whitespace-nowrap"
        >
          PA ATELIER
        </a>

        {/* Zone 2: 4-5 Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-[#524E48]">
          <button
            onClick={() => onSelectCategory('furniture')}
            className={`transition-colors hover:text-[#1A1918] ${
              selectedCategory === 'furniture' ? 'text-[#1A1918] font-semibold border-b border-[#1A1918] pb-0.5' : ''
            }`}
          >
            Furniture
          </button>
          <button
            onClick={() => onSelectCategory('lighting')}
            className={`transition-colors hover:text-[#1A1918] ${
              selectedCategory === 'lighting' ? 'text-[#1A1918] font-semibold border-b border-[#1A1918] pb-0.5' : ''
            }`}
          >
            Lighting
          </button>
          <button
            onClick={() => onSelectCategory('ceramics')}
            className={`transition-colors hover:text-[#1A1918] ${
              selectedCategory === 'ceramics' ? 'text-[#1A1918] font-semibold border-b border-[#1A1918] pb-0.5' : ''
            }`}
          >
            Ceramics
          </button>
          <button
            onClick={() => onSelectCategory('textiles')}
            className={`transition-colors hover:text-[#1A1918] ${
              selectedCategory === 'textiles' ? 'text-[#1A1918] font-semibold border-b border-[#1A1918] pb-0.5' : ''
            }`}
          >
            Textiles
          </button>
          <button
            onClick={onNavigateStory}
            className="transition-colors hover:text-[#1A1918]"
          >
            Provenance
          </button>
        </nav>

        {/* Zone 3: Search and Shopping Bag */}
        <div className="flex items-center gap-3">
          {showSearchInput ? (
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search objects, finishes..."
                autoFocus
                className="w-48 sm:w-64 text-xs bg-white/80 border border-[#D5CEC2] rounded-md px-3 py-1.5 pr-8 focus:outline-none focus:border-[#232220] transition-colors"
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="absolute right-2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-[#423E3A] hover:text-[#181716] transition-colors rounded-full hover:bg-stone-200/50"
              aria-label="Search catalog"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          )}

          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D5CEC2] bg-[#FAF9F5] hover:bg-white text-xs font-medium text-[#1A1918] transition-all hover:border-[#1A1918] active:scale-98"
          >
            <ShoppingBag className="w-4 h-4 text-[#1A1918]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold ml-0.5">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Category Scrollbar */}
      <div className="md:hidden flex items-center gap-4 px-4 py-2.5 overflow-x-auto border-t border-[#EAE6DF] text-xs font-medium tracking-wider uppercase text-[#6B655D] scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`whitespace-nowrap ${selectedCategory === 'all' ? 'text-[#1A1918] font-bold' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => onSelectCategory('furniture')}
          className={`whitespace-nowrap ${selectedCategory === 'furniture' ? 'text-[#1A1918] font-bold' : ''}`}
        >
          Furniture
        </button>
        <button
          onClick={() => onSelectCategory('lighting')}
          className={`whitespace-nowrap ${selectedCategory === 'lighting' ? 'text-[#1A1918] font-bold' : ''}`}
        >
          Lighting
        </button>
        <button
          onClick={() => onSelectCategory('ceramics')}
          className={`whitespace-nowrap ${selectedCategory === 'ceramics' ? 'text-[#1A1918] font-bold' : ''}`}
        >
          Ceramics
        </button>
        <button
          onClick={() => onSelectCategory('textiles')}
          className={`whitespace-nowrap ${selectedCategory === 'textiles' ? 'text-[#1A1918] font-bold' : ''}`}
        >
          Textiles
        </button>
        <button
          onClick={onNavigateStory}
          className="whitespace-nowrap"
        >
          Provenance
        </button>
      </div>
    </header>
  );
};
