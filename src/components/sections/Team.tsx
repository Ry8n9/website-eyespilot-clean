import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { SectionHeading } from "@/components/SectionHeading";
import { team } from "@/content/fr";
import type { TeamMember } from "@/content/validated";

/**
 * L'équipe : photo et bio courtes, depuis DONNEES_VALIDEES.
 * Masqué par FLAGS.SHOW_TEAM ; sans photo, l'iris EyesPilot la remplace.
 */
export const Team = ({ members }: { members: TeamMember[] }) => {
  if (members.length === 0) return null;
  return (
    <section id="equipe" aria-labelledby="equipe-titre" className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-0">
        <SectionHeading id="equipe-titre" eyebrow={team.eyebrow} title={team.title} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {members.map((m) => (
            <li key={m.name} className="flex gap-5 rounded-3xl border border-border bg-card p-6 md:p-8">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <EyesPilotLogo size={40} interactive={false} />
                </span>
              )}
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
                <p className="text-sm font-semibold text-primary">{m.role}</p>
                {m.bio && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
