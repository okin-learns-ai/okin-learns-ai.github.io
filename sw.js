/* AI Mastery Docs offline cache. Author: Sanat. Generated from tools/sw.template.js by tools/build.py.
 * Strategy: network-first (always fresh when online), falling back to the cache when offline. */
const CACHE = "ai-mastery-8443f5b60030";
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
  "l2/01-advanced-prompt-patterns.html",
  "l2/02-structured-output.html",
  "l2/03-calling-llm-apis.html",
  "l2/04-tool-calling.html",
  "l2/05-embeddings-semantic-search.html",
  "l2/06-rag.html",
  "l2/07-agentic-coding-in-depth.html",
  "l2/08-skills-and-custom-agents.html",
  "l2/09-configuring-mcp-servers.html",
  "l2/10-ai-testing-and-review.html",
  "l2/11-local-models.html",
  "l2/12-ai-for-data-engineering.html",
  "l2/13-labs.html",
  "l2/14-capstone-store-assistant.html",
  "l2/15-checkpoint.html",
  "l3/01-building-mcp-servers.html",
  "l3/02-building-agents-from-scratch.html",
  "l3/03-multi-agent-systems.html",
  "l3/04-evals.html",
  "l3/05-advanced-rag.html",
  "l3/06-fine-tuning.html",
  "l3/07-llmops.html",
  "l3/08-ai-security.html",
  "l3/09-labs.html",
  "l3/10-capstone.html",
  "l3/11-checkpoint.html",
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
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match("./index.html"))
      )
  );
});
