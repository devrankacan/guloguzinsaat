"use client";

import Image from "next/image";
import { useState } from "react";
import ProjectStageStepper from "@/components/ProjectStageStepper";

type StatusResult = {
  id: string;
  projectName: string;
  stage: number;
  note: string;
  images: string[];
  updatedAt: number;
};

export default function PhoneStatusLookup() {
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<StatusResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/project-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Bir hata oluştu.");
        return;
      }
      setResults(data.projects);
      setSearched(true);
    } catch {
      setError("Sunucuya bağlanılamadı.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col gap-4 bg-white p-8 shadow-sm"
      >
        <label htmlFor="phone" className="text-xs font-bold uppercase text-ink/60">
          Telefon Numaranız
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0553 701 3225"
          className="border border-ink/15 px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
        <button type="submit" disabled={busy} className="btn-gold justify-center">
          {busy ? "Sorgulanıyor..." : "Durumu Sorgula"}
        </button>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      </form>

      {searched && (
        <div className="flex flex-col gap-10">
          {results.length === 0 ? (
            <p className="text-center text-ink/60">
              Bu telefon numarasına kayıtlı bir proje bulunamadı. Numarayı kontrol edin veya
              bizimle iletişime geçin.
            </p>
          ) : (
            results.map((project) => (
              <div key={project.id} className="bg-white p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-ink">{project.projectName}</h3>
                <div className="mt-8">
                  <ProjectStageStepper currentStage={project.stage} />
                </div>
                {project.note && (
                  <p className="mt-8 text-sm leading-relaxed text-ink/70">{project.note}</p>
                )}
                {project.images.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.images.map((img) => (
                      <div key={img} className="relative aspect-square overflow-hidden">
                        <Image
                          src={img}
                          alt={project.projectName}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
