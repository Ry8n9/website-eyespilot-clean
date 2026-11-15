import { useRef } from "react";
import { usePupilFollow } from "@/hooks/use-pupil-follow";
import { Iris } from "./EyesPilotLogo";

/**
 * Fond du Hero : un grand cercle de mise au point très discret, dont
 * l'iris (celui du logo) suit le curseur. Statique si mouvement réduit.
 */
export const FocalBackdrop = ({ className = "" }: { className?: string }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const offset = usePupilFollow(ref, { maxShift: 7, reach: 800 });

  return (
    <svg ref={ref} viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="focal-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.10" />
          <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="300" fill="url(#focal-halo)" />
      <g fill="none" stroke="hsl(var(--primary))">
        <circle cx="300" cy="300" r="290" strokeWidth="1" opacity="0.10" />
        <circle cx="300" cy="300" r="225" strokeWidth="1" opacity="0.14" />
        <circle cx="300" cy="300" r="160" strokeWidth="1" opacity="0.18" strokeDasharray="2 7" />
        <circle cx="300" cy="300" r="95" strokeWidth="1" opacity="0.14" />
      </g>
      <g
        opacity="0.16"
        style={{ transform: `translate(${offset.x * 5}px, ${offset.y * 5}px)`, transition: "transform 200ms ease-out" }}
      >
        <g transform="translate(300 300) scale(4.4) translate(-24 -24)">
          <Iris />
        </g>
      </g>
    </svg>
  );
};
