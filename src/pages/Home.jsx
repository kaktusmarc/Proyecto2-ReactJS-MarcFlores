import { useState, useMemo } from "react";
import { useFetch } from "../hooks/useFetch.js";
import { getFeaturedLeagues } from "../api/sportsdb.js";
import LeagueCard from "../components/LeagueCard.jsx";
import "./Home.css";

export default function Home() {
  // Estado #1: texto de búsqueda para filtrar ligas en pantalla
  const [query, setQuery] = useState("");

  // useEffect (dentro de useFetch): pide las ligas destacadas a la API
  const { data: leagues, loading, error } = useFetch(getFeaturedLeagues, []);

  // useMemo: filtrar la lista es barato aquí, pero es el sitio
  // correcto para hacerlo si la lista creciera (evita recalcular en
  // cada render si "leagues" no ha cambiado, solo cuando cambia query
  // o los propios datos).
  const filteredLeagues = useMemo(() => {
    if (!leagues) return [];
    if (!query.trim()) return leagues;
    return leagues.filter((l) =>
      l.strLeague.toLowerCase().includes(query.toLowerCase())
    );
  }, [leagues, query]);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">Dashboard no oficial de fútbol</p>
          <h1 className="h-display hero__title">
            El marcador
            <br />
            de tu liga favorita
          </h1>
          <p className="hero__subtitle">
            Ligas, equipos y próximos partidos en un único sitio. Marca tus
            equipos favoritos y síguelos desde cualquier dispositivo.
          </p>
        </div>
      </section>

      <section className="container leagues-section">
        <div className="leagues-section__header">
          <h2 className="h-display leagues-section__title">Ligas destacadas</h2>
          <input
            type="search"
            placeholder="Buscar liga…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="leagues-search"
            aria-label="Buscar liga"
          />
        </div>

        {loading && (
          <div className="leagues-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 88 }} />
            ))}
          </div>
        )}

        {error && (
          <div className="empty-state">
            No se ha podido conectar con la API de fútbol. Inténtalo de nuevo
            en unos segundos.
          </div>
        )}

        {!loading && !error && filteredLeagues.length === 0 && (
          <div className="empty-state">
            No hay ninguna liga que coincida con "{query}".
          </div>
        )}

        {!loading && !error && filteredLeagues.length > 0 && (
          <div className="leagues-grid">
            {filteredLeagues.map((league) => (
              <LeagueCard key={league.idLeague} league={league} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
