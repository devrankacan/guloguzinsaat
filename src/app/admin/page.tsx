import { headers } from "next/headers";
import AdminHeader from "@/components/admin/AdminHeader";
import InstagramManager from "@/components/admin/InstagramManager";
import { listInstagramPosts } from "@/lib/server/instagram";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const posts = await listInstagramPosts();
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const protocol = headersList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const webhookUrl = host ? `${protocol}://${host}/api/instagram/webhook` : "";

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-ink/60">Galeri sayfası için Instagram gönderilerini yönetin.</p>

        <div className="mt-8">
          <InstagramManager
            initialItems={posts}
            webhookUrl={webhookUrl}
            webhookSecret={process.env.INSTAGRAM_WEBHOOK_SECRET ?? ""}
          />
        </div>
      </main>
    </div>
  );
}
