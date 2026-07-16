"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstagramSettingsForm({
  hasToken,
  tokenExpiresAt,
  lastSyncedAt,
  lastError,
  postCount,
}: {
  hasToken: boolean;
  tokenExpiresAt: number | null;
  lastSyncedAt: number | null;
  lastError: string | null;
  postCount: number;
}) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveToken(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/instagram/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: token.trim() }),
      });
      const data = await res.json();
      setMessage(data.ok ? "Token kaydedildi ve senkronize edildi." : data.error);
      setToken("");
      router.refresh();
    } catch {
      setMessage("Sunucuya bağlanılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function syncNow() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/instagram/sync", { method: "POST" });
      const data = await res.json();
      setMessage(data.ok ? `Senkronize edildi (${data.postCount} gönderi).` : data.error);
      router.refresh();
    } catch {
      setMessage("Sunucuya bağlanılamadı.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-extrabold text-ink">Instagram Bağlantısı</h2>
        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-ink/50">Durum</dt>
            <dd className={hasToken ? "font-bold text-green-700" : "font-bold text-red-600"}>
              {hasToken ? "Bağlı" : "Token tanımlı değil"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink/50">Gönderi sayısı</dt>
            <dd className="font-bold text-ink">{postCount}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink/50">Son senkronizasyon</dt>
            <dd className="font-bold text-ink">
              {lastSyncedAt ? new Date(lastSyncedAt).toLocaleString("tr-TR") : "—"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink/50">Token geçerlilik</dt>
            <dd className="font-bold text-ink">
              {tokenExpiresAt ? new Date(tokenExpiresAt).toLocaleDateString("tr-TR") : "—"}
            </dd>
          </div>
        </dl>
        {lastError && (
          <p className="mt-3 text-sm font-semibold text-red-600">Hata: {lastError}</p>
        )}
      </div>

      <form onSubmit={saveToken} className="flex flex-col gap-3">
        <label htmlFor="ig-token" className="text-xs font-bold uppercase text-ink/60">
          Instagram Erişim Token&apos;ı
        </label>
        <input
          id="ig-token"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="IGQ... ile başlayan uzun ömürlü token"
          className="border border-ink/15 px-4 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
        />
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={busy} className="btn-gold">
            Token&apos;ı Kaydet
          </button>
          <button
            type="button"
            onClick={syncNow}
            disabled={busy || !hasToken}
            className="btn-outline !border-ink/30 !text-ink hover:!bg-ink/5"
          >
            Şimdi Senkronize Et
          </button>
        </div>
        {message && <p className="text-sm font-semibold text-ink/70">{message}</p>}
      </form>

      <p className="text-xs leading-relaxed text-ink/50">
        Token, Meta for Developers üzerinden Instagram işletme hesabınıza bağlı bir uzun ömürlü
        (long-lived) erişim token&apos;ı olmalı. Bu tokenlar ~60 gün geçerlidir; süresi dolmadan
        yenilenmezse gönderiler güncellenmeyi durdurur.
      </p>
    </div>
  );
}
