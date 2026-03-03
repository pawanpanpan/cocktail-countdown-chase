import { useEffect, useState } from "react";
import type { Cocktail } from "@/data/cocktails";
import { Lock } from "lucide-react";

interface CocktailCardProps {
  cocktail: Cocktail;
  count: number;
  isMostPopular: boolean;
  justCompleted: boolean;
  isSoldOut: boolean;
  isLocked: boolean;
}

export const CocktailCard = ({ cocktail, count, isMostPopular, justCompleted, isSoldOut, isLocked }: CocktailCardProps) => {
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
        relative overflow-hidden rounded-lg transition-all duration-500
        ${isLocked ? 'locked-card' : ''}
        ${isMostPopular && !isLocked ? 'ring-2 ring-accent shadow-lg scale-[1.03]' : 'glass-card'}
        ${isSoldOut && !isLocked ? 'grayscale opacity-70' : ''}
        ${animating ? 'animate-celebrate' : ''}
      `}
    >
      {/* Most Popular Badge */}
      {isMostPopular && !isLocked && !isSoldOut && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-accent text-accent-foreground text-center py-1 text-[10px] font-bold uppercase tracking-widest">
          Most Popular
        </div>
      )}

      {/* Sold Out Banner */}
      {isSoldOut && !isLocked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded text-sm font-bold uppercase tracking-widest rotate-[-15deg]">
            Sold Out
          </div>
        </div>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-foreground/60">
          <Lock className="w-8 h-8 text-background mb-2" />
          <p className="text-background text-xs font-bold uppercase tracking-wider">Unlocks at 100</p>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

        {/* Count Badge */}
        {!isLocked && (
          <div className={`
            absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-xs font-bold
            ${isMostPopular
              ? 'bg-accent text-accent-foreground'
              : count > 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }
          `}>
            {count}
          </div>
        )}
      </div>

      {/* Name */}
      <div className="p-3 text-center bg-card">
        <h3 className="font-sans text-sm font-bold tracking-wide text-foreground uppercase">
          {cocktail.name}
        </h3>
      </div>
    </div>
  );
};
