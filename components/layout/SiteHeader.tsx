import Image from "next/image";
import { Suspense } from "react";
import { FilterBar } from "@/components/filters/FilterBar";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const SiteHeader = () => {
  return (
    <header className="py-4 shadow-[0_0_2rem_-1rem_rgba(0,0,0,0.5)]">
      <nav
        className="mx-auto flex max-w-content flex-col items-start gap-4 px-8"
        aria-label="Navegación principal"
      >
        <Image
          src={`${basePath}/img/logo.png`}
          alt="Logo Pokédex"
          width={200}
          height={80}
          priority
          className="h-auto w-auto max-w-[200px]"
        />
        <Suspense
          fallback={<div className="h-9 w-full max-w-content" aria-hidden />}
        >
          <FilterBar />
        </Suspense>
      </nav>
    </header>
  );
};

export { SiteHeader };
