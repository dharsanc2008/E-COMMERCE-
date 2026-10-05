/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CraftStorySection } from './components/CraftStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, ProductFinish, CartItem, PlacedOrder } from './types/store';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function App() {
  // Navigation & Category filter state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pa_atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  // Checkout & Confirmation state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);

  // Promo code state
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number }>({
    code: '',
    discountPct: 0,
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pa_atelier_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to local storage', e);
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product, finish: ProductFinish, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.productId === product.id && item.selectedFinish.id === finish.id
      );

      if (existingIdx > -1) {
        const copy = [...prevItems];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [
          ...prevItems,
          {
            productId: product.id,
            product,
            selectedFinish: finish,
            quantity,
          },
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, finishId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.productId === productId && item.selectedFinish.id === finishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveCartItem = (productId: string, finishId: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.selectedFinish.id === finishId))
    );
  };

  const handleApplyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ATELIER10') {
      setAppliedPromo({ code: cleanCode, discountPct: 10 });
      return { success: true, message: '10% Atelier inaugural discount applied.' };
    }
    if (cleanCode === 'ARCHITECT15') {
      setAppliedPromo({ code: cleanCode, discountPct: 15 });
      return { success: true, message: '15% Studio trade order discount applied.' };
    }
    return { success: false, message: 'Invalid promo code. Try ATELIER10.' };
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // In stock match
      if (onlyInStock && !item.inStock) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesMaterial = item.material.toLowerCase().includes(query);
        const matchesOrigin = item.origin.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesMaterial || matchesOrigin;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy, onlyInStock]);

  // Pricing calculations
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedPromo.discountPct > 0 ? (cartSubtotal * appliedPromo.discountPct) / 100 : 0;
  const cartShipping = cartSubtotal >= 300 || cartSubtotal === 0 ? 0 : 25;
  const cartFinalTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const handleOrderSuccess = (order: PlacedOrder) => {
    setCompletedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const scrollToProvenance = () => {
    const el = document.getElementById('provenance');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1C1A18] font-sans-clean">
      {/* 3-Zone Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateStory={scrollToProvenance}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero
          onExplore={scrollToCatalog}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* Featured Collection & Catalog Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          
          {/* Controls & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EAE6DF]">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#7C756B] mb-2 flex items-center gap-2">
                <span>The Permanent Archive</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums font-semibold text-[#1C1A18]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Design Object' : 'Design Objects'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#1C1A18]">
                {selectedCategory === 'all'
                  ? 'Curated Archive Collection'
                  : selectedCategory === 'furniture'
                  ? 'Architectural Seating & Tables'
                  : selectedCategory === 'lighting'
                  ? 'Luminaires & Brass Ambient Lighting'
                  : selectedCategory === 'ceramics'
                  ? 'Hand-Thrown Stoneware Vessels'
                  : 'Tactile Belgian Linen & Merino'}
              </h2>
            </div>

            {/* Interactive Functional Segmented Category Tabs (Buttons) */}
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'furniture', 'lighting', 'ceramics', 'textiles'] as ProductCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded transition-all font-medium ${
                    selectedCategory === cat
                      ? 'bg-[#1C1A18] text-[#FAF9F5] shadow-xs'
                      : 'bg-[#F2ECE1] text-[#615B52] hover:bg-[#E8E2D5] hover:text-[#1C1A18]'
                  }`}
                >
                  {cat === 'all' ? 'All Objects' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter & Sort Bar */}
          <div className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#5D574F]">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-[#D5CEC2] text-[#1C1A18] focus:ring-0 focus:ring-offset-0"
                />
                <span>In Stock only</span>
              </label>

              {searchQuery && (
                <div className="flex items-center gap-1.5 bg-[#EFEBE2] px-2.5 py-1 rounded text-stone-700">
                  <span>Query: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-black font-semibold ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Sort selection */}
            <div className="flex items-center gap-2">
              <span className="text-[#847E74]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#D5CEC2] rounded px-3 py-1.5 text-xs text-[#1C1A18] focus:outline-none focus:border-[#1C1A18]"
              >
                <option value="featured">Atelier Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* 3-Column Desktop Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-[#F5F2EB] rounded-lg border border-[#E4DEC0] my-6 p-8">
              <p className="font-serif-luxury text-2xl text-[#1C1A18]">No objects match your current selection.</p>
              <p className="text-xs text-[#7F796F] mt-2 max-w-sm mx-auto">
                Try loosening your filters, clearing the search query, or viewing all archived categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setOnlyInStock(false);
                }}
                className="mt-5 px-4 py-2 border border-[#1C1A18] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#1C1A18] hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setActiveProductModal(p)}
                  onAddToCart={(p, finish) => handleAddToCart(p, finish, 1)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Provenance & Material Story Section */}
        <CraftStorySection />

        {/* Studio Reviews & Adjacency Proof Section */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onNavigateProvenance={scrollToProvenance}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={(prod, finish, qty) => {
          handleAddToCart(prod, finish, qty);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoCode={appliedPromo.code}
        promoDiscount={appliedPromo.discountPct}
        onApplyPromo={handleApplyPromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discount={cartDiscount}
        shipping={cartShipping}
        total={cartFinalTotal}
        promoCode={appliedPromo.code}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Post-Order Receipt Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onContinueShopping={() => {
          setCompletedOrder(null);
          scrollToCatalog();
        }}
      />
    </div>
  );
}
