import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { EyesPilotLogo } from "@/components/brand/EyesPilotLogo";
import { Navbar } from "@/components/sections/Navbar";
import { MobileCallBar } from "@/components/sections/MobileCallBar";
import { Hero } from "@/components/sections/Hero";
import { CallExample } from "@/components/sections/CallExample";
import { calendlyUrl, FLAGS } from "@/config";
import { DONNEES_VALIDEES } from "@/content/validated";

const CALENDLY_URL = calendlyUrl("ancienne-section");
const CONTACT_EMAIL = "contact@eyespilot.net";
const CONTACT_PHONE = "+33644832903";
const CONTACT_PHONE_DISPLAY = "06 44 83 29 03";

/* -------------------------------------------------------------------------- */
/*  Problème                                                                   */
/* -------------------------------------------------------------------------- */

const ProblemSection = () => (
  <section id="probleme" className="py-16 md:py-24 px-4 bg-background">
    <div className="container max-w-5xl mx-auto">
      <div className="card-blue rounded-2xl p-8 md:p-12 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
          Les problématiques principales de votre cabinet :
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            emoji: "📞",
            title: "Le téléphone sonne en boucle",
            text: "Horaires, documents à apporter, renouvellements : les mêmes questions reviennent chaque jour. Votre secrétariat perd un temps précieux sur des appels qui pourraient être automatisés.",
          },
          {
            emoji: "💸",
            title: "Les rendez-vous non honorés",
            text: "Sans rappel automatique, un patient sur dix ne se présente pas. Chaque créneau raté représente un manque à gagner direct — et un agenda difficile à réoptimiser en urgence.",
          },
          {
            emoji: "⭐",
            title: "Trop peu d'avis Google",
            text: "Vos patients sont satisfaits mais ne pensent pas à laisser un avis. Pendant ce temps, la concurrence creuse l'écart sur Google. Une relance bien placée changerait tout.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Méthode                                                                    */
/* -------------------------------------------------------------------------- */

const StepsSection = () => (
  <section id="methode" className="py-16 md:py-24 px-4 bg-background">
    <div className="container max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">Notre démarche</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
          Comment procède-t-on ?
        </h2>
      </div>

      <div className="space-y-6">
        {[
          {
            step: "01",
            title: "Un appel de 15 minutes",
            text: "On fait le point sur votre volume d'appels, votre agenda et vos besoins. Sans engagement, sans discours commercial.",
          },
          {
            step: "02",
            title: "Installation en 48 heures",
            text: "On configure le système de A à Z. Formation de votre secrétariat en 15 minutes. Vous ne touchez à rien, ça tourne.",
          },
          {
            step: "03",
            title: "Bilan chiffré à J+30",
            text: "Appels évités, avis collectés, temps récupéré : on vous présente les résultats. Si ça ne convient pas, on désinstalle sans frais.",
          },
        ].map((item) => (
          <div key={item.step} className="card-blue rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <span className="text-3xl md:text-4xl font-extrabold text-primary/20 font-heading shrink-0">{item.step}.</span>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1 font-heading">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Confiance                                                                  */
/* -------------------------------------------------------------------------- */

const TrustSection = () => (
  <section className="py-12 md:py-16 px-4 bg-background">
    <div className="container max-w-5xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground font-heading">
              Données patients : on prend ça au sérieux
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground font-body">
              Nous limitons les données au strict nécessaire (nom, téléphone, horaire du rendez-vous).
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground font-body">
              Les messages envoyés aux patients sont clairement identifiés comme automatiques, et un humain du cabinet reste joignable.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Offre / Tarifs                                                             */
/* -------------------------------------------------------------------------- */

const BetaSection = () => (
  <section id="tarifs" className="py-16 md:py-24 px-4 bg-background">
    <div className="container max-w-3xl mx-auto">
      <div
        className="relative rounded-3xl p-8 md:p-14 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(var(--primary) / 0.35), transparent 60%), linear-gradient(180deg, hsl(222 47% 11%) 0%, hsl(222 47% 7%) 100%)",
        }}
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-white">
            Accès pilote — places limitées
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Testez EyesPilot pendant 30 jours, sans engagement.
          </h2>
          <p className="text-white/80 mb-8 font-body max-w-xl mx-auto">
            La période pilote permet de mesurer l'impact concret sur votre cabinet avant tout engagement financier.
            À l'issue des 30 jours, nous définissons ensemble les conditions de la collaboration — ou nous vous désinstallons tout, sans frais.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto text-left">
            {[
              "30 jours offerts, sans CB",
              "Installation complète incluse",
              "Rappels, avis, formulaires — tout activé dès J+1",
              "Sans engagement. On part si ça ne convient pas.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <p className="text-sm font-medium font-heading text-white">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-8 max-w-sm mx-auto">
            <p className="text-sm text-white/80 font-body leading-relaxed">
              Le tarif mensuel est défini lors de l'appel, selon votre volume et votre configuration.
              Les cabinets pilotes bénéficient d'un tarif préférentiel verrouillé à vie.
            </p>
          </div>

          <Button
            size="lg"
            className="rounded-full text-base px-8 py-6 shadow-lg bg-white text-primary hover:bg-white/90"
            asChild
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Candidater
              <ArrowRight className="ml-1 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

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
    <ProblemSection />
    <StepsSection />
    <TrustSection />
    <BetaSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </main>
);

export default EyesPilotLanding;
