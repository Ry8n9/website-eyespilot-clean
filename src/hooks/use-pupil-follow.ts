import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Décalage de la pupille vers le curseur, borné à `maxShift` pixels.
 * Désactivé si `prefers-reduced-motion` ou si `enabled` vaut false :
 * la pupille reste alors centrée.
 */
export const usePupilFollow = (
  ref: RefObject<Element>,
  { maxShift, reach = 300, enabled = true }: { maxShift: number; reach?: number; enabled?: boolean },
) => {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const active = enabled && !reduced;

  useEffect(() => {
    if (!active) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    let frame = 0;
    let last: MouseEvent | null = null;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el || !last) return;
      const rect = el.getBoundingClientRect();
      const dx = last.clientX - (rect.left + rect.width / 2);
      const dy = last.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const factor = Math.min(dist / reach, 1);
      setOffset({ x: (dx / dist) * maxShift * factor, y: (dy / dist) * maxShift * factor });
    };

    const onMove = (e: MouseEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, maxShift, reach, ref]);

  return offset;
};
