import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { Product, ProductFinish } from '../types/store';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, finish: ProductFinish) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedFinish);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1400);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group cursor-pointer flex flex-col h-full bg-[#FAF9F5] border border-[#EAE6DF] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#CDC5B8] hover:shadow-sm"
    >
      {/* 65-75% Image Container */}
      <div className="relative aspect-[4/3] w-full bg-[#F4F2EB] overflow-hidden flex items-center justify-center">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EFECE4] text-[#635E56]">
            <span className="font-serif-luxury text-lg">{product.name}</span>
            <span className="text-xs text-[#8C857B] mt-1">{product.material}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-104"
          />
        )}

        {/* Quiet Subtle Badge (Zero-Pill discipline: unboxed or subtle text) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#1C1A18]/90 text-[#FAF9F5] text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-sm">
            {product.badge}
          </div>
        )}

        {/* Quick View & Add overlay affordances */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#1A1918] text-xs font-medium rounded shadow-sm backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Specifications</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!selectedFinish.inStock}
            className={`py-2 px-3 text-xs font-medium rounded shadow-sm flex items-center justify-center gap-1.5 transition-all ${
              !selectedFinish.inStock
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : isAddedFeedback
                ? 'bg-[#2E5A36] text-white'
                : 'bg-[#1C1A18] text-white hover:bg-[#34322F]'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="text-[11px] uppercase tracking-wider text-[#827A70] flex items-center gap-1.5 mb-1.5">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin}</span>
          </div>

          <h3 className="font-serif-luxury text-lg text-[#1C1A18] leading-snug line-clamp-1 group-hover:text-stone-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B655D] mt-1 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#EAE6DF] flex items-center justify-between">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.finishes.map((finish) => (
              <button
                key={finish.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFinish(finish);
                }}
                title={`${finish.name}${!finish.inStock ? ' (Sold Out)' : ''}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedFinish.id === finish.id
                    ? 'ring-1.5 ring-offset-1 ring-[#1C1A18] border-transparent scale-110'
                    : 'border-black/20 hover:scale-105'
                } ${!finish.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: finish.hex }}
              />
            ))}
            <span className="text-[11px] text-[#7A746B] ml-1 truncate max-w-[100px] sm:max-w-[120px]">
              {selectedFinish.name}
            </span>
          </div>

          {/* Tabular Price */}
          <div className="text-right">
            <span className="text-sm font-semibold tabular-nums text-[#1C1A18]">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-[#8E877D] line-through tabular-nums">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
