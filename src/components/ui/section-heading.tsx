import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, description, className, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-10 max-w-3xl md:mb-14",
      align === "center" && "mx-auto text-center",
      className,
    )}>
      {eyebrow ? (
        <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-6 bg-[var(--brand-gold)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">{eyebrow}</p>
          <span className="h-px w-6 bg-[var(--brand-gold)]" />
        </div>
      ) : null}
      <h2 className="serif-heading text-3xl text-[var(--foreground)] md:text-4xl lg:text-[2.75rem]">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--muted)] md:text-base">
          {align === "center" ? <span className="mx-auto block max-w-2xl">{description}</span> : description}
        </p>
      ) : null}
    </div>
  );
}
