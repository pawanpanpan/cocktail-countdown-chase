export interface Cocktail {
  id: number;
  name: string;
  image: string;
  color: string;
  locked?: boolean; // unlocked at 100 drinks
}

export const cocktails: Cocktail[] = [
  { id: 1, name: "Liquified Caprese", image: "/cocktails/bluelagoon.jpg", color: "hsl(0, 75%, 50%)" },
  { id: 2, name: "Watermelon Milk Punch", image: "/cocktails/cosmo.jpg", color: "hsl(330, 80%, 55%)" },
  { id: 3, name: "Clarified Tiramisu", image: "/cocktails/espresso.jpg", color: "hsl(30, 40%, 30%)" },
  { id: 4, name: "Smoky Coconut", image: "/cocktails/maitai.jpg", color: "hsl(35, 85%, 45%)" },
  { id: 5, name: "Alpine Stone Fruit", image: "/cocktails/margarita.jpg", color: "hsl(25, 90%, 55%)" },
  { id: 6, name: "Pink Gentleman", image: "/cocktails/secret1.jpeg", color: "hsl(340, 70%, 60%)", locked: true },
  { id: 7, name: "Guesspresso Martini", image: "/cocktails/martini.jpg", color: "hsl(0, 75%, 50%)" },
  { id: 8, name: "Elevated Basil Smash", image: "/cocktails/mojito.jpg", color: "hsl(140, 65%, 55%)" },
  { id: 9, name: "Midsummer Slurp", image: "/cocktails/negroni.jpg", color: "hsl(195, 85%, 55%)" },
  { id: 10, name: "PKP", image: "/cocktails/oldfashioned.jpg", color: "hsl(45, 90%, 55%)" },
  { id: 11, name: "Schoolyard Special", image: "/cocktails/whiskeysour.jpg", color: "hsl(120, 70%, 50%)" },
  { id: 12, name: "Il Cacciatore", image: "/cocktails/secret2.jpg", color: "hsl(270, 60%, 40%)", locked: true },
];

export const SECRET_DRINK = {
  name: "The Golden Phoenix",
  tagline: "A legendary elixir for those who conquered the night",
};
