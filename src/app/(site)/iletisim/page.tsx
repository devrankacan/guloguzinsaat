import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "İletişim – Güloğuz İnşaat",
};

const CONTACT_CARDS = [
  { icon: MapPinIcon, title: "Adres", value: SITE.address },
  { icon: MailIcon, title: "Email Adres", value: SITE.email },
  { icon: PhoneIcon, title: "Telefon", value: SITE.phone },
];

const MAP_QUERY = encodeURIComponent(
  "Üniversite Mah. Prof.Dr.İhsan Doğramacı Blv 7/5 Anka Evler Sitesi, Yakutiye/Erzurum"
);

export default function IletisimPage() {
  return (
    <>
      <PageHeader title="İletişim" breadcrumb="İletişim" />

      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CONTACT_CARDS.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center gap-4 border border-ink/10 px-8 py-12 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-white">
                  <card.icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-extrabold text-ink">{card.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-[720px] px-6 py-20">
          <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
            Bize Yazın
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-ink/70">
            Projeniz hakkında bilgi verin, en kısa sürede size dönüş yapalım.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Güloğuz İnşaat konum"
            />
          </div>
        </div>
      </section>
    </>
  );
}
