"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FILTER_BUTTONS } from "@/lib/pokemon-types";
import {
  DEFAULT_FILTER,
  filterToParam,
  parseFilterFromParam,
} from "@/lib/filters";
import type { FilterId } from "@/lib/types";

const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = parseFilterFromParam(searchParams.get("tipo"));

  const handleFilterClick = useCallback(
    (filterId: FilterId) => {
      if (activeFilter === filterId) return;

      const params = new URLSearchParams(searchParams.toString());
      const param = filterToParam(filterId);

      if (param) params.set("tipo", param);
      else params.delete("tipo");

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;

      router.push(href, { scroll: false });
    },
    [activeFilter, pathname, router, searchParams],
  );

  const handleFilterKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    filterId: FilterId,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleFilterClick(filterId);
  };

  return (
    <ul className="flex flex-wrap items-center gap-2" role="list">
      {FILTER_BUTTONS.map((button) => {
        const isActive =
          activeFilter === button.id ||
          (button.id === DEFAULT_FILTER && activeFilter === DEFAULT_FILTER);

        return (
          <li key={button.id}>
            <button
              type="button"
              id={button.id}
              aria-label={`Filtrar por ${button.label}`}
              aria-pressed={isActive}
              onClick={() => handleFilterClick(button.id as FilterId)}
              onKeyDown={(event) =>
                handleFilterKeyDown(event, button.id as FilterId)
              }
              className={button.className}
            >
              {button.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { FilterBar };
