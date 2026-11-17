/* ============================================================
   Programme dialog: details view + registration-request form
   ============================================================ */

const dlg = $("#dlg");
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });   // click on backdrop closes

function dialogHead(program) {
  const type = byId(TYPES, program.type);
  const category = byId(CATS, program.cat);
  const free = program.price ? "" : `<span class="b free">${t("free")}</span>`;
  return `
    <button class="x" data-close aria-label="${t("close")}">${icon("x", 18)}</button>
    <div class="badges"><span class="b">${L(type)}</span><span class="b">${L(category)}</span>${free}</div>
    <h2 id="dlgTitle">${esc(L(program.t))}</h2>`;
}

const fact = (label, value, extra = "") =>
  `<div class="fact" ${extra}><small>${label}</small><b>${value}</b></div>`;

function dialogDetails(program) {
  const provider = byId(PROVIDERS, program.prov);
  const request = requestFor(program.id);
  const isSaved = S.favs.includes(program.id);

  const requestLabel = request ? t("requested") : (program.seats ? t("request") : t("full"));
  const requestDisabled = request || !program.seats ? "disabled" : "";

  return `
    <div class="dlg">
      ${dialogHead(program)}
      <p class="desc">${esc(L(program.desc))}</p>
      <div class="facts">
        ${fact(t("d_when"), formatDate(program))}
        ${fact(t("d_where"), L(byId(GOVS, program.gov)))}
        ${fact(t("d_dur"), L(program.dur))}
        ${fact(t("d_level"), levelName(program.lvl))}
        ${fact(t("d_price"), priceText(program))}
        ${fact(t("d_seats"), seatsText(program))}
        ${fact(t("d_provider"), `${esc(L(provider))} — ${esc(L(provider.bio))}`, 'style="grid-column:1/-1"')}
      </div>
      <div class="dact">
        <button class="btn btn-primary" data-req="${program.id}" ${requestDisabled}>${requestLabel}</button>
        <button class="btn btn-ghost" data-fav="${program.id}" aria-pressed="${isSaved}">${isSaved ? t("saved") : t("save")}</button>
      </div>
    </div>`;
}

function dialogForm(program) {
  const provider = byId(PROVIDERS, program.prov);
  return `
    <div class="dlg">
      ${dialogHead(program)}
      <p class="desc">${t("by")} ${esc(L(provider))}</p>
      <form class="form" id="rqform" novalidate>
        <div class="field">
          <label for="rn">${t("rq_name")}</label>
          <input id="rn" type="text" value="${esc(S.me.name)}" required autocomplete="name">
          <span class="hint" id="rn-e"></span>
        </div>
        <div class="field">
          <label for="rc">${t("rq_contact")}</label>
          <input id="rc" type="text" required>
          <span class="hint" id="rc-e"></span>
        </div>
        <div class="field">
          <label for="rt">${t("rq_note")}</label>
          <textarea id="rt" rows="3"></textarea>
        </div>
        <p class="hint">${t("rq_hint")}</p>
        <div class="dact">
          <button class="btn btn-primary" type="submit">${t("rq_send")}</button>
          <button class="btn btn-ghost" type="button" data-back="${program.id}">${t("back")}</button>
        </div>
      </form>
    </div>`;
}

// mode: "info" (details) or "form" (registration request)
function openProgram(id, mode = "info") {
  const program = byId(PROGRAMS, id);
  dlg.innerHTML = mode === "form" ? dialogForm(program) : dialogDetails(program);
  if (!dlg.open) dlg.showModal();
}
