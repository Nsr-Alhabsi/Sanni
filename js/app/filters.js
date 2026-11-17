/* ============================================================
   Explore filtering
   ============================================================ */

// Max days from today for each "When" option ("later" is everything beyond a month).
const TIME_LIMIT_DAYS = { week: 7, month: 31 };

function matchesTime(program) {
  if (S.time === "all") return true;
  if (S.time === "later") return program.d > TIME_LIMIT_DAYS.month;
  return program.d <= TIME_LIMIT_DAYS[S.time];
}

// All searchable text for a programme, in both languages.
function searchText(program) {
  const provider = byId(PROVIDERS, program.prov);
  const category = byId(CATS, program.cat);
  const gov = byId(GOVS, program.gov);
  const type = byId(TYPES, program.type);
  return [
    program.t.ar, program.t.en, program.desc.ar, program.desc.en,
    provider.ar, provider.en, category.ar, category.en,
    gov.ar, gov.en, type.ar, type.en
  ].join(" ").toLowerCase();
}

function matchesQuery(program) {
  const query = S.q.trim().toLowerCase();
  if (!query) return true;
  const text = searchText(program);
  return query.split(/\s+/).every(word => text.includes(word));   // every word must appear
}

function matches(program) {
  if (S.cat !== "all" && program.cat !== S.cat) return false;
  if (S.gov !== "all" && program.gov !== S.gov) return false;
  if (S.type !== "all" && program.type !== S.type) return false;
  if (S.prov && program.prov !== S.prov) return false;
  return matchesTime(program) && matchesQuery(program);
}
