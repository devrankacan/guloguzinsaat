import Image, { StaticImageData } from "next/image";

export default function ServiceDetailSection({
  heading,
  paragraphs,
  image,
  imageAlt,
}: {
  heading: string;
  paragraphs: string[];
  image: StaticImageData;
  imageAlt: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-6 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          <div className="relative aspect-square w-full overflow-hidden lg:aspect-auto lg:min-h-[380px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">{heading}</h2>
            <div className="mt-6 flex flex-col gap-4 leading-relaxed text-ink/70">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
