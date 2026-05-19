"use client";

import { usePreferences } from "@/components/layout/preference-provider";
import { HotelGallery } from "@/components/hotel/hotel-gallery";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function HotelTourSection() {
  const { t } = usePreferences();
  return (
    <section className="bg-[var(--surface-soft)] px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("hotelEyebrow")} title={t("hotelTitle")} description={t("hotelText")} />
        </Reveal>
        <Reveal variant="scaleUp" delay={0.15}>
          <HotelGallery />
        </Reveal>
      </div>
    </section>
  );
}
