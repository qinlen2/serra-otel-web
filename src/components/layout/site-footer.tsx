"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { usePreferences } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, siteSettings } from "@/lib/data/site";

export function SiteFooter() {
  const { t, language } = usePreferences();
  const copy = {
    tr: {
      text: "Urla'da denize yakın, sade ve samimi butik konaklama.",
      rooms: "Odalar",
      breakfast: "Kahvaltı",
      hotel: "Oteli Gez",
      nearby: "Çevre",
      transport: "Ulaşım",
      call: "Resepsiyonu ara",
      rights: "Tüm Hakları Saklıdır.",
      landline: "Sabit hat",
      whatsappLabel: "WhatsApp",
    },
    en: {
      text: "A simple, warm boutique stay close to the sea in Urla.",
      rooms: "Rooms",
      breakfast: "Breakfast",
      hotel: "Explore Hotel",
      nearby: "Nearby",
      transport: "Transport",
      call: "Call reception",
      rights: "All Rights Reserved.",
      landline: "Landline",
      whatsappLabel: "WhatsApp",
    },
    de: {
      text: "Ein schlichter, warmer Boutique-Aufenthalt nahe am Meer in Urla.",
      rooms: "Zimmer",
      breakfast: "Frühstück",
      hotel: "Hotel erkunden",
      nearby: "Umgebung",
      transport: "Anreise",
      call: "Rezeption anrufen",
      rights: "Alle Rechte vorbehalten.",
      landline: "Festnetz",
      whatsappLabel: "WhatsApp",
    },
  }[language];

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--brand-sea)] pb-28 pt-16 md:pt-24 text-white/90 lg:pb-16 mt-auto">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand & CTA */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[var(--brand-gold)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-gold)]">
                Est. Urla · İzmir
              </span>
            </div>
            <p className="serif-heading mt-6 text-4xl text-white/95">Serra Otel</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{copy.text}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10">
                <a href={`tel:${siteSettings.phoneLandline}`}>
                  <Phone size={14} className="mr-1.5" />
                  {copy.call}
                </a>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10">
                <a href={getWhatsAppUrl(language)}>
                  <MessageCircle size={14} className="mr-1.5" />
                  {copy.whatsappLabel}
                </a>
              </Button>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">{t("footerNav")}</p>
            <div className="flex flex-col gap-3.5 text-[13px] font-medium">
              <Link href="/" className="text-white/70 transition hover:text-white">{t("footerHome")}</Link>
              <Link href="/odalar" className="text-white/70 transition hover:text-white">{copy.rooms}</Link>
              <Link href="/otel" className="text-white/70 transition hover:text-white">{copy.hotel}</Link>
              <Link href="/kahvalti" className="text-white/70 transition hover:text-white">{copy.breakfast}</Link>
              <Link href="/cevre" className="text-white/70 transition hover:text-white">{copy.nearby}</Link>
              <Link href="/ulasim" className="text-white/70 transition hover:text-white">{copy.transport}</Link>
              <Link href="/iletisim" className="text-white/70 transition hover:text-white">{t("contact")}</Link>
            </div>
          </div>

          {/* Contact & Location — Local SEO */}
          <div className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">{t("footerContact")}</p>
            <div className="flex flex-col gap-4 text-[13px] font-medium text-white/70">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--brand-gold)]" />
                <p className="leading-relaxed">{siteSettings.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-[var(--brand-gold)]" />
                <div>
                  <a href={`tel:${siteSettings.phoneLandline}`} className="block text-white/90 hover:text-white transition">
                    +90 232 752 01 10
                  </a>
                  <span className="text-[11px] text-white/40">{copy.landline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="shrink-0 text-[#25D366]" />
                <div>
                  <a href={getWhatsAppUrl(language)} className="block text-white/90 hover:text-white transition">
                    +90 541 373 84 20
                  </a>
                  <span className="text-[11px] text-white/40">{copy.whatsappLabel}</span>
                </div>
              </div>
              <a href={siteSettings.maps} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition">
                <MapPin size={13} />
                Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 sm:mt-24 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-[10px] text-white/40 uppercase tracking-widest font-semibold gap-6">
          <p>© {new Date().getFullYear()} Serra Otel Urla. {copy.rights}</p>
          <div className="flex gap-6">
            <Link href="/gizlilik" className="hover:text-white transition">{t("footerPrivacy")}</Link>
            <Link href="/iptal-kosullari" className="hover:text-white transition">{t("footerCancel")}</Link>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
