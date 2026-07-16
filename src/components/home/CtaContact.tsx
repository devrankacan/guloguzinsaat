import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/lib/site-data";

export default function CtaContact() {
  return (
    <section
      id="iletisim"
      style={{
        background:
          "linear-gradient(90deg, var(--color-navy) 0%, #46464b 55%, #e7e7e5 100%)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 py-16">
        <h2 className="max-w-xl text-3xl font-extrabold text-white sm:text-4xl">
          Projelerinizi Birlikte Hayata Geçirelim
        </h2>
        <a href="/iletisim" className="btn-gold mt-7 inline-flex">
          İletişim
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>

        <div className="mt-10 h-px w-full bg-white/25" />

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-gold text-ink">
              <MailIcon className="h-6 w-6" />
            </span>
            <div>
              <div className="font-extrabold text-white">E-Mail</div>
              <div className="text-sm text-white/80">{SITE.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-gold text-ink">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-extrabold text-white">Telefon</div>
              <div className="text-sm text-white/80">{SITE.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
