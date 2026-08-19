import { NavLink } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites.js";
import "./Navbar.css";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-dot" aria-hidden="true" />
          MATCHDAY
        </NavLink>

        <nav className="navbar__links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                "navbar__link" + (isActive ? " navbar__link--active" : "")
              }
              end={link.to === "/"}
            >
              {link.label}
              {link.to === "/favoritos" && favorites.length > 0 && (
                <span className="navbar__badge">{favorites.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
