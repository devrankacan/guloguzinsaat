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

const WP_UPLOADS = "https://guloguzinsaatyikimhafriyat.com/wp-content/uploads/2025/08";

export const IMAGES = {
  logo: `${WP_UPLOADS}/logo3-1-1024x640.png`,
  heroMain: `${WP_UPLOADS}/New-Project-33.jpg`,
  whyTall: `${WP_UPLOADS}/New-Project-33-226x300.jpg`,
  whySmall: `${WP_UPLOADS}/New-Project-34.jpg`,
  insaat: `${WP_UPLOADS}/959381ef0ddf7e9d8f53a7f9176f40b0-1024x730.png`,
  yikim: `${WP_UPLOADS}/exc_ec750ehr_002_emea_66230-1024x683.jpg`,
  hafriyat: `${WP_UPLOADS}/76-1024x692.jpg`,
};
