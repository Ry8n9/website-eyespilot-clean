import { useRef } from "react";
import { usePupilFollow } from "@/hooks/use-pupil-follow";

type LogoProps = {
  size?: number;
  /** La pupille suit le curseur (désactivé si mouvement réduit). */
  interactive?: boolean;
  className?: string;
};

/** Logo EyesPilot : un œil dont l'iris à trois rayons évoque une focale. */
export const EyesPilotLogo = ({ size = 28, interactive = true, className = "" }: LogoProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const offset = usePupilFollow(svgRef, { maxShift: 6, enabled: interactive });

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="13"
        fill="hsl(var(--background))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
      <g
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 120ms ease-out",
        }}
      >
        <Iris />
      </g>
    </svg>
  );
};

/** Iris de la marque, dessiné dans un repère 48 x 48 centré en (24, 24). */
export const Iris = () => (
  <>
    <circle cx="24" cy="24" r="10" fill="hsl(var(--primary))" />
    <g stroke="hsl(var(--primary-foreground))" strokeLinecap="round">
      <circle cx="24" cy="24" r="7" fill="none" strokeWidth="1.4" opacity="0.9" />
      <line x1="24" y1="24" x2="24" y2="17" strokeWidth="1.6" />
      <line x1="24" y1="24" x2="30.06" y2="27.5" strokeWidth="1.6" />
      <line x1="24" y1="24" x2="17.94" y2="27.5" strokeWidth="1.6" />
    </g>
    <circle cx="24" cy="24" r="2" fill="hsl(var(--primary-foreground))" />
  </>
);
