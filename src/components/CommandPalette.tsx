"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type CommandPaletteEntry = {
  id: string;
  icon: string;
  path: string;
  description: string;
  onSelect: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  entries: CommandPaletteEntry[];
};

function fuzzyScore(query: string, text: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  let score = 0;
  for (let i = 0; i < t.length && qi < q.length; i += 1) {
    if (t[i] === q[qi]) {
      score += 2;
      qi += 1;
    } else if (qi > 0) {
      score -= 0.1;
    }
  }
  if (qi < q.length) return -1;
  if (t.includes(q)) score += 4;
  return score;
}

export default function CommandPalette({ open, onClose, entries }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const filtered = useMemo(() => {
    const ranked = entries
      .map((entry) => ({
        entry,
        score: fuzzyScore(query, `${entry.path} ${entry.description}`),
      }))
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score || a.entry.path.localeCompare(b.entry.path));
    return ranked.map((x) => x.entry);
  }, [entries, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const selected = filtered[activeIndex];
        if (!selected) return;
        selected.onSelect();
        router.push(`${pathname}#${encodeURIComponent(selected.path)}`);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, filtered, onClose, open, pathname, router]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="nsos-cp-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="nsos-cp-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              className="nsos-cp-input"
              placeholder="Type a file or section..."
              aria-label="Command palette search"
            />
            <div className="nsos-cp-list">
              {filtered.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  className={`nsos-cp-item ${index === activeIndex ? "active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    entry.onSelect();
                    router.push(`${pathname}#${encodeURIComponent(entry.path)}`);
                    onClose();
                  }}
                >
                  <span className="nsos-cp-icon">{entry.icon}</span>
                  <span className="nsos-cp-path">{entry.path}</span>
                  <span className="nsos-cp-desc">{entry.description}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="nsos-cp-empty">No matches. Try another query.</div>
              )}
            </div>
            <div className="nsos-cp-hint">↑↓ to navigate · Enter to open · Esc to close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

