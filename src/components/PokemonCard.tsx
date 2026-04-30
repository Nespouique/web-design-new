import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Pokemon } from "../types";
import TypePills from "./TypePills";

const MotionLink = motion(Link);

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <MotionLink
      to={`/fiche/${pokemon.id}`}
      className="card fade-in"
      data-id={`#${pokemon.id}`}
      whileHover={{ y: -4 }}
    >
      <div className="card-header">
        <h3 className="card-title">{pokemon.nom}</h3>
        <span className="card-id">#{pokemon.id}</span>
      </div>
      <div className="card-img-wrapper">
        <img
          src={`/img/${pokemon.id}.png`}
          alt={pokemon.nom}
          loading="lazy"
        />
      </div>
      <TypePills pokemon={pokemon} />
    </MotionLink>
  );
};

export default PokemonCard;
