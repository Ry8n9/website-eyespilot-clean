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
import { Footer } from "@/components/sections/Footer";
import { FLAGS } from "@/config";
import { footerLegalLinks } from "@/lib/legal";
import { DONNEES_VALIDEES } from "@/content/validated";

/**
 * Page d'accueil. Ordre validé : la méthode, le simulateur et la preuve
 * passent avant les offres. Les sections masquées dépendent des drapeaux
 * de src/config.ts et des données de src/content/validated.ts.
 */
const EyesPilotLanding = () => (
  <div className="grain overflow-x-hidden pb-24 md:pb-0">
    <main>
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
    </main>
    <Footer legalLinks={footerLegalLinks()} />
  </div>
);

export default EyesPilotLanding;
