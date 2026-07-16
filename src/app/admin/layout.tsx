export const metadata = {
  title: "Yönetim Paneli – Güloğuz İnşaat",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
