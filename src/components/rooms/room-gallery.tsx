"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
import type { RoomImage } from "@/types/site";

export function RoomGallery({ images }: { images: RoomImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-soft)]" ref={emblaRef}>
        <div className="flex">
          {images.map((image, i) => (
            <div
              className="relative min-w-0 flex-[0_0_100%] aspect-[4/3] md:aspect-[16/9] cursor-pointer group"
              key={image.id}
              onClick={() => openLightbox(i)}
            >
              <Image src={image.url} alt={image.alt} fill preload={image.isCover} sizes="100vw" className="object-cover" />
              {/* Hover overlay with expand icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <div className="rounded-full bg-white/20 p-3 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={20} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button size="icon" variant="secondary" onClick={scrollPrev} aria-label="Onceki fotograf"><ChevronLeft size={18} /></Button>
          <Button size="icon" variant="secondary" onClick={scrollNext} aria-label="Sonraki fotograf"><ChevronRight size={18} /></Button>
        </div>
      </div>

      <Lightbox
        images={images.map((img) => ({ url: img.url, alt: img.alt }))}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
