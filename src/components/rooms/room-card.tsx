"use client";

import { BedDouble, Maximize2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePreferences } from "@/components/layout/preference-provider";
import type { Room } from "@/types/site";

export function RoomCard({ room }: { room: Room }) {
  const { language } = usePreferences();
  const cover = room.images.find((image) => image.isCover) ?? room.images[0];
  const copy = {
    tr: { guest: "kişi", bed: "Yatak", balcony: "Balkon" },
    en: { guest: "guests", bed: "Bed", balcony: "Balcony" },
    de: { guest: "Gäste", bed: "Bett", balcony: "Balkon" },
  }[language];

  return (
    <Link href={`/odalar/${room.slug}`} className="group block">
      <article className="overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-md)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-xl)] rounded-[var(--radius-lg)]">
        {/* Image – clean full-bleed cover, no arch frame */}
        <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-[var(--surface-soft)]">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Balcony badge */}
          {room.hasBalcony ? (
            <span className="absolute right-3 top-3 rounded-full bg-[var(--brand-gold)] px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
              {copy.balcony}
            </span>
          ) : null}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          <h3 className="serif-heading text-base sm:text-lg text-[var(--foreground)] md:text-xl leading-snug">{room.name}</h3>
          <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm leading-6 text-[var(--muted)] line-clamp-2">{room.shortDescription}</p>

          <div className="mt-4 sm:mt-5 flex items-center gap-3 sm:gap-4 border-t border-[var(--line)] pt-3 sm:pt-4 text-[11px] sm:text-xs text-[var(--muted)]">
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-[var(--brand-sea)]" /> {room.capacity} {copy.guest}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} className="text-[var(--brand-sea)]" /> {copy.bed}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 size={14} className="text-[var(--brand-sea)]" /> {room.size}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
