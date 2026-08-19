import { memo } from "react";
import "./TeamCard.css";

// React.memo: cuando la lista de equipos de una liga se renderiza
// (pueden ser 20 tarjetas), si el usuario marca UN favorito no
// queremos que las otras 19 tarjetas que no cambiaron se vuelvan a
// pintar. React.memo hace que este componente solo se re-renderice
// si sus props (team, isFav) cambian de verdad.
function TeamCard({ team, isFav, onToggleFavorite }) {
  return (
    <article className="team-card">
      {team.strBadge ? (
        <img src={team.strBadge} alt="" className="team-card__badge" loading="lazy" />
      ) : (
        <div className="team-card__badge team-card__badge--placeholder" aria-hidden="true">
          ⚽
        </div>
      )}

      <div className="team-card__body">
        <h3 className="team-card__name">{team.strTeam}</h3>
        <p className="team-card__meta">{team.strStadium || "Estadio no disponible"}</p>
      </div>

      <button
        type="button"
        className={"team-card__fav" + (isFav ? " team-card__fav--active" : "")}
        onClick={() => onToggleFavorite(team)}
        aria-pressed={isFav}
        aria-label={isFav ? `Quitar ${team.strTeam} de favoritos` : `Añadir ${team.strTeam} a favoritos`}
      >
        {isFav ? "★" : "☆"}
      </button>
    </article>
  );
}

export default memo(TeamCard);
