"use client";

import Link from "next/link";

import { usePreferences } from "@/components/layout/preference-provider";
import { RoomCard } from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLocalizedRooms } from "@/lib/data/site";

export function RoomsShowcase({ limit }: { limit?: number }) {
  const { t, language } = usePreferences();
  const localizedRooms = getLocalizedRooms(language);
  const visibleRooms = limit ? localizedRooms.slice(0, limit) : localizedRooms;

  return (
    <section className="px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="blurUp">
          <SectionHeading eyebrow={t("roomsEyebrow")} title={t("roomsTitle")} description={t("roomsText")} />
        </Reveal>
        <RevealGroup stagger={0.1} className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRooms.map((room) => (
            <RevealItem key={room.id} variant="fadeUp">
              <RoomCard room={room} />
            </RevealItem>
          ))}
        </RevealGroup>
        {limit ? (
          <Reveal delay={0.3}>
            <div className="mt-10 sm:mt-12 text-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/odalar">{t("allRooms")}</Link>
              </Button>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
