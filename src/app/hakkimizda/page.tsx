import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { IMAGES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Hakkımızda – Güloğuz İnşaat",
};

const PARAGRAPHS = [
  "Güloğuz İnşaat, Erzurum merkezli bir yıkım, hafriyat ve altyapı firması olarak, inşaat sektörünün en kritik ve hassas aşamalarında güvenilir çözümler sunar. Her projenin temelinde doğru planlama, teknik uzmanlık ve sahada disiplin olduğuna inanırız. Bu nedenle yalnızca iş yapmakla kalmaz, her adımda değer üretiriz.",
  "Yıkım ve hafriyat süreçleri, bir projenin görünmeyen ama en önemli başlangıcıdır. Güloğuz İnşaat olarak, bu süreci çevreye duyarlı, güvenlik önlemleriyle donatılmış ve mühendislik ilkelerine uygun şekilde yönetiyoruz. Modern ekipmanlarımız ve deneyimli kadromuz sayesinde, şehir içi dönüşüm projelerinden kırsal altyapı çalışmalarına kadar geniş bir yelpazede hizmet veriyoruz.",
  "Her sahaya, her zemine özel çözümler geliştiriyor; zemin etütlerinden enkaz kaldırmaya, hafriyat taşımadan altyapı hazırlığına kadar tüm süreçleri titizlikle yürütüyoruz. Müşterilerimizle kurduğumuz şeffaf iletişim ve işbirliği kültürü sayesinde, sadece yüklenici değil, aynı zamanda güvenilir bir proje ortağı oluyoruz.",
  "Güloğuz İnşaat, Erzurum'un zorlu iklim ve arazi koşullarına uygun teknik donanımı ve saha tecrübesiyle, bölgeye özel çözümler sunar. Yerel ihtiyaçları ve çevresel hassasiyetleri gözeterek, hem kamu projelerinde hem özel sektör yatırımlarında etkin rol alır.",
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader title="Hakkımızda" breadcrumb="Hakkımızda" />

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Hakkımızda – Güloğuz İnşaat
            </h2>
            <div className="mt-6 flex flex-col gap-5 leading-relaxed text-ink/70">
              {PARAGRAPHS.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[520px]">
            <Image
              src={IMAGES.excavatorAction}
              alt="Güloğuz İnşaat saha çalışması"
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
