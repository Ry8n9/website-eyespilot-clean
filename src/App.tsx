import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MentionsLegales from "./pages/MentionsLegales.tsx";
import Confidentialite from "./pages/Confidentialite.tsx";
import { LEGAL } from "@/content/validated";
import { isLegalBlockEmpty } from "@/lib/legal";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Pages légales : inaccessibles (404) tant que le bloc LEGAL est vide. */}
      <Route
        path="/mentions-legales"
        element={isLegalBlockEmpty(LEGAL) ? <NotFound /> : <MentionsLegales legal={LEGAL} />}
      />
      <Route
        path="/confidentialite"
        element={isLegalBlockEmpty(LEGAL) ? <NotFound /> : <Confidentialite legal={LEGAL} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
