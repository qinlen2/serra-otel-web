import { BreakfastSection } from "@/components/sections/breakfast-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HotelTourSection } from "@/components/sections/hotel-tour-section";
import { NearbySection } from "@/components/sections/nearby-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { RoomsShowcase } from "@/components/sections/rooms-showcase";
import { SeaSection } from "@/components/sections/sea-section";
import { TransportSection } from "@/components/sections/transport-section";
import { WeatherSection } from "@/components/sections/weather-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />

      {/* 1. Odalar — "Nerede kalacağım?" */}
      <div className="bg-white border-y border-[var(--line)]/50">
        <RoomsShowcase limit={6} />
      </div>

      {/* 2. Yorumlar — Sosyal kanıt, erken güven */}
      <ReviewsSection />

      {/* 3. Otel Turu — "Otel nasıl bir yer?" */}
      <HotelTourSection />

      {/* 4. Kahvaltı — Duyusal deneyim */}
      <div className="bg-[var(--brand-sand)]/20 border-y border-[var(--brand-olive)]/10">
        <BreakfastSection />
      </div>

      {/* 5. Deniz & Plaj — Lokasyon avantajı */}
      <SeaSection />

      {/* 6. Hava Durumu */}
      <WeatherSection />

      {/* 7. Çevre & Keşif — Motivasyon */}
      <NearbySection />

      {/* 8. Ulaşım — "Nasıl giderim?" */}
      <div className="bg-white border-y border-[var(--line)]/50">
        <TransportSection />
      </div>

      {/* 9. İletişim & Rezervasyon — CTA */}
      <ContactSection />
    </main>
  );
}
