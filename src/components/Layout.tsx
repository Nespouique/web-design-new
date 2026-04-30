import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List, Swords, Info, Music } from "lucide-react";
import { motion } from "motion/react";
import { asset } from "../utils";

const NAV_ITEMS = [
  { to: "/liste", label: "Liste", icon: List },
  { to: "/battle", label: "Battle", icon: Swords },
  { to: "/about", label: "À propos", icon: Info },
] as const;

const NavItem = ({ to, label, icon: Icon, onClick }: { to: string; label: string; icon: React.ElementType; onClick?: () => void }) => (
  <NavLink to={to} onClick={onClick} className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}>
    <Icon size={14} />
    {label}
  </NavLink>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const close = () => setMenuOpen(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    close();
    setGlitching(true);
    const t = setTimeout(() => setGlitching(false), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <div className={`glitch-line${glitching ? " active" : ""}`} />
      <header className={`nav${isHome ? " nav-hidden" : ""}`}>
        <NavLink to="/" className="brand" onClick={close}>Pokédex</NavLink>
        {/* Desktop links — inside header */}
        <nav className="nav-desktop">
          {NAV_ITEMS.map(item => (
            <NavItem key={item.to} to={item.to} label={item.label} icon={item.icon} />
          ))}
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu" aria-expanded={menuOpen}>
          <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
          <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
          <span className={`hamburger-bar${menuOpen ? " open" : ""}`} />
        </button>
      </header>
      {/* Mobile overlay — outside header to avoid backdrop-filter containment */}
      <nav className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <NavItem key={item.to} to={item.to} label={item.label} icon={item.icon} onClick={close} />
        ))}
      </nav>
      <motion.main className="layout" key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
        {children}
      </motion.main>
      <footer className="footer">
        <button className={`footer-quote${isPlaying ? " is-playing" : ""}`} onClick={toggleAudio}>
          <Music size={14} />
          "Un jour je serai le meilleur dresseur"
          <Music size={14} />
        </button>
        <div className="footer-copy">POKÉDEX KANTO — 2026</div>
        <audio ref={audioRef} preload="auto" loop onEnded={() => setIsPlaying(false)}>
          <source src={asset("data/le_meilleur_dresseur.mp3")} type="audio/mp3" />
        </audio>
      </footer>
    </div>
  );
};

export default Layout;
