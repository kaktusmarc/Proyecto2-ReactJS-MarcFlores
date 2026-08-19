import { Link } from "react-router-dom";
import "./LeagueCard.css";

export default function LeagueCard({ league }) {
  return (
    <Link
      to={`/liga/${league.idLeague}`}
      state={{ leagueName: league.strLeague }}
      className="league-card"
    >
      {league.strBadge ? (
        <img
          src={league.strBadge}
          alt=""
          className="league-card__badge"
          loading="lazy"
        />
      ) : (
        <div className="league-card__badge league-card__badge--placeholder" aria-hidden="true">
          ⚽
        </div>
      )}
      <div>
        <p className="eyebrow">{league.strCountry || "Internacional"}</p>
        <h3 className="league-card__name">{league.strLeague}</h3>
      </div>
    </Link>
  );
}
