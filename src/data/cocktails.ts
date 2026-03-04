export interface Cocktail {
  id: number;
  name: string;
  image: string;
  color: string;
  locked?: boolean; // unlocked at 100 drinks
}

export const cocktails: Cocktail[] = [
  { id: 1, name: "Liquified Caprese", image: "/cocktails/Liquified Caprese.jpg", color: "hsl(0, 75%, 50%)" },
  { id: 2, name: "Watermelon Milk Punch", image: "/cocktails/Watermelon Milk Punch.jpg", color: "hsl(330, 80%, 55%)" },
  { id: 3, name: "Clarified Tiramisu", image: "/cocktails/Clarified Tiramisu.jpg", color: "hsl(30, 40%, 30%)" },
  { id: 4, name: "Smoky Coconut", image: "/cocktails/Smoky Coconut.jpg", color: "hsl(35, 85%, 45%)" },
  { id: 5, name: "Alpine Stone Fruit", image: "/cocktails/Alpine Stone Fruit.jpg", color: "hsl(25, 90%, 55%)" },
  { id: 6, name: "Pink Gentleman", image: "/cocktails/Pink Gentleman.jpg", color: "hsl(340, 70%, 60%)", locked: true },
  { id: 7, name: "Guesspresso Martini", image: "/cocktails/Guesspresso Martini.jpg", color: "hsl(0, 75%, 50%)" },
  { id: 8, name: "Elevated Basil Smash", image: "/cocktails/Elevated Basil Smash.jpg", color: "hsl(140, 65%, 55%)" },
  { id: 9, name: "Midsummer Slurp", image: "/cocktails/Midsummer Slurp.jpg", color: "hsl(195, 85%, 55%)" },
  { id: 10, name: "PKP", image: "/cocktails/PKP.jpg", color: "hsl(45, 90%, 55%)" },
  { id: 11, name: "Schoolyard Special", image: "/cocktails/Schoolyard Special.jpg", color: "hsl(120, 70%, 50%)" },
  { id: 12, name: "Il Cacciatore", image: "/cocktails/Il Cacciatore.jpg", color: "hsl(270, 60%, 40%)", locked: true },
];

export const SECRET_DRINK = {
  name: "The Golden Phoenix",
  tagline: "A legendary elixir for those who conquered the night",
};
