const STEPS = [
  {
    title: "İhtiyacınızı Dinliyoruz",
    text: "Sizi ve projenizi tanıyoruz. Hangi hizmete ihtiyacınız var, ne zaman ve nerede? Tüm detayları birlikte netleştiriyoruz.",
  },
  {
    title: "Yerinde İnceleme & Teklif",
    text: "Saha keşfi yapıyor, ihtiyaçlarınıza özel en uygun çözüm ve fiyat teklifini sunuyoruz.",
  },
  {
    title: "Planlama & Uygulama",
    text: "İş programını oluşturuyor, ekip ve ekipmanlarımızla sahada çalışmaya başlıyoruz. Her adımda şeffaf ve koordineli ilerliyoruz",
  },
  {
    title: "Teslim & Memnuniyet",
    text: "İşi zamanında ve eksiksiz teslim ediyoruz. Sizin memnuniyetiniz, bizim en büyük referansımız.",
  },
];

export default function ProcessSteps() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3a2013 0%, #22130b 45%, #140b07 100%)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 py-20">
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
          Birlikte Çalışmanın Dört Adımı
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.title} className="flex flex-col bg-white p-7">
              <h3 className="text-lg font-extrabold text-gold-dark">{step.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                {step.text}
              </p>
              <div className="mt-6 h-px w-full bg-ink/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
