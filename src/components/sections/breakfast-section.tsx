"use client";

import { usePreferences } from "@/components/layout/preference-provider";
import { BreakfastGrid } from "@/components/breakfast/breakfast-grid";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function BreakfastSection() {
  const { t } = usePreferences();
  return (
    <section className="px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("breakfastEyebrow")} title={t("breakfastTitle")} description={t("breakfastText")} />
        </Reveal>
        <Reveal variant="fadeLeft" delay={0.1}>
          <BreakfastGrid />
        </Reveal>
      </div>
    </section>
  );
}
