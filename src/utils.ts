import type { Pokemon } from "./types";

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const getPokemonTypes = (pokemon: Pokemon) => {
  return [pokemon.type1, pokemon.type2].filter(Boolean);
};

export const formatNumber = (value: number) =>
  value.toLocaleString("fr-FR", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
