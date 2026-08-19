# ⚽ Matchday — Proyecto 2 (ReactJS)

Dashboard de fútbol hecho con **React** y **Vite**. Muestra las principales ligas europeas, sus equipos y próximos partidos, usando la API pública [TheSportsDB](https://www.thesportsdb.com). Se puede marcar equipos como favoritos, que se guardan en memoria durante la sesión.

Lo he hecho para aplicar todo lo visto en el módulo de React: rutas con `react-router-dom`, estados, `useEffect` para pedir datos a una API, `useContext` + custom hook para gestionar los favoritos sin prop drilling, un formulario con `react-hook-form`, y optimización de renders con `React.memo`, `useMemo` y `useCallback`.

## ¿Qué hace exactamente?

- **Inicio**: lista las ligas destacadas (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League), con un buscador para filtrarlas.
- **Liga**: al entrar en una liga, se cargan sus equipos y sus próximos partidos desde la API.
- **Favoritos**: los equipos que marco con ★ desde cualquier liga aparecen aquí, guardados en un Context global.
- **Contacto**: formulario de sugerencias con validaciones (react-hook-form), para proponer que se añada alguna liga o equipo.

## Dónde está cada requisito del enunciado

| Requisito | Dónde |
|---|---|
| 3+ páginas con react-router-dom | Inicio, Liga (`/liga/:id`), Favoritos, Contacto |
| 3+ estados con sentido | búsqueda de ligas, favoritos, envío del formulario... |
| useEffect para pedir datos | dentro del custom hook `useFetch`, usado en Inicio y Liga |
| Consumo de API | TheSportsDB (ligas, equipos, próximos partidos) |
| Formulario | página Contacto, con `react-hook-form` y validaciones |
| Componentes reutilizables | `LeagueCard`, `TeamCard`, `MatchRow` |
| Evitar re-renders innecesarios | `TeamCard` envuelto en `React.memo`; `useCallback` en las funciones que se le pasan; `useMemo` en el value del Context y en el filtrado de ligas |
| Custom hook | `useFavorites` (acceso al Context) y `useFetch` (peticiones a la API) |
| useContext | `FavoritesContext`, para no pasar los favoritos por props por todo el árbol |

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

No hace falta configurar ninguna clave de API: TheSportsDB tiene una key de pruebas pública (`3`) que funciona directamente sin registro.

## Nota sobre la API

TheSportsDB es una base de datos colaborativa, así que la disponibilidad de datos (sobre todo la clasificación de alguna liga) puede variar. Por eso la página de Liga muestra siempre los equipos y los próximos partidos, que son los datos más fiables, en vez de depender de la tabla de clasificación.
