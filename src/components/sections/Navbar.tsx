import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { CallButton } from "@/components/CallButton";
import { common, nav } from "@/content/fr";

/** Navbar en pilule flottante : un seul bouton, « Réserver un appel ». */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header>
      <nav
        aria-label="Navigation principale"
        className={`fixed left-1/2 top-3 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full px-4 py-2.5 transition-all duration-300 md:top-4 md:px-6 md:py-3 ${
          scrolled || mobileOpen ? "navbar-glass" : "border border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <a
            href="#"
            aria-label={nav.homeLabel}
            className="flex items-center gap-2 rounded-full font-heading text-xl font-extrabold tracking-tight text-primary"
          >
            <EyesPilotLogo size={26} />
            {common.brand}
          </a>

          <ul className="hidden items-center gap-7 whitespace-nowrap text-sm font-medium text-muted-foreground lg:flex">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <CallButton placement="navbar" size="sm" className="ml-auto hidden px-5 md:inline-flex lg:ml-0" />

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-primary lg:hidden"
            aria-label={mobileOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="menu-mobile" className="fixed inset-x-4 top-20 z-40 lg:hidden">
          <div className="navbar-glass flex flex-col gap-1 rounded-2xl p-5 shadow-xl">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="border-b border-border py-3 text-base font-medium text-foreground last-of-type:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <CallButton placement="menu-mobile" className="mt-3" onClick={closeMobile} />
          </div>
        </div>
      )}
    </header>
  );
};
