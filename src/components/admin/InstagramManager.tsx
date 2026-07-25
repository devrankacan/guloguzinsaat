"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type InstagramPost = {
  id: string;
  image: string;
  caption: string;
  permalink: string;
  createdAt: number;
};

const BODY_TEMPLATE = (secret: string) =>
  `{"secret": "${secret}", "imageUrl": "{{SourceUrl}}", "caption": "{{Caption}}", "permalink": "{{Url}}"}`;

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="text-xs font-bold uppercase text-gold-dark hover:text-ink"
    >
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}

export default function InstagramManager({
  initialItems,
  webhookUrl,
  webhookSecret,
}: {
  initialItems: InstagramPost[];
  webhookUrl: string;
  webhookSecret: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [formOpen, setFormOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [permalink, setPermalink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      setMessage("Görsel gerekli.");
      return;
    }
    setBusy(true);
    setMessage(null);

    const data = new FormData();
    data.set("caption", caption);
    data.set("permalink", permalink);
    data.set("image", imageFile);

    try {
      const res = await fetch("/api/instagram/posts", { method: "POST", body: data });
      const result = await res.json();

      if (!res.ok || result.error) {
        setMessage(result.error ?? "Kaydedilemedi.");
        return;
      }

      setItems((prev) => [result.post, ...prev]);
      setFormOpen(false);
      setCaption("");
      setPermalink("");
      setImageFile(null);
      setMessage("Kaydedildi.");
    } catch {
      setMessage("Sunucuya bağlanılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/instagram/posts/${id}`, { method: "DELETE" });
      if (res.ok) setItems((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-ink">Otomatik Paylaşım Kurulumu (IFTTT)</h2>
        <p className="text-sm leading-relaxed text-ink/70">
          Telefonunuza <strong>IFTTT</strong> uygulamasını indirin, ücretsiz hesap açın ve
          &quot;Create&quot; ile yeni bir applet oluşturun:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink/70">
          <li>
            <strong>If This:</strong> Instagram &rarr; &quot;Any new photo by you&quot; seçin ve
            Instagram hesabınızı bağlayın.
          </li>
          <li>
            <strong>Then That:</strong> Webhooks &rarr; &quot;Make a web request&quot; seçin.
          </li>
          <li>
            URL alanına aşağıdaki adresi, Method olarak <strong>POST</strong>, Content Type
            olarak <strong>application/json</strong> girin.
          </li>
          <li>
            Body alanına aşağıdaki metni yapıştırın, ({"{{...}}"}) kısımlarını IFTTT&apos;nin
            &quot;Add ingredient&quot; listesinden seçerek doldurun (SourceUrl, Caption, Url).
          </li>
        </ol>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-ink/60">Webhook URL</label>
          <div className="flex items-center gap-3 border border-ink/15 px-4 py-2.5 text-sm">
            <code className="flex-1 overflow-x-auto text-ink/80">
              {webhookUrl || "Yükleniyor..."}
            </code>
            {webhookUrl && <CopyButton value={webhookUrl} />}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-ink/60">Body</label>
          <div className="flex items-center gap-3 border border-ink/15 px-4 py-2.5 text-sm">
            <code className="flex-1 overflow-x-auto whitespace-pre-wrap break-all text-ink/80">
              {BODY_TEMPLATE(webhookSecret)}
            </code>
            <CopyButton value={BODY_TEMPLATE(webhookSecret)} />
          </div>
        </div>

        <p className="text-xs leading-relaxed text-ink/50">
          IFTTT ücretsiz plan yeni paylaşımları saatte bir kontrol eder; gönderiniz galeriye
          birkaç dakika ile bir saat arasında yansır. Bir sorun olursa aşağıdaki &quot;Gönderi
          Ekle&quot; formuyla görseli elle de ekleyebilirsiniz.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{items.length} gönderi galeride.</p>
        <button onClick={() => setFormOpen((v) => !v)} className="btn-gold">
          {formOpen ? "Vazgeç" : "Gönderi Ekle"}
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-ink">Manuel Gönderi Ekle</h3>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-ink/60">Görsel</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-gold w-fit"
            >
              Bilgisayardan Görsel Seç
            </button>
            {imageFile && (
              <div className="relative mt-2 h-24 w-24 border-2 border-gold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-ink/60">
              Açıklama (opsiyonel)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={2}
              className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-ink/60">
              Instagram Gönderi Linki (opsiyonel)
            </label>
            <input
              type="text"
              value={permalink}
              onChange={(e) => setPermalink(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className="btn-gold">
              Kaydet
            </button>
          </div>
        </form>
      )}
      {message && <p className="text-sm font-semibold text-ink/70">{message}</p>}

      <div className="flex flex-col gap-3">
        {items.length === 0 && (
          <p className="bg-white p-6 text-sm text-ink/60 shadow-sm">
            Henüz gönderi yok. Otomatik paylaşımı kurun veya elle ekleyin.
          </p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-cream">
                <Image src={item.image} alt={item.caption} fill className="object-cover" unoptimized />
              </div>
              <div>
                <p className="max-w-sm truncate text-sm text-ink/80">
                  {item.caption || "(açıklama yok)"}
                </p>
                <p className="text-xs text-ink/50">
                  {new Date(item.createdAt).toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-3">
              {item.permalink !== "#" && (
                <a
                  href={item.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold uppercase text-ink/70 hover:text-gold-dark"
                >
                  Instagram&apos;da Gör
                </a>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs font-bold uppercase text-red-600 hover:text-red-800"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
