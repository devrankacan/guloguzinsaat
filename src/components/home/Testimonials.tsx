import { ArrowUpRightIcon } from "@/components/icons";
import type { Testimonial } from "@/lib/server/testimonials";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Müşterilerimiz Ne Diyor?
          </h2>
          <a href="/projeler" className="btn-gold">
            Tüm Projeler ve Referanslar
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((t) => (
            <div key={t.id} className="flex flex-col bg-white p-7 shadow-sm">
              <p className="text-sm italic leading-relaxed text-ink/70">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-extrabold text-ink">
                {t.authorName}
                {t.authorRole && <span className="font-normal text-ink/60"> · {t.authorRole}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
