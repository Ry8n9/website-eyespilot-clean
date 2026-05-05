import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Star,
  ClipboardList,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/rayane-boukef-eyespilot/new-meeting";
const CONTACT_EMAIL = "contact@eyespilot.net";
const CONTACT_PHONE = "+33644832903";
const CONTACT_PHONE_DISPLAY = "06 44 83 29 03";

/* -------------------------------------------------------------------------- */
/*  Logo                                                                       */
/* -------------------------------------------------------------------------- */

type LogoProps = {
  size?: number;
  interactive?: boolean;
  className?: string;
};

const EyesPilotLogo = ({ size = 28, interactive = true, className = "" }: LogoProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const onMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const maxShift = 6;
      const factor = Math.min(dist / 300, 1);
      setOffset({ x: (dx / dist) * maxShift * factor, y: (dy / dist) * maxShift * factor });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive]);

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
        <circle cx="24" cy="24" r="10" fill="hsl(var(--primary))" />
        <g stroke="hsl(var(--primary-foreground))" strokeLinecap="round">
          <circle cx="24" cy="24" r="7" fill="none" strokeWidth="1.4" opacity="0.9" />
          <line x1="24" y1="24" x2="24" y2="17" strokeWidth="1.6" />
          <line x1="24" y1="24" x2="30.06" y2="27.5" strokeWidth="1.6" />
          <line x1="24" y1="24" x2="17.94" y2="27.5" strokeWidth="1.6" />
        </g>
        <circle cx="24" cy="24" r="2" fill="hsl(var(--primary-foreground))" />
      </g>
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                     */
/* -------------------------------------------------------------------------- */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full px-5 md:px-6 py-3 ${
          scrolled ? "navbar-glass shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-extrabold text-primary font-heading tracking-tight"
          >
            <EyesPilotLogo size={26} />
            EyesPilot
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#probleme" className="hover:text-primary transition-colors">Problèmes</a>
            <a href="#solution" className="hover:text-primary transition-colors">Services</a>
            <a href="#methode" className="hover:text-primary transition-colors">Démarche</a>
            <a href="#tarifs" className="hover:text-primary transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>

          <Button size="sm" className="rounded-full ml-2 hidden md:inline-flex" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Réserver un appel
            </a>
          </Button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-1 text-primary"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden px-4">
          <div className="navbar-glass rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <a href="#probleme" onClick={closeMobile} className="text-base font-medium text-foreground py-2 border-b border-border">Problèmes</a>
            <a href="#solution" onClick={closeMobile} className="text-base font-medium text-foreground py-2 border-b border-border">Services</a>
            <a href="#methode" onClick={closeMobile} className="text-base font-medium text-foreground py-2 border-b border-border">Démarche</a>
            <a href="#tarifs" onClick={closeMobile} className="text-base font-medium text-foreground py-2 border-b border-border">Tarifs</a>
            <a href="#faq" onClick={closeMobile} className="text-base font-medium text-foreground py-2 border-b border-border">FAQ</a>
            <Button className="rounded-full mt-2" asChild onClick={closeMobile}>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Réserver un appel <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

const HeroSection = () => (
  <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 bg-background overflow-hidden">
    <div className="absolute top-20 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute top-10 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

    <div className="container max-w-4xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 mb-6 text-xs md:text-sm font-semibold">
        <EyesPilotLogo size={16} interactive={false} />
        Pensé pour les cabinets qui veulent moins d'appels et plus d'avis
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
        Moins d'appels.
        <br />
        Plus d'avis Google.
        <br />
        <span className="text-primary">Votre secrétariat respire.</span>
      </h1>

      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
        Chaque jour, votre secrétariat décroche pour les mêmes questions. EyesPilot réduit cette charge
        en automatisant rappels, demandes administratives et collecte d'avis — sans rien changer à votre organisation.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size="lg" className="rounded-full text-base pl-8 pr-6 py-6 shadow-xl shadow-primary/20" asChild>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Réserver un appel de 15 min
            <ArrowRight className="ml-1 h-5 w-5" />
          </a>
        </Button>
        <a href="#solution" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
          Voir comment ça marche →
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-xs md:text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" />Compatible Doctolib</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" />Hébergé en France</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" />Conforme RGPD</span>
      </div>
    </div>
  </section>
);

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
            text: "Sans rappel automatique, un client sur dix ne se présente pas. Chaque créneau raté représente un manque à gagner direct — et un agenda difficile à réoptimiser en urgence.",
          },
          {
            emoji: "⭐",
            title: "Trop peu d'avis Google",
            text: "Vos clients sont satisfaits mais ne pensent pas à laisser un avis. Pendant ce temps, la concurrence creuse l'écart sur Google. Une relance bien placée changerait tout.",
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
/*  Solution                                                                   */
/* -------------------------------------------------------------------------- */

const SolutionSection = () => (
  <section id="solution" className="py-16 md:py-24 px-4 bg-background">
    <div className="container max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">EyesPilot : notre solution</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-heading">
          Trois briques, un système qui tourne seul
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto font-body">
          Une fois installé, EyesPilot automatise les tâches chronophages sans modifier votre organisation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <MessageSquare className="h-7 w-7 text-primary-foreground" />,
            title: "Moins d'appels pour votre secrétariat",
            text: "Un rappel SMS la veille du RDV, avec tout ce dont le client a besoin. Résultat : moins d'appels de confirmation, moins de no-shows, un standard qui se libère.",
          },
          {
            icon: <Star className="h-7 w-7 text-primary-foreground" />,
            title: "Collecte d'avis Google",
            text: "Après chaque consultation, un message invite votre client à laisser un avis en un clic. Les étoiles s'accumulent sans que votre équipe n'ait à relancer.",
          },
          {
            icon: <ClipboardList className="h-7 w-7 text-primary-foreground" />,
            title: "Formulaire en ligne",
            text: "Renouvellements, documents, informations courantes : tout passe par un formulaire centralisé. Votre secrétariat traite en batch, pas en urgence téléphonique.",
          },
        ].map((item) => (
          <div key={item.title} className="card-blue rounded-2xl p-6 hover:shadow-md transition-all duration-300">
            <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 font-heading">{item.title}</h3>
            <p className="text-muted-foreground text-sm font-body">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 card-blue rounded-2xl p-6 text-center">
        <p className="text-primary font-semibold text-lg font-heading">
          Ce qu'on vise à J+30 : une réduction notable des appels répétitifs et vos premiers avis Google collectés automatiquement.
        </p>
        <p className="text-xs text-muted-foreground mt-2 font-body">
          Estimations pour un cabinet moyen. Résultats mesurés à J+30 et présentés lors du bilan.
        </p>
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
/*  Confiance / RGPD                                                           */
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
              Données clients : on prend ça au sérieux
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground font-body">
              <span className="font-semibold text-foreground">Hébergement en France</span> chez un prestataire agréé santé.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground font-body">
              <span className="font-semibold text-foreground">Conforme RGPD</span>, contrat de sous-traitance fourni.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground font-body">
              <span className="font-semibold text-foreground">Aucune donnée médicale</span>. Nom, téléphone, horaire de RDV — rien de plus.
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
            On commence par valider ensemble que ça fait sens pour votre cabinet.
            Si les résultats sont là, on définit les conditions à long terme. Sinon, on désinstalle proprement.
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
              Candidater au programme pilote
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
      q: "Comment sont gérées les données des clients ?",
      a: "On collecte uniquement le nom, le numéro de téléphone et l'horaire du rendez-vous. Aucune donnée médicale n'est traitée. Hébergement en France chez un prestataire agréé santé, contrat RGPD fourni dès le démarrage.",
    },
    {
      q: "Combien de temps dure l'installation ?",
      a: "48 heures à compter de notre premier appel. Les rappels SMS partent dès le lendemain, et les premiers avis Google apparaissent généralement entre 7 et 14 jours après le lancement.",
    },
    {
      q: "Ça marche avec Doctolib ?",
      a: "Oui. EyesPilot fonctionne par-dessus votre agenda existant sans en modifier le fonctionnement. Vous utilisez un autre logiciel de prise de RDV ? On vérifie la compatibilité lors de l'appel — dans la grande majorité des cas, c'est compatible.",
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
      <div className="flex items-center gap-4">
        <a href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</a>
        <a href="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</a>
        <a href="/cgu" className="hover:text-primary transition-colors">CGU</a>
      </div>
    </div>
  </footer>
);

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const EyesPilotLanding = () => (
  <main className="overflow-x-hidden scroll-smooth">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <StepsSection />
    <TrustSection />
    <BetaSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </main>
);

export default EyesPilotLanding;
