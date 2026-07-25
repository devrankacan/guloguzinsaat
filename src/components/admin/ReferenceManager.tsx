"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type BrandReference = {
  id: string;
  name: string;
  website: string;
  logo: string;
  createdAt: number;
};

const EMPTY_FORM = { name: "", website: "" };

export default function ReferenceManager({
  initialItems,
}: {
  initialItems: BrandReference[];
}) {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingLogo, setExistingLogo] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openNewForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setExistingLogo("");
    setLogoFile(null);
    setFormOpen(true);
    setMessage(null);
  }

  function openEditForm(item: BrandReference) {
    setEditingId(item.id);
    setForm({ name: item.name, website: item.website });
    setExistingLogo(item.logo);
    setLogoFile(null);
    setFormOpen(true);
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    if (!editingId && !logoFile) {
      setMessage("Marka logosu gerekli.");
      setBusy(false);
      return;
    }

    const data = new FormData();
    data.set("name", form.name);
    data.set("website", form.website);
    if (logoFile) data.set("logo", logoFile);

    try {
      const url = editingId ? `/api/references/${editingId}` : "/api/references";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, body: data });
      const result = await res.json();

      if (!res.ok || result.error) {
        setMessage(result.error ?? "Kaydedilemedi.");
        return;
      }

      setItems((prev) => {
        if (editingId) {
          return prev.map((r) => (r.id === editingId ? result.item : r));
        }
        return [result.item, ...prev];
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
    if (!confirm("Bu markayı silmek istediğinize emin misiniz?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/references/${id}`, { method: "DELETE" });
      if (res.ok) setItems((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{items.length} marka kayıtlı.</p>
        <button onClick={openNewForm} className="btn-gold">
          Yeni Marka Ekle
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-ink">
            {editingId ? "Markayı Düzenle" : "Yeni Marka"}
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-ink/60">Marka Adı</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Örnek Holding"
                className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-ink/60">
                Web Sitesi (opsiyonel)
              </label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://ornek.com"
                className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-ink/60">Logo</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-gold w-fit"
            >
              Bilgisayardan Logo Seç
            </button>

            {(logoFile || existingLogo) && (
              <div className="relative mt-2 h-20 w-20 border-2 border-ink/10 bg-cream p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoFile ? URL.createObjectURL(logoFile) : existingLogo}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            )}
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
          <p className="bg-white p-6 text-sm text-ink/60 shadow-sm">Henüz marka eklenmedi.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              {item.logo && (
                <div className="relative h-14 w-14 shrink-0 border border-ink/10 bg-cream p-1.5">
                  <Image src={item.logo} alt={item.name} fill className="object-contain" unoptimized />
                </div>
              )}
              <div>
                <p className="font-extrabold text-ink">{item.name}</p>
                {item.website && <p className="text-sm text-ink/60">{item.website}</p>}
              </div>
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
