"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { PreferenceControls } from "@/components/layout/preference-controls";
import { usePreferences } from "@/components/layout/preference-provider";
import { Button } from "@/components/ui/button";

export function ExperienceGate() {
  const [open, setOpen] = useState(false);
  const { t, language } = usePreferences();
  const copy = {
    tr: {
      title: "Serra deneyiminizi ayarlayın.",
      text: "Dil tercihiniz hatırlanır. Atmosfer günün saatine göre otomatik ayarlanır.",
      continue: "Devam Et",
    },
    en: {
      title: "Set your Serra experience.",
      text: "Your language is remembered. The atmosphere adjusts automatically by time of day.",
      continue: "Continue",
    },
    de: {
      title: "Richten Sie Ihr Serra-Erlebnis ein.",
      text: "Ihre Sprache wird gespeichert. Die Atmosphäre passt sich automatisch der Tageszeit an.",
      continue: "Weiter",
    },
  }[language];

  useEffect(() => {
    const id = window.setTimeout(() => {
      setOpen(localStorage.getItem("serra-experience-ready") !== "yes");
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-end bg-black/40 p-4 backdrop-blur-sm md:place-items-center">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-xl)]">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--brand-wood)] text-white">
            <Sparkles size={18} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-[var(--brand-gold)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">{t("personal")}</p>
            </div>
            <h2 className="serif-heading mt-2 text-2xl text-[var(--foreground)]">{copy.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy.text}</p>
          </div>
        </div>
        <div className="mt-5">
          <PreferenceControls compact />
        </div>
        <Button
          className="mt-6 w-full rounded-full"
          onClick={() => {
            localStorage.setItem("serra-experience-ready", "yes");
            setOpen(false);
          }}
        >
          {copy.continue}
        </Button>
      </div>
    </div>
  );
}
