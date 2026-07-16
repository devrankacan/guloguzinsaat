import Image from "next/image";
import { getInstagramSettings } from "@/lib/server/instagram";
import { IMAGES, SITE } from "@/lib/site-data";
import InstagramSettingsForm from "@/components/admin/InstagramSettingsForm";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboardPage() {
  const settings = await getInstagramSettings();

  return (
    <div className="min-h-screen bg-cream">
      <header className="flex items-center justify-between bg-navy px-6 py-4">
        <Image
          src={IMAGES.logo}
          alt={SITE.name}
          className="h-10 w-auto object-contain"
        />
        <LogoutButton />
      </header>

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-ink/60">Galeri sayfası için Instagram gönderilerini yönetin.</p>

        <div className="mt-8">
          <InstagramSettingsForm
            hasToken={Boolean(settings.accessToken)}
            tokenExpiresAt={settings.tokenExpiresAt}
            lastSyncedAt={settings.lastSyncedAt}
            lastError={settings.lastError}
            postCount={settings.posts.length}
          />
        </div>
      </main>
    </div>
  );
}
