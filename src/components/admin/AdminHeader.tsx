import Image from "next/image";
import Link from "next/link";
import { IMAGES, SITE } from "@/lib/site-data";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between bg-navy px-6 py-4">
      <div className="flex items-center gap-8">
        <Image src={IMAGES.logo} alt={SITE.name} className="h-10 w-auto object-contain" />
        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wide text-white/70 sm:flex">
          <Link href="/admin" className="hover:text-gold">
            Instagram
          </Link>
          <Link href="/admin/projeler" className="hover:text-gold">
            Proje Takip
          </Link>
        </nav>
      </div>
      <LogoutButton />
    </header>
  );
}
