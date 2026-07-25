import Hero from "@/components/home/Hero";
import StatsWhy from "@/components/home/StatsWhy";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesIntro from "@/components/home/ServicesIntro";
import Testimonials from "@/components/home/Testimonials";
import CtaContact from "@/components/home/CtaContact";
import { listTestimonials } from "@/lib/server/testimonials";

export const revalidate = 0;

export default async function Home() {
  const testimonials = await listTestimonials();

  return (
    <>
      <Hero />
      <StatsWhy />
      <ProcessSteps />
      <ServicesIntro />
      <Testimonials items={testimonials} />
      <CtaContact />
    </>
  );
}
