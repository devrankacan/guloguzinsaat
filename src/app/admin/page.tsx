import { getInstagramSettings } from "@/lib/server/instagram";
import InstagramSettingsForm from "@/components/admin/InstagramSettingsForm";
import AdminHeader from "@/components/admin/AdminHeader";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const settings = await getInstagramSettings();

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-ink/60">Galeri sayfası için Instagram gönderilerini yönetin.</p>

        <div className="mt-8">
          <InstagramSettingsForm
            hasFeed={Boolean(settings.feedId)}
            lastSyncedAt={settings.lastSyncedAt}
            lastError={settings.lastError}
            postCount={settings.posts.length}
          />
        </div>
      </main>
    </div>
  );
}
