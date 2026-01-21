import { useEffect, useState } from "react";
import type { Cocktail } from "@/data/cocktails";

interface CocktailCardProps {
  cocktail: Cocktail;
  progress: number; // 0-10
  isComplete: boolean;
  justCompleted: boolean;
}

export const CocktailCard = ({ cocktail, progress, isComplete, justCompleted }: CocktailCardProps) => {
  const [animating, setAnimating] = useState(false);
  const fillPercentage = (progress / 10) * 100;

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
        ${isComplete 
          ? 'unlocked-card ring-2 ring-accent/50' 
          : progress > 0 
            ? 'glass-card ring-1 ring-primary/30' 
            : 'locked-card'
        }
        ${animating ? 'animate-celebrate' : ''}
      `}
    >
      {/* Background Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className={`
            absolute inset-0 w-full h-full object-cover transition-all duration-700
            ${isComplete 
              ? 'scale-105 brightness-110 saturate-125' 
              : progress > 0 
                ? 'brightness-75 saturate-75' 
                : 'brightness-30 saturate-0 blur-sm'
            }
          `}
        />

        {/* Liquid Fill Overlay */}
        {!isComplete && progress > 0 && (
          <div
            className="absolute bottom-0 left-0 right-0 liquid-fill animate-liquid transition-all duration-700"
            style={{ height: `${fillPercentage}%` }}
          />
        )}

        {/* Locked Overlay */}
        {progress === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="text-muted-foreground text-6xl opacity-30">🔒</div>
          </div>
        )}

        {/* Completion Glow */}
        {isComplete && (
          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
        )}

        {/* Progress Badge */}
        <div className={`
          absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold
          transition-all duration-300
          ${isComplete 
            ? 'bg-accent text-accent-foreground' 
            : progress > 0 
              ? 'bg-primary/90 text-primary-foreground' 
              : 'bg-muted/80 text-muted-foreground'
          }
        `}>
          {progress}/10
        </div>
      </div>

      {/* Name Label */}
      <div className={`
        p-4 text-center transition-all duration-500
        ${isComplete 
          ? 'bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20' 
          : 'bg-card/80'
        }
      `}>
        <h3 className={`
          font-display text-xl tracking-wide transition-all duration-500
          ${isComplete 
            ? 'text-accent neon-text-accent' 
            : progress > 0 
              ? 'text-foreground' 
              : 'text-muted-foreground'
          }
        `}>
          {cocktail.name}
        </h3>
      </div>
    </div>
  );
};
