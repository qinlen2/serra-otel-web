"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import { safeStorageGet, safeStorageRemove, safeStorageSet } from "@/lib/utils/browser-storage";

type ThemeMode = "light" | "dim" | "dark";
export type Language = "tr" | "en" | "de";

type PreferenceContextValue = {
  theme: ThemeMode;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof copy.tr) => string;
};

const copy = {
  tr: {
    rooms: "Odalar",
    hotel: "Oteli Gez",
    breakfast: "Kahvaltı",
    transport: "Ulaşım",
    nearby: "Çevre",
    urlaGuide: "Urla Rehberi",
    contact: "İletişim",
    call: "Ara",
    request: "Rezervasyon Talebi",
    language: "Dil",
    personal: "Kişisel deneyim",
    discover: "Keşfet",
    footerNav: "Navigasyon",
    footerContact: "İletişim & Konum",
    footerHome: "Ana Sayfa",
    footerPrivacy: "Gizlilik Politikası",
    footerCancel: "İptal Koşulları",
    heroTitle: "Denize sıfır, sakin bir Urla konaklaması.",
    heroText: "7 odalı butik otel. Yarım pansiyon. Deniz karşınızda, kahvaltı dahil.",
    heroRooms: "7 oda",
    heroBoard: "Yarım pansiyon",
    heroSea: "Denize sıfır",
    viewRooms: "Odaları İncele",
    directions: "Yol Tarifi Al",
    callReception: "Resepsiyonu ara",
    roomsEyebrow: "Oda vitrini",
    roomsTitle: "Odanızı gelmeden görün.",
    roomsText: "7 odalı butik yapı. Her oda sade, aydınlık ve net bilgilerle hazır.",
    allRooms: "Tüm Odaları İncele",
    hotelEyebrow: "Oteli gez",
    hotelTitle: "Varıştan önce içeri bakın.",
    hotelText: "Resepsiyon, yemek alanı, ortak alanlar ve giriş noktalarını filtreleyin.",
    breakfastEyebrow: "Yarım pansiyon",
    breakfastTitle: "Duru ve net kahvaltı.",
    breakfastText: "Gününüz sade, hazır ve sınırsız çayla başlar.",
    seaEyebrow: "Denize sıfır",
    seaTitle: "Plaj otelin hemen karşısında.",
    seaText: "Yolu geçince denizdesiniz. Limantepe sahili 3 dakika, Çeşmealtı plajları araçla 10 dakika.",
    transportEyebrow: "Ulaşım rehberi",
    transportTitle: "Serra Otel'e nasıl gelirsiniz?",
    transportText: "ESHOT 984 ve 738 hat, dolmuş, özel araç ve havalimanı transferi seçenekleri aşağıda.",
    nearbyEyebrow: "Keşfedilecek yerler",
    nearbyTitle: "Urla'nın en güzel noktaları.",
    nearbyText: "Antik kalıntılar, şarap bağları, sanat sokakları ve Michelin yıldızlı restoranlar yakınınızda.",
    contactEyebrow: "Rezervasyon talebi",
    contactTitle: "Konaklamanızı planlayalım.",
    contactText: "Formu gönderin, Serra Otel size dönsün. Online ödeme yoktur.",
    weatherTitle: "Urla havası",
    wind: "rüzgar",
    humidity: "nem",
    seaBreak: "Deniz molası",
    reviewsEyebrow: "Misafir yorumları",
    reviewsTitle: "Konuklarımız ne diyor?",
    reviewsText: "Google üzerinden doğrulanmış misafir deneyimleri.",
  },
  en: {
    rooms: "Rooms",
    hotel: "Explore",
    breakfast: "Breakfast",
    transport: "Transport",
    nearby: "Nearby",
    urlaGuide: "Urla Guide",
    contact: "Contact",
    call: "Call",
    request: "Reservation Request",
    language: "Language",
    personal: "Personal stay",
    discover: "Discover",
    footerNav: "Navigation",
    footerContact: "Contact & Location",
    footerHome: "Home",
    footerPrivacy: "Privacy Policy",
    footerCancel: "Cancellation Policy",
    heroTitle: "A beachfront boutique stay in Urla.",
    heroText: "A 7-room boutique hotel. Half board. The beach is right across the road.",
    heroRooms: "7 rooms",
    heroBoard: "Half board",
    heroSea: "Beachfront",
    viewRooms: "View Rooms",
    directions: "Get Directions",
    callReception: "Call reception",
    roomsEyebrow: "Room showcase",
    roomsTitle: "See your room before arrival.",
    roomsText: "A boutique 7-room setting with clear, calm room details.",
    allRooms: "View All Rooms",
    hotelEyebrow: "Explore hotel",
    hotelTitle: "Step inside before you arrive.",
    hotelText: "Filter reception, dining, common areas and entrance views.",
    breakfastEyebrow: "Half board",
    breakfastTitle: "Simple, honest breakfast.",
    breakfastText: "Your day starts calmly with prepared service and unlimited tea.",
    seaEyebrow: "Beachfront",
    seaTitle: "The beach is right across the road.",
    seaText: "Cross the road and you're at the sea. Limantepe coast 3 minutes, Çeşmealtı beaches 10 minutes by car.",
    transportEyebrow: "Getting here",
    transportTitle: "How to reach Serra Hotel.",
    transportText: "ESHOT bus lines 984 & 738, dolmuş, private car and airport transfer options below.",
    nearbyEyebrow: "Places to explore",
    nearbyTitle: "Urla's finest spots.",
    nearbyText: "Ancient ruins, wine routes, art streets and Michelin-starred restaurants nearby.",
    contactEyebrow: "Reservation request",
    contactTitle: "Let us plan your stay.",
    contactText: "Send the form and Serra Otel will contact you. No online payment.",
    weatherTitle: "Urla weather",
    wind: "wind",
    humidity: "humidity",
    seaBreak: "Sea break",
    reviewsEyebrow: "Guest reviews",
    reviewsTitle: "What our guests say",
    reviewsText: "Verified guest experiences from Google.",
  },
  de: {
    rooms: "Zimmer",
    hotel: "Hotel erkunden",
    breakfast: "Frühstück",
    transport: "Anreise",
    nearby: "Umgebung",
    urlaGuide: "Urla Reiseführer",
    contact: "Kontakt",
    call: "Anrufen",
    request: "Anfrage",
    language: "Sprache",
    personal: "Persönlicher Aufenthalt",
    discover: "Entdecken",
    footerNav: "Navigation",
    footerContact: "Kontakt & Standort",
    footerHome: "Startseite",
    footerPrivacy: "Datenschutz",
    footerCancel: "Stornierung",
    heroTitle: "Direkt am Strand in Urla.",
    heroText: "Ein Boutique-Hotel mit 7 Zimmern. Halbpension. Der Strand ist direkt gegenüber.",
    heroRooms: "7 Zimmer",
    heroBoard: "Halbpension",
    heroSea: "Am Strand",
    viewRooms: "Zimmer ansehen",
    directions: "Route anzeigen",
    callReception: "Rezeption anrufen",
    roomsEyebrow: "Zimmerauswahl",
    roomsTitle: "Sehen Sie Ihr Zimmer vor der Anreise.",
    roomsText: "Ein Boutique-Haus mit 7 Zimmern und klaren, ruhigen Details.",
    allRooms: "Alle Zimmer ansehen",
    hotelEyebrow: "Hotel erkunden",
    hotelTitle: "Vor der Ankunft eintreten.",
    hotelText: "Rezeption, Essbereich, Gemeinschaftsbereiche und Eingang filtern.",
    breakfastEyebrow: "Halbpension",
    breakfastTitle: "Einfaches, ehrliches Frühstück.",
    breakfastText: "Der Tag beginnt ruhig mit vorbereitetem Service und unbegrenztem Tee.",
    seaEyebrow: "Am Strand",
    seaTitle: "Der Strand liegt direkt gegenüber.",
    seaText: "Überqueren Sie die Straße und Sie sind am Meer. Limantepe 3 Minuten, Çeşmealtı Strände 10 Minuten mit dem Auto.",
    transportEyebrow: "Anreise",
    transportTitle: "So erreichen Sie Serra Hotel.",
    transportText: "ESHOT Buslinien 984 & 738, Dolmuş, Auto und Flughafentransfer-Optionen.",
    nearbyEyebrow: "Ausflugsziele",
    nearbyTitle: "Urlas schönste Orte.",
    nearbyText: "Antike Ruinen, Weinstraßen, Kunstgassen und Michelin-Sterne-Restaurants in der Nähe.",
    contactEyebrow: "Reservierungsanfrage",
    contactTitle: "Wir planen Ihren Aufenthalt.",
    contactText: "Senden Sie das Formular. Serra Otel meldet sich. Keine Online-Zahlung.",
    weatherTitle: "Wetter in Urla",
    wind: "Wind",
    humidity: "Feuchtigkeit",
    seaBreak: "Meerespause",
    reviewsEyebrow: "Gästebewertungen",
    reviewsTitle: "Was unsere Gäste sagen",
    reviewsText: "Verifizierte Gästeerfahrungen von Google.",
  },
};

const PreferenceContext = createContext<PreferenceContextValue | null>(null);

function getTimeBasedTheme(): ThemeMode {
  // User explicitly disliked the dark mode, so we override it to stay in the light airy theme.
  return "light";
}

export function PreferenceProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [language, setLanguageState] = useState<Language>("tr");
  const preferencesLoaded = useRef(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const storedLanguage = safeStorageGet("local", "serra-language") as Language | null;

      safeStorageRemove("local", "serra-theme");
      setThemeState(getTimeBasedTheme());
      if (storedLanguage) setLanguageState(storedLanguage);

      preferencesLoaded.current = true;
    }, 0);

    const interval = window.setInterval(() => {
      setThemeState(getTimeBasedTheme());
    }, 300000);

    return () => {
      window.clearTimeout(id);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!preferencesLoaded.current) return;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!preferencesLoaded.current) return;
    document.documentElement.lang = language;
    safeStorageSet("local", "serra-language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      language,
      setLanguage: setLanguageState,
      t: (key: keyof typeof copy.tr) => copy[language][key],
    }),
    [language, theme],
  );

  return <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error("usePreferences must be used within PreferenceProvider");
  }
  return context;
}
