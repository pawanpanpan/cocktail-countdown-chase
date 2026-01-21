export interface Cocktail {
  id: number;
  name: string;
  image: string;
  color: string;
}

export const cocktails: Cocktail[] = [
  { id: 1, name: "Neon Margarita", image: "/cocktails/margarita.jpg", color: "hsl(120, 70%, 50%)" },
  { id: 2, name: "Electric Martini", image: "/cocktails/martini.jpg", color: "hsl(200, 80%, 60%)" },
  { id: 3, name: "Sunset Mai Tai", image: "/cocktails/maitai.jpg", color: "hsl(25, 90%, 55%)" },
  { id: 4, name: "Negroni Glow", image: "/cocktails/negroni.jpg", color: "hsl(0, 75%, 50%)" },
  { id: 5, name: "Mojito Fresh", image: "/cocktails/mojito.jpg", color: "hsl(140, 65%, 55%)" },
  { id: 6, name: "Cosmic Cosmo", image: "/cocktails/cosmo.jpg", color: "hsl(330, 80%, 55%)" },
  { id: 7, name: "Old Fashioned", image: "/cocktails/oldfashioned.jpg", color: "hsl(35, 85%, 45%)" },
  { id: 8, name: "Blue Lagoon", image: "/cocktails/bluelagoon.jpg", color: "hsl(195, 85%, 55%)" },
  { id: 9, name: "Whiskey Sour", image: "/cocktails/whiskeysour.jpg", color: "hsl(45, 90%, 55%)" },
  { id: 10, name: "Espresso Dream", image: "/cocktails/espresso.jpg", color: "hsl(30, 40%, 30%)" },
];

export const SECRET_DRINK = {
  name: "The Golden Phoenix",
  tagline: "A legendary elixir for those who conquered the night",
};
