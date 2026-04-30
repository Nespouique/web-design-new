import { useCallback, useMemo, useRef } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import {
  getPokemonById, getEvolutionList, getNextId, getPrevId,
  getZoneLabel, STAT_KEYS, STAT_LABELS, type StatKey,
} from "../data/pokedex";
import TypePills from "../components/TypePills";
import { formatNumber, asset } from "../utils";

const SWIPE_THRESHOLD = 60;

const Fiche = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pokemon = useMemo(() => getPokemonById(id), [id]);
  const touchStartX = useRef<number | null>(null);

  const num = pokemon ? Number(pokemon.id) : 0;
  const hasPrev = num > 1;
  const hasNext = num < 151;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || !pokemon) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > SWIPE_THRESHOLD && hasPrev) {
      navigate(`/fiche/${getPrevId(pokemon.id)}`);
    } else if (diff < -SWIPE_THRESHOLD && hasNext) {
      navigate(`/fiche/${getNextId(pokemon.id)}`);
    }
    touchStartX.current = null;
  }, [pokemon, hasPrev, hasNext, navigate]);

  if (!pokemon) return <Navigate to="/404" replace />;
  const evolutions = getEvolutionList(pokemon.evolutions);
  const hasEvolutions = evolutions.length > 1;
  const zoneText = getZoneLabel(pokemon.zone);
  const hasZones = pokemon.zone[0] !== 0;

  return (
    <section className="section" key={pokemon.id} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Header nav */}
      <div className="fiche-header">
        {hasPrev ? (
          <Link className="btn btn-icon fiche-nav-btn" to={`/fiche/${getPrevId(pokemon.id)}`}>
            <ChevronLeft size={20} />
          </Link>
        ) : <span className="fiche-nav-btn" />}
        <div className="fiche-header-center">
          <div className="fiche-header-name">{pokemon.nom}</div>
          <div className="fiche-header-id">#{pokemon.id}</div>
        </div>
        {hasNext ? (
          <Link className="btn btn-icon fiche-nav-btn" to={`/fiche/${getNextId(pokemon.id)}`}>
            <ChevronRight size={20} />
          </Link>
        ) : <span className="fiche-nav-btn" />}
      </div>

      {/* 2-col grid */}
      <div className="detail-grid">
        {/* Left: showcase (no panel wrapper) */}
        <div className="showcase-column">
          <motion.img
            src={asset(`img/${pokemon.id}.png`)}
            alt={pokemon.nom}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="showcase-img"
          />
          <TypePills pokemon={pokemon} />
          <div className="physical-stats">
            <div className="physical-stat">
              <div className="physical-stat-value">{formatNumber(pokemon.taille)}m</div>
              <div className="physical-stat-label">Taille</div>
            </div>
            <div className="physical-stat">
              <div className="physical-stat-value">{formatNumber(pokemon.poids)}kg</div>
              <div className="physical-stat-label">Poids</div>
            </div>
          </div>
        </div>

        {/* Right: panels */}
        <div style={{ display: "grid", gap: 24 }}>
          <div className="panel">
            <div className="panel-header">Description</div>
            <p style={{ lineHeight: 1.8, color: "var(--white-dim)" }}>{pokemon.description}</p>
          </div>

          <div className="panel">
            <div className="panel-header">Avis Expert</div>
            {pokemon.avis ? (
              <blockquote className="expert-quote">
                <p>{pokemon.avis.citation}</p>
                <footer>{pokemon.avis.auteur} — <cite>{pokemon.avis.ouvrage}</cite></footer>
              </blockquote>
            ) : (
              <p className="text-muted">Aucun expert n'a encore publié d'avis sur ce Pokémon.</p>
            )}
          </div>

          <div className="panel">
            <div className="panel-header">Statistiques</div>
            <div className="stat-bars">
              {STAT_KEYS.map((key: StatKey) => {
                const value = pokemon[key] as number;
                const pct = (value / 255) * 100;
                return (
                  <div className="stat-bar-row" key={key}>
                    <span className="stat-bar-label">{STAT_LABELS[key]}</span>
                    <div className="stat-bar-track">
                      <motion.div
                        className="stat-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      />
                    </div>
                    <span className="stat-bar-value">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="panel map-panel">
        <div className="panel-header">Localisation</div>
        <div className={`map-layer${hasZones ? " has-zones" : ""}`}>
          <img src={asset("data/zones/map.jpg")} alt="Kanto" />
          {hasZones && pokemon.zone.map((z) => (
            <img key={z} className="map-overlay" src={asset(`data/zones/Zone_${z}.png`)} alt={`Zone ${z}`} />
          ))}
        </div>
        <p className="map-zone-text">{zoneText}</p>
      </div>

      {/* Evolutions */}
      <div className="evolution-section">
        <div className="section-eyebrow">Évolutions</div>
        {hasEvolutions ? (
          <div className="evolution-row">
            {evolutions.map((evo, i) => (
              <div key={evo.id} style={{ display: "contents" }}>
                {i > 0 && (
                  <div className="evolution-arrow">
                    <ArrowRight size={16} />
                  </div>
                )}
                <Link
                  to={`/fiche/${evo.id}`}
                  className={`evolution-card${evo.id === pokemon.id ? " is-current" : ""}`}
                >
                  <img src={asset(`img/${evo.id}.png`)} alt={evo.nom} />
                  <h4>{evo.nom}</h4>
                  <TypePills pokemon={evo} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Ce Pokémon ne dispose pas d'évolution.</p>
        )}
      </div>
    </section>
  );
};

export default Fiche;
