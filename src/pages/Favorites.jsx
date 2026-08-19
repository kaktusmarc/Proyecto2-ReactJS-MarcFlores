import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites.js";
import TeamCard from "../components/TeamCard.jsx";
import "./Favorites.css";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  const handleToggleFavorite = useCallback(
    (team) => toggleFavorite(team),
    [toggleFavorite]
  );

  return (
    <div className="container favorites-page">
      <h1 className="h-display favorites-page__title">Mis favoritos</h1>
      <p className="favorites-page__subtitle">
        Los equipos que marques con ★ en cualquier liga aparecerán aquí.
      </p>

      {favorites.length === 0 ? (
        <div className="empty-state">
          Todavía no tienes ningún equipo favorito.
          <br />
          <Link to="/" className="btn btn-solid" style={{ marginTop: 16 }}>
            Explorar ligas
          </Link>
        </div>
      ) : (
        <div className="favorites-page__grid">
          {favorites.map((team) => (
            <TeamCard
              key={team.idTeam}
              team={team}
              isFav={true}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
