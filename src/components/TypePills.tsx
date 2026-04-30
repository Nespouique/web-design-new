import type { Pokemon } from "../types";
import { getPokemonTypes, slugify } from "../utils";

const TypePills = ({ pokemon }: { pokemon: Pokemon }) => {
  const types = getPokemonTypes(pokemon);
  return (
    <div className="type-row">
      {types.map((type) => (
        <span key={type} className={`type-pill ${slugify(type)}`}>
          {type}
        </span>
      ))}
    </div>
  );
};

export default TypePills;
