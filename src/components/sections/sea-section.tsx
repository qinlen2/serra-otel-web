"use client";

import { Footprints, Waves } from "lucide-react";
import Image from "next/image";

import { usePreferences } from "@/components/layout/preference-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function SeaSection() {
  const { t, language } = usePreferences();
  const beachCards = {
    tr: [
      { title: "Denize sıfır", time: "1 dk", text: "Otelin hemen karşısında plaj var, yolu geçince denizdesiniz." },
      { title: "Limantepe sahili", time: "3 dk", text: "Antik liman kalıntıları eşliğinde deniz keyfi." },
      { title: "Çeşmealtı plajları", time: "Araçla 10 dk", text: "Mavi bayraklı geniş kumsallar." },
    ],
    en: [
      { title: "Beachfront", time: "1 min", text: "The beach is right across the road from the hotel." },
      { title: "Limantepe coast", time: "3 min", text: "Enjoy the sea alongside ancient harbor ruins." },
      { title: "Çeşmealtı beaches", time: "10 min drive", text: "Blue-flag sandy beaches nearby." },
    ],
    de: [
      { title: "Direkt am Strand", time: "1 Min.", text: "Der Strand liegt direkt gegenüber dem Hotel." },
      { title: "Limantepe Küste", time: "3 Min.", text: "Meergenuss neben antiken Hafenruinen." },
      { title: "Çeşmealtı Strände", time: "10 Min. Fahrt", text: "Blaue-Flagge-Sandstrände in der Nähe." },
    ],
  }[language];
  const walkLabel = {
    tr: "Denize mesafe",
    en: "To the beach",
    de: "Zum Strand",
  }[language];

  return (
    <section className="bg-[var(--surface-soft)] px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("seaEyebrow")} title={t("seaTitle")} description={t("seaText")} />
        </Reveal>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-[1fr_2fr]">
          {/* Hero card with sea image */}
          <Reveal variant="fadeLeft">
            <div className="relative h-full min-h-60 sm:min-h-72 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--brand-wood)] p-6 sm:p-8 text-white shadow-[var(--shadow-xl)]">
              <Image
                src="/serra/current/gallery-34.jpeg"
                alt="Serra Otel denize sıfır konum"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative flex h-full flex-col justify-end">
                <Waves size={28} className="text-[var(--brand-gold)]" />
                <p className="mt-6 sm:mt-8 text-xs font-medium uppercase tracking-[0.3em] text-white/60">{walkLabel}</p>
                <p className="mt-2 sm:mt-3 serif-heading text-4xl sm:text-5xl text-white/95">1 dk</p>
              </div>
            </div>
          </Reveal>

          {/* Beach info cards */}
          <RevealGroup stagger={0.1} className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
            {beachCards.map((card) => (
              <RevealItem key={card.title} variant="fadeUp">
                <Card className="h-full">
                  <CardContent>
                    <Footprints className="text-[var(--brand-gold)]" size={24} />
                    <h3 className="mt-6 sm:mt-8 serif-heading text-lg sm:text-xl text-[var(--foreground)]">{card.title}</h3>
                    <p className="mt-1.5 sm:mt-2 text-sm font-medium text-[var(--brand-sea)]">{card.time}</p>
                    <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm leading-6 text-[var(--muted)]">{card.text}</p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
