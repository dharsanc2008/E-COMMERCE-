import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExplore: () => void;
  onSelectCategory: (category: 'furniture' | 'lighting' | 'ceramics' | 'textiles') => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSelectCategory }) => {
  return (
    <section className="relative w-full border-b border-[#EAE6DF] overflow-hidden bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C756C]">
              <span>Spring / Summer Atelier 2026</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Living</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif-luxury tracking-tight text-[#1C1A18] leading-[1.08] text-balance">
              Sculptural forms crafted for enduring interiors.
            </h1>

            <p className="text-base sm:text-lg text-[#5A554E] max-w-xl font-light leading-relaxed">
              PA Atelier produces limited-run furniture, cast-brass ambient lighting, and hand-thrown vessels. Monolithic materiality engineered to live across generations.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 bg-[#1C1A18] text-[#FAF9F5] text-xs uppercase tracking-wider font-semibold rounded-md hover:bg-[#34322F] transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectCategory('furniture')}
                className="px-5 py-3.5 border border-[#D5CEC2] text-[#1C1A18] text-xs uppercase tracking-wider font-medium rounded-md hover:border-[#1C1A18] hover:bg-white transition-colors"
              >
                Furniture Collection
              </button>
            </div>

            {/* Quiet trust markers adjacent to Hero */}
            <div className="pt-6 border-t border-[#EAE6DF] grid grid-cols-3 gap-4 text-xs text-[#6E675E]">
              <div>
                <p className="font-semibold text-[#1C1A18]">FSC-Certified</p>
                <p className="text-[11px] text-[#7C756C] mt-0.5">Sustainably felled Nordic timbers</p>
              </div>
              <div>
                <p className="font-semibold text-[#1C1A18]">Cast Metallurgy</p>
                <p className="text-[11px] text-[#7C756C] mt-0.5">Solid billets, zero plating</p>
              </div>
              <div>
                <p className="font-semibold text-[#1C1A18]">White Glove</p>
                <p className="text-[11px] text-[#7C756C] mt-0.5">Insured global parcel & freight</p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Hero Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-lg overflow-hidden bg-[#ECE8DF] border border-[#E2DDD3] shadow-md group">
              <img
                src={HERO_IMAGE}
                alt="PA Atelier Modern Architectural Interior and Solis Table"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              
              {/* Subtle architectural vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between pointer-events-none">
                <span className="font-serif-luxury text-sm tracking-wide">
                  Pavilion Residence, Space No. 04
                </span>
                <span className="text-[11px] text-white/80 tabular-nums">
                  Aethel Lamp · Møller Chair · Solis Slab
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
