import { useEffect, useRef, useState } from "react";
import type { DemoAudio } from "@/content/validated";
import { callExample } from "@/content/fr";
import { cn } from "@/lib/utils";

/**
 * Lecteur audio de l'exemple d'appel, avec une transcription qui défile
 * et met en évidence la phrase en cours. Affiché seulement si
 * FLAGS.SHOW_DEMO_AUDIO et si DONNEES_VALIDEES.demoAudio est rempli.
 */
export const DemoAudioPlayer = ({ audio }: { audio: DemoAudio }) => {
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLOListElement | null>(null);

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const t = e.currentTarget.currentTime;
    let idx = -1;
    audio.transcript.forEach((line, i) => {
      if (line.start <= t) idx = i;
    });
    setActive(idx);
  };

  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item) return;
    list.scrollTo({ top: item.offsetTop - list.offsetTop - 16, behavior: "smooth" });
  }, [active]);

  return (
    <div className="rounded-2xl border border-border bg-background p-4 md:p-5">
      <p className="mb-3 font-heading text-sm font-bold text-foreground">{callExample.audio.title}</p>
      <audio
        controls
        preload="none"
        src={audio.src}
        onTimeUpdate={onTimeUpdate}
        className="w-full"
        aria-describedby="transcription-audio"
      />
      <p id="transcription-audio" className="mb-2 mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {callExample.audio.transcriptLabel}
      </p>
      <ol ref={listRef} className="relative max-h-48 space-y-2 overflow-y-auto pr-2 text-sm">
        {audio.transcript.map((line, i) => (
          <li
            key={`${line.start}-${i}`}
            aria-current={i === active ? "true" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 transition-colors",
              i === active ? "bg-primary/10 text-foreground" : "text-muted-foreground",
            )}
          >
            <span className="font-semibold text-foreground">{callExample.speakers[line.speaker]} : </span>
            {line.text}
          </li>
        ))}
      </ol>
    </div>
  );
};
