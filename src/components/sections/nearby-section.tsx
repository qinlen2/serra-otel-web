"use client";

import { usePreferences } from "@/components/layout/preference-provider";
import { NearbyGrid } from "@/components/nearby/nearby-grid";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function NearbySection() {
  const { t } = usePreferences();
  return (
    <section className="bg-[var(--surface-soft)] px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("nearbyEyebrow")} title={t("nearbyTitle")} description={t("nearbyText")} />
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <NearbyGrid />
        </Reveal>
      </div>
    </section>
  );
}
