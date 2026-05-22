import type { PokemonTypeName } from "./types";

/** Clases literales para filtros — evita problemas de cascada con Tailwind */
export const TYPE_BUTTON_CLASS: Record<PokemonTypeName, string> = {
  normal: "btn-header normal",
  fire: "btn-header fire",
  water: "btn-header water",
  grass: "btn-header grass",
  electric: "btn-header electric",
  ice: "btn-header ice",
  fighting: "btn-header fighting",
  poison: "btn-header poison",
  ground: "btn-header ground",
  flying: "btn-header flying",
  psychic: "btn-header psychic",
  bug: "btn-header bug",
  rock: "btn-header rock",
  ghost: "btn-header ghost",
  dark: "btn-header dark",
  dragon: "btn-header dragon",
  steel: "btn-header steel",
  fairy: "btn-header fairy",
};

export const TYPE_BADGE_CLASS: Record<PokemonTypeName, string> = {
  normal: "tipo normal",
  fire: "tipo fire",
  water: "tipo water",
  grass: "tipo grass",
  electric: "tipo electric",
  ice: "tipo ice",
  fighting: "tipo fighting",
  poison: "tipo poison",
  ground: "tipo ground",
  flying: "tipo flying",
  psychic: "tipo psychic",
  bug: "tipo bug",
  rock: "tipo rock",
  ghost: "tipo ghost",
  dark: "tipo dark",
  dragon: "tipo dragon",
  steel: "tipo steel",
  fairy: "tipo fairy",
};

export const FILTER_BUTTONS: {
  id: string;
  label: string;
  className: string;
}[] = [
  { id: "ver-todos", label: "Ver todos", className: "btn-header" },
  { id: "normal", label: "Normal", className: TYPE_BUTTON_CLASS.normal },
  { id: "fire", label: "Fire", className: TYPE_BUTTON_CLASS.fire },
  { id: "water", label: "Water", className: TYPE_BUTTON_CLASS.water },
  { id: "grass", label: "Grass", className: TYPE_BUTTON_CLASS.grass },
  { id: "electric", label: "Electric", className: TYPE_BUTTON_CLASS.electric },
  { id: "ice", label: "Ice", className: TYPE_BUTTON_CLASS.ice },
  { id: "fighting", label: "Fighting", className: TYPE_BUTTON_CLASS.fighting },
  { id: "poison", label: "Poison", className: TYPE_BUTTON_CLASS.poison },
  { id: "ground", label: "Ground", className: TYPE_BUTTON_CLASS.ground },
  { id: "flying", label: "Flying", className: TYPE_BUTTON_CLASS.flying },
  { id: "psychic", label: "Psychic", className: TYPE_BUTTON_CLASS.psychic },
  { id: "bug", label: "Bug", className: TYPE_BUTTON_CLASS.bug },
  { id: "rock", label: "Rock", className: TYPE_BUTTON_CLASS.rock },
  { id: "ghost", label: "Ghost", className: TYPE_BUTTON_CLASS.ghost },
  { id: "dark", label: "Dark", className: TYPE_BUTTON_CLASS.dark },
  { id: "dragon", label: "Dragon", className: TYPE_BUTTON_CLASS.dragon },
  { id: "steel", label: "Steel", className: TYPE_BUTTON_CLASS.steel },
  { id: "fairy", label: "Fairy", className: TYPE_BUTTON_CLASS.fairy },
];
