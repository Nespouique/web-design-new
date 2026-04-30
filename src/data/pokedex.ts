import rawPokedex from "../../data/pokAPI.json";
import rawComments from "../../data/comment.json";
import type { CommentEntry, Pokemon } from "../types";

export const pokedex = rawPokedex as Pokemon[];
export const baseComments = rawComments as CommentEntry[];

const STAT_KEYS_INTERNAL = [
  "pv",
  "attaque",
  "defense",
  "attaqueSpe",
  "defenseSpe",
  "vitesse",
] as const;

export type StatKey = (typeof STAT_KEYS_INTERNAL)[number];

export const STAT_KEYS = STAT_KEYS_INTERNAL;

export const STAT_LABELS: Record<StatKey, string> = {
  pv: "PV",
  attaque: "Attaque",
  defense: "Défense",
  attaqueSpe: "Att. Spé",
  defenseSpe: "Déf. Spé",
  vitesse: "Vitesse",
};

export const getPokemonById = (id?: string) =>
  pokedex.find((pokemon) => pokemon.id === id);

export const getEvolutionList = (ids: string[]) =>
  ids.map((id) => getPokemonById(id)).filter(Boolean) as Pokemon[];

export const formatId = (id: number) => id.toString().padStart(3, "0");

export const getNextId = (id: string) => {
  const num = Number(id);
  if (num >= 151) return "151";
  return formatId(num + 1);
};

export const getPrevId = (id: string) => {
  const num = Number(id);
  if (num <= 1) return "001";
  return formatId(num - 1);
};

export const getZoneLabel = (zones: number[]) => {
  if (!zones.length || zones[0] === 0) {
    return "Ce Pokémon n'a pas de zone prédéfinie, alors bon courage pour le trouver...";
  }
  if (zones.length === 1) {
    return `Zone ${zones[0]}`;
  }
  return `Zones ${zones.join(", ")}`;
};
