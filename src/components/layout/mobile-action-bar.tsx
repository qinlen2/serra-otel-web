"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";

import { usePreferences } from "@/components/layout/preference-provider";
import { getWhatsAppUrl, siteSettings } from "@/lib/data/site";

export function MobileActionBar() {
  const { t, language } = usePreferences();
  const items = [
    { label: t("call"), href: `tel:${siteSettings.phone}`, icon: Phone },
    { label: "WhatsApp", href: getWhatsAppUrl(language), icon: MessageCircle },
    { label: t("directions"), href: siteSettings.maps, icon: MapPin },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--surface-glass)] px-3 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className="flex h-12 flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-soft)] text-[11px] font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]"
          >
            <item.icon
              size={17}
              className={index === 1 ? "text-[var(--brand-sea)]" : "text-[var(--brand-wood)]"}
            />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
