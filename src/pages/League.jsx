import { useCallback, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { useFavorites } from "../hooks/useFavorites.js";
import { getTeamsByLeagueName, getNextEvents } from "../api/sportsdb.js";
import TeamCard from "../components/TeamCard.jsx";
import MatchRow from "../components/MatchRow.jsx";
import "./League.css";

export default function League() {
  const { id } = useParams();
  const location = useLocation();
  // El nombre de la liga viaja en el state de la navegación (desde
  // LeagueCard) para no tener que pedirlo otra vez a la API.
  const leagueName = location.state?.leagueName;

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // useEffect #1 (vía useFetch): equipos de la liga
  const {
    data: teams,
    loading: loadingTeams,
    error: errorTeams,
  } = useFetch(() => getTeamsByLeagueName(leagueName), [leagueName]);

  // useEffect #2 (vía useFetch): próximos partidos de la liga
  const { data: events, loading: loadingEvents } = useFetch(
    () => getNextEvents(id),
    [id]
  );

  // useCallback: se pasa como prop a cada TeamCard (memoizado). Sin
  // esto, cada render de League crearía una función "toggle" distinta
  // y anularía el React.memo de TODAS las tarjetas de equipo.
  const handleToggleFavorite = useCallback(
    (team) => toggleFavorite(team),
    [toggleFavorite]
  );

  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f.idTeam)), [favorites]);

  return (
    <div className="container league-page">
      <Link to="/" className="league-page__back">
        ← Volver a las ligas
      </Link>

      <h1 className="h-display league-page__title">{leagueName || "Liga"}</h1>

      <div className="league-page__grid">
        <section>
          <h2 className="league-page__section-title">Equipos</h2>

          {loadingTeams && (
            <div className="league-page__teams-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 74 }} />
              ))}
            </div>
          )}

          {errorTeams && (
            <div className="empty-state">
              No se han podido cargar los equipos de esta liga.
            </div>
          )}

          {!loadingTeams && !errorTeams && (!teams || teams.length === 0) && (
            <div className="empty-state">
              Esta liga no tiene equipos disponibles en la API todavía.
            </div>
          )}

          {!loadingTeams && teams && teams.length > 0 && (
            <div className="league-page__teams-grid">
              {teams.map((team) => (
                <TeamCard
                  key={team.idTeam}
                  team={team}
                  isFav={favoriteIds.has(team.idTeam)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        <aside>
          <h2 className="league-page__section-title">Próximos partidos</h2>
          <div className="panel">
            {loadingEvents && (
              <div style={{ padding: 16 }}>
                <div className="skeleton" style={{ height: 16, marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 16, marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 16 }} />
              </div>
            )}

            {!loadingEvents && (!events || events.length === 0) && (
              <div className="empty-state" style={{ border: "none" }}>
                No hay partidos programados por ahora.
              </div>
            )}

            {!loadingEvents &&
              events &&
              events.slice(0, 8).map((event) => (
                <MatchRow key={event.idEvent} event={event} />
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
