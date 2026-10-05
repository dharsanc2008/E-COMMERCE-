import React, { useState } from 'react';
import { X, Lock, CheckCircle2, CreditCard, Truck, Banknote } from 'lucide-react';
import { CartItem, CheckoutDetails, PlacedOrder } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode?: string;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  promoCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [form, setForm] = useState<CheckoutDetails>({
    fullName: 'Eleanor Vance',
    email: 'eleanor.vance@studio-atelier.com',
    phone: '+1 (555) 234-8900',
    streetAddress: '428 Mercer Street, Floor 5',
    apartment: 'Apt 5B',
    city: 'New York',
    postalCode: '10013',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '11/28',
    cardCvc: '883',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.streetAddress || !form.city || !form.postalCode) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const generatedOrderId = `PA-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: PlacedOrder = {
        orderId: generatedOrderId,
        items,
        subtotal,
        discount,
        shipping,
        tax: 0,
        total,
        promoCode,
        shippingDetails: form,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        status: 'confirmed',
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E0DACE] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-stone-700" />
            <h2 className="font-serif-luxury text-xl text-[#1C1A18]">
              Secure Checkout & Delivery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Customer Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] mb-3">
              1. Contact & Verification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Phone Number (For Freight Booking) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] mb-3">
              2. Delivery Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Street Address *</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={form.streetAddress}
                  onChange={handleChange}
                  required
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Apartment / Suite</label>
                <input
                  type="text"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleChange}
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full text-xs bg-white border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] focus:border-[#1C1A18] focus:outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Terms & Methods */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] mb-3">
              3. Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, paymentMethod: 'card' })}
                className={`p-3 rounded border text-left flex flex-col justify-between transition-all ${
                  form.paymentMethod === 'card'
                    ? 'border-[#1C1A18] bg-white ring-1 ring-[#1C1A18]'
                    : 'border-[#D5CEC2] bg-[#F7F5EE] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-4 h-4 text-stone-700" />
                  <span className="text-[10px] font-semibold text-stone-600">Credit Card</span>
                </div>
                <span className="text-xs font-medium text-[#1C1A18]">Visa, MC, Amex</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, paymentMethod: 'apple_pay' })}
                className={`p-3 rounded border text-left flex flex-col justify-between transition-all ${
                  form.paymentMethod === 'apple_pay'
                    ? 'border-[#1C1A18] bg-white ring-1 ring-[#1C1A18]'
                    : 'border-[#D5CEC2] bg-[#F7F5EE] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-4 h-4 text-stone-700" />
                  <span className="text-[10px] font-semibold text-stone-600">Digital Wallet</span>
                </div>
                <span className="text-xs font-medium text-[#1C1A18]">Apple Pay / Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                className={`p-3 rounded border text-left flex flex-col justify-between transition-all ${
                  form.paymentMethod === 'cod'
                    ? 'border-[#1C1A18] bg-white ring-1 ring-[#1C1A18]'
                    : 'border-[#D5CEC2] bg-[#F7F5EE] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-4 h-4 text-stone-700" />
                  <span className="text-[10px] font-semibold text-stone-600">COD</span>
                </div>
                <span className="text-xs font-medium text-[#1C1A18]">Cash on Delivery</span>
              </button>
            </div>

            {form.paymentMethod === 'card' && (
              <div className="p-3.5 bg-white border border-[#D5CEC2] rounded space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F5] border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#5F5950] mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={form.cardExpiry}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F5] border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#5F5950] mb-1">CVC Code</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={form.cardCvc}
                      onChange={handleChange}
                      className="w-full bg-[#FAF9F5] border border-[#D5CEC2] rounded px-3 py-2 text-[#1C1A18] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {form.paymentMethod === 'cod' && (
              <div className="p-3 bg-[#F4F1E8] border border-[#DDD6C8] rounded text-xs text-[#524B41] space-y-1">
                <p className="font-semibold text-[#1C1A18]">Cash on Delivery Terms:</p>
                <p>Payment of <strong>${total.toLocaleString()}</strong> will be collected in cash or mobile card terminal upon physical delivery by our white-glove freight carrier.</p>
              </div>
            )}
          </div>

          {/* Order Summary & Submit Action */}
          <div className="pt-4 border-t border-[#EAE6DF] space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-[#1C1A18]">
              <span>Final Total Due</span>
              <span className="tabular-nums text-lg">${total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#1C1A18] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#34322F] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Processing Authorization...</span>
              ) : (
                <span>Confirm Order · ${total.toLocaleString()}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
