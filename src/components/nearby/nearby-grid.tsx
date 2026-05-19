"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

import { usePreferences } from "@/components/layout/preference-provider";
import { getLocalizedNearbyPlaces } from "@/lib/data/site";

export function NearbyGrid() {
  const { language } = usePreferences();
  const nearbyPlaces = getLocalizedNearbyPlaces(language);

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {nearbyPlaces.map((place) => (
        <article key={place.id} className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] transition-shadow hover:shadow-[var(--shadow-md)]">
          <div className="relative aspect-[5/3] overflow-hidden bg-[var(--surface-soft)]">
            <Image src={place.imageUrl} alt={place.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="p-3.5 sm:p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)]">{place.name}</h3>
              <MapPin size={16} className="text-[var(--brand-clay)] shrink-0" />
            </div>
            <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm text-[var(--muted)]">{place.description}</p>
            <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] text-[var(--brand-olive)]">
              {place.distance} / {place.walkingTime}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
