"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { usePreferences } from "@/components/layout/preference-provider";
import type { Language } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
import { getLocalizedHotelAreas } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";
import type { HotelAreaType } from "@/types/site";

export function HotelGallery() {
  const { language } = usePreferences();
  const [active, setActive] = useState<HotelAreaType | "all">("all");
  const hotelAreas = getLocalizedHotelAreas(language);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filters = ({
    tr: [
      { label: "Tümü", value: "all" },
      { label: "Resepsiyon", value: "reception" },
      { label: "Yemek Alanı", value: "dining" },
      { label: "Ortak Alanlar", value: "common" },
      { label: "Dış Alan", value: "exterior" },
    ],
    en: [
      { label: "All", value: "all" },
      { label: "Reception", value: "reception" },
      { label: "Dining", value: "dining" },
      { label: "Common Areas", value: "common" },
      { label: "Exterior", value: "exterior" },
    ],
    de: [
      { label: "Alle", value: "all" },
      { label: "Rezeption", value: "reception" },
      { label: "Essbereich", value: "dining" },
      { label: "Gemeinschaft", value: "common" },
      { label: "Aussen", value: "exterior" },
    ],
  } satisfies Record<Language, { label: string; value: HotelAreaType | "all" }[]>)[language];
  const areas = useMemo(() => (active === "all" ? hotelAreas : hotelAreas.filter((area) => area.type === active)), [active, hotelAreas]);

  const lightboxImages = areas.map((area) => ({ url: area.imageUrl, alt: area.title }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {/* Filter pills – horizontally scrollable on mobile */}
      <div className="mb-5 sm:mb-6 flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            size="sm"
            variant={active === filter.value ? "default" : "outline"}
            className="shrink-0 rounded-full text-[12px] sm:text-sm"
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Gallery grid – responsive */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
        {areas.map((area, index) => (
          <article
            key={area.id}
            className={cn(
              "group cursor-pointer sm:col-span-1 md:col-span-6 lg:col-span-4",
              index === 0 && "md:col-span-7 lg:col-span-7",
              index === 1 && "md:col-span-5 lg:col-span-5",
            )}
            onClick={() => openLightbox(index)}
          >
            <div className={cn(
              "img-zoom relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-soft)]",
              index < 2 ? "aspect-[16/10]" : "aspect-[4/3]",
            )}>
              <Image
                src={area.imageUrl}
                alt={area.title}
                fill
                sizes="(min-width: 1024px) 52vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Expand icon on hover */}
              <div className="absolute right-3 top-3 rounded-full bg-white/10 p-2 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <Expand size={16} className="text-white" />
              </div>

              {/* Gold accent line */}
              <div className="absolute left-3 sm:left-4 top-3 sm:top-4 h-0.5 w-8 sm:w-10 rounded-full bg-[var(--brand-gold)] shadow-[0_0_16px_rgba(77,157,165,0.4)]" />

              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 text-white">
                <h3 className="serif-heading text-base sm:text-lg md:text-xl">{area.title}</h3>
                <p className="mt-1 sm:mt-1.5 max-w-sm text-[12px] sm:text-sm leading-5 text-white/70">{area.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
