"use client";

import { Languages } from "lucide-react";

import { usePreferences } from "@/components/layout/preference-provider";
import { cn } from "@/lib/utils/cn";

const languages = ["tr", "en", "de"] as const;

export function PreferenceControls({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = usePreferences();

  return (
    <div className={cn(
      "inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface-glass)] p-1 shadow-[var(--shadow-sm)] backdrop-blur-md",
      compact && "w-full justify-center",
    )}>
      <Languages size={14} className="mx-2.5 text-[var(--brand-gold)]" />
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          className={cn(
            "h-7 rounded-full px-3 text-[11px] font-semibold uppercase text-[var(--muted)] transition-all duration-200",
            language === item && "bg-[var(--brand-sea)] text-white shadow-[var(--shadow-sm)]",
          )}
          onClick={() => setLanguage(item)}
          title={t("language")}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
