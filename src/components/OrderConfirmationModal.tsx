import React from 'react';
import { CheckCircle2, Printer, ArrowRight, PackageCheck, MapPin, Calendar } from 'lucide-react';
import { PlacedOrder } from '../types/store';

interface OrderConfirmationModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E0DACE] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Header confirmation badge */}
          <div className="text-center space-y-2 pb-6 border-b border-[#EAE6DF]">
            <div className="inline-flex p-3 rounded-full bg-[#EBF3ED] text-[#2E5A36] mb-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#1C1A18]">
              Order Confirmed
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#7C756C]">
              Order Number: <span className="font-mono font-bold text-[#1C1A18]">{order.orderId}</span>
            </p>
            <p className="text-xs text-[#5C564E] max-w-md mx-auto leading-relaxed">
              We have dispatched your order dossier to <strong className="text-[#1C1A18]">{order.shippingDetails.email}</strong>. Our logistics master is currently preparing your crates for insured departure.
            </p>
          </div>

          {/* Timeline tracker */}
          <div className="bg-[#F2ECE1] p-4 rounded-lg border border-[#E5DFD4] text-xs">
            <div className="flex items-center justify-between mb-3 text-[#1C1A18] font-semibold">
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-[#2E5A36]" />
                <span>Status: Preparing Shipment</span>
              </span>
              <span className="text-[#6D675E] text-[11px] font-normal">{order.date}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-2">
              <div className="border-t-2 border-[#1C1A18] pt-1 font-medium text-[#1C1A18]">
                1. Order Placed
              </div>
              <div className="border-t-2 border-[#8C8477] pt-1 text-[#6D675E]">
                2. Atelier Inspection
              </div>
              <div className="border-t-2 border-[#D8D2C5] pt-1 text-[#9E978C]">
                3. White Glove Transit
              </div>
            </div>
          </div>

          {/* Shipping destination summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-white border border-[#E4DEC0] rounded">
              <div className="flex items-center gap-1.5 font-semibold text-[#1C1A18] mb-1">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Delivery Address</span>
              </div>
              <p className="text-[#554F47]">{order.shippingDetails.fullName}</p>
              <p className="text-[#554F47]">{order.shippingDetails.streetAddress}</p>
              {order.shippingDetails.apartment && <p className="text-[#554F47]">{order.shippingDetails.apartment}</p>}
              <p className="text-[#554F47]">{order.shippingDetails.city}, {order.shippingDetails.postalCode}</p>
              <p className="text-[#554F47]">{order.shippingDetails.country}</p>
            </div>

            <div className="p-3.5 bg-white border border-[#E4DEC0] rounded">
              <div className="flex items-center gap-1.5 font-semibold text-[#1C1A18] mb-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>Payment & Shipping Method</span>
              </div>
              <p className="text-[#554F47] capitalize">Method: {order.shippingDetails.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.shippingDetails.paymentMethod === 'apple_pay' ? 'Digital Wallet' : 'Credit Card'}</p>
              <p className="text-[#554F47]">Carrier: Speciality Furniture & Object Freight</p>
              <p className="text-[#2E5A36] font-medium mt-1">Insured & Signed Delivery</p>
            </div>
          </div>

          {/* Itemized summary */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] mb-3">
              Itemized Manifest
            </h4>
            <div className="divide-y divide-[#EAE6DF] border-y border-[#EAE6DF]">
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.selectedFinish.id}`} className="py-3 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded border border-[#E4DEC0]"
                    />
                    <div>
                      <p className="font-semibold text-[#1C1A18]">{item.product.name}</p>
                      <p className="text-[11px] text-[#7A746B]">
                        {item.selectedFinish.name} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold tabular-nums text-[#1C1A18]">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 space-y-1.5 text-xs text-[#615B52]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1C1A18]">${order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#2E5A36]">
                  <span>Atelier Promo Discount</span>
                  <span className="tabular-nums font-medium">-${order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Freight Shipping</span>
                <span className="tabular-nums font-medium">
                  {order.shipping === 0 ? 'Complimentary' : `$${order.shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#1C1A18] pt-2 border-t border-[#EAE6DF]">
                <span>Total Settled</span>
                <span className="tabular-nums">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-3 border border-[#D5CEC2] text-xs font-semibold rounded hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onContinueShopping();
              }}
              className="w-full sm:flex-1 px-5 py-3 bg-[#1C1A18] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#34322F] transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Exploring Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
