"use client";

import { useState } from "react";

type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  createdAt: number;
};

const EMPTY_FORM = { quote: "", authorName: "", authorRole: "" };

export default function TestimonialManager({
  initialItems,
}: {
  initialItems: Testimonial[];
}) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function openNewForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
    setMessage(null);
  }

  function openEditForm(item: Testimonial) {
    setEditingId(item.id);
    setForm({ quote: item.quote, authorName: item.authorName, authorRole: item.authorRole });
    setFormOpen(true);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    try {
      const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok || result.error) {
        setMessage(result.error ?? "Kaydedilemedi.");
        return;
      }

      setItems((prev) => {
        if (editingId) {
          return prev.map((t) => (t.id === editingId ? result.testimonial : t));
        }
        return [result.testimonial, ...prev];
      });
      setFormOpen(false);
      setMessage("Kaydedildi.");
    } catch {
      setMessage("Sunucuya bağlanılamadı.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu referansı silmek istediğinize emin misiniz?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) setItems((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{items.length} referans kayıtlı.</p>
        <button onClick={openNewForm} className="btn-gold">
          Yeni Referans Ekle
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-ink">
            {editingId ? "Referansı Düzenle" : "Yeni Referans"}
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-ink/60">Alıntı</label>
            <textarea
              required
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              rows={3}
              placeholder="Güloğuz İnşaat ile çalışmak..."
              className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-ink/60">Ad Soyad</label>
              <input
                type="text"
                required
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                placeholder="Ahmet Yılmaz"
                className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-ink/60">
                Unvan / Şirket (opsiyonel)
              </label>
              <input
                type="text"
                value={form.authorRole}
                onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                placeholder="Ev Sahibi, Yakutiye"
                className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className="btn-gold">
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="btn-outline !border-ink/30 !text-ink hover:!bg-ink/5"
            >
              Vazgeç
            </button>
          </div>
          {message && <p className="text-sm font-semibold text-ink/70">{message}</p>}
        </form>
      )}

      <div className="flex flex-col gap-3">
        {items.length === 0 && (
          <p className="bg-white p-6 text-sm text-ink/60 shadow-sm">Henüz referans eklenmedi.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm italic text-ink/70">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-1 text-sm font-extrabold text-ink">
                {item.authorName}
                {item.authorRole && (
                  <span className="font-normal text-ink/60"> · {item.authorRole}</span>
                )}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => openEditForm(item)}
                className="text-xs font-bold uppercase text-ink/70 hover:text-gold-dark"
              >
                Düzenle
              </button>
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
