import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
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
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { calendlyUrl, FLAGS } from "@/config";
import { DONNEES_VALIDEES } from "@/content/validated";

const CALENDLY_URL = calendlyUrl("ancienne-section");
const CONTACT_EMAIL = "contact@eyespilot.net";
const CONTACT_PHONE = "+33644832903";
const CONTACT_PHONE_DISPLAY = "06 44 83 29 03";

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
    <Faq />
    <FinalCta />
    <Footer />
  </main>
);

export default EyesPilotLanding;
