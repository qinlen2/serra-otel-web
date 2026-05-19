"use client";

import { Compass, Grape, Landmark, MapPin, Sailboat, Star, TreePalm, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePreferences } from "@/components/layout/preference-provider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import { getGuideSections } from "@/lib/data/guide-data";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */


const sources = [
  { name: "Enuygun – Urla Gezi Rehberi", url: "https://www.enuygun.com/seyahat-rehberi/urlada-gezilecek-yerler/" },
  { name: "Gezinomi – Urla Plajları", url: "https://www.gezinomi.com/blog/urla-plajlari" },
  { name: "Gezimanya – Urla Gezilecek Yerler", url: "https://gezimanya.com/urla/gezilecek-yerler" },
  { name: "Michelin Guide Türkiye", url: "https://guide.michelin.com/tr/tr" },
  { name: "Green Destinations – Urla Bağ Yolu", url: "https://www.greendestinations.org/" },
  { name: "ESHOT – Hat Bilgileri", url: "https://www.eshot.gov.tr/" },
];

const uiCopy = {
  tr: {
    heroEyebrow: "Serra Otel Misafirlerine Özel",
    heroTitle: "Urla Rehberi",
    heroDesc: "Antik kalıntılardan Michelin yıldızlı restoranlara, bakir koylardan şarap bağlarına — Urla\u2019nın en özel köşelerini keşfedin.",
    ctaTitle: "Urla\u2019yı keşfetmeye hazır mısınız?",
    ctaDesc: "Serra Otel\u2019de konaklamanızı planlayın ve tüm bu güzelliklere birkaç dakika mesafede olun.",
    ctaReserve: "Rezervasyon Talebi",
    ctaRooms: "Odaları İncele",
    sourcesTitle: "Kaynaklar & Referanslar",
    sourcesDesc: "Bu rehberdeki bilgiler aşağıdaki kaynaklardan derlenmiştir.",
    tipLabel: "İpucu:",
  },
  en: {
    heroEyebrow: "Exclusive for Serra Hotel Guests",
    heroTitle: "Urla Guide",
    heroDesc: "From ancient ruins to Michelin-starred restaurants, pristine coves to wine routes — discover Urla\u2019s most special corners.",
    ctaTitle: "Ready to explore Urla?",
    ctaDesc: "Plan your stay at Serra Hotel and be just minutes away from all these wonders.",
    ctaReserve: "Reservation Request",
    ctaRooms: "View Rooms",
    sourcesTitle: "Sources & References",
    sourcesDesc: "Information in this guide is compiled from the following sources.",
    tipLabel: "Tip:",
  },
  de: {
    heroEyebrow: "Exklusiv für Serra Hotel Gäste",
    heroTitle: "Urla Reiseführer",
    heroDesc: "Von antiken Ruinen bis zu Michelin-Stern-Restaurants, unberührten Buchten bis zu Weinstraßen — entdecken Sie Urlas besonderste Ecken.",
    ctaTitle: "Bereit, Urla zu entdecken?",
    ctaDesc: "Planen Sie Ihren Aufenthalt im Serra Hotel und seien Sie nur wenige Minuten von all diesen Schönheiten entfernt.",
    ctaReserve: "Reservierungsanfrage",
    ctaRooms: "Zimmer ansehen",
    sourcesTitle: "Quellen & Referenzen",
    sourcesDesc: "Die Informationen in diesem Reiseführer stammen aus folgenden Quellen.",
    tipLabel: "Tipp:",
  },
} as const;


/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function UrlaGuide() {
  const { language } = usePreferences();
  const copy = uiCopy[language];
  const sections = getGuideSections(language);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[var(--brand-sea)] py-28 md:py-36">
        <div className="absolute inset-0">
          <Image
            src="/serra/nearby/guvendik-tepesi.png"
            alt="Urla panoramik manzara"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-sea)]/80 to-[var(--brand-sea)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <Reveal variant="blurUp">
            <div className="mb-5 flex items-center justify-center gap-3">
              <MapPin size={18} className="text-[var(--brand-gold)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/60">
                {copy.heroEyebrow}
              </span>
            </div>
            <h1 className="serif-heading text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {copy.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 md:text-lg">
              {copy.heroDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick nav */}
      <Reveal variant="fadeUp">
        <nav className="sticky top-[4.5rem] z-30 border-b border-[var(--line)] bg-[var(--surface-glass)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-5 py-2.5 md:justify-center md:gap-2 scrollbar-none">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2 text-[12px] font-semibold text-[var(--muted)] transition-all hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)] hover:border-[var(--brand-gold)]/30"
              >
                <s.icon size={14} className="text-[var(--brand-gold)]" />
                {s.eyebrow}
              </a>
            ))}
          </div>
        </nav>
      </Reveal>

      {/* Sections */}
      {sections.map((section, sIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`px-4 py-16 sm:px-5 sm:py-20 md:px-8 md:py-28 ${sIdx % 2 === 1 ? "bg-[var(--surface-soft)]" : ""}`}
        >
          <div className="mx-auto max-w-7xl">
            <Reveal variant="blurUp">
              <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.intro} />
            </Reveal>

            <RevealGroup stagger={0.12} className="grid gap-8 md:gap-10">
              {section.items.map((item) => (
                <RevealItem key={item.name} variant="fadeUp">
                  <article className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition-shadow hover:shadow-xl">
                    <div className="grid md:grid-cols-[1fr_1.5fr]">
                      {/* Image */}
                      <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                        {item.distance && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                            <MapPin size={12} />
                            {item.distance}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                        <h3 className="serif-heading text-xl text-[var(--foreground)] sm:text-2xl md:text-[1.65rem]">
                          {item.name}
                        </h3>
                        <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)] md:text-[15px]">
                          {item.description}
                        </p>
                        {item.detail && (
                          <p className="mt-3 flex items-center gap-2 text-[12px] font-medium text-[var(--brand-sea)]">
                            <Sailboat size={14} />
                            {item.detail}
                          </p>
                        )}
                        {item.tip && (
                          <div className="mt-4 rounded-xl bg-[var(--brand-gold)]/8 border border-[var(--brand-gold)]/15 px-4 py-3">
                            <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[var(--foreground)]">
                              <Star size={14} className="mt-0.5 shrink-0 text-[var(--brand-gold)]" />
                              <span><strong className="text-[var(--brand-clay)]">{copy.tipLabel}</strong> {item.tip}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      {/* CTA Band */}
      <section className="bg-[var(--brand-sea)] px-5 py-14 md:py-20 text-center">
        <Reveal variant="scaleUp">
          <h2 className="serif-heading text-2xl text-white sm:text-3xl md:text-4xl">
            {copy.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-white/60 md:text-[15px]">
            {copy.ctaDesc}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/iletisim"
              className="inline-flex h-12 items-center rounded-full bg-white px-8 text-[14px] font-semibold text-[var(--brand-sea)] shadow-lg transition-all hover:bg-white/90 hover:-translate-y-0.5"
            >
              {copy.ctaReserve}
            </Link>
            <Link
              href="/odalar"
              className="inline-flex h-12 items-center rounded-full border border-white/25 bg-white/5 px-8 text-[14px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/15 hover:-translate-y-0.5"
            >
              {copy.ctaRooms}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Sources */}
      <section className="border-t border-[var(--line)] bg-[var(--surface-soft)] px-5 py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <Reveal variant="fadeUp">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--muted)]">
              {copy.sourcesTitle}
            </h3>
            <p className="mt-2 text-[13px] text-[var(--muted)]">
              {copy.sourcesDesc}
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[12px] font-medium text-[var(--brand-sea)] transition-all hover:bg-[var(--surface-soft)] hover:shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-gold)]" />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
