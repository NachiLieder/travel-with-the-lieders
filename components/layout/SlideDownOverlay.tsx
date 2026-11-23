"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Full-viewport cream overlay that slides down from the top (the Blonde
 * Abroad `overlay-slidedown`). Used for the mobile menu and the search.
 *
 * Always mounted so the slide can animate; `inert` + `aria-hidden` keep it
 * out of the tab order while closed. Escape closes, Tab is trapped inside,
 * page scroll is locked while open, focus returns to the opener.
 */
export function SlideDownOverlay({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Let the slide start before moving focus, so the browser doesn't scroll.
    const t = window.setTimeout(() => {
      const first =
        panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
        closeRef.current;
      first?.focus();
    }, 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-hidden={!open}
      inert={!open}
      className="fixed inset-0 z-50 overflow-y-auto paper-panel transition-transform duration-[400ms] ease-in-out"
      style={{
        transform: open ? "translateY(0)" : "translateY(-102%)",
        // Opaque: the reference uses 90% cream, but a ghost of the page behind
        // small Hebrew text costs legibility, so ours is solid.
        backgroundColor: "var(--color-cream)",
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute top-4 start-4 grid place-items-center w-11 h-11 text-ink-soft hover:text-accent transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      {children}
    </div>
  );
}
