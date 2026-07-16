"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IMAGES, SITE } from "@/lib/site-data";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Giriş başarısız.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Image
            src={IMAGES.logo}
            alt={SITE.name}
            className="h-16 w-auto object-contain"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4 bg-white p-8 shadow-xl"
        >
          <h1 className="text-center text-xl font-extrabold text-ink">Admin Girişi</h1>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-bold uppercase text-ink/60">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-ink/15 px-4 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-bold uppercase text-ink/60">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-ink/15 px-4 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
            />
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold mt-2 justify-center">
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
