import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import { IMAGES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Yıkım – Güloğuz İnşaat",
};

const PARAGRAPHS = [
  "Erzurum'da bir yapıyı yıkmak, sadece duvarları sökmek değil; o alanı yeni bir geleceğe hazırlamak demektir. Güloğuz İnşaat olarak, Palandöken'in sert havasına, şehrin tarihi dokusuna ve yerel ihtiyaçlara uygun yıkım çözümleri sunuyoruz.",
  "İster eski bir konut olsun, ister kullanılmayan bir fabrika... Her yıkım işine Erzurum'un şartlarını gözeterek yaklaşıyoruz. Önce güvenlik, sonra çevre hassasiyeti, ardından da temiz bir teslim. İş makinelerimizle, deneyimli operatörlerimizle sahada yılların tecrübesiyle çalışıyoruz.",
  "Yıkım sonrası enkaz kaldırma, geri dönüşüm ayrıştırması ve alan temizliği gibi işlemleri de eksiksiz yerine getiriyoruz. Kışın zorlu koşullarına, dar sokaklara ya da tarihi yapılara özel çözümler geliştiriyoruz.",
  "Güloğuz İnşaat, Erzurum'da yıkım işini bilen, işini sağlam yapan bir ekip. Yeni projelere yer açmak için önce eskiyi güvenle kaldırıyoruz. Çünkü bizce her yıkım, bir başlangıçtır.",
];

export default function YikimPage() {
  return (
    <>
      <PageHeader
        title="Yıkım"
        trail={[{ label: "Hizmetler", href: "/hizmetler" }, { label: "Yıkım" }]}
      />
      <ServiceDetailSection
        heading="Yıkım Hizmetimiz"
        paragraphs={PARAGRAPHS}
        image={IMAGES.yikimBuilding}
        imageAlt="Güloğuz İnşaat yıkım hizmeti"
      />
    </>
  );
}
