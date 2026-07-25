import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { listPortfolio } from "@/lib/server/portfolio";
import { listReferences } from "@/lib/server/references";

export const metadata: Metadata = {
  title: "Projelerimiz – Güloğuz İnşaat",
};

export const revalidate = 0;

export default async function ProjelerPage() {
  const [items, references] = await Promise.all([listPortfolio(), listReferences()]);

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

      {references.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-[1320px] px-6 py-20">
            <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
              Çalıştığımız Markalar
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {references.map((r) => {
                const logo = (
                  <div className="relative flex h-24 w-full items-center justify-center bg-white p-5 shadow-sm">
                    <Image
                      src={r.logo}
                      alt={r.name}
                      fill
                      sizes="200px"
                      className="object-contain p-4"
                      unoptimized
                    />
                  </div>
                );
                return r.website ? (
                  <a key={r.id} href={r.website} target="_blank" rel="noreferrer" title={r.name}>
                    {logo}
                  </a>
                ) : (
                  <div key={r.id} title={r.name}>
                    {logo}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
