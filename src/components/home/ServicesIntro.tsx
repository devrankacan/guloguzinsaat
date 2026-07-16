import Image from "next/image";
import { ArrowUpRightIcon, BuildingIcon, HardHatIcon, HouseToolIcon } from "@/components/icons";
import { IMAGES } from "@/lib/site-data";

const SERVICES = [
  {
    icon: BuildingIcon,
    title: "İnşaat",
    href: "/insaat",
    text: "Anahtar teslim projelerden altyapı hazırlıklarına kadar, her aşamada mühendislik odaklı çözümler sunuyoruz.",
    image: IMAGES.insaat,
  },
  {
    icon: HardHatIcon,
    title: "Yıkım",
    href: "/yikim",
    text: "Kontrollü, güvenli ve çevreye duyarlı yıkım. Modern ekipmanlarla, riskleri minimize ederek yapıları planlı şekilde ortadan kaldırıyoruz.",
    image: IMAGES.yikim,
  },
  {
    icon: HouseToolIcon,
    title: "Hafriyat",
    href: "/hafriyat",
    text: "Kazı, dolgu, taşıma ve saha düzenleme işlemlerini hızlı, hassas ve sorunsuz şekilde gerçekleştiriyoruz.",
    image: IMAGES.hafriyat,
  },
];

export default function ServicesIntro({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Image
        src={IMAGES.servicesBlueprint}
        alt=""
        fill
        aria-hidden
        className="pointer-events-none select-none object-cover object-left opacity-[0.06]"
      />
      <div className="relative mx-auto max-w-[1320px] px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="max-w-xl text-3xl font-extrabold text-ink sm:text-4xl">
            İnşaat, Yıkım, Hafriyat Hepsi Tek Çatı Altında.
          </h2>
          {showCta && (
            <a href="/hizmetler" className="btn-gold">
              Hizmetlerimiz
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-white">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-ink">
                <a href={service.href} className="hover:text-gold-dark">
                  {service.title}
                </a>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{service.text}</p>
              <a
                href={service.href}
                className="relative mt-6 block aspect-[4/3] w-full overflow-hidden shadow-md"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
