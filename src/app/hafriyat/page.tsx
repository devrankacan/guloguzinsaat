import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import { IMAGES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Hafriyat – Güloğuz İnşaat",
};

const PARAGRAPHS = [
  "Erzurum'un taşlı toprağını, sert zeminini ve zorlu iklimini bilen bir ekip olarak, hafriyat işini sağlam yapıyoruz. Güloğuz İnşaat, kazıdan dolguya, temel açımından saha düzenlemeye kadar her aşamada profesyonel hizmet sunar.",
  "İster yayla zemini olsun, ister şehir içi dar alanlar... İş makinelerimizle, deneyimli operatörlerimizle ve yerel bilgi birikimimizle her türlü hafriyat işini hızlı, güvenli ve çevreye duyarlı şekilde tamamlıyoruz.",
  "Konut projeleri, altyapı çalışmaları, yol açma ve arazi düzenleme gibi işlerinizde yanınızdayız. Erzurum'un kışına, donmuş zeminine ve yüksek rakımına özel çözümler geliştiriyoruz. Her kazı, her dolgu bizim için bir hassas mühendislik işidir.",
  "Güloğuz İnşaat, Erzurum'da sadece toprak değil; güven taşır. Hafriyat işiniz varsa, biz hazırız.",
];

export default function HafriyatPage() {
  return (
    <>
      <PageHeader
        title="Hafriyat"
        trail={[{ label: "Hizmetler", href: "/hizmetler" }, { label: "Hafriyat" }]}
      />
      <ServiceDetailSection
        heading="Hafriyat Hizmetimiz"
        paragraphs={PARAGRAPHS}
        image={IMAGES.projectCoastal}
        imageAlt="Güloğuz İnşaat hafriyat hizmeti"
      />
    </>
  );
}
