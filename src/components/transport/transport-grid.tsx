import { Bus, Car, MapPinned, Plane, Route } from "lucide-react";

import { usePreferences } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";
import { getLocalizedTransportRoutes, siteSettings } from "@/lib/data/site";
import type { TransportRouteType } from "@/types/site";

const icons: Record<TransportRouteType, typeof Bus> = {
  bus: Bus,
  minibus: Route,
  car: Car,
  airport: Plane,
  izmir_center: MapPinned,
};

export function TransportGrid() {
  const { language } = usePreferences();
  const transportRoutes = getLocalizedTransportRoutes(language);
  const copy = {
    tr: { time: "Süre", stop: "Durak", walk: "Yürüme", maps: "Google Maps" },
    en: { time: "Time", stop: "Stop", walk: "Walk", maps: "Google Maps" },
    de: { time: "Dauer", stop: "Haltestelle", walk: "Weg", maps: "Google Maps" },
  }[language];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {transportRoutes.map((route) => {
        const Icon = icons[route.type];
        return (
          <div key={route.id} className="group relative overflow-hidden bg-[var(--surface)] p-8 md:p-10 border border-[var(--line)] shadow-[var(--shadow-sm)] transition-all duration-500 hover:shadow-[var(--shadow-xl)] hover:-translate-y-1 rounded-[var(--radius-lg)]">
            {/* Elegant corner accent */}
            <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="block h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-soft)] text-[var(--brand-sea)] border border-[var(--line)] mb-8 transition-transform duration-500 group-hover:scale-110">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="serif-heading text-2xl text-[var(--foreground)]">{route.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)] flex-grow">{route.description}</p>
              
              <div className="mt-10 space-y-4 text-[14px]">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span className="font-medium text-[var(--muted)]">{copy.time}</span>
                  <span className="text-[var(--foreground)] font-semibold">{route.estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span className="font-medium text-[var(--muted)]">{copy.stop}</span>
                  <span className="text-[var(--foreground)] font-semibold">{route.stopName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span className="font-medium text-[var(--muted)]">{copy.walk}</span>
                  <span className="text-[var(--foreground)] font-semibold">{route.walkingDistance}</span>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild className="w-full bg-[var(--surface-soft)] text-[var(--foreground)] hover:bg-[var(--brand-sea)] hover:text-white border border-[var(--line)] hover:border-[var(--brand-sea)] transition-colors h-12 shadow-none font-medium">
                  <a href={siteSettings.maps} target="_blank" rel="noreferrer">{copy.maps}</a>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
