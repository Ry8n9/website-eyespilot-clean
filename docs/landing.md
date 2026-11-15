# Page d'accueil EyesPilot

Route : `/` → `App.tsx` → `src/pages/Index.tsx`, qui ne fait qu'assembler les sections.

## Où se trouve quoi

| Fichier | Rôle |
|---------|------|
| `src/pages/Index.tsx` | Ordre des sections, branchement des drapeaux et des données |
| `src/components/sections/` | Une section = un composant |
| `src/content/fr.ts` | Tous les textes du site |
| `src/content/validated.ts` | `DONNEES_VALIDEES` : seule source des prix, preuves, équipe, audio, liens légaux |
| `src/config.ts` | Drapeaux `SHOW_*`, coordonnées, lien Calendly (`calendlyUrl(emplacement)`) |
| `src/components/brand/` | Logo (pupille qui suit le curseur), regard du Hero, repère focal |
| `src/components/CallButton.tsx` | L'unique appel à l'action : « Réserver un appel » (Calendly) |
| `scripts/og/` | Source et script de l'image de partage `public/og-image.png` |

## Ordre des sections

| Ordre | Composant | Ancre | Affichage |
|-------|-----------|-------|-----------|
| 1 | `Navbar` + `MobileCallBar` | — | toujours |
| 2 | `Hero` | `#hero` | toujours |
| 3 | `CallExample` | `#exemple-appel` | toujours ; lecteur audio si `SHOW_DEMO_AUDIO` |
| 4 | `Problem` | `#probleme` | toujours |
| 5 | `Simulator` | `#simulateur` | `SHOW_SIMULATOR` |
| 6 | `Comparison` | `#comparaison` | toujours |
| 7 | `Proof` | `#preuve` | `SHOW_PROOF` |
| 8 | `Process` | `#methode` | toujours |
| 9 | `Offers` | `#offres` | toujours ; prix si `SHOW_PRICES`, « Votre risque » si `SHOW_GUARANTEE` |
| 10 | `Fit` | `#pour-qui` | toujours |
| 11 | `PatientData` | `#donnees` | toujours |
| 12 | `Team` | `#equipe` | `SHOW_TEAM` |
| 13 | `Faq` | `#faq` | toujours |
| 14 | `FinalCta` | `#appel-final` | toujours |
| 15 | `Footer` (hors `<main>`) | — | liens légaux si `SHOW_LEGAL_LINKS` |

La méthode, le simulateur et la preuve passent avant les offres : le médecin voit le processus et le contrôle qu'il garde avant le tarif.

## Activer une section masquée

Un drapeau à `true` ne suffit pas : la donnée correspondante doit aussi être remplie dans `src/content/validated.ts`, sinon la section reste masquée.

| Drapeau | Donnée à remplir |
|---------|------------------|
| `SHOW_PRICES` | `offers.pack.prices`, `offers.voiceAgent.prices` (déjà renseignés) |
| `SHOW_GUARANTEE` | `riskReversal` (texte validé) |
| `SHOW_PROOF` | `proof` : `practice`, `metric`, `quote`, `callLog` |
| `SHOW_TEAM` | `team` : `photo` (dans `public/`), `bio` |
| `SHOW_DEMO_AUDIO` | `demoAudio` : fichier dans `public/audio/` + transcription horodatée |
| `SHOW_LEGAL_LINKS` | bloc `LEGAL` (au moins un champ) : les liens ne pointent que vers des pages accessibles |
| `SHOW_SIMULATOR` | aucune donnée : le visiteur saisit ses chiffres |

## Règles de contenu

Aucune affirmation non prouvable : pas d'hébergement, de conformité, de certification, de pourcentage, de chiffre de performance, de délai, de témoignage inventé, ni rien de l'ancien positionnement (avis, pilote gratuit). Chiffres et faits viennent uniquement de `DONNEES_VALIDEES`.

## Pages légales

`/mentions-legales` (`src/pages/MentionsLegales.tsx`) est alimentée par le bloc `LEGAL` de `src/content/validated.ts` : raison sociale ou nom, forme juridique, SIREN, adresse, directeur de la publication, hébergeur, courriel. Tant que le bloc est vide, la route renvoie la page 404. Un champ vide masque sa ligne ; une section sans aucune donnée est masquée. Aucun texte juridique n'est rédigé à la place des données.

## Image de partage

```bash
npm run og:image
```

Rend `scripts/og/og-image.html` en `public/og-image.png` (1200 x 630) avec le Chrome installé, réseau bloqué.

## Tests

```bash
npm test
```

| Fichier | Couvre |
|---------|--------|
| `landing.test.tsx` | Rendu, titres, liens Calendly (nouvel onglet, utm), FAQ, contact, menu mobile, repères |
| `forbidden-words.test.tsx` | Mots interdits, emojis, chiffres et prix dans le texte affiché et `index.html` ; sections masquées |
| `call-example.test.tsx` | Conversation, annotations, fiche, SMS, lecteur audio |
| `simulator.test.tsx` | Formule, champs vides par défaut, mention |
| `offers.test.tsx` | Prix masqués ou affichés, contenu du pack, « Votre risque » |
| `proof.test.tsx`, `team.test.tsx` | Affichage conditionnel aux données |
