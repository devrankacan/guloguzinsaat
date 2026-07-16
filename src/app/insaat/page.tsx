import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import { IMAGES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "İnşaat – Güloğuz İnşaat",
};

const PARAGRAPHS = [
  "Yapıların sadece beton ve demirden ibaret olmadığını biliyoruz. Her proje, bir vizyonun, bir yaşam alanının ve bir güven duygusunun somutlaşmış halidir. Biz de bu bilinçle, inşaat süreçlerini sadece teknik bir iş değil, aynı zamanda bir sorumluluk olarak ele alıyoruz.",
  "İnşaat hizmetimiz; konut, ticari yapı, sanayi tesisi ve altyapı projelerinde anahtar teslim çözümler sunar. Projenin ilk adımından son aşamasına kadar tüm süreçleri titizlikle yönetiriz: keşif, proje planlama, ruhsatlandırma, temel kazısı, kaba yapı, ince işler ve çevre düzenlemesi dahil olmak üzere her adımda uzman kadromuzla yanınızdayız.",
  "Modern mühendislik tekniklerini, kaliteli malzeme kullanımını ve iş güvenliği standartlarını bir araya getirerek, hem sağlam hem estetik yapılar inşa ediyoruz. Zamanında teslim, bütçeye uygunluk ve sürdürülebilirlik ilkelerimizden ödün vermeden çalışıyoruz.",
  "İster sıfırdan bir yapı hayal edin, ister mevcut bir yapıyı dönüştürmek isteyin—bizimle çalıştığınızda, sadece bir inşaat firmasıyla değil, çözüm ortağınızla yol alırsınız.",
];

export default function InsaatPage() {
  return (
    <>
      <PageHeader
        title="İnşaat"
        trail={[{ label: "Hizmetler", href: "/hizmetler" }, { label: "İnşaat" }]}
      />
      <ServiceDetailSection
        heading="İnşaat Hizmetimiz"
        paragraphs={PARAGRAPHS}
        image={IMAGES.heroMain}
        imageAlt="Güloğuz İnşaat inşaat hizmeti"
      />
    </>
  );
}
