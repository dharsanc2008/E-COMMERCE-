import React from 'react';

export const CraftStorySection: React.FC = () => {
  return (
    <section id="provenance" className="w-full py-16 md:py-24 border-b border-[#EAE6DF] bg-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#7F786F] mb-2">
            The Atelier Standard · Material Honesty
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#1C1A18] leading-tight">
            Crafted without compromises or synthetic veneer.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C564E] leading-relaxed">
            Every object in our collection begins with unvarnished, heavy raw material. We prioritize tactile mass, renewable forestry, and metals that develop an organic patina rather than peel.
          </p>
        </div>

        {/* 3 Editorial Craft Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 sm:p-7 bg-[#FAF9F5] border border-[#E4DEC0] rounded-lg space-y-4">
            <span className="text-xs font-semibold text-[#8B8376] tracking-wider">
              01. Nordic Solid Timbers
            </span>
            <h3 className="font-serif-luxury text-xl text-[#1C1A18]">
              Continuous-Grain FSC White Oak
            </h3>
            <p className="text-xs sm:text-sm text-[#5B554D] leading-relaxed">
              We never use engineered particle boards or paper foils. Our timbers are kiln-dried slowly across 60 days to stabilize moisture content before being sculpted with mortise-and-tenon joints that withstand seasonal expansion.
            </p>
          </div>

          <div className="p-6 sm:p-7 bg-[#FAF9F5] border border-[#E4DEC0] rounded-lg space-y-4">
            <span className="text-xs font-semibold text-[#8B8376] tracking-wider">
              02. Unlacquered Metallurgy
            </span>
            <h3 className="font-serif-luxury text-xl text-[#1C1A18]">
              Solid Turned Billets & Lost-Wax Bronze
            </h3>
            <p className="text-xs sm:text-sm text-[#5B554D] leading-relaxed">
              Our ambient lighting bodies are lathe-turned from solid billets of raw brass. We deliberately omit synthetic chemical lacquers, allowing the metal to react to atmosphere and human touch to cultivate deep luster over decades.
            </p>
          </div>

          <div className="p-6 sm:p-7 bg-[#FAF9F5] border border-[#E4DEC0] rounded-lg space-y-4">
            <span className="text-xs font-semibold text-[#8B8376] tracking-wider">
              03. High-Fire Vitrified Clay
            </span>
            <h3 className="font-serif-luxury text-xl text-[#1C1A18]">
              1,280°C Architectural Ceramics
            </h3>
            <p className="text-xs sm:text-sm text-[#5B554D] leading-relaxed">
              Thrown on potter wheels in small artisanal batches. The iron flecks in the coarse clay body bloom under peak temperature, giving each fluted rim singular textural depth and complete water impermeability.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
