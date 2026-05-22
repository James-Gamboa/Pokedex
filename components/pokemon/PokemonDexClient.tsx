"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Pokemon } from "@/lib/types";
import {
  DEFAULT_FILTER,
  filterPokemonList,
  parseFilterFromParam,
} from "@/lib/filters";
import { loadFullDexClient } from "@/lib/pokemon-data";
import { PokemonCard } from "./PokemonCard";

gsap.registerPlugin(Flip, ScrollTrigger);

const TYPE_GLOW: Record<string, string> = {
  normal: "rgba(168, 168, 120, 0.4)",
  fire: "rgba(240, 128, 48, 0.45)",
  water: "rgba(104, 144, 240, 0.45)",
  grass: "rgba(120, 200, 80, 0.45)",
  electric: "rgba(248, 208, 48, 0.45)",
  ice: "rgba(152, 216, 216, 0.45)",
  fighting: "rgba(192, 48, 40, 0.45)",
  poison: "rgba(160, 64, 160, 0.45)",
  ground: "rgba(224, 192, 104, 0.45)",
  flying: "rgba(168, 144, 240, 0.45)",
  psychic: "rgba(248, 88, 136, 0.45)",
  bug: "rgba(168, 184, 32, 0.45)",
  rock: "rgba(184, 160, 56, 0.45)",
  ghost: "rgba(112, 88, 152, 0.45)",
  dark: "rgba(112, 88, 72, 0.45)",
  dragon: "rgba(112, 56, 248, 0.45)",
  steel: "rgba(184, 184, 208, 0.45)",
  fairy: "rgba(240, 182, 188, 0.45)",
};

const listsMatch = (a: Pokemon[], b: Pokemon[]) =>
  a.length === b.length && a.every((item, index) => item.id === b[index]?.id);

const applyFlipFrom = (state: Flip.FlipState) => {
  Flip.from(state, {
    duration: 0.45,
    ease: "power2.out",
    stagger: 0.02,
    absolute: true,
    onEnter: (elements: Element[]) =>
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.02 },
      ),
    onLeave: (elements: Element[]) =>
      gsap.to(elements, {
        opacity: 0,
        scale: 0.94,
        duration: 0.22,
        stagger: 0.012,
      }),
  });
};

type PokemonDexClientProps = {
  catalog: Pokemon[];
  initialPokemon: Pokemon[];
};

const PokemonDexClient = ({
  catalog: catalogProp,
  initialPokemon,
}: PokemonDexClientProps) => {
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const skipFlipRef = useRef(true);
  const pendingFlipRef = useRef<Flip.FlipState | null>(null);
  const [catalog, setCatalog] = useState<Pokemon[]>(catalogProp);
  const [renderedList, setRenderedList] = useState<Pokemon[]>(initialPokemon);

  const activeFilter = parseFilterFromParam(
    searchParams.get("tipo") ?? DEFAULT_FILTER,
  );

  const targetList = useMemo(
    () => filterPokemonList(catalog, activeFilter),
    [catalog, activeFilter],
  );

  useLayoutEffect(() => {
    if (catalogProp.length >= 500) return;

    loadFullDexClient().then((fullDex) => {
      if (fullDex.length > catalog.length) setCatalog(fullDex);
    });
  }, [catalog.length, catalogProp.length]);

  useLayoutEffect(() => {
    if (listsMatch(renderedList, targetList)) return;

    const grid = gridRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!grid || reduceMotion || skipFlipRef.current) {
      skipFlipRef.current = false;
      pendingFlipRef.current = null;
      setRenderedList(targetList);
      return;
    }

    pendingFlipRef.current = Flip.getState(
      grid.querySelectorAll("[data-pokemon-card]"),
    );
    setRenderedList(targetList);
  }, [targetList, renderedList]);

  useLayoutEffect(() => {
    const flipState = pendingFlipRef.current;
    if (!flipState) return;

    pendingFlipRef.current = null;
    applyFlipFrom(flipState);
  }, [renderedList]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.querySelectorAll("[data-pokemon-card]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const handlePointer = (event: Event) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-pokemon-card]",
      );
      if (!target || !grid.contains(target)) return;

      const type = target.dataset.primaryType ?? "normal";
      const glow = TYPE_GLOW[type] ?? TYPE_GLOW.normal;
      const art = target.querySelector(".pokemon-card__art");
      const sprite = target.querySelector(".pokemon-card__sprite");
      const ring = target.querySelector(".pokemon-card__art-ring");
      const panel = target.querySelector(".pokemon-card__panel");
      const glowLayer = target.querySelector(".pokemon-card__glow");
      const isEnter =
        event.type === "mouseenter" ||
        (event.type === "focusin" && target.matches(":focus-visible"));

      if (isEnter) {
        target.classList.add("is-hovered");
        gsap.to(target, {
          y: -8,
          scale: 1.025,
          duration: 0.35,
          ease: "power2.out",
          boxShadow: `0 22px 48px -12px ${glow}`,
          force3D: true,
        });
        if (glowLayer) gsap.to(glowLayer, { opacity: 1, duration: 0.3 });
        if (sprite) {
          gsap.to(sprite, {
            y: -10,
            scale: 1.06,
            duration: 0.4,
            ease: "power2.out",
            force3D: true,
          });
        }
        if (ring)
          gsap.to(ring, { scale: 1.08, duration: 0.4, ease: "power2.out" });
        if (panel) gsap.to(panel, { y: 3, duration: 0.35, ease: "power2.out" });
        if (art) gsap.to(art, { y: -2, duration: 0.35, ease: "power2.out" });
        return;
      }

      target.classList.remove("is-hovered");
      gsap.to(target, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
      if (glowLayer) gsap.to(glowLayer, { opacity: 0.85, duration: 0.35 });
      if (sprite)
        gsap.to(sprite, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
      if (ring) gsap.to(ring, { scale: 1, duration: 0.4, ease: "power2.out" });
      if (panel) gsap.to(panel, { y: 0, duration: 0.4, ease: "power2.out" });
      if (art) gsap.to(art, { y: 0, duration: 0.4, ease: "power2.out" });
    };

    grid.addEventListener("mouseenter", handlePointer, true);
    grid.addEventListener("mouseleave", handlePointer, true);
    grid.addEventListener("focusin", handlePointer);
    grid.addEventListener("focusout", handlePointer);

    return () => {
      grid.removeEventListener("mouseenter", handlePointer, true);
      grid.removeEventListener("mouseleave", handlePointer, true);
      grid.removeEventListener("focusin", handlePointer);
      grid.removeEventListener("focusout", handlePointer);
    };
  }, [renderedList]);

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    const label =
      activeFilter === DEFAULT_FILTER
        ? "Pokédex"
        : `Pokédex — tipo ${activeFilter.charAt(0).toUpperCase()}${activeFilter.slice(1)}`;

    document.title = label;
    window.scrollTo(0, scrollPositionRef.current);
  }, [activeFilter]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="mx-auto max-w-content px-8 py-8">
      <div id="todos">
        <div
          ref={gridRef}
          className="grid auto-rows-fr grid-cols-1 gap-5 min-[470px]:grid-cols-2 min-[700px]:grid-cols-3 min-[470px]:gap-6"
          id="listaPokemon"
          aria-live="polite"
        >
          {renderedList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </main>
  );
};

export { PokemonDexClient };
