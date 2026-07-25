"use client";

import { useState } from "react";

const EMPTY_FORM = { name: "", phone: "", email: "", service: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Gönderilemedi, lütfen tekrar deneyin.");
        setStatus("error");
        return;
      }

      setStatus("ok");
      setForm(EMPTY_FORM);
    } catch {
      setError("Sunucuya bağlanılamadı.");
      setStatus("error");
    } finally {
      setBusy(false);
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-extrabold text-ink">Mesajınız alındı.</p>
        <p className="mt-2 text-sm text-ink/60">
          En kısa sürede size dönüş yapacağız.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-ink/60">Ad Soyad</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-ink/60">Telefon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0553 701 3225"
            className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-ink/60">E-Posta (opsiyonel)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase text-ink/60">Hizmet</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
          >
            <option value="">Seçiniz</option>
            <option value="İnşaat">İnşaat</option>
            <option value="Yıkım">Yıkım</option>
            <option value="Hafriyat">Hafriyat</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase text-ink/60">Mesajınız</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
        />
      </div>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button type="submit" disabled={busy} className="btn-gold w-fit justify-center">
        {busy ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>
    </form>
  );
}
