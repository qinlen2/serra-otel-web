"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { PreferenceControls } from "@/components/layout/preference-controls";
import { usePreferences } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, siteSettings } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";

const nav = [
  ["rooms", "/odalar"],
  ["hotel", "/otel"],
  ["breakfast", "/kahvalti"],
  ["nearby", "/cevre"],
  ["urlaGuide", "/urla-rehberi"],
  ["transport", "/ulasim"],
  ["contact", "/iletisim"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { t, language } = usePreferences();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-[var(--surface-glass)] border-b border-[var(--line)]/50 shadow-[var(--shadow-sm)] backdrop-blur-2xl"
          : isHome
            ? "bg-transparent border-b border-transparent"
            : "bg-[var(--surface-glass)] border-b border-[var(--line)]/50 backdrop-blur-2xl"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="group relative flex flex-col leading-none">
          <span
            className={cn(
              "serif-heading text-[22px] tracking-tight transition-colors duration-500",
              !scrolled && isHome ? "text-white" : "text-[var(--foreground)]"
            )}
          >
            Serra
          </span>
          <span
            className={cn(
              "flex items-center gap-[6px] text-[9px] font-bold uppercase tracking-[0.35em] transition-colors duration-500",
              !scrolled && isHome ? "text-[var(--brand-gold)]" : "text-[var(--brand-gold)]"
            )}
          >
            <span className="inline-block h-[1px] w-3 bg-current opacity-50" />
            Otel · Urla
            <span className="inline-block h-[1px] w-3 bg-current opacity-50" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                  !scrolled && isHome
                    ? isActive
                      ? "bg-white/15 text-white backdrop-blur-md"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                    : isActive
                      ? "bg-[var(--surface-soft)] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-soft)]/50",
                )}
              >
                {t(label)}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-[var(--brand-gold)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <PreferenceControls />
          <Button
            asChild
            variant="outline"
            className={cn(
              "rounded-full transition-all duration-500",
              !scrolled && isHome
                ? "border-white/25 bg-white/5 text-white hover:bg-white/15 backdrop-blur-md"
                : ""
            )}
          >
            <a href={`tel:${siteSettings.phone}`}>
              <Phone size={15} />
              {t("call")}
            </a>
          </Button>
          <Button
            asChild
            className={cn(
              "rounded-full transition-all duration-500",
              !scrolled && isHome
                ? "bg-white text-[var(--brand-sea)] hover:bg-white/90 shadow-lg"
                : ""
            )}
          >
            <Link href="/iletisim">{t("request")}</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              className={cn(
                "lg:hidden",
                !scrolled && isHome ? "text-white hover:bg-white/10" : ""
              )}
              size="icon"
              variant="ghost"
              aria-label="Menu"
            >
              <Menu size={22} />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[86vw] max-w-sm bg-[var(--surface)] p-6 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <Dialog.Title className="serif-heading text-xl">Serra Otel</Dialog.Title>
                <Dialog.Close asChild>
                  <Button size="icon" variant="ghost" aria-label="Kapat">
                    <X size={20} />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="grid gap-1">
                {nav.map(([label, href]) => (
                  <Dialog.Close asChild key={href}>
                    <Link
                      className={cn(
                        "rounded-lg px-3 py-3.5 text-base transition hover:bg-[var(--surface-soft)]",
                        pathname === href ? "font-semibold text-[var(--foreground)]" : "text-[var(--muted)]"
                      )}
                      href={href}
                    >
                      {t(label)}
                    </Link>
                  </Dialog.Close>
                ))}
              </div>
              <div className="mt-6">
                <PreferenceControls compact />
              </div>
              <div className="mt-8 grid gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/iletisim">{t("request")}</Link>
                </Button>
                <Button asChild variant="secondary" className="rounded-full">
                  <a href={getWhatsAppUrl(language)}>WhatsApp</a>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
