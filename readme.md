# Pokédex

Catálogo de Pokémon con datos de [PokeAPI](https://pokeapi.co/). Filtra por tipo y explora la lista.

## Stack

Next.js 16 · React 19 · Tailwind CSS · pnpm

## Uso

```bash
pnpm install
pnpm dev
```

```bash
pnpm build    # genera caché + export estático → out/
pnpm lint
pnpm typecheck
```

Filtros por URL: `/?tipo=fire` (compartible).  
Para GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/Pokedex pnpm build`