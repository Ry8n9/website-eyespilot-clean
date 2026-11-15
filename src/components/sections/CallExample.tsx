import { useRef } from "react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { FocalMark } from "@/components/brand/FocalMark";
import { DemoAudioPlayer } from "@/components/DemoAudioPlayer";
import { SectionHeading } from "@/components/SectionHeading";
import { callExample } from "@/content/fr";
import type { DemoAudio } from "@/content/validated";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * La pièce centrale : un appel complet, annoté. La réassurance (IA
 * annoncée, règle d'urgence, SMS, humain joignable) est portée par les
 * annotations, au moment précis où elle se joue dans l'appel.
 */
export const CallExample = ({ audio }: { audio: DemoAudio | null }) => {
  const callRef = useRef<HTMLOListElement | null>(null);
  const inView = useInView(callRef);
  const reduced = useReducedMotion();
  const revealed = inView || reduced;

  return (
    <section id="exemple-appel" aria-labelledby="exemple-appel-titre" className="px-4 section-y">
      <div className="container mx-auto max-w-6xl px-0">
        <SectionHeading
          id="exemple-appel-titre"
          eyebrow={callExample.eyebrow}
          title={callExample.title}
          lead={callExample.lead}
        />

        <figure className="mt-10 md:mt-14">
          <div className="overflow-hidden rounded-3xl surface-raised">
            {/* En-tête de l'appel */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <EyesPilotLogo size={26} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {callExample.callStatus}
                  </p>
                  <p className="font-heading text-sm font-bold text-foreground md:text-base">
                    {callExample.practice}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                {callExample.fictional}
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
              {/* Conversation annotée */}
              <div className="px-5 py-6 md:px-8 md:py-8 lg:border-r lg:border-border">
                {audio && (
                  <div className="mb-6">
                    <DemoAudioPlayer audio={audio} />
                  </div>
                )}
                <ol ref={callRef} className="space-y-4">
                  {callExample.turns.map((turn, i) => {
                    const note = turn.note !== undefined ? callExample.notes[turn.note] : null;
                    const isAssistant = turn.speaker === "assistant";
                    return (
                      <li
                        key={i}
                        className={cn(
                          "grid gap-2 transition-all duration-500 ease-out md:grid-cols-[1fr_220px] md:gap-6",
                          revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                        )}
                        style={{ transitionDelay: revealed && !reduced ? `${i * 120}ms` : "0ms" }}
                      >
                        <div className={cn("max-w-xl", !isAssistant && "md:pl-10")}>
                          <p
                            className={cn(
                              "mb-1 text-xs font-semibold",
                              isAssistant ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            {callExample.speakers[turn.speaker]}
                          </p>
                          <p
                            className={cn(
                              "rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed",
                              isAssistant
                                ? "card-blue rounded-tl-md text-foreground"
                                : "rounded-tl-md border border-border bg-background text-foreground",
                            )}
                          >
                            {turn.text}
                          </p>
                        </div>
                        {note ? (
                          <aside className="flex gap-2.5 border-l-2 border-dashed border-primary/30 pl-3 md:mt-5">
                            <FocalMark className="mt-0.5 h-4 w-4" />
                            <div>
                              <p className="text-sm font-semibold text-foreground">{note.title}</p>
                              <p className="text-sm leading-snug text-muted-foreground">{note.text}</p>
                            </div>
                          </aside>
                        ) : (
                          <span className="hidden md:block" />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Ce que l'appel produit */}
              <div className="space-y-5 bg-background/60 px-5 py-6 md:px-8 md:py-8 lg:px-6">
                <div className="rounded-2xl surface p-5">
                  <p className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                    <FocalMark className="h-4 w-4" />
                    {callExample.ticket.title}
                  </p>
                  <dl className="space-y-3 text-sm">
                    {callExample.ticket.rows.map((row) => (
                      <div key={row.label}>
                        <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 text-foreground">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-2xl surface p-5">
                  <p className="mb-4 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                    <FocalMark className="h-4 w-4" />
                    {callExample.sms.title}
                  </p>
                  <p className="mb-1.5 text-xs font-semibold text-muted-foreground">{callExample.sms.sender}</p>
                  <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
                    {callExample.sms.text}
                    <span className="mt-2 block font-semibold text-primary underline underline-offset-4">
                      {callExample.sms.linkLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-4 text-center text-sm text-muted-foreground">{callExample.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
};
