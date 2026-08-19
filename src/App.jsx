import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import League from "./pages/League.jsx";
import Favorites from "./pages/Favorites.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/liga/:id" element={<League />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container">
          Proyecto 2 · ReactJS · Datos de{" "}
          <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer">
            TheSportsDB
          </a>
        </div>
      </footer>
    </>
  );
}
