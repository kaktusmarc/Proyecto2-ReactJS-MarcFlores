// TheSportsDB - API pública y gratuita, no requiere registro.
// La key "3" es la key de pruebas oficial habilitada por el propio servicio.
const API_KEY = "3";
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// IDs oficiales y fijos de TheSportsDB para las ligas que queremos
// destacar. Pedir por ID es más fiable que buscar por nombre, porque
// no depende de que el texto coincida exactamente.
const FEATURED_LEAGUE_IDS = [
  "4328", // English Premier League
  "4335", // Spanish La Liga
  "4332", // Italian Serie A
  "4331", // German Bundesliga
  "4334", // French Ligue 1
  "4480", // UEFA Champions League
];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error al conectar con la API (${res.status})`);
  }
  return res.json();
}

// Trae el detalle de cada una de las ligas destacadas, en paralelo.
export async function getFeaturedLeagues() {
  const results = await Promise.all(
    FEATURED_LEAGUE_IDS.map((id) =>
      fetchJson(`${BASE_URL}/lookupleague.php?id=${id}`).then(
        (data) => data.leagues?.[0]
      )
    )
  );
  return results.filter(Boolean);
}

// Equipos de una liga concreta.
export async function getTeamsByLeagueName(leagueName) {
  const data = await fetchJson(
    `${BASE_URL}/search_all_teams.php?l=${encodeURIComponent(leagueName)}`
  );
  return data.teams || [];
}

// Próximos partidos de una liga (por id).
export async function getNextEvents(leagueId) {
  const data = await fetchJson(`${BASE_URL}/eventsnextleague.php?id=${leagueId}`);
  return data.events || [];
}

// Clasificación de la liga (no todas las ligas la tienen disponible
// en el plan gratuito sin especificar temporada exacta).
export async function getLeagueTable(leagueId) {
  try {
    const data = await fetchJson(`${BASE_URL}/lookuptable.php?l=${leagueId}`);
    return data.table || [];
  } catch {
    return [];
  }
}