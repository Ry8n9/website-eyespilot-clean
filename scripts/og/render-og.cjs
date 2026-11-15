/**
 * Génère public/og-image.png (1200 x 630) à partir de scripts/og/og-image.html.
 * Utilise le Chrome installé sur la machine (channel "chrome") ; aucune
 * requête réseau n'est autorisée pendant le rendu.
 *
 * Usage : npm run og:image
 */
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("@playwright/test");

const root = path.resolve(__dirname, "..", "..");
const source = path.join(__dirname, "og-image.html");
const target = path.join(root, "public", "og-image.png");

(async () => {
  const browser = await chromium.launch({ channel: process.env.OG_BROWSER_CHANNEL || "chrome" });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.route("**/*", (route) =>
    route.request().url().startsWith("file:") ? route.continue() : route.abort(),
  );
  await page.goto(pathToFileURL(source).href);
  await page.screenshot({ path: target, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log(`Image écrite : ${path.relative(root, target)}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
