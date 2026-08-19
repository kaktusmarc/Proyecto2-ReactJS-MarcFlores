import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext.jsx";

// Custom hook: en vez de que cada componente escriba
// useContext(FavoritesContext) y tenga que saber que ese contexto
// existe, expone una API simple y además protege de usarlo fuera
// del Provider.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
}
