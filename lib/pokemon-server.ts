import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { Pokemon } from "./types";
import { fetchInitialPokemon } from "./pokeapi";

const CACHE_PATH = path.join(process.cwd(), "public", "data", "pokedex.json");

export const getCachedFullDex = cache(async (): Promise<Pokemon[] | null> => {
  try {
    const raw = await readFile(CACHE_PATH, "utf-8");
    return JSON.parse(raw) as Pokemon[];
  } catch {
    return null;
  }
});

export const getServerPokemonCatalog = cache(async (): Promise<Pokemon[]> => {
  const cached = await getCachedFullDex();
  if (cached?.length) return cached;
  return fetchInitialPokemon();
});
