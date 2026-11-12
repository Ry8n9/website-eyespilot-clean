import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { Navbar } from "@/components/sections/Navbar";
import { MobileCallBar } from "@/components/sections/MobileCallBar";
import { Hero } from "@/components/sections/Hero";
import { CallExample } from "@/components/sections/CallExample";
import { Problem } from "@/components/sections/Problem";
import { Simulator } from "@/components/sections/Simulator";
import { Comparison } from "@/components/sections/Comparison";
import { Proof } from "@/components/sections/Proof";
import { Process } from "@/components/sections/Process";
import { Offers } from "@/components/sections/Offers";
import { Fit } from "@/components/sections/Fit";
import { PatientData } from "@/components/sections/PatientData";
import { Team } from "@/components/sections/Team";
import { calendlyUrl, FLAGS } from "@/config";
import { DONNEES_VALIDEES } from "@/content/validated";

const CALENDLY_URL = calendlyUrl("ancienne-section");
const CONTACT_EMAIL = "contact@eyespilot.net";
const CONTACT_PHONE = "+33644832903";
const CONTACT_PHONE_DISPLAY = "06 44 83 29 03";

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Que doit faire mon secrétariat ?",
      a: "Presque rien. Une formation de 15 minutes suffit à la mise en route, et le système tourne ensuite de façon autonome. Pas de nouvelle interface à apprendre, pas de procédure à changer.",
    },
    {
      q: "Comment sont gérées les données des patients ?",
      a: `Nous limitons les données au strict nécessaire. Pour le détail de notre traitement des données, contactez-nous : ${CONTACT_EMAIL}.`,
    },
    {
      q: "Combien de temps dure l'installation ?",
      a: "48 heures à compter de notre premier appel. Les rappels SMS partent dès le lendemain, et les premiers avis Google apparaissent généralement entre 7 et 14 jours après le lancement.",
    },
    {
      q: "Ça marche avec Doctolib ?",
      a: "Oui. EyesPilot fonctionne avec votre prise de rendez-vous en ligne (Doctolib ou autre) : le patient reçoit le lien par SMS.",
    },
    {
      q: "Y a-t-il un engagement ?",
      a: "Non. L'essai de 30 jours est gratuit, sans CB. Si vous ne souhaitez pas continuer, on désinstalle et vous ne devez rien. Après la période pilote, l'abonnement est mensuel, résiliable à tout moment.",
    },
    {
      q: "Quels sont les tarifs après la bêta ?",
      a: "Le tarif mensuel est défini lors de l'appel, selon votre volume et votre configuration. Les cabinets pilotes bénéficient d'un tarif préférentiel verrouillé à vie. Aucun montant ne s'applique avant la fin des 30 jours d'essai.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 px-4 bg-background">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            Les questions qu'on nous pose
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="bg-card rounded-2xl border border-border overflow-hidden transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <h3 className="font-bold text-foreground font-heading pr-4">{faq.q}</h3>
                <span
                  className={`text-primary text-xl transition-transform duration-200 shrink-0 ${openIndex === i ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-5 px-5" : "max-h-0"}`}>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  CTA final                                                                  */
/* -------------------------------------------------------------------------- */

const CTASection = () => (
  <section className="py-16 md:py-24 px-4 bg-background">
    <div className="container max-w-3xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 font-heading">
        Un appel de 15 minutes pour voir si c'est fait pour vous.
      </h2>
      <Button size="lg" className="rounded-full text-base px-8 py-6 shadow-xl shadow-primary/20 mb-10" asChild>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Réserver mon appel gratuit <ArrowRight className="ml-1 h-5 w-5" />
        </a>
      </Button>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground flex items-center gap-2">
          <EyesPilotLogo size={20} interactive={false} />
          EyesPilot
        </span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-1 hover:text-primary transition-colors">
          <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
        </a>
        <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1 hover:text-primary transition-colors">
          <Phone className="h-4 w-4" /> {CONTACT_PHONE_DISPLAY}
        </a>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

const Footer = () => (
  <footer className="py-8 px-4 border-t border-border">
    <div className="container max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-body">
      <p>© {new Date().getFullYear()} EyesPilot — Tous droits réservés.</p>
      {/* Liens Mentions légales / Confidentialité / CGU retirés provisoirement :
          à rétablir quand les pages légales seront créées (étape 2). */}
    </div>
  </footer>
);

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const EyesPilotLanding = () => (
  <main className="overflow-x-hidden pb-24 md:pb-0">
    <Navbar />
    <MobileCallBar />
    <Hero />
    <CallExample audio={FLAGS.SHOW_DEMO_AUDIO ? DONNEES_VALIDEES.demoAudio : null} />
    <Problem />
    {FLAGS.SHOW_SIMULATOR && <Simulator />}
    <Comparison />
    {FLAGS.SHOW_PROOF && <Proof data={DONNEES_VALIDEES.proof} />}
    <Process />
    <Offers
      pack={DONNEES_VALIDEES.offers.pack}
      voiceAgent={DONNEES_VALIDEES.offers.voiceAgent}
      showPrices={FLAGS.SHOW_PRICES}
      riskReversal={FLAGS.SHOW_GUARANTEE ? DONNEES_VALIDEES.riskReversal : null}
    />
    <Fit />
    <PatientData />
    {FLAGS.SHOW_TEAM && <Team members={DONNEES_VALIDEES.team} />}
    <FAQSection />
    <CTASection />
    <Footer />
  </main>
);

export default EyesPilotLanding;
