import React, { useState } from 'react';
import { X, Check, Truck, ShieldCheck, Box, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, ProductFinish } from '../types/store';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: ProductFinish, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedFinish, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#E0DACE] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Dismiss Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-black transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Product Gallery View */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F3EFE7] border border-[#E2DDD3]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Material specifications callout */}
              <div className="p-4 bg-[#F2EDE2] rounded-lg border border-[#E4DEC0]/50 text-xs space-y-2">
                <div className="flex items-center justify-between text-[#57524A]">
                  <span className="font-semibold text-[#1C1A18]">Material Provenance</span>
                  <span>{product.origin}</span>
                </div>
                <p className="text-[#696359] leading-relaxed">
                  {product.material}
                </p>
                <div className="pt-1 flex items-center gap-3 text-[11px] text-[#7A746A]">
                  <span>Weight: {product.weight}</span>
                  <span>·</span>
                  <span>{product.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                {/* Zero-Pill Category Tag */}
                <div className="text-xs uppercase tracking-widest text-[#827B71] flex items-center gap-2 mb-1.5">
                  <span className="capitalize">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Ref. {product.id}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#1C1A18] leading-tight">
                  {product.name}
                </h2>

                <p className="text-sm text-[#615C54] mt-1 font-light">
                  {product.subtitle}
                </p>

                {/* Price & Lead Time */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold tabular-nums text-[#1C1A18]">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#888177] line-through tabular-nums">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-[#2E5A36] font-medium ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E5A36] inline-block" />
                    {product.leadTime}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#4E4A43] leading-relaxed">
                  {product.description}
                </p>

                {/* Finish / Variant Selector */}
                <div className="mt-6 pt-5 border-t border-[#EAE6DF]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#1C1A18] uppercase tracking-wider">
                      Selected Finish
                    </span>
                    <span className="text-[#6B655D] font-medium">
                      {selectedFinish.name} {!selectedFinish.inStock && '(Waitlist Only)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.finishes.map((finish) => (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        disabled={!finish.inStock}
                        className={`flex items-center gap-2.5 p-2.5 rounded-md border text-left text-xs transition-all ${
                          selectedFinish.id === finish.id
                            ? 'border-[#1C1A18] bg-white ring-1 ring-[#1C1A18]'
                            : 'border-[#D9D3C7] bg-[#F7F5EE] hover:bg-white'
                        } ${!finish.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: finish.hex }}
                        />
                        <span className="truncate font-medium text-[#1C1A18]">{finish.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Contiguous Buy Action */}
                <div className="mt-6 pt-5 border-t border-[#EAE6DF] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#D5CEC2] rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-stone-600 hover:text-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-semibold tabular-nums text-[#1C1A18]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-stone-600 hover:text-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdd}
                      disabled={!selectedFinish.inStock}
                      className={`flex-1 py-3 px-6 rounded-md text-xs uppercase tracking-wider font-semibold shadow-sm transition-all flex items-center justify-center gap-2 ${
                        !selectedFinish.inStock
                          ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                          : addedSuccess
                          ? 'bg-[#2E5A36] text-white'
                          : 'bg-[#1C1A18] hover:bg-[#34322F] text-[#FAF9F5]'
                      }`}
                    >
                      {addedSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <span>
                          Add to Bag · ${(product.price * quantity).toLocaleString()}
                        </span>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-[#7F7970]">
                    Insured freight delivery with unboxing & inspection available at checkout.
                  </p>
                </div>

                {/* Specifications Accordion */}
                <div className="mt-6 border-t border-[#EAE6DF] pt-4 space-y-2">
                  <div className="border border-[#E2DDD3] rounded-md bg-[#FAF8F3] overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'details' ? 'specs' : 'details')}
                      className="w-full p-3 text-left font-medium text-[#1C1A18] flex items-center justify-between"
                    >
                      <span>Architectural Details</span>
                      {activeTab === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {activeTab === 'details' && (
                      <div className="p-3 pt-0 border-t border-[#E8E3DA] text-[#544F46] space-y-1.5">
                        {product.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#968E82]">•</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
