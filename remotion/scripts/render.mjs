import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compositions = [
  { id: "what-is-ai", out: "edu-what-is-ai-v5.mp4" },
  { id: "how-to-ask", out: "edu-how-to-ask-v5.mp4" },
  { id: "image", out: "edu-image-v5.mp4" },
  { id: "video-site", out: "edu-video-site-v5.mp4" },
];

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (c) => c,
});

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

for (const { id, out } of compositions) {
  console.log("Rendering", id);
  const composition = await selectComposition({ serveUrl: bundled, id, puppeteerInstance: browser });
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: `/mnt/documents/${out}`,
    puppeteerInstance: browser,
    muted: true,
    concurrency: 1,
  });
}

await browser.close({ silent: false });
console.log("Done");