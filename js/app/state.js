/* ============================================================
   State + persistence
   Only favourites, requests and the profile are saved (localStorage).
   Everything else (search text, filters, current tab) resets on reload.
   ============================================================ */

const STORAGE_KEY = "sanni-app";
const LANG_KEY = "sanni-lang";

const S = {
  // UI state (not saved)
  lang: "ar",
  view: "explore",     // explore | providers | saved | me
  q: "",               // search text
  cat: "all",          // category filter
  gov: "all",          // governorate filter
  type: "all",         // programme-type filter
  time: "all",         // all | week | month | later
  prov: null,          // provider filter (set from the Providers tab)

  // Saved state
  favs: [],            // programme ids
  reqs: [],            // { id, status: "pending" | "accepted", ts }
  me: { name: "", skills: [] }   // skills: { name, level }
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    ["favs", "reqs", "me"].forEach(key => { if (saved[key]) S[key] = saved[key]; });
  } catch (e) { /* storage unavailable: start fresh */ }

  try { S.lang = localStorage.getItem(LANG_KEY) || "ar"; } catch (e) {}
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ favs: S.favs, reqs: S.reqs, me: S.me }));
  } catch (e) {}
}

function resetFilters() {
  Object.assign(S, { q: "", cat: "all", gov: "all", type: "all", time: "all", prov: null });
}

loadState();
