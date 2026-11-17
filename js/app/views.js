/* ============================================================
   Page views: Explore, Providers, Saved, My profile
   Each renderX() replaces the contents of #view.
   ============================================================ */

/* ---------- Tabs & shell ---------- */
const TABS = [
  { id: "explore",   icon: "compass", label: "t_explore" },
  { id: "providers", icon: "build",   label: "t_providers" },
  { id: "saved",     icon: "heart",   label: "t_saved" },
  { id: "me",        icon: "user",    label: "t_me" }
];

function renderTabs() {
  $("#tabs").innerHTML = TABS.map(tab => {
    const current = S.view === tab.id ? 'aria-current="page"' : "";
    const count = tab.id === "saved" && S.favs.length ? `<span class="cnt">${S.favs.length}</span>` : "";
    return `<button class="tab" data-tab="${tab.id}" ${current}>${icon(tab.icon, 20)}<span>${t(tab.label)}</span>${count}</button>`;
  }).join("");
}

const VIEWS = {
  explore: renderExplore,
  providers: renderProviders,
  saved: renderSaved,
  me: renderMe
};

function render() {
  renderTabs();
  VIEWS[S.view]();
  $("#banner").textContent = t("banner");
  $("#aboutLink").textContent = t("about");
  $("#lang").textContent = S.lang === "ar" ? "English" : "العربية";
}

function go(view) {
  S.view = view;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Explore ---------- */
const selectOptions = (items, current, allLabelKey) =>
  `<option value="all">${t(allLabelKey)}</option>` +
  items.map(x => `<option value="${x.id}" ${current === x.id ? "selected" : ""}>${L(x)}</option>`).join("");

const TIME_OPTIONS = ["all", "week", "month", "later"];

function renderExplore() {
  const timeOptions = TIME_OPTIONS
    .map(key => `<option value="${key}" ${S.time === key ? "selected" : ""}>${t("tm_" + key)}</option>`)
    .join("");

  const categoryButtons = CATS
    .map(c => `<button class="cat" data-cat="${c.id}" aria-pressed="${S.cat === c.id}">${icon(c.icon, 18)}${L(c)}</button>`)
    .join("");

  $("#view").innerHTML = `
    ${viewHeader(t("ex_title"), t("ex_sub"))}

    <div class="searchbox ${S.q ? "has" : ""}" id="sbox">
      ${icon("search", 22)}
      <input id="q" type="search" value="${esc(S.q)}" placeholder="${t("search_ph")}"
             aria-label="${t("search_ph")}" autocomplete="off">
      <button class="clear" id="qclear" aria-label="${t("clear")}">${icon("x", 18)}</button>
    </div>

    <div class="catrow" id="cats" role="group" aria-label="${t("f_type")}">
      <button class="cat" data-cat="all" aria-pressed="${S.cat === "all"}">${icon("grid", 18)}${t("all")}</button>
      ${categoryButtons}
    </div>

    <div class="filters">
      <div class="sel"><label for="fgov">${t("f_gov")}</label><select id="fgov">${selectOptions(GOVS, S.gov, "g_all")}</select></div>
      <div class="sel"><label for="ftype">${t("f_type")}</label><select id="ftype">${selectOptions(TYPES, S.type, "ty_all")}</select></div>
      <div class="sel"><label for="ftime">${t("f_time")}</label><select id="ftime">${timeOptions}</select></div>
      <button class="reset" id="reset">${t("reset")}</button>
    </div>

    <div id="provchip"></div>
    <div class="count" id="count" aria-live="polite"></div>
    <div id="results"></div>`;

  refreshExplore();
}

// Updates only the parts that change while typing/filtering (keeps input focus).
function refreshExplore() {
  $("#sbox").classList.toggle("has", !!S.q);
  document.querySelectorAll("#cats .cat")
    .forEach(btn => btn.setAttribute("aria-pressed", btn.dataset.cat === S.cat));

  $("#provchip").innerHTML = S.prov
    ? `<span class="activechip">${fmt("prov_chip", esc(L(byId(PROVIDERS, S.prov))))}
         <button id="provx" aria-label="${t("clear")}">${icon("x", 14)}</button></span>`
    : "";

  const list = PROGRAMS.filter(matches).sort((a, b) => a.d - b.d);   // soonest first
  $("#count").textContent = list.length === 1 ? t("result1") : fmt("results", list.length);
  $("#results").innerHTML = list.length ? programGrid(list) : emptyBox(t("no_res"), t("no_res_d"));
}

/* ---------- Providers ---------- */
// "المدرّبة ريم" -> "ر": avatar uses the first letter of the name without its title.
const providerInitial = provider =>
  L(provider).replace(/^(المدرّبة|المدرّب|Trainer)\s*/, "").charAt(0);

function providerCard(provider) {
  const count = PROGRAMS.filter(p => p.prov === provider.id).length;
  const kind = provider.kind === "org" ? t("pr_org") : t("pr_ind");
  const countText = count === 1 ? t("pr_one") : fmt("pr_prog", count);

  return `
    <div class="prc">
      <div class="row">
        <div class="av">${esc(providerInitial(provider))}</div>
        <div><h3>${esc(L(provider))}</h3><span class="b">${kind}</span></div>
      </div>
      <p>${L(provider.bio)}</p>
      <div class="meta">
        <div>${icon("pin", 16)}${L(byId(GOVS, provider.gov))}</div>
        <div>${icon("cal", 16)}${countText}</div>
      </div>
      <button class="btn btn-ghost" data-prov="${provider.id}">${t("pr_view")}</button>
    </div>`;
}

function renderProviders() {
  $("#view").innerHTML = `
    ${viewHeader(t("pr_title"), t("pr_sub"))}
    <div class="prgrid">${PROVIDERS.map(providerCard).join("")}</div>`;
}

/* ---------- Saved ---------- */
function renderSaved() {
  const saved = PROGRAMS.filter(p => S.favs.includes(p.id));
  const goExplore = `<button class="btn btn-primary" data-tab="explore" style="margin-top:16px">${t("sv_go")}</button>`;

  $("#view").innerHTML =
    viewHeader(t("sv_title"), t("sv_sub")) +
    (saved.length ? programGrid(saved) : emptyBox(t("sv_empty"), t("sv_empty_d"), goExplore));
}

/* ---------- My profile ---------- */
const SKILL_LEVELS = ["beginner", "intermediate", "advanced"];

const levelDots = level => {
  const filled = SKILL_LEVELS.indexOf(level);
  const dots = [0, 1, 2].map(i => `<i class="${i <= filled ? "on" : ""}"></i>`).join("");
  return `<span class="lvl" aria-label="${levelName(level)}">${dots}</span>`;
};

const avatarLetter = name => (name.trim().charAt(0) || "?").toUpperCase();

function skillRow(skill, index) {
  return `
    <div class="skill">
      <b>${esc(skill.name)}</b>${levelDots(skill.level)}<span class="muted">${levelName(skill.level)}</span>
      <button class="xbtn" data-rmskill="${index}" aria-label="${t("clear")}">${icon("x", 16)}</button>
    </div>`;
}

function requestRow(req) {
  const program = byId(PROGRAMS, req.id);
  const accepted = req.status === "accepted";
  const simulate = accepted ? "" : `<button class="btn btn-ghost" data-sim="${req.id}">${t("sim")}</button>`;
  return `
    <div class="req">
      <div class="t"><b>${esc(L(program.t))}</b><small>${formatDate(program)}</small></div>
      <span class="b ${accepted ? "free" : "warn"}">${t("st_" + req.status)}</span>
      ${simulate}
    </div>`;
}

function attendedRow(program) {
  const provider = esc(L(byId(PROVIDERS, program.prov)));
  return `
    <div class="req">
      <div class="t"><b>${esc(L(program.t))}</b><small>${provider} · ${L(byId(CATS, program.cat))}</small></div>
      <span class="b free">${t("st_accepted")}</span>
    </div>`;
}

function renderMe() {
  const attended = S.reqs
    .filter(r => r.status === "accepted")
    .map(r => byId(PROGRAMS, r.id))
    .filter(Boolean);

  const skillsHtml = S.me.skills.length
    ? S.me.skills.map(skillRow).join("")
    : `<p class="muted">${t("sk_empty")}</p>`;

  const requestsHtml = S.reqs.length
    ? S.reqs.map(requestRow).join("") + `<p class="hint" style="margin-top:10px">${t("sim_note")}</p>`
    : `<p class="muted">${t("rq_empty")}</p>`;

  const attendedHtml = attended.length
    ? attended.map(attendedRow).join("")
    : `<p class="muted">${t("at_empty")}</p>`;

  const levelOptions = SKILL_LEVELS.map(l => `<option value="${l}">${levelName(l)}</option>`).join("");

  $("#view").innerHTML = `
    ${viewHeader(t("me_title"), t("me_sub"))}
    <div class="pf">

      <div class="panel wide">
        <div class="me">
          <div class="av">${esc(avatarLetter(S.me.name))}</div>
          <div class="field">
            <label for="mename">${t("me_name")}</label>
            <input id="mename" type="text" value="${esc(S.me.name)}" placeholder="${t("me_name_ph")}" maxlength="40">
          </div>
        </div>
      </div>

      <div class="panel">
        <h2>${t("sk_title")}</h2>
        ${skillsHtml}
        <form class="addrow" id="skform">
          <div class="field">
            <label for="skn">${t("sk_name")}</label>
            <input id="skn" type="text" placeholder="${t("sk_name_ph")}" maxlength="30" required>
          </div>
          <div class="sel"><label for="skl">${t("sk_level")}</label><select id="skl">${levelOptions}</select></div>
          <button class="btn btn-primary" type="submit">${t("sk_add")}</button>
        </form>
      </div>

      <div class="panel"><h2>${t("rq_list")}</h2>${requestsHtml}</div>

      <div class="panel wide"><h2>${t("at_title")}</h2>${attendedHtml}</div>

      <div class="center" style="grid-column:1/-1">
        <button class="reset" id="wipe">${t("reset_all")}</button>
      </div>
    </div>`;
}
