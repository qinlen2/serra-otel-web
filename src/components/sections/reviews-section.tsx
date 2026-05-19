"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

import { usePreferences } from "@/components/layout/preference-provider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    id: "r1",
    name: "Delal",
    rating: 5,
    date: "8 ay önce",
    text: "Konum olarak harika bir yerde. Çok sessiz sakin bir konumda. Plaja yürüme mesafesinde oluşu, iskeleye ve Çeşmealtı'na kolaylıkla 10 dakikada ulaşımı oldukça basit. Otel yeterince temiz, çalışanı çok güler yüzlü ve ilgili.",
    avatar: "D",
  },
  {
    id: "r2",
    name: "Mert",
    rating: 5,
    date: "1 yıl önce",
    text: "Serra Hotel'de geçirdiğim konaklamadan fazlasıyla memnun kaldım. Gerek odaların temizliği, gerek personelin güler yüzlü ve ilgili yaklaşımı, her şey gerçekten çok kaliteliydi. Konfor, huzur ve misafirperverlik arayan herkes için gönül rahatlığıyla tavsiye ederim.",
    avatar: "M",
  },
  {
    id: "r3",
    name: "Pelin",
    rating: 5,
    date: "1 yıl önce",
    text: "Odalar temiz, yatakları konforlu, manzarası muazzam. Resepsiyondaki hanımefendi çok kibar ve güler yüzlüydü. Denize son derece yakın, merkeze de yakın. Tam bir fiyat-performans oteli. Urla'ya her geldiğimde tercih edeceğim bir otel.",
    avatar: "P",
  },
  {
    id: "r4",
    name: "Aybüke",
    rating: 5,
    date: "8 ay önce",
    text: "1 gece konaklama fırsatımız oldu. Otel gayet temiz, odalar temizdi. Çalışanlar ise anlayışlı ve güler yüzlü idi. Biz gayet memnun kaldık. Bir daha yolumuz düşerse yine kalırız.",
    avatar: "A",
  },
];

const avatarColors = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block">
            <Star
              size={14}
              className="text-[var(--line)]"
            />
            {(filled || half) && (
              <Star
                size={14}
                className="fill-amber-400 text-amber-400 absolute inset-0"
                style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

export function ReviewsSection() {
  const { t } = usePreferences();

  return (
    <section className="px-5 py-16 md:px-8 md:py-24 bg-[var(--surface-soft)]">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={t("reviewsEyebrow")}
            title={t("reviewsTitle")}
            description={t("reviewsText")}
          />
        </Reveal>

        {/* Google rating badge */}
        <Reveal delay={0.1}>
          <div className="mb-10 flex flex-col items-center gap-3 md:mb-14">
            <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 shadow-[var(--shadow-sm)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[var(--muted)]">Google</span>
                <div className="flex items-center gap-1.5">
                  <AnimatedCounter value={4.5} decimals={1} duration={1.5} className="text-lg font-bold text-[var(--foreground)]" />
                  <StarRating rating={4.5} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reviews grid */}
        <RevealGroup stagger={0.12} className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <RevealItem key={review.id} variant="fadeUp">
              <motion.article
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-lg)]"
              >
                {/* Header: avatar + name + date */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} text-sm font-bold text-white shadow-md`}
                  >
                    {review.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--foreground)] truncate">{review.name}</p>
                    <p className="text-[11px] text-[var(--muted)]">{review.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="mt-3">
                  <StarRating rating={review.rating} />
                </div>

                {/* Review text */}
                <p className="mt-3 flex-1 text-[13px] sm:text-sm leading-relaxed text-[var(--muted)]">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Google attribution */}
                <div className="mt-4 flex items-center gap-1.5 border-t border-[var(--line)] pt-3">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-40" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-[10px] font-medium text-[var(--muted)]/60">Google Yorumu</span>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
