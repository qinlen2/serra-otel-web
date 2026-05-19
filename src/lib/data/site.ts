import type { BreakfastItem, HotelArea, HotelHighlight, NearbyPlace, Room, TransportRoute } from "@/types/site";
import type { Language } from "@/components/layout/preference-provider";

const serraPhoto = (name: string) => `/serra/current/${name}`;
const roomPhoto = (roomNum: string, img: string) => `/serra/serra_rooms/${roomNum}/${img}`;

const nearbyImages = [
  "gallery-16.jpeg",
  "gallery-21.jpeg",
  "gallery-44.jpeg",
  "gallery-34.jpeg",
  "gallery-08.jpeg",
  "gallery-35.jpeg",
  "gallery-10.jpeg",
  "gallery-12.jpeg",
  "gallery-07.jpeg",
].map(serraPhoto);

/* ── Gerçek Serra Otel Oda Verileri ── */
const realRooms = [
  {
    number: "102",
    name: "Üç Kişilik Oda",
    description: "Zemin katta, balkonsuz, üç tek yataklı konforlu oda.",
    capacity: 3,
    bedType: "3 tek yatak",
    size: "16 m²",
    hasBalcony: false,
    suitableFor: ["Aileler", "Arkadaş grupları"],
    images: ["1.jpeg"],
  },
  {
    number: "201",
    name: "Deniz Manzaralı Oda",
    description: "2. katta, deniz manzaralı, çift kişilik konforlu oda.",
    capacity: 2,
    bedType: "1 çift kişilik yatak",
    size: "16 m²",
    hasBalcony: false,
    suitableFor: ["Çiftler", "Romantik tatil"],
    images: ["1.jpeg"],
  },
  {
    number: "202",
    name: "Deniz Manzaralı Oda",
    description: "Orta katta, deniz manzaralı, çift kişilik ferah oda.",
    capacity: 2,
    bedType: "1 çift kişilik yatak",
    size: "16 m²",
    hasBalcony: false,
    suitableFor: ["Çiftler", "Kısa konaklama"],
    images: ["1.jpeg", "2.jpeg"],
  },
  {
    number: "203",
    name: "Balkonlu Deniz Manzaralı Oda",
    description: "Orta katta, yan balkondan deniz manzaralı, aydınlık oda.",
    capacity: 2,
    bedType: "1 çift kişilik yatak",
    size: "16 m²",
    hasBalcony: true,
    suitableFor: ["Çiftler", "Romantik tatil"],
    images: ["1.jpeg", "2.jpeg", "3.jpeg"],
  },
  {
    number: "204",
    name: "Standart Oda",
    description: "Yola cepheli, balkonsuz, sigara içilmeyen sakin oda.",
    capacity: 2,
    bedType: "1 çift kişilik yatak",
    size: "16 m²",
    hasBalcony: false,
    suitableFor: ["Solo gezginler", "Kısa konaklama"],
    images: ["1.jpeg", "2.jpeg", "3.jpeg"],
  },
  {
    number: "302",
    name: "Teras Katı Deniz Manzaralı Oda",
    description: "Teras katında, deniz manzaralı, özel konumlu oda.",
    capacity: 2,
    bedType: "1 çift kişilik yatak",
    size: "18 m²",
    hasBalcony: false,
    suitableFor: ["Çiftler", "Romantik tatil"],
    images: ["1.jpeg", "2.jpeg"],
  },
  {
    number: "303",
    name: "Teras Katı Balkonlu Süit",
    description: "Teras katında, yandan deniz manzaralı, balkonlu özel süit oda.",
    capacity: 2,
    bedType: "1 queen yatak",
    size: "18 m²",
    hasBalcony: true,
    suitableFor: ["Çiftler", "Romantik tatil"],
    images: ["1.jpeg", "2.jpeg"],
  },
];

export const rooms: Room[] = realRooms.map((room, index) => ({
  id: `room-${room.number}`,
  slug: `oda-${room.number}`,
  name: room.name,
  shortDescription: room.description,
  capacity: room.capacity,
  bedType: room.bedType,
  size: room.size,
  hasBalcony: room.hasBalcony,
  hasAirConditioning: true,
  hasTv: true,
  hasWifi: true,
  hasBathroom: true,
  suitableFor: room.suitableFor,
  sortOrder: index + 1,
  isActive: true,
  images: room.images.map((img, imgIndex) => ({
    id: `room-${room.number}-${imgIndex + 1}`,
    roomId: `room-${room.number}`,
    url: roomPhoto(room.number, img),
    alt: `Serra Otel ${room.number} nolu oda${imgIndex === 0 ? "" : ` - detay ${imgIndex + 1}`}`,
    sortOrder: imgIndex + 1,
    isCover: imgIndex === 0,
  })),
}));

export const hotelAreas: HotelArea[] = [
  ["exterior", "Giriş ve Dış Alan", "Turkuaz tabelalı, taş dokulu butik cephe.", serraPhoto("gallery-16.jpeg")],
  ["dining", "Yemek Alanı", "Ahşap tavanlı, sıcak ve kapalı cafe alanı.", serraPhoto("gallery-03.jpeg")],
  ["common", "Cafe Oturma Alanı", "Turuncu ve krem koltuklarla samimi ortak alan.", serraPhoto("gallery-21.jpeg")],
  ["reception", "Resepsiyon", "Ahşap detaylı, sade karşılama noktası.", serraPhoto("gallery-06.jpeg")],
  ["corridor", "Oda Geçişleri", "Taş duvar ve ahşap çatı altında sakin geçiş.", serraPhoto("oda-gecisleri.jpg.jpeg")],
].map(([type, title, description, imageUrl], index) => ({
  id: `area-${index + 1}`,
  type: type as HotelArea["type"],
  title,
  description,
  imageUrl,
  sortOrder: index + 1,
  isActive: true,
}));

export const breakfastItems: BreakfastItem[] = [
  "Yumurta",
  "Beyaz peynir",
  "Domates",
  "Salatalık",
  "Siyah zeytin",
  "Tereyağı",
  "Bal",
  "Vişne reçeli",
  "Çokokrem",
  "Sınırsız çay",
].map((name, index) => ({
  id: `breakfast-${index + 1}`,
  name,
  sortOrder: index + 1,
  isHighlighted: ["Yumurta", "Sınırsız çay", "Bal", "Beyaz peynir"].includes(name),
  isActive: true,
}));

export const transportRoutes: TransportRoute[] = [
  ["ESHOT Otobüs (984 hat)", "bus", "Fahrettin Altay Aktarma Merkezi'nden 984 numaralı hat ile Urla'ya, ardından 738 hat ile Çeşmealtı'na ulaşın.", "60-75 dk", "Fahrettin Altay → Urla", "3 dk"],
  ["Dolmuş / Minibüs", "minibus", "Üçkuyular veya Fahrettin Altay'dan Urla dolmuşlarıyla merkeze, oradan Çeşmealtı dolmuşuna aktarma.", "50-65 dk", "Urla merkez → Çeşmealtı", "3 dk"],
  ["Özel Araç", "car", "İzmir-Çeşme Otoyolu üzerinden Urla çıkışı. Konak'tan 37 km, yaklaşık 35-40 dk.", "35-40 dk", "Otel girişi (ücretsiz otopark)", "0 dk"],
  ["Havalimanı Transferi", "airport", "Adnan Menderes Havalimanı'ndan 44 km. Otoyol ile 35-45 dk. Transfer hizmeti için otel ile iletişime geçin.", "35-45 dk", "Otel girişi", "0 dk"],
  ["İzmir Merkez (Konak)", "izmir_center", "Konak'tan metro ile Fahrettin Altay'a, oradan 984 hat otobüs veya araçla İzmir-Çeşme Otoyolu üzerinden.", "40-60 dk", "Otel girişi", "0 dk"],
].map(([title, type, description, estimatedTime, stopName, walkingDistance], index) => ({
  id: `route-${index + 1}`,
  title,
  type: type as TransportRoute["type"],
  description,
  estimatedTime,
  stopName,
  walkingDistance,
  sortOrder: index + 1,
  isActive: true,
}));

export const nearbyPlaces: NearbyPlace[] = [
  ["Çeşmealtı Mavi Plaj", "beach", "1.5 km", "Araçla 3 dk", "Mavi bayraklı, sığ ve berrak suyu ile aileler için ideal plaj.", "/serra/nearby/cesmealt-plaj.png"],
  ["Limantepe Kazı Alanı", "visit", "200 m", "3 dk yürüyüş", "6 bin yıllık antik liman yerleşimi. Ege'nin en eski limanlarından biri.", "/serra/nearby/limantepe.png"],
  ["Urla İskele", "coast", "4 km", "Araçla 8 dk", "Balık restoranları, kafeler ve gün batımı yürüyüşü için sahil şeridi.", "/serra/nearby/urla-iskele.png"],
  ["Urla Bağ Yolu", "visit", "8 km", "Araçla 15 dk", "Ege'nin Toskana'sı: Urla Şarapçılık, Urlice ve butik bağ evlerinde şarap tadımı.", "/serra/nearby/urla-bag-yolu.png"],
  ["Urla Sanat Sokağı", "visit", "4 km", "Araçla 8 dk", "Antikacılar, seramik atölyeleri ve butik galerilerle dolu renkli cadde.", "/serra/nearby/urla-sanat-sokagi.png"],
  ["Güvendik Tepesi", "visit", "2 km", "Araçla 5 dk", "İzmir Körfezi panoramik manzarası ve meşhur tarçınlı lokma.", "/serra/nearby/guvendik-tepesi.png"],
  ["OD Urla & Gastronomi", "restaurant", "10 km", "Araçla 20 dk", "Michelin yıldızlı OD Urla ve Teruar dahil dünya sınıfı şef restoranları.", "/serra/nearby/urla-gastronomi.png"],
  ["Malgaca Pazarı", "market", "4 km", "Araçla 8 dk", "Yöresel zeytinyağı, bal, sabun ve el yapımı ürünlerle tarihi çarşı.", "/serra/nearby/malgaca-pazari.png"],
].map(([name, type, distance, walkingTime, description, imageUrl], index) => ({
  id: `nearby-${index + 1}`,
  name: name as string,
  type: type as string,
  distance: distance as string,
  walkingTime: walkingTime as string,
  description: description as string,
  imageUrl: imageUrl as string,
  sortOrder: index + 1,
  isActive: true,
}));

export const siteSettings = {
  phone: "+905322755455",
  phoneLandline: "+902327520110",
  whatsapp: "https://wa.me/905322755455?text=Merhaba%2C%20Serra%20Otel%20i%C3%A7in%20rezervasyon%20talebi%20olu%C5%9Fturmak%20istiyorum.",
  maps: "https://www.google.com/maps/search/?api=1&query=Serra%20Otel%202226%20Sokak%20No%2018%20Atat%C3%BCrk%20Mahallesi%20Urla",
  address: "Atatürk Mahallesi, 2226. Sokak No:18, 35430 Urla/İzmir",
  checkIn: "14:00",
  checkOut: "12:30",
  airportDistance: "44 km",
  centerDistance: "4 km",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com",
};

export function getWhatsAppUrl(language: Language, context?: string) {
  const baseMessage = {
    tr: "Merhaba, siteniz üzerinden size ulaşıyorum. Serra Otel için rezervasyon talebi oluşturmak istiyorum.",
    en: "Hello, I am reaching out from your website. I would like to make a reservation request for Serra Hotel.",
    de: "Hallo, ich kontaktiere Sie über Ihre Website. Ich möchte eine Reservierungsanfrage für das Serra Hotel stellen.",
  }[language];

  const contextualMessage = context ? {
    tr: `Merhaba, siteniz üzerinden size ulaşıyorum. ${context} hakkında bilgi almak ve rezervasyon yapmak istiyorum.`,
    en: `Hello, I am reaching out from your website. I would like to get information and make a reservation for ${context}.`,
    de: `Hallo, ich kontaktiere Sie über Ihre Website. Ich möchte Informationen erhalten und eine Reservierung für ${context} vornehmen.`,
  }[language] : "";

  const finalMessage = context ? contextualMessage : baseMessage;

  return `https://wa.me/905322755455?text=${encodeURIComponent(finalMessage)}`;
}

export const hotelHighlights: HotelHighlight[] = [
  { id: "beach", title: "Denize sıfır", description: "Plaj otelin hemen karşısında, 1 dakika." },
  { id: "wifi", title: "Ücretsiz Wi-Fi", description: "Tüm odalarda yüksek hızlı internet." },
  { id: "parking", title: "Ücretsiz otopark", description: "Otele özel ücretsiz otopark alanı." },
  { id: "breakfast", title: "Kahvaltı dahil", description: "08:30-11:00 arası zengin kahvaltı servisi." },
  { id: "reception", title: "7/24 resepsiyon", description: "Geliş ve talepler için destek." },
  { id: "restaurant", title: "Restoran & kafe", description: "Yarım pansiyon düzenine uygun." },
  { id: "air", title: "Klima", description: "Tüm odalarda bireysel klima kontrolü." },
  { id: "minibar", title: "Minibar & buzdolabı", description: "Her odada minibar ve buzdolabı mevcut." },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug && room.isActive);
}

const roomTranslations: Record<string, Record<Language, Partial<Pick<Room, "name" | "shortDescription" | "bedType" | "suitableFor">>>> = {
  "oda-102": {
    tr: { name: "Üç Kişilik Oda", shortDescription: "Zemin katta, balkonsuz, üç tek yataklı konforlu oda.", bedType: "3 tek yatak", suitableFor: ["Aileler", "Arkadaş grupları"] },
    en: { name: "Triple Room", shortDescription: "A comfortable ground-floor room with three single beds, no balcony.", bedType: "3 single beds", suitableFor: ["Families", "Friend groups"] },
    de: { name: "Dreibettzimmer", shortDescription: "Ein komfortables Erdgeschosszimmer mit drei Einzelbetten, ohne Balkon.", bedType: "3 Einzelbetten", suitableFor: ["Familien", "Freundesgruppen"] },
  },
  "oda-201": {
    tr: { name: "Deniz Manzaralı Oda", shortDescription: "2. katta, deniz manzaralı, çift kişilik konforlu oda.", bedType: "1 çift kişilik yatak", suitableFor: ["Çiftler", "Romantik tatil"] },
    en: { name: "Sea View Room", shortDescription: "A comfortable double room on the 2nd floor with sea view.", bedType: "1 double bed", suitableFor: ["Couples", "Romantic getaway"] },
    de: { name: "Zimmer mit Meerblick", shortDescription: "Ein komfortables Doppelzimmer im 2. Stock mit Meerblick.", bedType: "1 Doppelbett", suitableFor: ["Paare", "Romantischer Urlaub"] },
  },
  "oda-202": {
    tr: { name: "Deniz Manzaralı Oda", shortDescription: "Orta katta, deniz manzaralı, çift kişilik ferah oda.", bedType: "1 çift kişilik yatak", suitableFor: ["Çiftler", "Kısa konaklama"] },
    en: { name: "Sea View Room", shortDescription: "A spacious double room on the middle floor with sea view.", bedType: "1 double bed", suitableFor: ["Couples", "Short stays"] },
    de: { name: "Zimmer mit Meerblick", shortDescription: "Ein geräumiges Doppelzimmer im Mittelgeschoss mit Meerblick.", bedType: "1 Doppelbett", suitableFor: ["Paare", "Kurzaufenthalt"] },
  },
  "oda-203": {
    tr: { name: "Balkonlu Deniz Manzaralı Oda", shortDescription: "Orta katta, yan balkondan deniz manzaralı, aydınlık oda.", bedType: "1 çift kişilik yatak", suitableFor: ["Çiftler", "Romantik tatil"] },
    en: { name: "Sea View Room with Balcony", shortDescription: "A bright room on the middle floor with sea view from the side balcony.", bedType: "1 double bed", suitableFor: ["Couples", "Romantic getaway"] },
    de: { name: "Zimmer mit Meerblick und Balkon", shortDescription: "Ein helles Zimmer im Mittelgeschoss mit Meerblick vom Seitenbalkon.", bedType: "1 Doppelbett", suitableFor: ["Paare", "Romantischer Urlaub"] },
  },
  "oda-204": {
    tr: { name: "Standart Oda", shortDescription: "Yola cepheli, balkonsuz, sigara içilmeyen sakin oda.", bedType: "1 çift kişilik yatak", suitableFor: ["Solo gezginler", "Kısa konaklama"] },
    en: { name: "Standard Room", shortDescription: "A quiet, non-smoking road-facing room without balcony.", bedType: "1 double bed", suitableFor: ["Solo travelers", "Short stays"] },
    de: { name: "Standardzimmer", shortDescription: "Ein ruhiges Nichtraucherzimmer zur Straßenseite, ohne Balkon.", bedType: "1 Doppelbett", suitableFor: ["Alleinreisende", "Kurzaufenthalt"] },
  },
  "oda-302": {
    tr: { name: "Teras Katı Deniz Manzaralı Oda", shortDescription: "Teras katında, deniz manzaralı, özel konumlu oda.", bedType: "1 çift kişilik yatak", suitableFor: ["Çiftler", "Romantik tatil"] },
    en: { name: "Terrace Floor Sea View Room", shortDescription: "A specially located room on the terrace floor with sea view.", bedType: "1 double bed", suitableFor: ["Couples", "Romantic getaway"] },
    de: { name: "Terrassenzimmer mit Meerblick", shortDescription: "Ein besonders gelegenes Zimmer auf der Terrassenetage mit Meerblick.", bedType: "1 Doppelbett", suitableFor: ["Paare", "Romantischer Urlaub"] },
  },
  "oda-303": {
    tr: { name: "Teras Katı Balkonlu Süit", shortDescription: "Teras katında, yandan deniz manzaralı, balkonlu özel süit oda.", bedType: "1 queen yatak", suitableFor: ["Çiftler", "Romantik tatil"] },
    en: { name: "Terrace Suite with Balcony", shortDescription: "A private suite on the terrace floor with side sea view and balcony.", bedType: "1 queen bed", suitableFor: ["Couples", "Romantic getaway"] },
    de: { name: "Terrassensuite mit Balkon", shortDescription: "Eine private Suite auf der Terrassenetage mit seitlichem Meerblick und Balkon.", bedType: "1 Queen-Bett", suitableFor: ["Paare", "Romantischer Urlaub"] },
  },
};

function roomTranslationFor(room: Room, language: Language) {
  const translated = roomTranslations[room.slug]?.[language] ?? {};
  return {
    ...room,
    ...translated,
    name: translated.name ?? room.name,
    images: room.images.map((image) => ({
      ...image,
      alt:
        language === "en"
          ? `${translated.name ?? room.name} at Serra Hotel`
          : language === "de"
            ? `${translated.name ?? room.name} im Serra Hotel`
            : image.alt,
    })),
  };
}

const hotelAreaTranslations: Record<HotelArea["type"], Record<Language, Pick<HotelArea, "title" | "description">>> = {
  reception: {
    tr: { title: "Sakin Resepsiyon", description: "Varıştan itibaren sade bir karşılama." },
    en: { title: "Calm Reception", description: "A simple welcome from the moment you arrive." },
    de: { title: "Ruhige Rezeption", description: "Ein schlichter Empfang ab dem ersten Moment." },
  },
  dining: {
    tr: { title: "Yemek Alanı", description: "Yarım pansiyon düzeni için sıcak bir alan." },
    en: { title: "Dining Area", description: "A warm area for the half-board rhythm." },
    de: { title: "Essbereich", description: "Ein warmer Bereich fuer die Halbpension." },
  },
  common: {
    tr: { title: "Ortak Alan", description: "Günün ritmini yavaşlatan küçük oturma noktası." },
    en: { title: "Common Area", description: "A small lounge point to slow the day down." },
    de: { title: "Gemeinschaftsbereich", description: "Ein kleiner Ort, um den Tag ruhiger zu machen." },
  },
  exterior: {
    tr: { title: "Giriş ve Dış Alan", description: "Urla dokusuna yakın, yalın bir giriş." },
    en: { title: "Entrance and Exterior", description: "A clean entrance close to Urla's texture." },
    de: { title: "Eingang und Aussenbereich", description: "Ein klarer Eingang nahe am Charakter Urlas." },
  },
  corridor: {
    tr: { title: "Oda Geçişleri", description: "Odalarınıza sakin bir geçiş." },
    en: { title: "Room Corridors", description: "A calm passage to your room." },
    de: { title: "Zimmerflure", description: "Ein ruhiger Weg zu Ihrem Zimmer." },
  },
};

const breakfastTranslations: Record<string, Record<Language, string>> = {
  Yumurta: { tr: "Yumurta", en: "Eggs", de: "Eier" },
  "Beyaz peynir": { tr: "Beyaz peynir", en: "White cheese", de: "Weißkäse" },
  Domates: { tr: "Domates", en: "Tomato", de: "Tomate" },
  Salatalık: { tr: "Salatalık", en: "Cucumber", de: "Gurke" },
  "Siyah zeytin": { tr: "Siyah zeytin", en: "Black olives", de: "Schwarze Oliven" },
  Tereyağı: { tr: "Tereyağı", en: "Butter", de: "Butter" },
  Bal: { tr: "Bal", en: "Honey", de: "Honig" },
  "Vişne reçeli": { tr: "Vişne reçeli", en: "Sour cherry jam", de: "Sauerkirschmarmelade" },
  Çokokrem: { tr: "Çokokrem", en: "Chocolate spread", de: "Schokoaufstrich" },
  "Sınırsız çay": { tr: "Sınırsız çay", en: "Unlimited tea", de: "Unbegrenzt Tee" },
};

const transportTranslations: Record<TransportRoute["type"], Record<Language, Pick<TransportRoute, "title" | "description" | "estimatedTime" | "stopName" | "walkingDistance">>> = {
  bus: {
    tr: { title: "ESHOT Otobüs (984 hat)", description: "Fahrettin Altay Aktarma Merkezi'nden 984 numaralı hat ile Urla'ya, ardından 738 hat ile Çeşmealtı'na ulaşın.", estimatedTime: "60-75 dk", stopName: "Fahrettin Altay → Urla", walkingDistance: "3 dk" },
    en: { title: "ESHOT Bus (line 984)", description: "Take line 984 from Fahrettin Altay hub to Urla, then line 738 to Çeşmealtı.", estimatedTime: "60-75 min", stopName: "Fahrettin Altay → Urla", walkingDistance: "3 min" },
    de: { title: "ESHOT Bus (Linie 984)", description: "Linie 984 vom Fahrettin Altay Knotenpunkt nach Urla, dann Linie 738 nach Çeşmealtı.", estimatedTime: "60-75 Min.", stopName: "Fahrettin Altay → Urla", walkingDistance: "3 Min." },
  },
  minibus: {
    tr: { title: "Dolmuş / Minibüs", description: "Üçkuyular veya Fahrettin Altay'dan Urla dolmuşlarıyla merkeze, oradan Çeşmealtı dolmuşuna aktarma.", estimatedTime: "50-65 dk", stopName: "Urla merkez → Çeşmealtı", walkingDistance: "3 dk" },
    en: { title: "Dolmuş / Minibus", description: "From Üçkuyular or Fahrettin Altay take a dolmuş to Urla center, then transfer to Çeşmealtı.", estimatedTime: "50-65 min", stopName: "Urla center → Çeşmealtı", walkingDistance: "3 min" },
    de: { title: "Dolmuş / Minibus", description: "Von Üçkuyular oder Fahrettin Altay mit dem Dolmuş nach Urla Zentrum, dann Umstieg nach Çeşmealtı.", estimatedTime: "50-65 Min.", stopName: "Urla Zentrum → Çeşmealtı", walkingDistance: "3 Min." },
  },
  car: {
    tr: { title: "Özel Araç", description: "İzmir-Çeşme Otoyolu üzerinden Urla çıkışı. Konak'tan 37 km, yaklaşık 35-40 dk.", estimatedTime: "35-40 dk", stopName: "Otel girişi (ücretsiz otopark)", walkingDistance: "0 dk" },
    en: { title: "By Car", description: "Via İzmir-Çeşme Highway, Urla exit. 37 km from Konak, about 35-40 min.", estimatedTime: "35-40 min", stopName: "Hotel entrance (free parking)", walkingDistance: "0 min" },
    de: { title: "Mit dem Auto", description: "Über die İzmir-Çeşme-Autobahn, Ausfahrt Urla. 37 km von Konak, ca. 35-40 Min.", estimatedTime: "35-40 Min.", stopName: "Hoteleingang (kostenlos parken)", walkingDistance: "0 Min." },
  },
  airport: {
    tr: { title: "Havalimanı Transferi", description: "Adnan Menderes Havalimanı'ndan 44 km. Otoyol ile 35-45 dk. Transfer hizmeti için otel ile iletişime geçin.", estimatedTime: "35-45 dk", stopName: "Otel girişi", walkingDistance: "0 dk" },
    en: { title: "Airport Transfer", description: "44 km from Adnan Menderes Airport. 35-45 min via highway. Contact hotel for transfer service.", estimatedTime: "35-45 min", stopName: "Hotel entrance", walkingDistance: "0 min" },
    de: { title: "Flughafentransfer", description: "44 km vom Flughafen Adnan Menderes. 35-45 Min. über die Autobahn. Kontaktieren Sie das Hotel für Transfer.", estimatedTime: "35-45 Min.", stopName: "Hoteleingang", walkingDistance: "0 Min." },
  },
  izmir_center: {
    tr: { title: "İzmir Merkez (Konak)", description: "Konak'tan metro ile Fahrettin Altay'a, oradan 984 hat otobüs veya araçla İzmir-Çeşme Otoyolu üzerinden.", estimatedTime: "40-60 dk", stopName: "Otel girişi", walkingDistance: "0 dk" },
    en: { title: "İzmir Center (Konak)", description: "Metro from Konak to Fahrettin Altay, then bus line 984 or by car via İzmir-Çeşme Highway.", estimatedTime: "40-60 min", stopName: "Hotel entrance", walkingDistance: "0 min" },
    de: { title: "İzmir Zentrum (Konak)", description: "Metro von Konak nach Fahrettin Altay, dann Bus Linie 984 oder mit dem Auto über die İzmir-Çeşme-Autobahn.", estimatedTime: "40-60 Min.", stopName: "Hoteleingang", walkingDistance: "0 Min." },
  },
};

const nearbyTranslations: Record<string, Record<Language, Pick<NearbyPlace, "name" | "walkingTime" | "description">>> = {
  "nearby-1": {
    tr: { name: "Çeşmealtı Mavi Plaj", walkingTime: "Araçla 3 dk", description: "Mavi bayraklı, sığ ve berrak suyu ile aileler için ideal plaj." },
    en: { name: "Çeşmealtı Blue Beach", walkingTime: "3 min drive", description: "Blue-flag beach with shallow, crystal-clear water. Perfect for families." },
    de: { name: "Çeşmealtı Blauer Strand", walkingTime: "3 Min. Fahrt", description: "Blauer-Flagge-Strand mit flachem, kristallklarem Wasser." },
  },
  "nearby-2": {
    tr: { name: "Limantepe Kazı Alanı", walkingTime: "3 dk yürüyüş", description: "6 bin yıllık antik liman yerleşimi. Ege'nin en eski limanlarından biri." },
    en: { name: "Limantepe Excavation Site", walkingTime: "3 min walk", description: "A 6,000-year-old ancient harbor settlement — one of the oldest in the Aegean." },
    de: { name: "Limantepe Ausgrabungsstätte", walkingTime: "3 Min. zu Fuß", description: "6.000 Jahre alte Hafensiedlung — eine der ältesten der Ägäis." },
  },
  "nearby-3": {
    tr: { name: "Urla İskele", walkingTime: "Araçla 8 dk", description: "Balık restoranları, kafeler ve gün batımı yürüyüşü için sahil şeridi." },
    en: { name: "Urla Pier", walkingTime: "8 min drive", description: "Waterfront strip with fish restaurants, cafes and sunset walks." },
    de: { name: "Urla Hafen", walkingTime: "8 Min. Fahrt", description: "Uferpromenade mit Fischrestaurants, Cafés und Sonnenuntergangsspaziergängen." },
  },
  "nearby-4": {
    tr: { name: "Urla Bağ Yolu", walkingTime: "Araçla 15 dk", description: "Ege'nin Toskana'sı: Urla Şarapçılık, Urlice ve butik bağ evlerinde şarap tadımı." },
    en: { name: "Urla Wine Route", walkingTime: "15 min drive", description: "The Tuscany of the Aegean: wine tasting at Urla Winery, Urlice and boutique vineyards." },
    de: { name: "Urla Weinstraße", walkingTime: "15 Min. Fahrt", description: "Die Toskana der Ägäis: Weinproben bei Urla Weingut, Urlice und Boutique-Weingütern." },
  },
  "nearby-5": {
    tr: { name: "Urla Sanat Sokağı", walkingTime: "Araçla 8 dk", description: "Antikacılar, seramik atölyeleri ve butik galerilerle dolu renkli cadde." },
    en: { name: "Urla Art Street", walkingTime: "8 min drive", description: "A colorful street full of antique shops, ceramic workshops and boutique galleries." },
    de: { name: "Urla Kunststraße", walkingTime: "8 Min. Fahrt", description: "Bunte Straße mit Antiquitätenläden, Keramikwerkstätten und Boutique-Galerien." },
  },
  "nearby-6": {
    tr: { name: "Güvendik Tepesi", walkingTime: "Araçla 5 dk", description: "İzmir Körfezi panoramik manzarası ve meşhur tarçınlı lokma." },
    en: { name: "Güvendik Hill", walkingTime: "5 min drive", description: "Panoramic views of İzmir Bay and the famous cinnamon lokma dessert." },
    de: { name: "Güvendik-Hügel", walkingTime: "5 Min. Fahrt", description: "Panoramablick auf die Bucht von İzmir und das berühmte Zimt-Lokma-Dessert." },
  },
  "nearby-7": {
    tr: { name: "OD Urla & Gastronomi", walkingTime: "Araçla 20 dk", description: "Michelin yıldızlı OD Urla ve Teruar dahil dünya sınıfı şef restoranları." },
    en: { name: "OD Urla & Fine Dining", walkingTime: "20 min drive", description: "World-class chef restaurants including Michelin-starred OD Urla and Teruar." },
    de: { name: "OD Urla & Gastronomie", walkingTime: "20 Min. Fahrt", description: "Weltklasse-Restaurants inkl. Michelin-Stern OD Urla und Teruar." },
  },
  "nearby-8": {
    tr: { name: "Malgaca Pazarı", walkingTime: "Araçla 8 dk", description: "Yöresel zeytinyağı, bal, sabun ve el yapımı ürünlerle tarihi çarşı." },
    en: { name: "Malgaca Bazaar", walkingTime: "8 min drive", description: "Historic bazaar with local olive oil, honey, soaps and handmade goods." },
    de: { name: "Malgaca-Basar", walkingTime: "8 Min. Fahrt", description: "Historischer Basar mit Olivenöl, Honig, Seifen und handgefertigten Waren." },
  },
};

const highlightTranslations: Record<string, Record<Language, Pick<HotelHighlight, "title" | "description">>> = {
  beach: {
    tr: { title: "Denize sıfır", description: "Plaj otelin hemen karşısında, 1 dakika." },
    en: { title: "Beachfront", description: "The beach is right across the road, 1 minute." },
    de: { title: "Direkt am Strand", description: "Der Strand ist direkt gegenüber, 1 Minute." },
  },
  wifi: {
    tr: { title: "Ücretsiz Wi-Fi", description: "Tüm odalarda yüksek hızlı internet." },
    en: { title: "Free Wi-Fi", description: "High-speed internet in all rooms." },
    de: { title: "Kostenloses WLAN", description: "Highspeed-Internet in allen Zimmern." },
  },
  parking: {
    tr: { title: "Ücretsiz otopark", description: "Otele özel ücretsiz otopark alanı." },
    en: { title: "Free parking", description: "Private free parking on site." },
    de: { title: "Kostenloses Parken", description: "Eigener kostenloser Parkplatz." },
  },
  breakfast: {
    tr: { title: "Kahvaltı dahil", description: "08:30-11:00 arası zengin kahvaltı servisi." },
    en: { title: "Breakfast included", description: "Rich breakfast served from 08:30 to 11:00." },
    de: { title: "Frühstück inklusive", description: "Reichhaltiges Frühstück von 08:30 bis 11:00." },
  },
  reception: {
    tr: { title: "7/24 resepsiyon", description: "Geliş ve talepler için destek." },
    en: { title: "24/7 reception", description: "Support for arrivals and requests." },
    de: { title: "24/7 Rezeption", description: "Unterstützung für Anreise und Anfragen." },
  },
  restaurant: {
    tr: { title: "Restoran & kafe", description: "Yarım pansiyon düzenine uygun." },
    en: { title: "Restaurant & cafe", description: "Aligned with the half-board service." },
    de: { title: "Restaurant & Cafe", description: "Passend zur Halbpension." },
  },
  air: {
    tr: { title: "Klima", description: "Tüm odalarda bireysel klima kontrolü." },
    en: { title: "Air conditioning", description: "Individual climate control in all rooms." },
    de: { title: "Klimaanlage", description: "Individuelle Klimakontrolle in allen Zimmern." },
  },
  minibar: {
    tr: { title: "Minibar & buzdolabı", description: "Her odada minibar ve buzdolabı mevcut." },
    en: { title: "Minibar & fridge", description: "Minibar and fridge in every room." },
    de: { title: "Minibar & Kühlschrank", description: "Minibar und Kühlschrank in jedem Zimmer." },
  },
};

export function getLocalizedRooms(language: Language) {
  return rooms.map((room) => roomTranslationFor(room, language));
}

export function getLocalizedRoomBySlug(slug: string, language: Language) {
  const room = getRoomBySlug(slug);
  return room ? roomTranslationFor(room, language) : undefined;
}

export function getLocalizedHotelAreas(language: Language) {
  return hotelAreas.map((area) => ({ ...area, ...hotelAreaTranslations[area.type][language] }));
}

export function getLocalizedBreakfastItems(language: Language) {
  return breakfastItems.map((item) => ({ ...item, name: breakfastTranslations[item.name]?.[language] ?? item.name }));
}

export function getLocalizedTransportRoutes(language: Language) {
  return transportRoutes.map((route) => ({ ...route, ...transportTranslations[route.type][language] }));
}

export function getLocalizedNearbyPlaces(language: Language) {
  return nearbyPlaces.map((place) => {
    const translated = nearbyTranslations[place.id]?.[language];
    return translated ? { ...place, ...translated } : place;
  });
}

export function getLocalizedHotelHighlights(language: Language) {
  return hotelHighlights.map((item) => ({ ...item, ...highlightTranslations[item.id][language] }));
}
