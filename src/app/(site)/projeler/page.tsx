import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { listPortfolio } from "@/lib/server/portfolio";
import { listTestimonials } from "@/lib/server/testimonials";

export const metadata: Metadata = {
  title: "Projelerimiz – Güloğuz İnşaat",
};

export const revalidate = 0;

export default async function ProjelerPage() {
  const [items, testimonials] = await Promise.all([listPortfolio(), listTestimonials()]);

  return (
    <>
      <PageHeader title="Projelerimiz" breadcrumb="Projeler" />

      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20">
          {items.length === 0 ? (
            <p className="text-center text-ink/60">
              Tamamlanmış proje örnekleri yakında burada yer alacak.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col bg-cream p-6 shadow-sm">
                  {item.images[0] && (
                    <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gold-dark">
                    {[item.category, item.location, item.completedAt].filter(Boolean).join(" · ")}
                  </p>
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.description}</p>
                  )}
                  {item.images.length > 1 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {item.images.slice(1, 4).map((img) => (
                        <div key={img} className="relative aspect-square overflow-hidden">
                          <Image
                            src={img}
                            alt={item.title}
                            fill
                            sizes="120px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-[1320px] px-6 py-20">
            <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
              Müşterilerimiz Ne Diyor?
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.id} className="flex flex-col bg-white p-7 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-ink/70">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-extrabold text-ink">
                    {t.authorName}
                    {t.authorRole && (
                      <span className="font-normal text-ink/60"> · {t.authorRole}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
