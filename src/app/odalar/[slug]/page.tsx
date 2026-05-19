import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/sections/contact-section";
import { RoomDetail } from "@/components/rooms/room-detail";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getRoomBySlug, rooms } from "@/lib/data/site";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serraotel.com";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Serra Otel Odalar" };

  const title = `${room.name} | Serra Otel Urla`;
  const description = `${room.name} — ${room.size}, ${room.bedType}. ${room.shortDescription}`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE}/odalar/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE}/odalar/${slug}`,
      images: room.images.map((img) => ({
        url: `${BASE}${img.url}`,
        alt: img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE}${room.images[0]?.url}`],
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) notFound();

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Ana Sayfa", url: BASE },
        { name: "Odalar", url: `${BASE}/odalar` },
        { name: room.name, url: `${BASE}/odalar/${slug}` },
      ]} />
      <RoomDetail room={room} />
      <ContactSection contextRoom={room} />
    </>
  );
}
