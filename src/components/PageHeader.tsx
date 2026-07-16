import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { BuildingIcon } from "@/components/icons";
import { IMAGES } from "@/lib/site-data";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  title,
  breadcrumb,
  trail,
  image,
}: {
  title: string;
  breadcrumb?: string;
  trail?: Crumb[];
  image?: StaticImageData;
}) {
  const crumbs: Crumb[] = trail ?? (breadcrumb ? [{ label: breadcrumb }] : []);

  return (
    <section className="relative overflow-hidden bg-navy">
      <Image
        src={image ?? IMAGES.heroMain}
        alt=""
        fill
        aria-hidden
        className="pointer-events-none select-none object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-navy/65" />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-6 px-6 py-20 text-center sm:py-24">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        <div className="inline-flex flex-wrap items-center justify-center gap-2 border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white">
          <BuildingIcon className="h-4 w-4 shrink-0 text-gold" />
          <Link href="/" className="hover:text-gold">
            Anasayfa
          </Link>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={crumb.label} className="inline-flex items-center gap-2">
                <span className="text-white/40">/</span>
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="hover:text-gold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-gold" : ""}>{crumb.label}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
