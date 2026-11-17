/* ============================================================
   Actions: things the user can do (change state, then re-render)
   ============================================================ */

function toggleLanguage() {
  S.lang = S.lang === "ar" ? "en" : "ar";
  try { localStorage.setItem(LANG_KEY, S.lang); } catch (e) {}
  applyDocumentLanguage();
  render();
  if (dlg.open) dlg.close();
}

function toggleFav(id) {
  const index = S.favs.indexOf(id);
  if (index < 0) { S.favs.push(id);       toast(t("toast_sv")); }
  else           { S.favs.splice(index, 1); toast(t("toast_un")); }
  save();
  renderTabs();

  if (S.view === "saved") renderSaved();
  else if (S.view === "explore") refreshExplore();

  // Keep the open dialog's Save button in sync.
  const dialogBtn = dlg.open && dlg.querySelector("[data-fav]");
  if (dialogBtn) {
    const isSaved = S.favs.includes(id);
    dialogBtn.setAttribute("aria-pressed", isSaved);
    dialogBtn.textContent = isSaved ? t("saved") : t("save");
  }
}

function filterByProvider(providerId) {
  resetFilters();
  S.prov = providerId;
  go("explore");
}

function acceptRequest(id) {
  const req = requestFor(id);
  if (!req) return;
  req.status = "accepted";
  save();
  toast(t("toast_acc"));
  renderMe();
}

function addSkill(name, level) {
  S.me.skills.push({ name, level });
  save();
  renderMe();
}

function removeSkill(index) {
  S.me.skills.splice(index, 1);
  save();
  renderMe();
}

function clearDemoData() {
  S.favs = [];
  S.reqs = [];
  S.me = { name: "", skills: [] };
  save();
  renderTabs();
  renderMe();
}

/* Validates the registration form. Returns true if the request was sent. */
function submitRequest() {
  const nameInput = $("#rn");
  const contactInput = $("#rc");
  let valid = true;

  [[nameInput, "#rn-e"], [contactInput, "#rc-e"]].forEach(([input, errorSelector]) => {
    const empty = !input.value.trim();
    $(errorSelector).textContent = empty ? t("err_req") : "";
    input.setAttribute("aria-invalid", empty);
    if (empty) valid = false;
  });

  if (!valid) {
    (nameInput.value.trim() ? contactInput : nameInput).focus();
    return false;
  }

  const programId = +dlg.querySelector("[data-back]").dataset.back;
  S.reqs.push({ id: programId, status: "pending", ts: Date.now() });
  if (!S.me.name) S.me.name = nameInput.value.trim();
  save();
  dlg.close();
  toast(t("toast_req"));
  renderTabs();
  return true;
}
