import AdminHeader from "@/components/admin/AdminHeader";
import ProjectManager from "@/components/admin/ProjectManager";
import { listProjects } from "@/lib/server/projects";

export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Proje Takip</h1>
        <p className="mt-1 text-sm text-ink/60">
          Müşterilerin telefon numarasıyla sorgulayabileceği inşaat durumu kayıtlarını yönetin.
        </p>

        <div className="mt-8">
          <ProjectManager initialProjects={projects} />
        </div>
      </main>
    </div>
  );
}
