import { useEffect, useState, type RefObject } from "react";

/**
 * Vrai dès que l'élément entre dans la fenêtre (une seule fois si `once`).
 * Sans IntersectionObserver (tests, vieux navigateurs), l'élément est
 * considéré comme visible : le contenu n'est jamais caché.
 */
export const useInView = (
  ref: RefObject<Element>,
  { once = true, rootMargin = "0px 0px -15% 0px" }: { once?: boolean; rootMargin?: string } = {},
) => {
  const [inView, setInView] = useState(
    () => typeof window === "undefined" || typeof window.IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, rootMargin]);

  return inView;
};
