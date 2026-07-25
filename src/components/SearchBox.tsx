"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { SEARCH_INDEX } from "@/lib/site-data";

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR").trim();
}

export default function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return SEARCH_INDEX.filter((item) => normalize(`${item.title} ${item.keywords}`).includes(q));
  }, [query]);

  function goTo(href: string) {
    router.push(href);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={wrapRef} className="relative hidden sm:block">
      <button
        aria-label={open ? "Aramayı kapat" : "Sitede ara"}
        aria-expanded={open}
        className="text-ink transition-colors hover:text-gold-dark"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-4 w-80 border border-ink/10 bg-white p-3 shadow-xl">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) goTo(results[0].href);
            }}
            placeholder="Sitede ara..."
            className="w-full border border-ink/15 px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
          />

          {query.trim() && (
            <div className="mt-2 max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <p className="px-2 py-3 text-sm text-ink/50">Sonuç bulunamadı.</p>
              ) : (
                results.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="block px-2 py-2.5 text-sm font-semibold text-ink hover:bg-cream hover:text-gold-dark"
                  >
                    {item.title}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
