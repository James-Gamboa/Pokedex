import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explora Pokémon con datos de PokeAPI",
  icons: {
    icon: "/img/pokedex-logo.jpg",
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href={`${basePath}/data/pokedex.json`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${rubik.className} min-h-screen bg-clr-gray antialiased`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
};

export default RootLayout;
