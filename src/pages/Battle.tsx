import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Swords } from "lucide-react";
import { pokedex, getPokemonById, STAT_KEYS, STAT_LABELS } from "../data/pokedex";
import type { StatKey } from "../data/pokedex";
import StatRadar from "../components/StatRadar";
import TypePills from "../components/TypePills";

const Battle = () => {
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");

  const pokemon1 = useMemo(() => getPokemonById(id1), [id1]);
  const pokemon2 = useMemo(() => getPokemonById(id2), [id2]);

  const radarEntries = useMemo(() => {
    const entries = [];
    if (pokemon1) entries.push({ pokemon: pokemon1, colorIndex: 0 });
    if (pokemon2) entries.push({ pokemon: pokemon2, colorIndex: 1 });
    return entries;
  }, [pokemon1, pokemon2]);

  const bothSelected = pokemon1 && pokemon2;

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow"><Swords size={14} /> MODE COMBAT</div>
        <h2 className="section-title">BATTLE <span className="accent">ARENA</span></h2>
        <p className="section-subtitle">Sélectionnez deux combattants et comparez leurs statistiques.</p>
      </div>

      <div className="battle-arena">
        <div className="battle-selectors">
          <div className="battle-corner red">
            <select className="select" value={id1} onChange={(e) => setId1(e.target.value)}>
              <option value="">— Combattant 1 —</option>
              {pokedex.map((p) => (
                <option key={p.id} value={p.id}>#{p.id} {p.nom}</option>
              ))}
            </select>
            {pokemon1 && (
              <Link to={`/fiche/${pokemon1.id}`} className="battle-pokemon-link">
                <motion.img
                  src={`/img/${pokemon1.id}.png`}
                  alt={pokemon1.nom}
                  style={{ maxHeight: 160, margin: "20px auto 0", display: "block" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  key={pokemon1.id}
                />
                <h3>{pokemon1.nom}</h3>
                <TypePills pokemon={pokemon1} />
              </Link>
            )}
          </div>

          <div className="battle-vs">
            <span className="battle-vs-text">VS</span>
          </div>

          <div className="battle-corner blue">
            <select className="select" value={id2} onChange={(e) => setId2(e.target.value)}>
              <option value="">— Combattant 2 —</option>
              {pokedex.map((p) => (
                <option key={p.id} value={p.id}>#{p.id} {p.nom}</option>
              ))}
            </select>
            {pokemon2 && (
              <Link to={`/fiche/${pokemon2.id}`} className="battle-pokemon-link">
                <motion.img
                  src={`/img/${pokemon2.id}.png`}
                  alt={pokemon2.nom}
                  style={{ maxHeight: 160, margin: "20px auto 0", display: "block" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  key={pokemon2.id}
                />
                <h3>{pokemon2.nom}</h3>
                <TypePills pokemon={pokemon2} />
              </Link>
            )}
          </div>
        </div>

        {bothSelected && (
          <>
            <div className="battle-comparison">
              {STAT_KEYS.map((key: StatKey) => {
                const val1 = pokemon1[key] as number;
                const val2 = pokemon2[key] as number;
                const pct1 = (val1 / 255) * 100;
                const pct2 = (val2 / 255) * 100;
                return (
                  <div className="battle-stat-row" key={key}>
                    <span className="battle-value left">{val1}</span>
                    <div className="battle-bar-left">
                      <motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${pct1}%` }} transition={{ duration: 0.6 }} />
                    </div>
                    <span className="battle-stat-label">{STAT_LABELS[key]}</span>
                    <div className="battle-bar-right">
                      <motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${pct2}%` }} transition={{ duration: 0.6 }} />
                    </div>
                    <span className="battle-value right">{val2}</span>
                  </div>
                );
              })}
            </div>

            <div className="battle-radar">
              <div className="panel-header">Radar Comparatif</div>
              <div className="battle-radar-chart">
                <StatRadar entries={radarEntries} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Battle;
