import { useEffect, useState } from "react";
import { CallButton } from "@/components/CallButton";
import { nav } from "@/content/fr";

/**
 * Barre d'action collée en bas de l'écran, sur mobile uniquement.
 * Elle apparaît une fois le Hero dépassé et s'efface quand l'appel à
 * l'action final est visible, pour ne jamais doubler un bouton.
 */
export const MobileCallBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      const final = document.getElementById("appel-final");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const finalVisible = final ? final.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(pastHero && !finalVisible);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="navbar-glass rounded-full p-1.5 shadow-xl shadow-foreground/10">
        <CallButton
          placement="barre-mobile"
          label={nav.mobileBarLabel}
          className="w-full justify-center"
          tabIndex={visible ? 0 : -1}
        />
      </div>
    </div>
  );
};
