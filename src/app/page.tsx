import Hero from "@/components/home/Hero";
import StatsWhy from "@/components/home/StatsWhy";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesIntro from "@/components/home/ServicesIntro";
import CtaContact from "@/components/home/CtaContact";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsWhy />
      <ProcessSteps />
      <ServicesIntro />
      <CtaContact />
    </>
  );
}
