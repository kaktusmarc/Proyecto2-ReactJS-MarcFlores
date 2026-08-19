import { createContext, useState, useCallback, useMemo } from "react";

export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // useCallback: esta función se pasa a componentes hijos (TeamCard,
  // memoizados con React.memo). Si se recreara en cada render del
  // Provider, invalidaría el memo de todos los hijos sin necesidad.
  const toggleFavorite = useCallback((team) => {
    setFavorites((prev) => {
      const exists = prev.some((t) => t.idTeam === team.idTeam);
      if (exists) {
        return prev.filter((t) => t.idTeam !== team.idTeam);
      }
      return [...prev, team];
    });
  }, []);

  const isFavorite = useCallback(
    (teamId) => favorites.some((t) => t.idTeam === teamId),
    [favorites]
  );

  // useMemo: evita crear un objeto de contexto nuevo en cada render
  // del Provider, lo que haría re-renderizar a todos los consumidores
  // de useContext aunque los datos no hayan cambiado realmente.
  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
