import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BehanceIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  XTwitterIcon,
} from "@/components/icons";
import { IMAGES, SITE } from "@/lib/site-data";

const SERVICE_LINKS = [
  { label: "İnşaat", href: "/insaat" },
  { label: "Yıkım", href: "/yikim" },
  { label: "Hafriyat", href: "/hafriyat" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src={IMAGES.logo}
            alt={SITE.name}
            width={168}
            height={105}
            className="h-14 w-auto object-contain"
          />
          <ul className="mt-6 flex items-center gap-3">
            {[FacebookIcon, XTwitterIcon, LinkedinIcon, BehanceIcon].map((Icon, i) => (
              <li key={i}>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-lg font-extrabold">Sayfalar</h2>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li>
              <Link href="/" className="flex items-center gap-2 hover:text-gold">
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" />
                Anasayfa
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="flex items-center gap-2 hover:text-gold">
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" />
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="flex items-center gap-2 hover:text-gold">
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" />
                Hizmetler
              </Link>
            </li>
            <li>
              <Link href="/galeri" className="flex items-center gap-2 hover:text-gold">
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" />
                Galeri
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="flex items-center gap-2 hover:text-gold">
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" />
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-lg font-extrabold">Hizmetler</h2>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            {SERVICE_LINKS.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="flex items-center gap-2 hover:text-gold">
                  <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-lg font-extrabold">İletişim</h2>
          <ul className="flex flex-col gap-4 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span>{SITE.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 shrink-0 text-gold" />
              <span className="break-all">{SITE.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-1 px-6 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright@ 2025 Consalfa. All Rights Reserved.</p>
          <p>
            Created By{" "}
            <a
              href="http://www.devrankacan.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-gold"
            >
              Devran Kaçan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
