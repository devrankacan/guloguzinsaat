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
import yikimBuilding from "@/assets/images/yikim-building.webp";
import projectCoastal from "@/assets/images/project-coastal.webp";

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
  { label: "Projeler", href: "/projeler" },
  { label: "Galeri", href: "/galeri" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const SEARCH_INDEX = [
  {
    title: "Anasayfa",
    href: "/",
    keywords: "anasayfa güloğuz inşaat yıkım hafriyat erzurum",
  },
  {
    title: "Hakkımızda",
    href: "/hakkimizda",
    keywords: "hakkımızda kurumsal firma tecrübe ekip misyon vizyon",
  },
  {
    title: "Hizmetler",
    href: "/hizmetler",
    keywords: "hizmetler inşaat yıkım hafriyat",
  },
  {
    title: "İnşaat",
    href: "/insaat",
    keywords: "inşaat bina konut villa yapı mühendislik",
  },
  {
    title: "Yıkım",
    href: "/yikim",
    keywords: "yıkım bina yıkımı kontrollü yıkım güvenli yıkım",
  },
  {
    title: "Hafriyat",
    href: "/hafriyat",
    keywords: "hafriyat kazı taşıma dolgu saha düzenleme",
  },
  {
    title: "Projeler",
    href: "/projeler",
    keywords: "projeler portfolyo referanslar müşteri yorumları tamamlanan projeler",
  },
  {
    title: "Galeri",
    href: "/galeri",
    keywords: "galeri instagram fotoğraflar",
  },
  {
    title: "İletişim",
    href: "/iletisim",
    keywords: "iletişim telefon adres email harita mesaj form",
  },
  {
    title: "İnşaatım Ne Durumda?",
    href: "/insaatim-ne-durumda",
    keywords: "inşaatım ne durumda proje takip telefon sorgula aşama",
  },
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
  yikimBuilding,
  projectCoastal,
};
