/* AI Mastery Docs offline cache. Author: Sanat. Generated from tools/sw.template.js by tools/build.py. */
const CACHE = "ai-mastery-d86ee7da4567";
const FILES = [
  "./",
  "assets/css/style.css",
  "assets/icons/icon-180.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/js/app.js",
  "assets/js/nav.js",
  "assets/js/search-index.js",
  "glossary.html",
  "index.html",
  "l1/01-what-is-ai.html",
  "l1/02-how-llms-work.html",
  "l1/03-prompting-fundamentals.html",
  "l1/04-context-engineering.html",
  "l1/05-ai-tools-landscape.html",
  "l1/06-ai-in-the-ide.html",
  "l1/07-instructions-skills-agents.html",
  "l1/08-agents-101.html",
  "l1/09-mcp-101.html",
  "l1/10-scala-with-ai.html",
  "l1/11-python-with-ai.html",
  "l1/12-ai-across-it.html",
  "l1/13-learn-faster-with-ai.html",
  "l1/14-safety-privacy-ethics.html",
  "l1/15-labs.html",
  "l1/16-checkpoint.html",
  "manifest.webmanifest",
  "roadmap.html"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit || fetch(e.request).then((res) => {
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
