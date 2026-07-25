import AdminHeader from "@/components/admin/AdminHeader";
import ReferenceManager from "@/components/admin/ReferenceManager";
import { listReferences } from "@/lib/server/references";

export const revalidate = 0;

export default async function AdminReferencesPage() {
  const items = await listReferences();

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Referanslar</h1>
        <p className="mt-1 text-sm text-ink/60">
          Ana sayfada ve &quot;Projeler&quot; sayfasında gösterilecek, çalıştığımız marka
          logolarını yönetin.
        </p>

        <div className="mt-8">
          <ReferenceManager initialItems={items} />
        </div>
      </main>
    </div>
  );
}
