import type { Pokemon } from "./types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

let dexPromise: Promise<Pokemon[]> | null = null;

export const loadFullDexClient = (): Promise<Pokemon[]> => {
  if (!dexPromise) {
    dexPromise = fetch(`${basePath}/data/pokedex.json`, {
      cache: "force-cache",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Dex cache unavailable");
        return response.json() as Promise<Pokemon[]>;
      })
      .catch(() => []);
  }

  return dexPromise;
};
