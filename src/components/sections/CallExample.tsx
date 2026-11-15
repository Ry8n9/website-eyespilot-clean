import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { FocalMark } from "@/components/brand/FocalMark";
import { DemoAudioPlayer } from "@/components/DemoAudioPlayer";
import { SmsPhone } from "@/components/mock/SmsPhone";
import { TicketScreen } from "@/components/mock/TicketScreen";
import { SectionHeading } from "@/components/SectionHeading";
import { callExample, mockScreens } from "@/content/fr";
import type { DemoAudio } from "@/content/validated";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const TURN_MS = 1500;
const TOTAL = callExample.turns.length;

/** Nombre de lignes de la fiche remplies après `step` répliques. */
const filledRows = (step: number) => callExample.ticket.rows.filter((r) => r.after <= step).length;

/**
 * La pièce centrale : un appel complet, annoté, joué tour par tour.
 * La fiche se remplit et le SMS arrive au fil de l'appel. Tout le texte
 * reste dans la page (lisible sans animation, par les lecteurs d'écran
 * et sous prefers-reduced-motion, où l'appel s'affiche en entier).
 */
export const CallExample = ({ audio }: { audio: DemoAudio | null }) => {
  const callRef = useRef<HTMLOListElement | null>(null);
  const inView = useInView(callRef);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(1);
  const [run, setRun] = useState(0);

  const animated = !reduced;
  const shown = animated ? step : TOTAL;

  useEffect(() => {
    if (!animated || !inView) return;
    if (step >= TOTAL) return;
    const t = window.setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL)), TURN_MS);
    return () => window.clearTimeout(t);
  }, [animated, inView, step, run]);

  const replay = useCallback(() => {
    setStep(1);
    setRun((r) => r + 1);
  }, []);

  const smsSent = shown >= callExample.sms.after;

  return (
    <section id="exemple-appel" aria-labelledby="exemple-appel-titre" className="px-4 section-y">
      <div className="container mx-auto max-w-6xl px-0">
        <SectionHeading
          id="exemple-appel-titre"
          eyebrow={callExample.eyebrow}
          title={callExample.title}
          lead={callExample.lead}
        />

        <figure data-exemple className="mt-10 md:mt-14">
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
                  <p className="font-heading text-sm font-bold text-foreground md:text-base">{callExample.practice}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {callExample.fictional}
                </span>
                {animated && (
                  <button
                    type="button"
                    onClick={replay}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    {callExample.replay}
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
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
                    const visible = i < shown;
                    return (
                      <li
                        key={i}
                        className={cn(
                          "grid gap-2 transition-all duration-500 ease-out md:grid-cols-[1fr_220px] md:gap-6",
                          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                        )}
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

              {/* Ce que l'appel produit, au fil de l'appel */}
              <div className="space-y-6 bg-background/60 px-5 py-6 md:px-8 md:py-8 lg:px-6">
                <div>
                  <p className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                    <FocalMark className="h-4 w-4" />
                    {callExample.ticket.title}
                  </p>
                  <TicketScreen
                    title={mockScreens.ticket.title}
                    rows={callExample.ticket.rows}
                    filled={animated ? filledRows(shown) : callExample.ticket.rows.length}
                  />
                </div>
                <div>
                  <p className="mb-3 flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                    <FocalMark className="h-4 w-4" />
                    {callExample.sms.title}
                  </p>
                  <SmsPhone
                    className="mx-auto w-full max-w-[240px]"
                    sender={callExample.sms.sender}
                    text={callExample.sms.text}
                    linkLabel={callExample.sms.linkLabel}
                    received={smsSent}
                  />
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
