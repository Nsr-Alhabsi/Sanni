/* ============================================================
   Small helpers shared by every view
   ============================================================ */

const $ = (selector, root = document) => root.querySelector(selector);

/* ---------- Text & translation ---------- */
const t = key => UI[S.lang][key] ?? key;                         // UI string
const fmt = (key, n) => t(key).replace("{n}", n);                 // UI string with {n}
const L = obj => obj[S.lang];                                     // {ar, en} -> current language

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = s => String(s).replace(/[&<>"']/g, c => HTML_ESCAPES[c]);

/* ---------- Lookups ---------- */
const byId = (list, id) => list.find(x => x.id === id);
const requestFor = programId => S.reqs.find(r => r.id === programId);

/* ---------- Icons (sprite lives in app.html) ---------- */
const icon = (name, size = 20) =>
  `<svg class="i" width="${size}" height="${size}" aria-hidden="true"><use href="#s-${name}"/></svg>`;

/* ---------- Formatting ---------- */
const dateLocale = () => (S.lang === "ar" ? "ar-OM-u-nu-latn" : "en-GB");

function startDate(program) {
  const d = new Date();
  d.setHours(program.h, 0, 0, 0);
  d.setDate(d.getDate() + program.d);
  return d;
}

const formatDate = program =>
  new Intl.DateTimeFormat(dateLocale(), {
    weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit"
  }).format(startDate(program));

const priceText = p => (p.price ? `${p.price} ${t("omr")}` : t("free"));
const levelName = level => t("lv_" + level);
const seatsText = p => (p.seats ? fmt("seats_left", p.seats) : t("full"));

/* ---------- Toast ---------- */
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- Language / document ---------- */
function applyDocumentLanguage() {
  document.documentElement.lang = S.lang;
  document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
  document.title = S.lang === "ar" ? "جرّب سنع | Try Sanni" : "Try Sanni | جرّب سنع";
}
