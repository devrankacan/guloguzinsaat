"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PROJECT_STAGES } from "@/lib/project-stages";

type ProjectRecord = {
  id: string;
  phone: string;
  phoneDisplay: string;
  projectName: string;
  stage: number;
  note: string;
  images: string[];
  createdAt: number;
  updatedAt: number;
};

const EMPTY_FORM = {
  phone: "",
  projectName: "",
  stage: 0,
  note: "",
};

export default function ProjectManager({
  initialProjects,
}: {
  initialProjects: ProjectRecord[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openNewForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setExistingImages([]);
    setRemoveImages([]);
    setFiles([]);
    setFormOpen(true);
    setMessage(null);
  }

  function openEditForm(project: ProjectRecord) {
    setEditingId(project.id);
    setForm({
      phone: project.phoneDisplay,
      projectName: project.projectName,
      stage: project.stage,
      note: project.note,
    });
    setExistingImages(project.images);
    setRemoveImages([]);
    setFiles([]);
    setFormOpen(true);
    setMessage(null);
  }

  function toggleRemoveImage(img: string) {
    setRemoveImages((prev) =>
      prev.includes(img) ? prev.filter((i) => i !== img) : [...prev, img]
    );
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  }

  function removeStagedFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    const data = new FormData();
    data.set("phone", form.phone);
    data.set("projectName", form.projectName);
    data.set("stage", String(form.stage));
    data.set("note", form.note);
    files.forEach((file) => data.append("images", file));
    removeImages.forEach((img) => data.append("removeImages", img));

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, body: data });
      const result = await res.json();

      if (!res.ok || result.error) {
        setMessage(result.error ?? "Kaydedilemedi.");
        return;
      }

      setProjects((prev) => {
        if (editingId) {
          return prev.map((p) => (p.id === editingId ? result.project : p));
        }
        return [result.project, ...prev];
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
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{projects.length} proje kayıtlı.</p>
        <button onClick={openNewForm} className="btn-gold">
          Yeni Proje Ekle
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-extrabold text-ink">
            {editingId ? "Projeyi Düzenle" : "Yeni Proje"}
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-ink/60">
                Müşteri Telefonu
              </label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0553 701 3225"
                className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-ink/60">Proje Adı</label>
              <input
                type="text"
                required
                value={form.projectName}
                onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                placeholder="Yakutiye Villa Projesi"
                className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-ink/60">Aşama</label>
            <select
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: Number(e.target.value) })}
              className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
            >
              {PROJECT_STAGES.map((label, i) => (
                <option key={label} value={i}>
                  {i + 1}. {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase text-ink/60">Not (opsiyonel)</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              className="border border-ink/15 px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          {existingImages.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase text-ink/60">
                Mevcut Görseller
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {existingImages.map((img) => {
                  const marked = removeImages.includes(img);
                  return (
                    <div key={img} className="relative h-24 w-24">
                      <div
                        className={`relative h-full w-full overflow-hidden border-2 ${
                          marked ? "border-red-500 opacity-40" : "border-ink/10"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" unoptimized />
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleRemoveImage(img)}
                        aria-label={marked ? "Silmekten vazgeç" : "Görseli sil"}
                        className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-sm font-extrabold text-white shadow ${
                          marked ? "bg-ink/60" : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {marked ? "↺" : "✕"}
                      </button>
                    </div>
                  );
                })}
              </div>
              {removeImages.length > 0 && (
                <p className="mt-2 text-xs font-semibold text-red-600">
                  {removeImages.length} görsel kaydedildiğinde silinecek.
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-ink/60">
              Görsel Ekle
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => addFiles(e.target.files)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-gold w-fit"
            >
              Bilgisayardan Görsel Seç
            </button>

            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-3">
                {files.map((file, i) => (
                  <div key={i} className="relative h-24 w-24">
                    <div className="relative h-full w-full overflow-hidden border-2 border-gold">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStagedFile(i)}
                      aria-label="Seçimi kaldır"
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red-600 text-sm font-extrabold text-white shadow hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
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
        {projects.length === 0 && (
          <p className="bg-white p-6 text-sm text-ink/60 shadow-sm">
            Henüz proje eklenmedi.
          </p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-extrabold text-ink">{project.projectName}</p>
              <p className="text-sm text-ink/60">
                {project.phoneDisplay} · {PROJECT_STAGES[project.stage]} · {project.images.length}{" "}
                görsel
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEditForm(project)}
                className="text-xs font-bold uppercase text-ink/70 hover:text-gold-dark"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(project.id)}
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
