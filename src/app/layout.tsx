import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Güloğuz İnşaat – Yıkım Hafriyat",
  description:
    "Güloğuz İnşaat; Erzurum'da yıkım, hafriyat ve inşaat hizmetlerinde mühendislik odaklı, güvenli ve çevreye duyarlı çözümler sunar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${nunitoSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
