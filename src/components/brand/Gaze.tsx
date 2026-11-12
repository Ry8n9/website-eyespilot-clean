import { useRef } from "react";
import { usePupilFollow } from "@/hooks/use-pupil-follow";
import { Iris } from "./EyesPilotLogo";

/**
 * Le « regard » du Hero : l'œil du logo à grande échelle, entouré de
 * cercles de mise au point. L'iris suit le visiteur, comme celui du logo.
 * Statique si le visiteur a demandé à réduire les animations.
 */
export const Gaze = ({ className = "" }: { className?: string }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const offset = usePupilFollow(ref, { maxShift: 7, reach: 700 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="gaze-oeil">
          <ellipse cx="200" cy="200" rx="148" ry="86" />
        </clipPath>
      </defs>
      <g fill="none" stroke="hsl(var(--primary))">
        <circle cx="200" cy="200" r="196" strokeWidth="1" opacity="0.08" />
        <circle cx="200" cy="200" r="160" strokeWidth="1" opacity="0.12" />
        <circle cx="200" cy="200" r="124" strokeWidth="1" opacity="0.18" strokeDasharray="2 6" />
      </g>
      <ellipse cx="200" cy="200" rx="150" ry="88" fill="hsl(var(--card))" />
      <g clipPath="url(#gaze-oeil)">
        <g
          style={{
            transform: `translate(${offset.x * 6}px, ${offset.y * 4}px)`,
            transition: "transform 160ms ease-out",
          }}
        >
          <g transform="translate(200 200) scale(5.6) translate(-24 -24)">
            <Iris />
          </g>
        </g>
      </g>
      <ellipse
        cx="200"
        cy="200"
        rx="150"
        ry="88"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
      />
    </svg>
  );
};
