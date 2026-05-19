"use client";

import { usePreferences } from "@/components/layout/preference-provider";
import { TransportGrid } from "@/components/transport/transport-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteSettings } from "@/lib/data/site";

export function TransportSection() {
  const { t } = usePreferences();
  return (
    <section className="px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("transportEyebrow")} title={t("transportTitle")} description={t("transportText")} />
        </Reveal>
        <Reveal variant="fadeRight" delay={0.1}>
          <TransportGrid />
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 sm:mt-12 text-center">
            <Button asChild size="lg" className="rounded-full">
              <a href={siteSettings.maps}>{t("directions")}</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
