import logoGold from "@/assets/images/logo-gold.webp";
import logoIcon from "@/assets/images/logo-icon.webp";
import heroCrane from "@/assets/images/hero-crane.webp";
import whyTall from "@/assets/images/why-tall.webp";
import whySmall from "@/assets/images/why-small.webp";
import serviceInsaat from "@/assets/images/service-insaat.webp";
import serviceYikim from "@/assets/images/service-yikim.webp";
import serviceHafriyat from "@/assets/images/service-hafriyat.webp";
import servicesBlueprint from "@/assets/images/services-blueprint.webp";
import hafriyatTruck from "@/assets/images/hafriyat-truck.webp";

export const SITE = {
  name: "Güloğuz İnşaat",
  tagline: "Yıkım Hafriyat",
  phone: "0553 701 3225",
  phoneHref: "+905537013225",
  email: "iletisim@guloguzinsaatyikimhafriat.com",
  location: "Yakutiye/Erzurum",
  address: "Üniversite Mah. Prof.Dr.İhsan Doğramacı bulvarı Anka Sitesi A/22 Yakutiye/Erzurum",
};

export const NAV_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  {
    label: "Hizmetler",
    href: "/hizmetler",
    children: [
      { label: "İnşaat", href: "/insaat" },
      { label: "Yıkım", href: "/yikim" },
      { label: "Hafriyat", href: "/hafriyat" },
    ],
  },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "X-twitter", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "Instagram", href: "#" },
] as const;

export const IMAGES = {
  logo: logoGold,
  logoIcon,
  heroMain: heroCrane,
  whyTall,
  whySmall,
  insaat: serviceInsaat,
  yikim: serviceYikim,
  hafriyat: serviceHafriyat,
  servicesBlueprint,
  excavatorAction: hafriyatTruck,
};
