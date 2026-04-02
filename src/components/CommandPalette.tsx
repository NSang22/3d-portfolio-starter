"use client";

import { useEffect, useRef, useState } from "react";

export type CommandPaletteEntry = {
  id: string;
  icon?: string;
  path: string;
  description?: string;
  onSelect: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  entries: CommandPaletteEntry[];
};

export default function CommandPalette({ open, onClose, entries }: Props) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? entries.filter(
        (e) =>
          e.path.toLowerCase().includes(query.toLowerCase()) ||
          (e.description ?? "").toLowerCase().includes(query.toLowerCase()),
      )
    : entries;

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter") {
        const entry = filtered[highlighted];
        if (entry) {
          entry.onSelect();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, highlighted, onClose]);

  if (!open) return null;

  return (
    <div
      className="nsos-palette-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="nsos-palette"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
        aria-label="Command palette"
      >
        <input
          ref={inputRef}
          className="nsos-palette-input"
          placeholder="Search files and commands..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
          autoComplete="off"
          spellCheck={false}
        />
        <ul className="nsos-palette-list" role="listbox">
          {filtered.map((entry, i) => (
            <li
              key={entry.id}
              className={`nsos-palette-item${i === highlighted ? " highlighted" : ""}`}
              role="option"
              aria-selected={i === highlighted}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => {
                entry.onSelect();
                onClose();
              }}
            >
              {entry.icon && (
                <span className="nsos-palette-icon">{entry.icon}</span>
              )}
              <span className="nsos-palette-path">{entry.path}</span>
              {entry.description && (
                <span className="nsos-palette-desc">{entry.description}</span>
              )}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="nsos-palette-empty">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}
