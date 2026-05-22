import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const POKEAPI = "https://pokeapi.co/api/v2/pokemon";
const TOTAL = 1118;
const BATCH = 40;

const fetchPokemon = async (id) => {
  const response = await fetch(`${POKEAPI}/${id}`);
  if (!response.ok) return null;
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types,
    sprites: data.sprites,
  };
};

const run = async () => {
  const results = [];

  for (let start = 1; start <= TOTAL; start += BATCH) {
    const end = Math.min(start + BATCH - 1, TOTAL);
    const batch = await Promise.all(
      Array.from({ length: end - start + 1 }, (_, index) =>
        fetchPokemon(start + index),
      ),
    );
    results.push(...batch.filter(Boolean));
    console.log(`Cached ${results.length}/${TOTAL}`);
  }

  const outDir = path.join(process.cwd(), "public", "data");
  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "pokedex.json"),
    JSON.stringify(results),
    "utf-8",
  );

  console.log(`Wrote ${results.length} Pokémon to public/data/pokedex.json`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
