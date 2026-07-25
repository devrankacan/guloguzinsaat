import AdminHeader from "@/components/admin/AdminHeader";
import PortfolioManager from "@/components/admin/PortfolioManager";
import { listPortfolio } from "@/lib/server/portfolio";

export const revalidate = 0;

export default async function AdminPortfolioPage() {
  const items = await listPortfolio();

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Projelerimiz</h1>
        <p className="mt-1 text-sm text-ink/60">
          &quot;Projeler&quot; sayfasında gösterilecek tamamlanmış proje örneklerini yönetin.
        </p>

        <div className="mt-8">
          <PortfolioManager initialItems={items} />
        </div>
      </main>
    </div>
  );
}
