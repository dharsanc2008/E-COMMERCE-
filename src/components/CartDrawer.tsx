import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, finishId: string, delta: number) => void;
  onRemoveItem: (productId: string, finishId: string) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  promoDiscount: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  promoDiscount,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = promoDiscount > 0 ? (subtotal * promoDiscount) / 100 : 0;
  const shippingAmount = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingAmount);
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim());
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E2DDD3] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF9F5]">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-serif-luxury text-[#1C1A18]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#7F7970] tabular-nums font-medium">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#F3EFE7] border-b border-[#EAE6DF] text-xs">
            {amountNeeded > 0 ? (
              <p className="text-[#5B554D]">
                Add <span className="font-semibold text-[#1C1A18] tabular-nums">${amountNeeded.toLocaleString()}</span> more to unlock complimentary global shipping.
              </p>
            ) : (
              <p className="text-[#2E5A36] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E5A36]" />
                You have qualified for complimentary insured white-glove shipping.
              </p>
            )}
            <div className="w-full bg-[#E5DFD4] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#1C1A18] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EAE6DF]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#6D675E]">
                <p className="font-serif-luxury text-xl text-[#242220]">Your bag is currently empty.</p>
                <p className="text-xs text-[#8A8379] mt-1 max-w-xs">
                  Discover our curated collection of architectural seating, ambient lamps, and tactile vessels.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 bg-[#1C1A18] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#34322F] transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.productId}-${item.selectedFinish.id}`} className="py-4 flex gap-4">
                  <div className="w-20 h-20 rounded bg-[#F0EDE6] border border-[#E0DACE] overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-base text-[#1C1A18] leading-snug">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-semibold tabular-nums text-[#1C1A18]">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-[#7F7970] mt-0.5">
                        Finish: {item.selectedFinish.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D5CEC2] rounded bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.selectedFinish.id, -1)}
                          className="px-2.5 py-1 text-stone-600 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-medium tabular-nums text-[#1C1A18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.selectedFinish.id, 1)}
                          className="px-2.5 py-1 text-stone-600 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.productId, item.selectedFinish.id)}
                        className="text-stone-400 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAE6DF] bg-[#FAF9F5] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. ATELIER10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:outline-none focus:border-[#1C1A18] uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EFECE5] hover:bg-[#E3DEC0] text-[#1C1A18] text-xs font-semibold rounded transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.isError ? 'text-red-600' : 'text-[#2E5A36]'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#615C54]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#1C1A18]">${subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E5A36]">
                    <span>Discount ({promoCode})</span>
                    <span className="tabular-nums font-medium">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="tabular-nums font-medium">
                    {shippingAmount === 0 ? 'Complimentary' : `$${shippingAmount}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1C1A18] pt-2 border-t border-[#EAE6DF]">
                  <span>Total</span>
                  <span className="tabular-nums text-base">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#1C1A18] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#34322F] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#827B71]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5F8A68]" />
                <span>256-Bit SSL Encrypted & 30-Day Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
