import type { FilterId, Pokemon, PokemonTypeName } from "./types";
import { INITIAL_POKEMON_COUNT } from "./pokeapi";

const TYPE_IDS: PokemonTypeName[] = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
];

export const DEFAULT_FILTER: FilterId = "ver-todos";

export const parseFilterFromParam = (
  value: string | null | undefined,
): FilterId => {
  if (!value || value === "ver-todos") return DEFAULT_FILTER;
  if (TYPE_IDS.includes(value as PokemonTypeName)) return value as FilterId;
  return DEFAULT_FILTER;
};

export const filterToParam = (filterId: FilterId): string | null => {
  if (filterId === DEFAULT_FILTER) return null;
  return filterId;
};

export const filterPokemonList = (
  pokemonList: Pokemon[],
  filterId: FilterId,
): Pokemon[] => {
  if (filterId === DEFAULT_FILTER) {
    return pokemonList.filter((pokemon) => pokemon.id <= INITIAL_POKEMON_COUNT);
  }

  return pokemonList.filter((pokemon) =>
    pokemon.types.some((slot) => slot.type.name === filterId),
  );
};

export const getPrimaryType = (pokemon: Pokemon): PokemonTypeName =>
  pokemon.types[0]?.type.name ?? "normal";
