/* ============================================================
   Event wiring (one delegated listener per event type)
   Buttons declare what they do with data-* attributes, e.g. data-fav="3".
   ============================================================ */

const CLICK_TARGETS = [
  "[data-tab]", "[data-fav]", "[data-open]", "[data-cat]", "[data-prov]", "[data-req]",
  "[data-back]", "[data-close]", "[data-sim]", "[data-rmskill]",
  "#reset", "#qclear", "#provx", "#wipe", "#lang"
].join(",");

document.addEventListener("click", e => {
  const el = e.target.closest(CLICK_TARGETS);
  if (!el) return;
  const d = el.dataset;

  if (el.id === "lang")   return toggleLanguage();
  if (d.tab)              return go(d.tab);
  if (d.fav)              { e.stopPropagation(); return toggleFav(+d.fav); }
  if (d.close !== undefined) return dlg.close();
  if (d.back)             return openProgram(+d.back);
  if (d.req)              return openProgram(+d.req, "form");
  if (d.open)             return openProgram(+d.open);
  if (d.cat)              { S.cat = d.cat; return refreshExplore(); }
  if (d.prov)             return filterByProvider(d.prov);
  if (d.sim)              return acceptRequest(+d.sim);
  if (d.rmskill)          return removeSkill(+d.rmskill);

  if (el.id === "reset")  { resetFilters(); return renderExplore(); }
  if (el.id === "qclear") { S.q = ""; $("#q").value = ""; $("#q").focus(); return refreshExplore(); }
  if (el.id === "provx")  { S.prov = null; return refreshExplore(); }
  if (el.id === "wipe")   return clearDemoData();
});

// Programme cards are <article role="button">, so Enter/Space must open them.
document.addEventListener("keydown", e => {
  const isActivateKey = e.key === "Enter" || e.key === " ";
  if (isActivateKey && e.target.matches(".pcard")) {
    e.preventDefault();
    openProgram(+e.target.dataset.open);
  }
});

document.addEventListener("input", e => {
  if (e.target.id === "q") {
    S.q = e.target.value;
    refreshExplore();
  }
  if (e.target.id === "mename") {
    S.me.name = e.target.value;
    save();
    const avatar = $(".me .av");
    if (avatar) avatar.textContent = avatarLetter(S.me.name);
  }
});

// Select id -> state key
const FILTER_SELECTS = { fgov: "gov", ftype: "type", ftime: "time" };

document.addEventListener("change", e => {
  const key = FILTER_SELECTS[e.target.id];
  if (key) {
    S[key] = e.target.value;
    refreshExplore();
  }
});

document.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.id === "skform") {
    const name = $("#skn").value.trim();
    if (name) addSkill(name, $("#skl").value);
  } else if (e.target.id === "rqform") {
    submitRequest();
  }
});
