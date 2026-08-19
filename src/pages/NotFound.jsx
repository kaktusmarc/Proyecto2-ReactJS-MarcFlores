import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "88px 24px", textAlign: "center" }}>
      <p className="eyebrow">Error 404</p>
      <h1 className="h-display" style={{ fontSize: "3rem", margin: "12px 0 20px" }}>
        Fuera de juego
      </h1>
      <p style={{ color: "var(--chalk-dim)", marginBottom: 24 }}>
        Esta página no existe o se ha movido.
      </p>
      <Link to="/" className="btn btn-solid">
        Volver al inicio
      </Link>
    </div>
  );
}
