# Matchday — Proyecto 2 (ReactJS)

Dashboard de fútbol hecho con **React** y **Vite**. Muestra las principales ligas europeas, sus equipos y próximos partidos, usando la API pública [TheSportsDB](https://www.thesportsdb.com). Se puede marcar equipos como favoritos, que se guardan en memoria durante la sesión.

Lo he hecho para aplicar todo lo visto en el módulo de React: rutas con `react-router-dom`, estados, `useEffect` para pedir datos a una API, `useContext` + custom hook para gestionar los favoritos sin prop drilling, un formulario con `react-hook-form`, y optimización de renders con `React.memo`, `useMemo` y `useCallback`.

## ¿Qué hace exactamente?

- **Inicio**: lista las ligas destacadas (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League), con un buscador para filtrarlas.
- **Liga**: al entrar en una liga, se cargan sus equipos y sus próximos partidos desde la API.
- **Favoritos**: los equipos que marco con ★ desde cualquier liga aparecen aquí, guardados en un Context global.
- **Contacto**: formulario de sugerencias con validaciones (react-hook-form), para proponer que se añada alguna liga o equipo.


## 📁 Estructura

```
src/
├── api/
│   └── sportsdb.js         # funciones que llaman a TheSportsDB
├── context/
│   └── FavoritesContext.jsx
├── hooks/
│   ├── useFavorites.js
│   └── useFetch.js
├── components/
│   ├── Navbar.jsx
│   ├── LeagueCard.jsx
│   ├── TeamCard.jsx
│   └── MatchRow.jsx
├── pages/
│   ├── Home.jsx
│   ├── League.jsx
│   ├── Favorites.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

## 🚀 Cómo arrancarlo

```bash
npm install
npm run dev
```

No hace falta configurar ninguna clave de API: TheSportsDB tiene una key de pruebas pública que funciona directamente sin registro.

