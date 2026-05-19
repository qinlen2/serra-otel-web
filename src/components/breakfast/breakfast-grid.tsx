"use client";

import { Apple, Coffee, Cookie, Droplets, Egg, Grape, Leaf, Sandwich, Slice, Utensils } from "lucide-react";
import Image from "next/image";

import { usePreferences } from "@/components/layout/preference-provider";
import { getLocalizedBreakfastItems } from "@/lib/data/site";

export function BreakfastGrid() {
  const { language } = usePreferences();
  const headline = {
    tr: "Kahvaltınız personelimiz tarafından hazırlanır.",
    en: "Your breakfast is prepared by our team.",
    de: "Ihr Frühstück wird von unserem Team vorbereitet.",
  }[language];
  const items = getLocalizedBreakfastItems(language);
  const note = {
    tr: "Açık büfe değildir. Net, taze ve sakin bir kahvaltı düzeni sunulur.",
    en: "It is not an open buffet. The service is clear, fresh and calm.",
    de: "Es ist kein offenes Buffet. Der Service ist klar, frisch und ruhig.",
  }[language];
  
  const iconMap = {
    "breakfast-1": Egg, // Yumurta
    "breakfast-2": Sandwich, // Beyaz peynir
    "breakfast-3": Apple, // Domates
    "breakfast-4": Leaf, // Salatalık
    "breakfast-5": Grape, // Siyah zeytin
    "breakfast-6": Slice, // Tereyağı
    "breakfast-7": Droplets, // Bal
    "breakfast-8": Cookie, // Vişne reçeli
    "breakfast-9": Cookie, // Çokokrem
    "breakfast-10": Coffee, // Sınırsız çay
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Featured panel with image */}
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] min-h-[320px] md:min-h-[380px] shadow-[var(--shadow-xl)]">
        <Image
          src="/serra/current/kahvalti.jpeg"
          alt="Serra Otel kahvaltı hazırlığı"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        {/* Only a bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <Utensils className="mb-4 text-[var(--brand-gold)]" size={24} />
          <h3 className="serif-heading text-2xl text-white md:text-3xl">{headline}</h3>
          <p className="mt-3 text-sm leading-7 text-white/70">{note}</p>
        </div>
      </div>

      {/* Item grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => {
          const ItemIcon = iconMap[item.id as keyof typeof iconMap] || Utensils;
          return (
            <div
              key={item.id}
              className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-4 transition-all duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <ItemIcon
                className={item.isHighlighted ? "text-[var(--brand-gold)]" : "text-[var(--brand-olive)]"}
                size={18}
              />
              <p className="mt-5 font-medium text-[var(--foreground)]">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
