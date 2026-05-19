"use client";

import { BedDouble, Building, ChevronRight, Coffee, Download, ImageIcon, Loader2, Map, MapPin, Phone, Plus, RotateCcw, Save, Settings, Trash2, Upload, UploadCloud, Utensils } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { breakfastItems, hotelAreas, hotelHighlights, nearbyPlaces, rooms, siteSettings, transportRoutes } from "@/lib/data/site";
import type { BreakfastItem, HotelArea, NearbyPlace, Room, RoomImage, TransportRoute, HotelHighlight } from "@/types/site";

/* ─── Types ─── */

type SiteSettingsData = typeof siteSettings;

type AdminData = {
  rooms: Room[];
  hotelAreas: HotelArea[];
  breakfastItems: BreakfastItem[];
  transportRoutes: TransportRoute[];
  nearbyPlaces: NearbyPlace[];
  hotelHighlights: HotelHighlight[];
  siteSettings: SiteSettingsData;
};

type AdminSection = "rooms" | "hotelAreas" | "breakfastItems" | "transportRoutes" | "nearbyPlaces" | "hotelHighlights" | "siteSettings";

const initialData: AdminData = {
  rooms,
  hotelAreas,
  breakfastItems,
  transportRoutes,
  nearbyPlaces,
  hotelHighlights,
  siteSettings,
};

const sectionConfig: { key: AdminSection; label: string; icon: typeof BedDouble; desc: string }[] = [
  { key: "rooms", label: "Odalar", icon: BedDouble, desc: "10 oda" },
  { key: "hotelAreas", label: "Galeri", icon: ImageIcon, desc: "Otel fotoğrafları" },
  { key: "breakfastItems", label: "Kahvaltı", icon: Coffee, desc: "Menü kalemleri" },
  { key: "nearbyPlaces", label: "Çevre", icon: MapPin, desc: "Yakın yerler" },
  { key: "transportRoutes", label: "Ulaşım", icon: Map, desc: "Güzergahlar" },
  { key: "hotelHighlights", label: "Özellikler", icon: Building, desc: "Otel özellikleri" },
  { key: "siteSettings", label: "Ayarlar", icon: Settings, desc: "Telefon, adres" },
];

/* ─── Main ─── */

export function AdminEditor() {
  const [data, setData] = useState<AdminData>(initialData);
  const [section, setSection] = useState<AdminSection>("rooms");
  const [selectedId, setSelectedId] = useState(initialData.rooms[0].id);
  const [saved, setSaved] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("serra-admin-content");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({ ...initialData, ...parsed });
      } catch { /* ignore corrupted */ }
    }
  }, []);

  const items = section === "siteSettings" || section === "hotelHighlights"
    ? (section === "hotelHighlights" ? data.hotelHighlights : [])
    : (data[section] as Array<{ id: string; name?: string; title?: string }>);

  const selected = useMemo(() => {
    if (section === "siteSettings") return null;
    const list = items as Array<{ id: string }>;
    return list.find((item) => item.id === selectedId) ?? list[0] ?? null;
  }, [items, selectedId, section]);

  function persist(next: AdminData) {
    setData(next);
    localStorage.setItem("serra-admin-content", JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  function updateCurrent(patch: Record<string, unknown>) {
    if (section === "siteSettings") {
      persist({ ...data, siteSettings: { ...data.siteSettings, ...patch } as SiteSettingsData });
      return;
    }
    const next = {
      ...data,
      [section]: (data[section] as Array<Record<string, unknown>>).map((item) =>
        item.id === (selected as { id: string })?.id ? { ...item, ...patch } : item,
      ),
    } as AdminData;
    persist(next);
  }

  function updateRoomImage(index: number, patch: Record<string, string>) {
    if (section !== "rooms" || !selected) return;
    const room = selected as Room;
    updateCurrent({
      images: room.images.map((image, i) => (i === index ? { ...image, ...patch } : image)),
    });
  }

  function addRoomImage() {
    if (section !== "rooms" || !selected) return;
    const room = selected as Room;
    const newImg: RoomImage = {
      id: `room-img-${Date.now()}`,
      roomId: room.id,
      url: "/serra/current/gallery-23.jpeg",
      alt: "Yeni oda fotoğrafı",
      sortOrder: room.images.length + 1,
      isCover: false,
    };
    updateCurrent({ images: [...room.images, newImg] });
  }

  function deleteRoomImage(index: number) {
    if (section !== "rooms" || !selected) return;
    const room = selected as Room;
    if (room.images.length <= 1) return;
    updateCurrent({ images: room.images.filter((_, i) => i !== index) });
  }

  function addItem() {
    if (section === "siteSettings") return;
    const id = `${section}-${Date.now()}`;
    const templates: Record<string, Record<string, unknown>> = {
      rooms: { id, slug: `oda-${Date.now()}`, name: "Yeni Oda", shortDescription: "Açıklama ekleyin.", capacity: 2, bedType: "1 çift kişilik yatak", size: "16 m²", hasBalcony: false, hasAirConditioning: true, hasTv: true, hasWifi: true, hasBathroom: true, suitableFor: ["Çiftler"], sortOrder: data.rooms.length + 1, isActive: true, images: [{ id: `${id}-cover`, roomId: id, url: "/serra/current/gallery-23.jpeg", alt: "Yeni oda", sortOrder: 1, isCover: true }] },
      hotelAreas: { id, title: "Yeni Alan", type: "common" as const, description: "Açıklama ekleyin.", imageUrl: "/serra/current/gallery-21.jpeg", sortOrder: data.hotelAreas.length + 1, isActive: true },
      breakfastItems: { id, name: "Yeni Ürün", sortOrder: data.breakfastItems.length + 1, isHighlighted: false, isActive: true },
      transportRoutes: { id, title: "Yeni Güzergah", type: "car" as const, description: "Açıklama ekleyin.", estimatedTime: "- dk", stopName: "Durak", walkingDistance: "- dk", sortOrder: data.transportRoutes.length + 1, isActive: true },
      nearbyPlaces: { id, name: "Yeni Yer", type: "visit", distance: "- km", walkingTime: "- dk", description: "Açıklama ekleyin.", imageUrl: "/serra/current/gallery-16.jpeg", sortOrder: data.nearbyPlaces.length + 1, isActive: true },
      hotelHighlights: { id, title: "Yeni Özellik", description: "Açıklama ekleyin." },
    };
    const template = templates[section];
    if (!template) return;
    const next = { ...data, [section]: [...(data[section] as Array<Record<string, unknown>>), template] } as AdminData;
    persist(next);
    setSelectedId(id);
  }

  function deleteItem(itemId: string) {
    if (section === "siteSettings") return;
    const list = data[section] as Array<{ id: string }>;
    if (list.length <= 1) return;
    const next = { ...data, [section]: list.filter((item) => item.id !== itemId) } as AdminData;
    persist(next);
    const remaining = (next[section] as Array<{ id: string }>);
    if (selectedId === itemId) setSelectedId(remaining[0]?.id ?? "");
  }

  function resetContent() {
    if (!confirm("Tüm değişiklikler silinecek. Emin misiniz?")) return;
    localStorage.removeItem("serra-admin-content");
    setData(initialData);
    setSelectedId(initialData.rooms[0].id);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `serra-otel-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file?: File) {
    if (!file) return;
    file.text().then((text) => {
      try {
        const parsed = JSON.parse(text);
        persist({ ...initialData, ...parsed });
      } catch {
        alert("Geçersiz JSON dosyası");
      }
    });
  }

  const currentConfig = sectionConfig.find((s) => s.key === section)!;

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      {/* ─── Sidebar ─── */}
      <aside className="space-y-4">
        {/* Mobile toggle */}
        <button className="flex w-full items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-sm font-medium lg:hidden" onClick={() => setMobileNav(!mobileNav)}>
          <span className="flex items-center gap-2"><currentConfig.icon size={16} /> {currentConfig.label}</span>
          <ChevronRight size={16} className={`transition ${mobileNav ? "rotate-90" : ""}`} />
        </button>

        {/* Nav */}
        <nav className={`space-y-1 ${mobileNav ? "" : "hidden lg:block"}`}>
          {sectionConfig.map((cfg) => (
            <button
              key={cfg.key}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${section === cfg.key
                  ? "bg-[var(--brand-wood)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--surface-soft)]"
                }`}
              onClick={() => {
                setSection(cfg.key);
                if (cfg.key !== "siteSettings") {
                  const list = data[cfg.key] as Array<{ id: string }>;
                  setSelectedId(list[0]?.id ?? "");
                }
                setMobileNav(false);
              }}
            >
              <cfg.icon size={16} className={section === cfg.key ? "text-[var(--brand-gold)]" : "text-[var(--muted)]"} />
              <div>
                <p className="font-medium">{cfg.label}</p>
                <p className={`text-[11px] ${section === cfg.key ? "text-white/60" : "text-[var(--muted)]"}`}>{cfg.key !== "siteSettings" ? `${(data[cfg.key] as Array<unknown>).length} öğe` : cfg.desc}</p>
              </div>
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="space-y-2 border-t border-[var(--line)] pt-4">
          <Button type="button" onClick={exportJson} variant="outline" className="w-full justify-start gap-2 rounded-xl text-sm">
            <Download size={15} /> JSON İndir
          </Button>
          <label className="flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-medium transition hover:bg-[var(--surface-soft)]">
            <Upload size={15} /> JSON Yükle
            <input type="file" accept="application/json" className="hidden" onChange={(e) => importJson(e.target.files?.[0])} />
          </label>
          <Button type="button" onClick={resetContent} variant="ghost" className="w-full justify-start gap-2 rounded-xl text-sm text-[var(--brand-clay)]">
            <RotateCcw size={15} /> Varsayılana Dön
          </Button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-gold)]/10">
              <currentConfig.icon size={18} className="text-[var(--brand-gold)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">{currentConfig.label}</h2>
              <p className="text-xs text-[var(--muted)]">{currentConfig.desc}</p>
            </div>
          </div>
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${saved ? "bg-emerald-100 text-emerald-700" : "bg-[var(--surface-soft)] text-[var(--muted)]"
            }`}>
            {saved ? <><Save size={12} /> Kaydedildi</> : "Otomatik kayıt"}
          </span>
        </div>

        {/* Body */}
        {section === "siteSettings" ? (
          <div className="p-5">
            <SettingsEditor settings={data.siteSettings} updateCurrent={updateCurrent} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[220px_1fr]">
            {/* Item list */}
            <div className="border-b border-[var(--line)] lg:border-b-0 lg:border-r">
              <div className="max-h-[580px] space-y-0.5 overflow-auto p-2">
                {(items as Array<{ id: string; name?: string; title?: string }>).map((item) => (
                  <div key={item.id} className="flex items-center gap-0.5">
                    <button
                      className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${(selected as { id: string })?.id === item.id
                          ? "bg-[var(--brand-gold)]/10 text-[var(--brand-gold)] font-semibold"
                          : "text-[var(--foreground)] hover:bg-[var(--surface-soft)]"
                        }`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <span className="truncate">{item.name ?? item.title}</span>
                    </button>
                    <button
                      type="button"
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[var(--muted)]/40 transition-colors hover:bg-red-100 hover:text-red-500"
                      onClick={() => deleteItem(item.id)}
                      title="Sil"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
              {/* Add new item button */}
              <div className="border-t border-[var(--line)] p-2">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--line)] px-3 py-2.5 text-[13px] font-medium text-[var(--muted)] transition-colors hover:border-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/5 hover:text-[var(--brand-gold)]"
                  onClick={addItem}
                >
                  <Plus size={14} /> Yeni Ekle
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="p-5">
              <EditorFields
                section={section}
                selected={selected}
                updateCurrent={updateCurrent}
                updateRoomImage={updateRoomImage}
                addRoomImage={addRoomImage}
                deleteRoomImage={deleteRoomImage}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Settings Editor ─── */

function SettingsEditor({ settings, updateCurrent }: { settings: SiteSettingsData; updateCurrent: (p: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-[var(--surface-soft)] p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Phone size={15} /> İletişim</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Cep / WhatsApp" value={settings.phone} onChange={(v) => updateCurrent({ phone: v })} />
          <Field label="Sabit Hat" value={settings.phoneLandline} onChange={(v) => updateCurrent({ phoneLandline: v })} />
        </div>
      </div>
      <div className="rounded-xl bg-[var(--surface-soft)] p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><MapPin size={15} /> Konum</h3>
        <div className="grid gap-3">
          <Field label="Adres" value={settings.address} onChange={(v) => updateCurrent({ address: v })} />
          <Field label="Google Maps URL" value={settings.maps} onChange={(v) => updateCurrent({ maps: v })} />
        </div>
      </div>
      <div className="rounded-xl bg-[var(--surface-soft)] p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Settings size={15} /> Konaklama</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Field label="Giriş saati" value={settings.checkIn} onChange={(v) => updateCurrent({ checkIn: v })} />
          <Field label="Çıkış saati" value={settings.checkOut} onChange={(v) => updateCurrent({ checkOut: v })} />
          <Field label="Havalimanı mesafesi" value={settings.airportDistance} onChange={(v) => updateCurrent({ airportDistance: v })} />
          <Field label="Merkez mesafesi" value={settings.centerDistance} onChange={(v) => updateCurrent({ centerDistance: v })} />
        </div>
      </div>
      <div className="rounded-xl bg-[var(--surface-soft)] p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Building size={15} /> Site</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Site URL" value={settings.siteUrl} onChange={(v) => updateCurrent({ siteUrl: v })} />
          <Field label="WhatsApp link" value={settings.whatsapp} onChange={(v) => updateCurrent({ whatsapp: v })} />
        </div>
      </div>
    </div>
  );
}

/* ─── Editor Fields ─── */

function EditorFields({
  section,
  selected,
  updateCurrent,
  updateRoomImage,
  addRoomImage,
  deleteRoomImage,
}: {
  section: AdminSection;
  selected: { id: string } | null;
  updateCurrent: (patch: Record<string, unknown>) => void;
  updateRoomImage: (index: number, patch: Record<string, string>) => void;
  addRoomImage: () => void;
  deleteRoomImage: (index: number) => void;
}) {
  if (!selected) return <p className="text-sm text-[var(--muted)]">Düzenlemek için sol listeden bir öğe seçin.</p>;

  if (section === "rooms") {
    const room = selected as Room;
    return (
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Oda adı" value={room.name} onChange={(v) => updateCurrent({ name: v })} />
          <Field label="URL slug" value={room.slug} onChange={(v) => updateCurrent({ slug: v })} />
          <Field label="Kapasite (kişi)" value={room.capacity} onChange={(v) => updateCurrent({ capacity: Number(v) })} />
          <Field label="Yatak tipi" value={room.bedType} onChange={(v) => updateCurrent({ bedType: v })} />
          <Field label="Oda boyutu" value={room.size} onChange={(v) => updateCurrent({ size: v })} />
          <Field label="Uygunluk (virgülle ayır)" value={room.suitableFor.join(", ")} onChange={(v) => updateCurrent({ suitableFor: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
        </div>
        <TextArea label="Kısa açıklama" value={room.shortDescription} onChange={(v) => updateCurrent({ shortDescription: v })} />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Toggle label="Balkon" checked={room.hasBalcony} onChange={(v) => updateCurrent({ hasBalcony: v })} />
            <Toggle label="Klima" checked={room.hasAirConditioning} onChange={(v) => updateCurrent({ hasAirConditioning: v })} />
            <Toggle label="TV" checked={room.hasTv} onChange={(v) => updateCurrent({ hasTv: v })} />
            <Toggle label="Wi-Fi" checked={room.hasWifi} onChange={(v) => updateCurrent({ hasWifi: v })} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold"><ImageIcon size={15} /> Fotoğraflar</p>
            <button
              className="flex items-center gap-1.5 rounded-lg border border-dashed border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)]"
              onClick={addRoomImage}
            >
              <Plus size={13} /> Fotoğraf Ekle
            </button>
          </div>
          {room.images.map((image, i) => (
            <div key={image.id} className="group relative grid items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3 md:grid-cols-[120px_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--background)]">
                <Image src={image.url} alt={image.alt} fill sizes="120px" className="object-cover" />
              </div>
              <div className="grid gap-2">
                <ImageUpload label="Görsel yolu" value={image.url} onChange={(v) => updateRoomImage(i, { url: v })} />
                <Field label="Alt metin" value={image.alt} onChange={(v) => updateRoomImage(i, { alt: v })} />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[var(--muted)]">{image.isCover ? "📸 Kapak fotoğrafı" : "Detay fotoğrafı"}</p>
                  {!image.isCover && room.images.length > 1 && (
                    <button
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-red-400 transition hover:bg-red-50 hover:text-red-600"
                      onClick={() => deleteRoomImage(i)}
                    >
                      <Trash2 size={11} /> Kaldır
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === "breakfastItems") {
    const item = selected as BreakfastItem;
    return (
      <div className="space-y-4">
        <Field label="Ürün adı" value={item.name} onChange={(v) => updateCurrent({ name: v })} />
        <Toggle label="Öne çıkan (vurgulu gösterim)" checked={item.isHighlighted} onChange={(v) => updateCurrent({ isHighlighted: v })} />
        <Toggle label="Aktif" checked={item.isActive} onChange={(v) => updateCurrent({ isActive: v })} />
      </div>
    );
  }

  if (section === "transportRoutes") {
    const route = selected as TransportRoute;
    return (
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Başlık" value={route.title} onChange={(v) => updateCurrent({ title: v })} />
          <Field label="Tip" value={route.type} onChange={(v) => updateCurrent({ type: v })} />
          <Field label="Tahmini süre" value={route.estimatedTime} onChange={(v) => updateCurrent({ estimatedTime: v })} />
          <Field label="Durak adı" value={route.stopName} onChange={(v) => updateCurrent({ stopName: v })} />
          <Field label="Yürüme mesafesi" value={route.walkingDistance} onChange={(v) => updateCurrent({ walkingDistance: v })} />
        </div>
        <TextArea label="Açıklama" value={route.description} onChange={(v) => updateCurrent({ description: v })} />
      </div>
    );
  }

  if (section === "hotelHighlights") {
    const item = selected as HotelHighlight;
    return (
      <div className="space-y-4">
        <Field label="Özellik adı" value={item.title} onChange={(v) => updateCurrent({ title: v })} />
        <TextArea label="Açıklama" value={item.description} onChange={(v) => updateCurrent({ description: v })} />
      </div>
    );
  }

  if (section === "hotelAreas") {
    const area = selected as HotelArea;
    return (
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Alan adı" value={area.title} onChange={(v) => updateCurrent({ title: v })} />
          <Field label="Alan tipi" value={area.type} onChange={(v) => updateCurrent({ type: v })} />
        </div>
        <TextArea label="Açıklama" value={area.description} onChange={(v) => updateCurrent({ description: v })} />
        <div className="grid items-start gap-3 md:grid-cols-[160px_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--background)]">
            <Image src={area.imageUrl} alt={area.title} fill sizes="160px" className="object-cover" />
          </div>
          <ImageUpload label="Görsel yolu" value={area.imageUrl} onChange={(v) => updateCurrent({ imageUrl: v })} />
        </div>
        <Toggle label="Aktif" checked={area.isActive} onChange={(v) => updateCurrent({ isActive: v })} />
      </div>
    );
  }

  // NearbyPlaces
  const place = selected as NearbyPlace;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Yer adı" value={place.name} onChange={(v) => updateCurrent({ name: v })} />
        <Field label="Tip" value={place.type} onChange={(v) => updateCurrent({ type: v })} />
        <Field label="Mesafe" value={place.distance} onChange={(v) => updateCurrent({ distance: v })} />
        <Field label="Ulaşım süresi" value={place.walkingTime} onChange={(v) => updateCurrent({ walkingTime: v })} />
      </div>
      <TextArea label="Açıklama" value={place.description} onChange={(v) => updateCurrent({ description: v })} />
      <div className="grid items-start gap-3 md:grid-cols-[160px_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--background)]">
          <Image src={place.imageUrl} alt={place.name} fill sizes="160px" className="object-cover" />
        </div>
        <ImageUpload label="Görsel yolu" value={place.imageUrl} onChange={(v) => updateCurrent({ imageUrl: v })} />
      </div>
      <Toggle label="Aktif" checked={place.isActive} onChange={(v) => updateCurrent({ isActive: v })} />
    </div>
  );
}

/* ─── UI Components ─── */

function Field({ label, value, onChange }: { label: string; value?: string | number; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-[var(--foreground)]">{label}</span>
      <input
        className="h-10 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/20"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-[var(--foreground)]">{label}</span>
      <textarea
        className="min-h-20 w-full resize-y rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/20"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-medium transition hover:bg-[var(--surface-soft)]"
    >
      <span className={`flex h-4 w-7 items-center rounded-full px-0.5 transition-colors ${checked ? "bg-[var(--brand-gold)]" : "bg-[var(--line)]"}`}>
        <span className={`h-3 w-3 rounded-full bg-white transition-transform shadow-sm ${checked ? "translate-x-3" : ""}`} />
      </span>
      {label}
    </button>
  );
}

function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Geçersiz dosya türü. JPEG, PNG, WebP veya AVIF kullanın.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya 5MB'dan büyük olamaz.");
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
        setUploading(false);
      };
      reader.onerror = () => {
        alert("Dosya okunamadı.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      alert("Yükleme sırasında hata oluştu");
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Field label={label} value={value.startsWith("data:") ? "(Yüklenen görsel)" : value} onChange={onChange} />
      <div
        className={`relative flex items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-3 text-xs transition cursor-pointer ${dragOver ? "border-[var(--brand-gold)] bg-[var(--brand-gold)]/5" : "border-[var(--line)] hover:border-[var(--brand-gold)]/50"
          }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/jpeg,image/png,image/webp";
          input.onchange = () => { const f = input.files?.[0]; if (f) handleFile(f); };
          input.click();
        }}
      >
        {uploading ? (
          <><Loader2 size={14} className="animate-spin text-[var(--brand-gold)]" /> <span className="text-[var(--muted)]">Yükleniyor...</span></>
        ) : (
          <><UploadCloud size={14} className="text-[var(--muted)]" /> <span className="text-[var(--muted)]">Görsel yükle veya sürükle</span></>
        )}
      </div>
    </div>
  );
}
