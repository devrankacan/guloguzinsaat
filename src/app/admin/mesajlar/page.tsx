import AdminHeader from "@/components/admin/AdminHeader";
import MessagesInbox from "@/components/admin/MessagesInbox";
import { listMessages } from "@/lib/server/messages";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await listMessages();

  return (
    <div className="min-h-screen bg-cream">
      <AdminHeader />

      <main className="mx-auto max-w-[900px] px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink">Mesajlar</h1>
        <p className="mt-1 text-sm text-ink/60">İletişim formundan gelen mesajlar.</p>

        <div className="mt-8">
          <MessagesInbox initialMessages={messages} />
        </div>
      </main>
    </div>
  );
}
