"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/translations";

/**
 * Language selector (English / العربية / 中文). Light styling to suit the
 * white navbar. Works on both the desktop bar and the mobile menu.
 */
export default function LanguageSwitcher({ variant = "bar" }: { variant?: "bar" | "menu" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  if (variant === "menu") {
    return (
      <div className="flex items-center gap-2">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={[
              "flex-1 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
              l.code === lang
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50",
            ].join(" ")}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" strokeWidth={1.8} />
        <span>{current.short}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <span>{l.label}</span>
                {l.code === lang && (
                  <Check className="h-4 w-4 text-blue-600" strokeWidth={2.2} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
