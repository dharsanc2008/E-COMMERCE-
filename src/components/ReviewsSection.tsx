import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  studio: string;
  location: string;
  productAcquired: string;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Julian Thorensen',
    role: 'Principal Architect',
    studio: 'Thorensen & Arkitekter',
    location: 'Copenhagen, Denmark',
    productAcquired: 'Møller Sculptural Lounge Chair (Pair)',
    quote:
      'We specified two Møller chairs for a coastal pavilion residence in Tisvildeleje. The timber joinery is genuinely seamless, and the wool bouclé has held its dimensional tension through daily use. Exceptional craftsmanship.',
  },
  {
    id: 'rev-2',
    name: 'Camilla Moreau',
    role: 'Interior Design Director',
    studio: 'Studio Saint-Germain',
    location: 'Paris, France',
    productAcquired: 'Aethel Portable Ambient Lamps',
    quote:
      'The dim-to-warm curve of the Aethel lamp is the most natural candle-tone LED we have tested. The solid turned brass gives it real physical presence on client dining tables. We now order them for nearly every hospitality project.',
  },
  {
    id: 'rev-3',
    name: 'Kenji Takahashi',
    role: 'Architectural Director',
    studio: 'K/T Objects & Space',
    location: 'Kyoto, Japan',
    productAcquired: 'Columnar Fluted Ceramic Vessels',
    quote:
      'The fluting rhythm and volcanic slip glaze embody classic wabi-sabi principles without being derivative. It anchors our reception console with quiet gravity and water-tight reliability.',
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-20 border-b border-[#EAE6DF] bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EAE6DF]">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7C756B] mb-1.5">
              Verified Studio Engagements
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#1C1A18]">
              Installed in discerning spaces worldwide.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-[#6B655D] flex items-center gap-2">
            <span className="font-semibold text-[#1C1A18] tabular-nums">4.9 / 5.0</span>
            <span aria-hidden="true">·</span>
            <span>Based on 320+ verified residential & studio installations</span>
          </div>
        </div>

        {/* 3 Attributable Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-[#F5F2EB] border border-[#E2DDD3] rounded-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#C19846]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#46413A] italic leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E4DEC0] text-xs">
                <p className="font-semibold text-[#1C1A18]">{review.name}</p>
                <p className="text-[11px] text-[#69635A]">
                  {review.role}, {review.studio}
                </p>
                <p className="text-[11px] text-[#868075] mt-1">
                  Installed: <span className="text-[#36322C] font-medium">{review.productAcquired}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
