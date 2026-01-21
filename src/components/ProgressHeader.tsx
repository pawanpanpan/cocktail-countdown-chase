import { useEffect, useState } from "react";

interface ProgressHeaderProps {
  drinksServed: number;
  totalGoal: number;
  isCelebrating: boolean;
}

export const ProgressHeader = ({ drinksServed, totalGoal, isCelebrating }: ProgressHeaderProps) => {
  const [displayCount, setDisplayCount] = useState(drinksServed);

  // Animated counter
  useEffect(() => {
    if (displayCount !== drinksServed) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => {
          if (prev < drinksServed) return prev + 1;
          if (prev > drinksServed) return prev - 1;
          return prev;
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayCount, drinksServed]);

  const progressPercentage = (drinksServed / totalGoal) * 100;

  return (
    <header className="text-center py-8 px-4">
      <h1 
        className={`
          font-display text-7xl md:text-8xl lg:text-9xl tracking-wider mb-4
          transition-all duration-500
          ${isCelebrating 
            ? 'text-accent neon-text-accent animate-float' 
            : 'text-primary neon-text'
          }
        `}
      >
        COCKTAIL NIGHT
      </h1>

      <div className="max-w-2xl mx-auto">
        <p className="text-2xl md:text-3xl font-display tracking-wide text-foreground/90 mb-6">
          Drinks Served:{" "}
          <span className={`
            inline-block min-w-[3ch] transition-all duration-300
            ${isCelebrating ? 'text-accent' : 'text-primary'}
          `}>
            {displayCount}
          </span>
          <span className="text-muted-foreground"> / {totalGoal}</span>
        </p>

        {/* Progress Bar */}
        <div className="relative h-4 bg-muted rounded-full overflow-hidden">
          <div
            className={`
              absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out
              ${isCelebrating 
                ? 'bg-gradient-to-r from-celebration via-accent to-primary animate-shimmer' 
                : 'bg-gradient-to-r from-primary to-accent'
              }
            `}
            style={{ 
              width: `${progressPercentage}%`,
              backgroundSize: '200% 100%',
            }}
          />
          
          {/* Milestone Markers */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-background/50"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
