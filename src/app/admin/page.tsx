import type { Metadata } from "next";

import { AdminEditor } from "@/components/admin/admin-editor";

export const metadata: Metadata = {
  title: "Yönetim Paneli | Serra Otel",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      {/* Hide the site chrome (header, footer, widgets) on the admin page via CSS */}
      <style>{`
        header, footer, [data-mobile-action-bar], [data-whatsapp-widget], [data-back-to-top], [data-page-loader], [data-experience-gate] {
          display: none !important;
        }
        main { padding-bottom: 0 !important; }
        body { padding-bottom: 0 !important; }
      `}</style>

      <section className="min-h-screen bg-[var(--background)] px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--brand-gold)]">
                  Yönetim Paneli
                </span>
                <span className="h-px w-8 bg-[var(--brand-gold)]" />
              </div>
              <h1 className="serif-heading text-3xl text-[var(--foreground)] md:text-4xl">
                İçerik Yönetimi
              </h1>
              <p className="mt-2 max-w-lg text-sm text-[var(--muted)]">
                Oda bilgileri, fotoğraflar, kahvaltı menüsü, çevre kartları ve otel ayarlarını buradan düzenleyebilirsiniz.
              </p>
            </div>
            <a
              href="/"
              className="flex h-9 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 text-xs font-medium text-[var(--muted)] transition hover:bg-[var(--surface-soft)]"
            >
              ← Siteye Dön
            </a>
          </div>

          {/* Editor */}
          <AdminEditor />
        </div>
      </section>
    </>
  );
}
