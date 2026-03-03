import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

interface ProgressHeaderProps {
  drinksServed: number;
  totalGoal: number;
  isCelebrating: boolean;
}

export const ProgressHeader = ({ drinksServed, totalGoal, isCelebrating }: ProgressHeaderProps) => {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(drinksServed);

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

  const progressPercentage = Math.min((drinksServed / totalGoal) * 100, 100);

  return (
    <header className="relative text-center py-8 px-4">
      {/* Admin button - subtle, top-right */}
      <button
        onClick={() => navigate('/admin')}
        className="absolute top-4 right-4 p-2 text-muted-foreground/30 hover:text-muted-foreground transition-colors rounded-full"
        aria-label="Control Panel"
      >
        <Settings size={20} />
      </button>

      {/* Logo */}
      <div className="mb-2 flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary flex items-center justify-center">
          <span className="font-display text-2xl md:text-3xl text-primary">T</span>
        </div>
      </div>

      <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-primary mb-1 uppercase">
        The Thorndike
      </h1>
      <p className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-6">
        Speakeasy
      </p>

      <div className="max-w-xl mx-auto">
        <p className="text-xl md:text-2xl font-sans text-foreground mb-4">
          Drinks Served:{" "}
          <span className={`font-bold ${isCelebrating ? 'text-accent' : 'text-primary'}`}>
            {displayCount}
          </span>
          <span className="text-muted-foreground"> / {totalGoal}</span>
        </p>

        {/* Progress Bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out bg-primary"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </header>
  );
};
