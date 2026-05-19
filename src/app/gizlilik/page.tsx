import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Serra Otel Urla gizlilik politikası, kişisel veri işleme ve çerez kullanımı hakkında bilgilendirme.",
  openGraph: {
    title: "Gizlilik Politikası | Serra Otel Urla",
    description: "Serra Otel gizlilik politikası ve KVKK bilgilendirmesi.",
  },
};

export default function PrivacyPage() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-3 justify-center">
          <span className="h-px w-6 bg-[var(--brand-gold)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">Yasal bilgilendirme</p>
          <span className="h-px w-6 bg-[var(--brand-gold)]" />
        </div>
        <h1 className="serif-heading text-3xl md:text-4xl text-center text-[var(--foreground)] mb-12">Gizlilik Politikası</h1>

        <div className="prose-serra space-y-8 text-[15px] leading-7 text-[var(--muted)]">
          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">1. Veri Sorumlusu</h2>
            <p>
              Serra Otel, Atatürk Mahallesi, 2226. Sokak No:18, 35430 Urla/İzmir adresinde faaliyet gösteren konaklama tesisidir.
              Bu gizlilik politikası, web sitemizi ziyaret eden ve hizmetlerimizden yararlanan misafirlerimizin kişisel verilerinin korunmasına ilişkin uygulamalarımızı açıklamaktadır.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">2. Toplanan Kişisel Veriler</h2>
            <p>Web sitemiz üzerinden aşağıdaki bilgiler toplanabilir:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Ad ve soyad</li>
              <li>Telefon numarası</li>
              <li>E-posta adresi</li>
              <li>Giriş-çıkış tarihleri ve konaklama tercihleri</li>
              <li>Mesaj içeriği (rezervasyon formu aracılığıyla)</li>
            </ul>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">3. Verilerin İşlenme Amacı</h2>
            <p>Toplanan kişisel veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Rezervasyon taleplerinin işlenmesi ve yanıtlanması</li>
              <li>Konaklama hizmetinin sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Misafir memnuniyetinin artırılması</li>
            </ul>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">4. Verilerin Paylaşılması</h2>
            <p>
              Kişisel verileriniz üçüncü taraflarla pazarlama amacıyla paylaşılmaz. Veriler yalnızca yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">5. Çerez Kullanımı</h2>
            <p>
              Web sitemiz, dil tercihinizi hatırlamak amacıyla yerel depolama (localStorage) kullanmaktadır. Üçüncü taraf izleme çerezleri kullanılmamaktadır.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">6. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin güvenliği için gerekli teknik ve idari tedbirler alınmaktadır. Verileriniz şifrelenmiş bağlantılar (SSL/TLS) üzerinden iletilir.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">7. Haklarınız</h2>
            <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
            </ul>
          </div>

          <div>
            <h2 className="serif-heading text-xl text-[var(--foreground)] mb-3">8. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="mt-2 text-[var(--foreground)] font-medium">
              Serra Otel<br />
              Atatürk Mahallesi, 2226. Sokak No:18, 35430 Urla/İzmir<br />
              Telefon: +90 232 752 01 10<br />
              WhatsApp: +90 541 373 84 20
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
