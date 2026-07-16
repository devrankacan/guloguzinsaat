import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { BuildingIcon } from "@/components/icons";
import { IMAGES } from "@/lib/site-data";

export default function PageHeader({
  title,
  breadcrumb,
  image,
}: {
  title: string;
  breadcrumb: string;
  image?: StaticImageData;
}) {
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
        <div className="inline-flex items-center gap-2 border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white">
          <BuildingIcon className="h-4 w-4 shrink-0 text-gold" />
          <Link href="/" className="hover:text-gold">
            Anasayfa
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-gold">{breadcrumb}</span>
        </div>
      </div>
    </section>
  );
}
