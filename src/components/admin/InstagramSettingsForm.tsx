"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstagramSettingsForm({
  hasFeed,
  lastSyncedAt,
  lastError,
  postCount,
}: {
  hasFeed: boolean;
  lastSyncedAt: number | null;
  lastError: string | null;
  postCount: number;
}) {
  const router = useRouter();
  const [feedId, setFeedId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveFeed(e: React.FormEvent) {
    e.preventDefault();
    if (!feedId.trim()) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/instagram/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId: feedId.trim() }),
      });
      const data = await res.json();
      setMessage(data.ok ? "Feed bağlandı ve senkronize edildi." : data.error);
      setFeedId("");
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
            <dd className={hasFeed ? "font-bold text-green-700" : "font-bold text-red-600"}>
              {hasFeed ? "Bağlı" : "Feed tanımlı değil"}
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
        </dl>
        {lastError && (
          <p className="mt-3 text-sm font-semibold text-red-600">Hata: {lastError}</p>
        )}
      </div>

      <form onSubmit={saveFeed} className="flex flex-col gap-3">
        <label htmlFor="ig-feed-id" className="text-xs font-bold uppercase text-ink/60">
          Behold Feed ID
        </label>
        <input
          id="ig-feed-id"
          type="text"
          value={feedId}
          onChange={(e) => setFeedId(e.target.value)}
          placeholder="behold.so panelinden aldığınız Feed ID"
          className="border border-ink/15 px-4 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
        />
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={busy} className="btn-gold">
            Feed&apos;i Kaydet
          </button>
          <button
            type="button"
            onClick={syncNow}
            disabled={busy || !hasFeed}
            className="btn-outline !border-ink/30 !text-ink hover:!bg-ink/5"
          >
            Şimdi Senkronize Et
          </button>
        </div>
        {message && <p className="text-sm font-semibold text-ink/70">{message}</p>}
      </form>

      <p className="text-xs leading-relaxed text-ink/50">
        Feed ID&apos;yi almak için{" "}
        <a href="https://behold.so" target="_blank" rel="noreferrer" className="underline">
          behold.so
        </a>{" "}
        üzerinde ücretsiz bir hesap açıp Instagram işletme hesabınızı bağlayın; oluşturduğunuz
        feed&apos;in ayarlarında Feed ID&apos;yi bulacaksınız. Instagram token yenileme işini
        Behold kendi tarafında yönetir, burada ekstra bir işlem gerekmez.
      </p>
    </div>
  );
}
