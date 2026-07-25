import Hero from "@/components/home/Hero";
import StatsWhy from "@/components/home/StatsWhy";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesIntro from "@/components/home/ServicesIntro";
import BrandReferences from "@/components/home/BrandReferences";
import CtaContact from "@/components/home/CtaContact";
import { listReferences } from "@/lib/server/references";

export const revalidate = 0;

export default async function Home() {
  const references = await listReferences();

  return (
    <>
      <Hero />
      <StatsWhy />
      <ProcessSteps />
      <ServicesIntro />
      <BrandReferences items={references} />
      <CtaContact />
    </>
  );
}
