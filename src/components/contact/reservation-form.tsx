"use client";

import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

import { usePreferences } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, siteSettings } from "@/lib/data/site";
import type { Room } from "@/types/site";

export function ReservationForm({ contextRoom }: { contextRoom?: Room }) {
  const { language } = usePreferences();
  
  const copy = {
    tr: {
      noPayment: "Hızlı İletişim",
      title: contextRoom ? `${contextRoom.name} Rezervasyonu` : "İletişime Geçin",
      text: contextRoom 
        ? "Form doldurmanıza gerek yok. Aşağıdaki butonlardan birine tıklayarak bu oda hakkında hızlıca bilgi alabilir veya rezervasyon yaptırabilirsiniz."
        : "Form doldurmanıza gerek yok. Bize WhatsApp üzerinden veya telefonla ulaşarak doğrudan yer ayırtabilirsiniz.",
      call: "Telefonla Ara",
      whatsapp: "WhatsApp ile İletişime Geç",
    },
    en: {
      noPayment: "Quick Contact",
      title: contextRoom ? `${contextRoom.name} Reservation` : "Get in Touch",
      text: contextRoom
        ? "No need to fill out forms. Click one of the buttons below to quickly get information or book this room."
        : "No need to fill out forms. You can directly book a room by contacting us via WhatsApp or phone.",
      call: "Call Us",
      whatsapp: "Contact via WhatsApp",
    },
    de: {
      noPayment: "Schnellkontakt",
      title: contextRoom ? `${contextRoom.name} Reservierung` : "Kontakt aufnehmen",
      text: contextRoom
        ? "Kein Formular ausfüllen. Klicken Sie auf eine der unteren Schaltflächen, um Informationen zu erhalten oder dieses Zimmer zu buchen."
        : "Kein Formular ausfüllen. Sie können ein Zimmer direkt buchen, indem Sie uns über WhatsApp oder telefonisch kontaktieren.",
      call: "Rufen Sie uns an",
      whatsapp: "Kontakt über WhatsApp",
    },
  }[language];

  // If a room is passed, we append its name to the WhatsApp message
  const whatsappUrl = getWhatsAppUrl(language, contextRoom?.name);

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--brand-wood)] p-8 text-white shadow-[var(--shadow-xl)] md:p-12 max-w-4xl mx-auto">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/serra/current/gallery-01.jpeg"
          alt="Serra Otel"
          fill
          sizes="(min-width: 1024px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-wood)] via-[var(--brand-wood)]/90 to-[var(--brand-wood)]/40" />
      
      <div className="relative max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="h-px w-5 bg-[var(--brand-gold)]" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">{copy.noPayment}</p>
        </div>
        <h3 className="serif-heading mt-5 text-3xl md:text-5xl text-white/95">{copy.title}</h3>
        <p className="mt-6 text-base md:text-lg leading-8 text-white/70">{copy.text}</p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full bg-[var(--brand-sea)] hover:bg-[var(--brand-sea)]/80 text-white shadow-lg border-none hover:scale-105 transition-transform">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> 
              {copy.whatsapp}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/[0.06] text-white hover:bg-white/10 hover:scale-105 transition-transform">
            <a href={`tel:${siteSettings.phone}`}>
              <Phone size={20} /> 
              {copy.call}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
