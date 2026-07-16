import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PhoneStatusLookup from "@/components/PhoneStatusLookup";

export const metadata: Metadata = {
  title: "İnşaatım Ne Durumda? – Güloğuz İnşaat",
};

export default function InsaatimNeDurumdaPage() {
  return (
    <>
      <PageHeader title="İnşaatım Ne Durumda?" breadcrumb="İnşaatım Ne Durumda?" />

      <section className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 py-20">
          <p className="mx-auto mb-10 max-w-lg text-center text-ink/70">
            Güloğuz İnşaat ile çalıştığınız projenin güncel durumunu görmek için kayıtlı telefon
            numaranızı girin.
          </p>
          <PhoneStatusLookup />
        </div>
      </section>
    </>
  );
}
