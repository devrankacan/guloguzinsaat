import Image from "next/image";
import { CheckCircleIcon } from "@/components/icons";
import { IMAGES } from "@/lib/site-data";

const STATS = [
  { value: "20+", label: "Yıllık Tecrübe" },
  { value: "150+", label: "Bitirilmiş Proje" },
  { value: "30+", label: "Tecrübeli Ekip" },
  { value: "500+", label: "Memnun Müşteri" },
];

const REASONS = [
  "Uzmanlıkla Başlayan Her Proje",
  "Çevreye Duyarlı, Güvenli Çözümler",
  "Modern Ekipman, Hızlı Uygulama",
  "Şeffaflık ve İşbirliği Kültürü",
];

export default function StatsWhy() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1fr_1.15fr_1.35fr] lg:gap-10">
        <div className="flex flex-col">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 ${i !== 0 ? "border-t border-ink/10" : "pt-0"}`}
            >
              <div className="text-4xl font-extrabold text-gold-dark sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-ink/70">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={IMAGES.whyTall}
              alt="Güloğuz İnşaat mühendisleri"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 w-[55%] overflow-hidden border-4 border-white bg-white shadow-lg sm:-right-10">
            <div className="relative aspect-[7/8] w-full">
              <Image
                src={IMAGES.whySmall}
                alt="Güloğuz İnşaat saha ekibi"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:pl-4">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Neden Güloğuz İnşaat?
          </h2>
          <p className="mt-5 leading-relaxed text-ink/70">
            Yıkım sadece bir son değil, yeni bir başlangıcın ilk adımıdır. Güloğuz
            İnşaat, çevreye duyarlı yaklaşımı ve teknik uzmanlığıyla, geleceğe zarar
            vermeden bugünü dönüştürür.
          </p>
          <ul className="mt-7 flex flex-col gap-4">
            {REASONS.map((r, i) => (
              <li
                key={r}
                className={`flex items-center gap-3 pb-4 text-sm font-semibold text-ink ${
                  i !== REASONS.length - 1 ? "border-b border-ink/10" : ""
                }`}
              >
                <CheckCircleIcon className="h-5 w-5 shrink-0 text-gold-dark" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
