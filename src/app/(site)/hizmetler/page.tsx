import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServicesIntro from "@/components/home/ServicesIntro";

export const metadata: Metadata = {
  title: "Hizmetler – Güloğuz İnşaat",
};

export default function HizmetlerPage() {
  return (
    <>
      <PageHeader title="Hizmetler" breadcrumb="Hizmetler" />
      <ServicesIntro showCta={false} />
    </>
  );
}
