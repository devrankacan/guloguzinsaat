import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import { IMAGES, SITE } from "@/lib/site-data";

export default function Hero() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-[1320px] px-6 pb-14 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <h1 className="text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl">
            &ldquo;Yıkımda Ustalık, Hafriyatta Güven.&rdquo;
          </h1>
          <div className="flex flex-col gap-8">
            <p className="text-base leading-relaxed text-white/70">
              Projenizin ilk adımında yanınızdayız: Güvenli yıkım, hassas hafriyat. Her
              aşamada mühendislik odaklı çözümlerimizle, zemini en doğru şekilde
              hazırlıyor; inşa sürecinizin sağlam temellerle başlamasını sağlıyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/hizmetler" className="btn-gold">
                Hizmetlerimiz
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
              <a href={`tel:${SITE.phoneHref}`} className="btn-outline">
                Bizi Arayın
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
            <Image
              src={IMAGES.heroMain}
              alt="Güloğuz İnşaat şantiye"
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-cover"
              preload
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-gold" : "bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
