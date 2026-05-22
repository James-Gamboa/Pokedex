import type { FilterId, Pokemon, PokemonTypeName } from "./types";

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";

export const INITIAL_POKEMON_COUNT = 251;
export const FULL_POKEDEX_COUNT = 1118;

export const formatPokemonId = (id: number): string => {
  const raw = id.toString();
  if (raw.length === 1) return `00${raw}`;
  if (raw.length === 2) return `0${raw}`;
  return raw;
};

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${POKEAPI_BASE}/${id}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon #${id}`);
  }

  return response.json() as Promise<Pokemon>;
};

export const fetchPokemonRange = async (
  from: number,
  to: number,
): Promise<Pokemon[]> => {
  const ids = Array.from({ length: to - from + 1 }, (_, index) => from + index);
  const results = await Promise.all(
    ids.map((id) => fetchPokemonById(id).catch(() => null)),
  );
  return results.filter((pokemon): pokemon is Pokemon => pokemon !== null);
};

export const fetchInitialPokemon = (): Promise<Pokemon[]> =>
  fetchPokemonRange(1, INITIAL_POKEMON_COUNT);

export const matchesFilter = (
  pokemon: Pokemon,
  filterId: FilterId,
): boolean => {
  if (filterId === "ver-todos") return true;
  return pokemon.types.some((slot) => slot.type.name === filterId);
};

export const filterPokemonByType = (
  pokemonList: Pokemon[],
  filterId: FilterId,
): Pokemon[] => {
  if (filterId === "ver-todos") return pokemonList;
  return pokemonList.filter((pokemon) => matchesFilter(pokemon, filterId));
};

export const isPokemonTypeName = (value: string): value is PokemonTypeName =>
  [
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
  ].includes(value);
