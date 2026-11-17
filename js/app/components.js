/* ============================================================
   Reusable HTML pieces (return strings)
   ============================================================ */

function programBadges(program) {
  const free = program.price ? "" : `<span class="b free">${t("free")}</span>`;
  const full = program.seats ? "" : `<span class="b warn">${t("full")}</span>`;
  return `<span class="b">${L(byId(TYPES, program.type))}</span>${free}${full}`;
}

function programCard(program) {
  const provider = byId(PROVIDERS, program.prov);
  const category = byId(CATS, program.cat);
  const gov = byId(GOVS, program.gov);
  const isSaved = S.favs.includes(program.id);

  return `
    <article class="pcard" data-open="${program.id}" tabindex="0" role="button" aria-label="${esc(L(program.t))}">
      <button class="fav" data-fav="${program.id}" aria-pressed="${isSaved}"
              aria-label="${esc(isSaved ? t("unsave") : t("save"))}">${icon("heart", 20)}</button>

      <div class="ptop">
        <div class="ico">${icon(category.icon, 22)}</div>
        <div class="badges">${programBadges(program)}</div>
      </div>

      <div>
        <h3>${esc(L(program.t))}</h3>
        <div class="prov">${t("by")} ${esc(L(provider))}</div>
      </div>

      <div class="meta">
        <div>${icon("cal", 16)}${formatDate(program)}</div>
        <div>${icon("pin", 16)}${L(gov)}</div>
      </div>

      <div class="pfoot">
        <span>${priceText(program)}</span>
        <span class="b">${levelName(program.lvl)}</span>
      </div>
    </article>`;
}

const viewHeader = (title, subtitle) =>
  `<div class="view-head"><h1>${title}</h1><p>${subtitle}</p></div>`;

const programGrid = programs =>
  `<div class="pgrid">${programs.map(programCard).join("")}</div>`;

const emptyBox = (title, text, buttonHtml = "") => `
  <div class="empty">
    <div class="ico">${icon("search", 26)}</div>
    <b>${title}</b>
    <p>${text}</p>
    ${buttonHtml}
  </div>`;
