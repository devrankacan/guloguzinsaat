import Image from "next/image";
import Link from "next/link";
import { IMAGES, SITE } from "@/lib/site-data";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV_LINKS = [
  { href: "/admin", label: "Instagram" },
  { href: "/admin/projeler", label: "Proje Takip" },
  { href: "/admin/projelerimiz", label: "Projelerimiz" },
  { href: "/admin/referanslar", label: "Referanslar" },
  { href: "/admin/mesajlar", label: "Mesajlar" },
];

export default function AdminHeader() {
  return (
    <header className="bg-navy px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Image src={IMAGES.logo} alt={SITE.name} className="h-10 w-auto object-contain" />
          <nav className="hidden flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wide text-white/70 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <LogoutButton />
      </div>

      <nav className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-wide text-white/70 lg:hidden">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-gold">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
