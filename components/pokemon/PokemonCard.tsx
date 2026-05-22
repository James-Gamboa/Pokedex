import Image from "next/image";
import type { Pokemon } from "@/lib/types";
import { formatPokemonId } from "@/lib/pokeapi";
import { getPrimaryType } from "@/lib/filters";
import type { PokemonTypeName } from "@/lib/types";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const pokeId = formatPokemonId(pokemon.id);
  const primaryType = getPrimaryType(pokemon);
  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ??
    "/img/pokedex-logo.jpg";

  return (
    <article
      data-pokemon-card
      data-pokemon-id={pokemon.id}
      data-primary-type={primaryType}
      tabIndex={0}
      aria-label={`${pokemon.name}, número ${pokeId}, tipo ${pokemon.types.map((t) => t.type.name).join(" y ")}`}
      className="pokemon-card group"
    >
      <div className="pokemon-card__glow" aria-hidden="true" />
      <div className="pokemon-card__pattern" aria-hidden="true" />
      <p className="pokemon-card__bg-id" aria-hidden="true">
        #{pokeId}
      </p>

      <span className="pokemon-card__id">#{pokeId}</span>

      <div className="pokemon-card__art">
        <div className="pokemon-card__art-ring" aria-hidden="true" />
        <Image
          src={artwork}
          alt=""
          width={160}
          height={160}
          className="pokemon-card__sprite"
          loading="lazy"
          aria-hidden
        />
      </div>

      <div className="pokemon-card__panel">
        <header className="pokemon-card__header">
          <h2 className="pokemon-card__name">{pokemon.name}</h2>
        </header>

        <div className="pokemon-card__types">
          {pokemon.types.map((slot) => {
            const typeName = slot.type.name as PokemonTypeName;
            return (
              <span key={typeName} className={`tipo ${typeName}`}>
                {typeName}
              </span>
            );
          })}
        </div>

        <dl className="pokemon-card__stats">
          <div className="pokemon-card__stat">
            <dt>Altura</dt>
            <dd>{pokemon.height} m</dd>
          </div>
          <div className="pokemon-card__stat">
            <dt>Peso</dt>
            <dd>{pokemon.weight} kg</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export { PokemonCard };
