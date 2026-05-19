"use client";

import { Bath, BedDouble, Snowflake, Tv, Users, Wifi } from "lucide-react";

import { usePreferences } from "@/components/layout/preference-provider";
import { RoomGallery } from "@/components/rooms/room-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalizedRoomBySlug, getWhatsAppUrl } from "@/lib/data/site";
import type { Room } from "@/types/site";

export function RoomDetail({ room }: { room: Room }) {
  const { language } = usePreferences();
  const localizedRoom = getLocalizedRoomBySlug(room.slug, language) ?? room;
  const copy = {
    tr: {
      eyebrow: "Serra Otel odası",
      bed: "Yatak",
      air: "Klima",
      tv: "TV",
      wifi: "Wi-Fi",
      bath: "Banyo",
      suitable: "Bu oda kimler için uygun?",
      capacity: "Kapasite",
      area: "Alan",
      balcony: "Balkon/Teras",
      yes: "Var",
      no: "Yok",
      request: "Bu Oda İçin Talep",
      noPayment: "Ödeme alınmaz, talep oluşturulur.",
      guest: "kişi",
    },
    en: {
      eyebrow: "Serra Hotel room",
      bed: "Bed",
      air: "Air conditioning",
      tv: "TV",
      wifi: "Wi-Fi",
      bath: "Bathroom",
      suitable: "Who is this room for?",
      capacity: "Capacity",
      area: "Size",
      balcony: "Balcony/Terrace",
      yes: "Yes",
      no: "No",
      request: "Request This Room",
      noPayment: "No payment is taken; only a request is created.",
      guest: "guests",
    },
    de: {
      eyebrow: "Serra Hotel Zimmer",
      bed: "Bett",
      air: "Klimaanlage",
      tv: "TV",
      wifi: "WLAN",
      bath: "Bad",
      suitable: "Fuer wen ist dieses Zimmer geeignet?",
      capacity: "Kapazitaet",
      area: "Groesse",
      balcony: "Balkon/Terrasse",
      yes: "Ja",
      no: "Nein",
      request: "Dieses Zimmer anfragen",
      noPayment: "Es wird keine Zahlung erhoben; nur eine Anfrage erstellt.",
      guest: "Gaeste",
    },
  }[language];
  const featureIcons = [
    [copy.bed, BedDouble],
    [copy.air, Snowflake],
    [copy.tv, Tv],
    [copy.wifi, Wifi],
    [copy.bath, Bath],
  ] as const;

  return (
    <section className="bg-cream-50 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <RoomGallery images={localizedRoom.images} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-700">{copy.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{localizedRoom.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">{localizedRoom.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {featureIcons.map(([label, Icon]) => (
                <div key={label as string} className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-sm">
                  <Icon className="text-olive-700" size={16} />
                  <span className="font-medium">{label as string}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">{copy.suitable}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {localizedRoom.suitableFor.map((item) => (
                  <span key={item} className="rounded-full bg-white px-4 py-2 text-sm text-stone-700 shadow-sm">{item}</span>
                ))}
              </div>
            </div>
          </div>
          <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
            <dl className="grid gap-4 text-sm">
              <div className="flex justify-between"><dt className="text-stone-500">{copy.capacity}</dt><dd>{localizedRoom.capacity} {copy.guest}</dd></div>
              <div className="flex justify-between"><dt className="text-stone-500">{copy.bed}</dt><dd>{localizedRoom.bedType}</dd></div>
              <div className="flex justify-between"><dt className="text-stone-500">{copy.area}</dt><dd>{localizedRoom.size}</dd></div>
              <div className="flex justify-between"><dt className="text-stone-500">{copy.balcony}</dt><dd>{localizedRoom.hasBalcony ? copy.yes : copy.no}</dd></div>
            </dl>
            <Button asChild className="mt-6 w-full gap-2 bg-[var(--brand-sea)] hover:bg-[var(--brand-sea)]/80 text-white border-transparent" size="lg">
              <a href={getWhatsAppUrl(language, localizedRoom.name)} target="_blank" rel="noopener noreferrer">
                {copy.request}
              </a>
            </Button>
            <p className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]"><Users size={16} /> {copy.noPayment}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
