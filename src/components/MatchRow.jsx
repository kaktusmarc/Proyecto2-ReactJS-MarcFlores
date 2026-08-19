import "./MatchRow.css";

export default function MatchRow({ event }) {
  const date = event.dateEvent
    ? new Date(event.dateEvent).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
      })
    : "Fecha TBD";

  return (
    <div className="match-row">
      <span className="match-row__date mono-score">{date}</span>
      <span className="match-row__team match-row__team--home">{event.strHomeTeam}</span>
      <span className="match-row__score mono-score">
        {event.intHomeScore ?? "–"} : {event.intAwayScore ?? "–"}
      </span>
      <span className="match-row__team">{event.strAwayTeam}</span>
    </div>
  );
}
