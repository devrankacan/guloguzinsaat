"use client";

import { useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: number;
};

export default function MessagesInbox({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleRead(id: string, read: boolean) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (res.ok) {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  if (messages.length === 0) {
    return <p className="bg-white p-6 text-sm text-ink/60 shadow-sm">Henüz mesaj yok.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => (
        <div key={m.id} className={`bg-white p-5 shadow-sm ${m.read ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-extrabold text-ink">
                {m.name}
                {!m.read && (
                  <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-ink">
                    Yeni
                  </span>
                )}
              </p>
              <p className="text-sm text-ink/60">
                {[m.phone, m.email, m.service].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                disabled={busyId === m.id}
                onClick={() => toggleRead(m.id, !m.read)}
                className="text-xs font-bold uppercase text-ink/70 hover:text-gold-dark"
              >
                {m.read ? "Okunmadı İşaretle" : "Okundu İşaretle"}
              </button>
              <button
                disabled={busyId === m.id}
                onClick={() => handleDelete(m.id)}
                className="text-xs font-bold uppercase text-red-600 hover:text-red-800"
              >
                Sil
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-ink/80">{m.message}</p>
          <p className="mt-3 text-xs text-ink/40">
            {new Date(m.createdAt).toLocaleString("tr-TR")}
          </p>
        </div>
      ))}
    </div>
  );
}
