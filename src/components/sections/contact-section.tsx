"use client";

import { useEffect } from "react";

import { usePreferences } from "@/components/layout/preference-provider";
import { ReservationForm } from "@/components/contact/reservation-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Room } from "@/types/site";

export function ContactSection({ contextRoom }: { contextRoom?: Room }) {
  const { t } = usePreferences();

  /* Load Elfsight platform script once */
  useEffect(() => {
    if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("contactEyebrow")} title={t("contactTitle")} description={t("contactText")} />
        </Reveal>
        
        <div className="grid gap-5 sm:gap-6">
          <Reveal variant="fadeUp" delay={0.1}>
            <ReservationForm contextRoom={contextRoom} />
          </Reveal>

          {/* Elfsight Instagram Feed Widget */}
          <Reveal variant="scaleUp" delay={0.2}>
            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--line)] bg-white shadow-lg">
              <div
                className="elfsight-app-71ca82bf-1aff-4438-afc5-4e267dd16876"
                data-elfsight-app-lazy
              />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
