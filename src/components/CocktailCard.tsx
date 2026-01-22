import { useEffect, useState } from "react";
import type { Cocktail } from "@/data/cocktails";

interface CocktailCardProps {
  cocktail: Cocktail;
  count: number;
  isMostPopular: boolean;
  justCompleted: boolean;
}

export const CocktailCard = ({ cocktail, count, isMostPopular, justCompleted }: CocktailCardProps) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (justCompleted) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [justCompleted]);

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-500
        ${isMostPopular 
          ? 'ring-2 ring-accent shadow-lg shadow-accent/30 scale-105' 
          : 'glass-card ring-1 ring-primary/30'
        }
        ${animating ? 'animate-celebrate' : ''}
      `}
    >
      {/* Most Popular Badge */}
      {isMostPopular && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-accent via-primary to-accent text-center py-1 text-xs font-bold text-accent-foreground uppercase tracking-wider animate-pulse">
          🔥 Most Popular
        </div>
      )}

      {/* Background Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 brightness-110 saturate-125"
        />

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Count Badge */}
        <div className={`
          absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold
          transition-all duration-300
          ${isMostPopular 
            ? 'bg-accent text-accent-foreground' 
            : count > 0 
              ? 'bg-primary/90 text-primary-foreground' 
              : 'bg-muted/80 text-muted-foreground'
          }
        `}>
          {count}
        </div>
      </div>

      {/* Name Label */}
      <div className={`
        p-4 text-center transition-all duration-500
        ${isMostPopular 
          ? 'bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20' 
          : 'bg-card/80'
        }
      `}>
        <h3 className={`
          font-display text-xl tracking-wide transition-all duration-500
          ${isMostPopular 
            ? 'text-accent neon-text-accent' 
            : 'text-foreground'
          }
        `}>
          {cocktail.name}
        </h3>
      </div>
    </div>
  );
};
