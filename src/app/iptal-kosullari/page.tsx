import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İptal ve İade Koşulları",
  description: "Serra Otel Urla rezervasyon iptal ve iade koşulları, erken çıkış ve no-show politikası.",
  openGraph: {
    title: "İptal ve İade Koşulları | Serra Otel Urla",
    description: "Serra Otel rezervasyon iptal koşulları hakkında bilgilendirme.",
  },
};

export default function CancellationPage() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-3 justify-center">
          <span className="h-px w-6 bg-[var(--brand-gold)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">Konaklama koşulları</p>
          <span className="h-px w-6 bg-[var(--brand-gold)]" />
        </div>
        <h1 className="serif-heading text-3xl md:text-4xl text-center text-[var(--foreground)] mb-12">İptal ve İade Koşulları</h1>

        <div className="prose-serra space-y-8 text-[15px] leading-7 text-[var(--muted)]">
          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">1. Rezervasyon Onayı</h2>
            <p>
              Rezervasyonlar, Serra Otel tarafından telefon veya WhatsApp üzerinden onaylandıktan sonra geçerlidir.
              Online ödeme alınmamaktadır. Ödeme tesiste konaklama sırasında yapılır.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">2. Ücretsiz İptal</h2>
            <p>
              Konaklama tarihinden <strong className="text-[var(--foreground)]">en az 3 gün (72 saat) önce</strong> yapılan iptallerde herhangi bir ücret talep edilmez. İptal bildirimini telefon veya WhatsApp üzerinden yapabilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">3. Geç İptal</h2>
            <p>
              Konaklama tarihinden 72 saatten kısa süre önce yapılan iptallerde, ilk gece konaklama bedeli tahsil edilebilir.
              Mücbir sebepler (sağlık sorunları, doğal afet vb.) bu kapsamda değerlendirilmez.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">4. No-Show (Gelmeme)</h2>
            <p>
              Önceden iptal bildiriminde bulunmadan gelmeyen misafirlerden toplam konaklama bedelinin tamamı talep edilebilir.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">5. Erken Çıkış</h2>
            <p>
              Planlanan tarihten önce otelden ayrılma durumunda, kalan geceler için iade yapılmaz. Ancak Serra Otel, mücbir sebep hallerinde esneklik gösterebilir.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">6. Giriş ve Çıkış Saatleri</h2>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-gold)]">Giriş</p>
                <p className="serif-heading text-2xl text-[var(--foreground)] mt-1">14:00</p>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-gold)]">Çıkış</p>
                <p className="serif-heading text-2xl text-[var(--foreground)] mt-1">12:30</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">7. Ödeme</h2>
            <p>
              Ödeme yalnızca tesiste yapılır. Nakit ve kredi kartı kabul edilmektedir. Online ön ödeme veya depozito uygulaması bulunmamaktadır.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">8. İletişim</h2>
            <p>
              İptal, değişiklik veya sorularınız için:
            </p>
            <p className="mt-2 text-[var(--foreground)] font-medium">
              Telefon: +90 232 752 01 10<br />
              WhatsApp: +90 532 275 54 55<br />
              Adres: Atatürk Mahallesi, 2226. Sokak No:18, 35430 Urla/İzmir
            </p>
          </div>

          <p className="text-[13px] text-[var(--muted)]/60 pt-4 border-t border-[var(--line)]">
            Son güncelleme: Mayıs 2026
          </p>
        </div>
      </div>
    </section>
  );
}
