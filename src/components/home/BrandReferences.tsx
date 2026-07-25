import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import type { BrandReference } from "@/lib/server/references";

export default function BrandReferences({ items }: { items: BrandReference[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Çalıştığımız Markalar
          </h2>
          <a href="/projeler" className="btn-gold">
            Tüm Projeler ve Referanslar
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => {
            const logo = (
              <div className="relative flex h-24 w-full items-center justify-center bg-white p-5 shadow-sm">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="200px"
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
            );
            return item.website ? (
              <a
                key={item.id}
                href={item.website}
                target="_blank"
                rel="noreferrer"
                title={item.name}
              >
                {logo}
              </a>
            ) : (
              <div key={item.id} title={item.name}>
                {logo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
