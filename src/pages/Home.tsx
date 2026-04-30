import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Swords } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div className="section-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
          SYSTÈME D'IDENTIFICATION POKÉMON — RÉGION DE KANTO
        </motion.div>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
          <span className="line outline">POKéDEX</span>
          <span className="line red">KANTO</span>
        </motion.h1>

        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25, ease }}>
          // Encyclopédie de terrain des 151 espèces documentées dans la région de Kanto. Données compilées par le Pr. Chen.
        </motion.p>

        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease }}>
          <Link className="btn btn-primary" to="/liste">
            ACCÉDER AU POKÉDEX
            <ArrowRight size={16} />
          </Link>
          <Link className="btn btn-ghost" to="/battle">
            <Swords size={16} />
            MODE BATTLE
          </Link>
        </motion.div>

        <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <div className="hero-stat">
            <div className="hero-stat-value">151</div>
            <div className="hero-stat-label">Pokémon</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">6</div>
            <div className="hero-stat-label">Stats</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">25</div>
            <div className="hero-stat-label">Zones</div>
          </div>
        </motion.div>
      </div>
      <div className="hero-deco">151</div>
    </section>
  );
};

export default Home;
