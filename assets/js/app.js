/* AI Mastery Docs — Author: Sanat — For My Wife Okin
 * Builds the page shell (top bar, sidebar, TOC, prev/next), dark mode,
 * full-text search, progress tracking, code copy/highlight and quizzes.
 * Works from file:// with no server.
 */
(function () {
  "use strict";
  var SITE = window.SITE || {}, NAV = window.NAV || [], INDEX = window.SEARCH_INDEX || [];
  var body = document.body, root = body.getAttribute("data-root") || "";
  var content = document.getElementById("content");
  var LS = { theme: "aim-theme", done: "aim-done", groups: "aim-groups" };

  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  var here = (function () {
    var p = location.pathname.replace(/\\/g, "/").replace(/\/$/, "/index.html");
    var depth = (root.match(/\.\.\//g) || []).length;
    var parts = p.split("/").filter(Boolean);
    return decodeURIComponent(parts.slice(parts.length - 1 - depth).join("/")) || "index.html";
  })();

  var pages = [];
  NAV.forEach(function (g) { g.items.forEach(function (it) { if (!it.soon) pages.push(it); }); });
  var done = store(LS.done) || {};

  /* ---------- Theme ---------- */
  function setTheme(t) { document.documentElement.setAttribute("data-theme", t); store(LS.theme, t); var b = document.getElementById("theme-btn"); if (b) b.textContent = t === "dark" ? "\u2600" : "\u263E"; }
  var theme = store(LS.theme) || (matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  /* ---------- Top bar ---------- */
  var top = el("header", "topbar");
  top.innerHTML =
    '<button class="icon-btn menu-btn" id="menu-btn" aria-label="Menu">\u2630</button>' +
    '<a class="brand" href="' + root + 'index.html"><span class="brand-logo">AI</span><span>' + esc(SITE.title) +
    '<small>' + esc(SITE.subtitle) + ' \u00b7 ' + esc(SITE.dedication) + '</small></span></a>' +
    '<div class="spacer"></div>' +
    '<div class="search-wrap"><span class="icon">\u2315</span><input id="search" type="search" placeholder="Search all docs\u2026" autocomplete="off"><kbd>/</kbd>' +
    '<div class="search-results" id="search-results"></div></div>' +
    '<button class="icon-btn" id="theme-btn" title="Toggle dark mode"></button>';
  body.insertBefore(top, body.firstChild);

  /* ---------- Sidebar ---------- */
  var groupsState = store(LS.groups) || {};
  var side = el("nav", "sidebar");
  var total = pages.length, completed = pages.filter(function (p) { return done[p.href]; }).length;
  var html = '<div class="progress-box">Your progress: <b>' + completed + '/' + total + '</b> pages' +
    '<div class="bar"><span style="width:' + (total ? Math.round(100 * completed / total) : 0) + '%"></span></div></div>';
  NAV.forEach(function (g, gi) {
    var hasCurrent = g.items.some(function (it) { return it.href === here; });
    var collapsed = groupsState[gi] === undefined ? (g.level > 1 && !hasCurrent) : groupsState[gi];
    html += '<div class="nav-group' + (collapsed ? " collapsed" : "") + '" data-g="' + gi + '"><button>' + esc(g.group) + '<span class="chev">\u25BE</span></button><ul>';
    g.items.forEach(function (it) {
      html += '<li' + (it.soon ? ' class="soon"' : "") + '><a href="' + root + it.href + '"' + (it.href === here ? ' class="current"' : "") + '>' +
        (it.n ? '<span class="num">' + it.n + '</span>' : "") + '<span>' + esc(it.title) + '</span>' +
        (done[it.href] ? '<span class="done">\u2713</span>' : "") + '</a></li>';
    });
    html += "</ul></div>";
  });
  side.innerHTML = html;
  side.addEventListener("click", function (e) {
    var btn = e.target.closest(".nav-group > button"); if (!btn) return;
    var g = btn.parentNode; g.classList.toggle("collapsed");
    groupsState[g.getAttribute("data-g")] = g.classList.contains("collapsed"); store(LS.groups, groupsState);
  });

  /* ---------- Layout ---------- */
  var layout = el("div", "layout"), main = el("main", "main"), toc = el("aside", "toc");
  content.parentNode.insertBefore(layout, content);
  layout.appendChild(side); layout.appendChild(main); main.appendChild(content); main.appendChild(toc);

  /* ---------- Dedication line ---------- */
  var ded = el("div", "dedication", '<span><span class="heart">\u2665</span> ' + esc(SITE.dedication) + '</span><span>Author: <b>' + esc(SITE.author) + '</b></span><span>' + esc(SITE.version) + '</span>');
  content.insertBefore(ded, content.firstChild);

  /* ---------- Heading ids + TOC ---------- */
  var heads = content.querySelectorAll("h2, h3"), tocHtml = "", used = {};
  heads.forEach(function (h) {
    if (!h.id) { var s = slug(h.textContent), id = s, i = 2; while (used[id]) id = s + "-" + i++; h.id = id; }
    used[h.id] = 1;
    if (h.closest(".objectives, .takeaways")) return;
    tocHtml += '<a class="' + h.tagName.toLowerCase() + '" href="#' + h.id + '">' + esc(h.textContent) + "</a>";
  });
  if (heads.length > 2) toc.innerHTML = '<div class="toc-title">On this page</div>' + tocHtml; else toc.remove();
  var tocLinks = toc.querySelectorAll ? toc.querySelectorAll("a") : [];
  if ("IntersectionObserver" in window && tocLinks.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-70px 0px -70% 0px" });
    heads.forEach(function (h) { obs.observe(h); });
  }

  /* ---------- Code blocks ---------- */
  var KW = {
    scala: "abstract case catch class def do else enum export extends final finally for given if implicit import lazy match new object override package private protected return sealed then throw trait try type using val var while with yield true false null",
    python: "and as assert async await break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield match case self",
    bash: "if then else fi for do done case esac function export echo cd sudo",
    json: "true false null", yaml: "true false null", toml: "true false",
    ts: "const let var function return if else for while import from export async await new class interface type extends implements true false null undefined",
    js: "const let var function return if else for while import from export async await new class true false null undefined"
  };
  KW.typescript = KW.ts; KW.javascript = KW.js; KW.sh = KW.bash; KW.sbt = KW.scala;
  function highlight(text, lang) {
    var kws = KW[lang]; if (!kws) return esc(text);
    var hash = /^(python|bash|sh|yaml|toml)$/.test(lang);
    var re = new RegExp((hash ? "(#[^\\n]*)" : "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)") +
      "|(\"\"\"[\\s\\S]*?\"\"\"|\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*')|\\b(\\d+(?:\\.\\d+)?)\\b|\\b([A-Za-z_][A-Za-z0-9_]*)\\b", "g");
    var set = {}; kws.split(" ").forEach(function (k) { set[k] = 1; });
    var out = "", last = 0, m;
    while ((m = re.exec(text))) {
      out += esc(text.slice(last, m.index)); last = re.lastIndex;
      if (m[1]) out += '<span class="tok-c">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tok-s">' + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tok-n">' + esc(m[3]) + "</span>";
      else out += set[m[4]] ? '<span class="tok-k">' + esc(m[4]) + "</span>" : esc(m[4]);
    }
    return out + esc(text.slice(last));
  }
  content.querySelectorAll("pre").forEach(function (pre) {
    var lang = (pre.getAttribute("data-lang") || "text").toLowerCase();
    var code = pre.querySelector("code") || pre;
    var raw = code.textContent.replace(/^\n/, "").replace(/\s+$/, "");
    code.innerHTML = highlight(raw, lang);
    var wrap = el("div", "codeblock"), head = el("div", "code-head", "<span>" + esc(pre.getAttribute("data-title") || lang) + "</span>");
    var btn = el("button", "copy-btn", "Copy");
    btn.addEventListener("click", function () {
      var done2 = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1400); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(raw).then(done2);
      else { var t = document.createElement("textarea"); t.value = raw; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); done2(); }
    });
    head.appendChild(btn); pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(head); wrap.appendChild(pre);
  });

  /* ---------- Quizzes ---------- */
  var quizzes = content.querySelectorAll(".quiz"), scoreBox = document.getElementById("quiz-score");
  function updateScore() {
    if (!scoreBox) return;
    var answered = 0, right = 0;
    quizzes.forEach(function (q) { if (q.classList.contains("answered")) { answered++; if (q.classList.contains("correct")) right++; } });
    scoreBox.textContent = "Score: " + right + " / " + quizzes.length + (answered < quizzes.length ? "  (" + (quizzes.length - answered) + " unanswered)" :
      right / quizzes.length >= 0.8 ? "  \u2014 Excellent! You are ready for Level 2." : "  \u2014 Review the pages linked in the explanations and try again.");
  }
  quizzes.forEach(function (q, qi) {
    var ans = q.getAttribute("data-answer");
    var opts = Array.prototype.slice.call(q.querySelectorAll("label")), anchor = q.querySelector(".explain");
    for (var k = opts.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)), t = opts[k]; opts[k] = opts[j]; opts[j] = t; }
    opts.forEach(function (l) { q.insertBefore(l, anchor); });
    q.querySelectorAll("input").forEach(function (inp) { inp.name = "q" + qi; });
    q.addEventListener("change", function (e) {
      if (q.classList.contains("answered")) return;
      q.classList.add("answered");
      q.querySelectorAll("label").forEach(function (l) {
        var v = l.querySelector("input").value; if (v === ans) l.classList.add("right"); else if (l.querySelector("input") === e.target) l.classList.add("wrong");
        l.querySelector("input").disabled = true;
      });
      if (e.target.value === ans) q.classList.add("correct");
      updateScore();
    });
  });
  updateScore();

  /* ---------- Prev / next + complete ---------- */
  var idx = -1; pages.forEach(function (p, i) { if (p.href === here) idx = i; });
  if (idx >= 0 && !body.hasAttribute("data-no-pagenav")) {
    var row = el("div", "complete-row"), cb = el("button", "complete-btn");
    function paint() { cb.textContent = done[here] ? "\u2713 Completed \u2014 click to undo" : "Mark this page as complete"; cb.classList.toggle("is-done", !!done[here]); }
    cb.addEventListener("click", function () { if (done[here]) delete done[here]; else done[here] = Date.now(); store(LS.done, done); paint(); });
    paint(); row.appendChild(cb); content.appendChild(row);
    var pn = el("div", "page-nav"), prev = pages[idx - 1], next = pages[idx + 1];
    pn.innerHTML = (prev ? '<a class="prev" href="' + root + prev.href + '"><small>\u2190 Previous</small>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="' + root + next.href + '"><small>Next \u2192</small>' + esc(next.title) + "</a>" : "<span></span>");
    content.appendChild(pn);
  }
  content.appendChild(el("div", "site-footer", esc(SITE.title) + " \u00b7 " + esc(SITE.dedication) + " \u00b7 Author: " + esc(SITE.author) + " \u00b7 Last updated " + esc(SITE.updated) +
    " \u00b7 Works offline \u2014 share the folder freely."));

  /* ---------- Search ---------- */
  var input = document.getElementById("search"), box = document.getElementById("search-results"), active = -1;
  function run(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
    if (!terms.length) { box.classList.remove("open"); return; }
    var res = [];
    INDEX.forEach(function (d) {
      var t = (d.s + " " + d.p).toLowerCase(), x = d.x.toLowerCase(), score = 0, ok = true;
      terms.forEach(function (term) {
        var inT = t.indexOf(term) >= 0, inX = x.indexOf(term) >= 0;
        if (!inT && !inX) ok = false;
        score += (inT ? 10 : 0) + (inX ? 1 + Math.min(4, x.split(term).length - 1) : 0);
      });
      if (ok) res.push({ d: d, score: score });
    });
    res.sort(function (a, b) { return b.score - a.score; });
    res = res.slice(0, 25);
    var mark = new RegExp("(" + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi");
    box.innerHTML = res.length ? res.map(function (r) {
      var x = r.d.x, i = x.toLowerCase().indexOf(terms[0]), start = Math.max(0, i - 60);
      var snip = (start > 0 ? "\u2026" : "") + x.substr(start, 170) + "\u2026";
      return '<a href="' + root + r.d.u + (r.d.a ? "#" + r.d.a : "") + '"><div class="r-page">' + esc(r.d.p) + '</div><div class="r-title">' +
        esc(r.d.s).replace(mark, "<mark>$1</mark>") + '</div><div class="r-snip">' + esc(snip).replace(mark, "<mark>$1</mark>") + "</div></a>";
    }).join("") : '<div class="empty">No results for \u201c' + esc(q) + '\u201d. Try a simpler term, or check the Glossary.</div>';
    active = -1; box.classList.add("open");
  }
  input.addEventListener("input", function () { run(input.value.trim()); });
  input.addEventListener("keydown", function (e) {
    var links = box.querySelectorAll("a");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); active = (active + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
      links.forEach(function (a, i) { a.classList.toggle("active", i === active); }); if (links[active]) links[active].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && links.length) { location.href = (links[active] || links[0]).href; }
    else if (e.key === "Escape") { box.classList.remove("open"); input.blur(); }
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "/" || (e.key === "k" && (e.ctrlKey || e.metaKey))) && document.activeElement !== input) { e.preventDefault(); input.focus(); input.select(); }
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".search-wrap")) box.classList.remove("open"); });

  /* ---------- Buttons ---------- */
  setTheme(theme);
  document.getElementById("theme-btn").addEventListener("click", function () { setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"); });
  document.getElementById("menu-btn").addEventListener("click", function () { body.classList.toggle("nav-open"); });
  main.addEventListener("click", function () { body.classList.remove("nav-open"); });

  /* ---------- Offline (only when served over http/https, e.g. GitHub Pages) ---------- */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register(root + "sw.js").catch(function () {});
  }
})();
