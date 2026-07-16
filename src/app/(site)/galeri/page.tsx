import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getInstagramSettings } from "@/lib/server/instagram";
import { InstagramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Galeri – Güloğuz İnşaat",
};

export const revalidate = 0;

export default async function GaleriPage() {
  const settings = await getInstagramSettings();
  const posts = settings.posts;

  return (
    <>
      <PageHeader title="Galeri" breadcrumb="Galeri" />

      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <InstagramIcon className="h-10 w-10 text-ink/30" />
              <p className="max-w-md text-ink/60">
                Henüz görüntülenecek bir Instagram gönderisi yok. Yeni paylaşımlar yapıldıkça
                burada otomatik olarak görünecek.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block aspect-square overflow-hidden bg-cream"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl}
                    alt={post.caption?.slice(0, 80) ?? "Instagram gönderisi"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-navy/0 p-4 opacity-0 transition-all duration-200 group-hover:bg-navy/50 group-hover:opacity-100">
                    <InstagramIcon className="h-6 w-6 text-white" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
