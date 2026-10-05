import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateProvenance: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateProvenance,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#1C1A18] text-[#F3EFE7] pt-16 pb-12 border-t border-[#312E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top zone */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2E2B27]">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-serif-luxury tracking-wide text-white block">
              PA ATELIER
            </span>
            <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed max-w-sm">
              Architectural furniture, lathe-turned brass luminaires, and tactile stoneware vessels designed with monolithic discipline and honest material provenance.
            </p>
            <div className="pt-2 text-xs text-[#8A8379] space-y-1">
              <p>Atelier Showroom: 428 Mercer Street, New York, NY</p>
              <p>Fabrication Studios: Aarhus, Denmark · Kobe, Japan · Tivoli, Italy</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Curated Catalog
            </h4>
            <ul className="text-xs space-y-2 text-[#A8A196]">
              <li>
                <button
                  onClick={() => onSelectCategory('furniture')}
                  className="hover:text-white transition-colors"
                >
                  Architectural Seating & Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lighting')}
                  className="hover:text-white transition-colors"
                >
                  Turned Brass & Sconce Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ceramics')}
                  className="hover:text-white transition-colors"
                >
                  Fluted Stoneware Vessels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('textiles')}
                  className="hover:text-white transition-colors"
                >
                  Belgian Linen & Merino Wool
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateProvenance}
                  className="hover:text-white transition-colors"
                >
                  The Material Constitution
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Atelier Correspondence
            </h4>
            <p className="text-xs text-[#A8A196] leading-relaxed">
              Receive private invitations to limited batch dispatches, material archives, and studio editions. Never frequent or promotional.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architectural.office@domain.com"
                className="flex-1 bg-[#282522] border border-[#3E3A34] rounded px-3 py-2 text-xs text-white placeholder:text-[#6E685F] focus:outline-none focus:border-[#A8A196]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F3EFE7] text-[#1C1A18] text-xs font-semibold rounded hover:bg-white transition-colors flex items-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Inscribed</span>
                  </>
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright zone */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F796F]">
          <p>© {new Date().getFullYear()} PA Atelier Goods & Living Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Sale</span>
            <span className="hover:text-white transition-colors cursor-pointer">White-Glove Shipping</span>
            <span className="hover:text-white transition-colors cursor-pointer">Architectural Trade Program</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
