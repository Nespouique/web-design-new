import { motion } from "motion/react";
import { asset } from "../utils";

const team = [
  { name: "Richard", img: asset("img/card-richard.jpg") },
  { name: "Emmanuelle", img: asset("img/card-emmanuelle.jpg") },
  { name: "Elliot", img: asset("img/card-elliot.jpg") },
];

const About = () => {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow">// À PROPOS</div>
        <h2 className="section-title">LE <span className="accent">PROJET</span></h2>
      </div>

      <div className="about-grid">
        <div className="panel">
          <div className="panel-header">Mission</div>
          <p style={{ lineHeight: 1.8, color: "var(--white-dim)" }}>
            Ce Pokédex regroupe les 151 Pokémon de la première génération — la région de Kanto.
            Conçu dans le cadre d'un cours de Web-Design, il implémente navigation avancée,
            comparateur de statistiques, cartographie des zones et exploration détaillée de chaque espèce.
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--white-dim)", marginTop: 16 }}>
            Modernisé en 2026 avec React, TypeScript et Vite — le contenu et les données d'origine sont préservés.
          </p>
        </div>

        <div className="panel">
          <div className="panel-header">Organisation</div>
          <p style={{ lineHeight: 1.8, color: "var(--white-dim)" }}>
            L'équipe a collaboré via Git, répartissant les responsabilités entre CSS, logique applicative et données.
            Chaque fonctionnalité a été développée, testée et intégrée de manière itérative.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="section-eyebrow">Équipe</div>
        <img
          src={asset("img/team2.jpg")}
          alt="L'équipe"
          style={{ width: "100%", borderRadius: "var(--r-lg)", marginTop: 16, marginBottom: 24, maxHeight: 320, objectFit: "cover", objectPosition: "center center" }}
        />
        <div className="team-grid">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="team-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <img src={member.img} alt={member.name} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
