/* ============ Language switch ============ */
const html = document.documentElement;
const langBtn = document.getElementById("lang");

function setLang(lang) {
  const d = T[lang];
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = d[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  langBtn.textContent = lang === "ar" ? "English" : "العربية";
  langBtn.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
  document.title = lang === "ar" ? "سنع | Sanni" : "Sanni | سنع";
  try { localStorage.setItem("sanni-lang", lang); } catch (e) {}
}

let saved = "ar";
try { saved = localStorage.getItem("sanni-lang") || "ar"; } catch (e) {}
setLang(saved);
langBtn.addEventListener("click", () => setLang(html.lang === "ar" ? "en" : "ar"));

/* ============ Mobile menu ============ */
const menu = document.getElementById("menu"), links = document.getElementById("links");
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); } });

/* ============ Scroll reveal ============ */
const items = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  items.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
} else items.forEach(el => el.classList.add("in"));
