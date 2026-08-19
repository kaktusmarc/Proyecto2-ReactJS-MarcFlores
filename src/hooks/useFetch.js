import { useState, useEffect } from "react";

// Custom hook que encapsula el patrón "pedir datos, controlar loading
// y error" para no repetirlo en cada página que consulta la API.
// fetchFn debe ser una función que devuelve una promesa.
// deps controla cuándo se repite la petición (igual que en useEffect).
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchFn()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Ha ocurrido un error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Evita "actualizar estado de un componente ya desmontado" si el
    // usuario navega a otra página antes de que responda la API.
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
