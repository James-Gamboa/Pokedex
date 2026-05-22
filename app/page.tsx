import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PokemonDexClient } from "@/components/pokemon/PokemonDexClient";
import { DEFAULT_FILTER, filterPokemonList } from "@/lib/filters";
import { getServerPokemonCatalog } from "@/lib/pokemon-server";

/** Static export: sin searchParams en servidor; filtros vía URL en el cliente */
const HomePage = async () => {
  const catalog = await getServerPokemonCatalog();
  const initialPokemon = filterPokemonList(catalog, DEFAULT_FILTER);

  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <PokemonDexClient catalog={catalog} initialPokemon={initialPokemon} />
      </Suspense>
    </>
  );
};

export default HomePage;
