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
  const [logoVisible, setLogoVisible] = useState(true);

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
    <header className="relative text-center py-4 px-4">
      {/* Admin button - subtle, top-right */}
      <button
        onClick={() => navigate('/admin')}
        className="absolute top-4 right-4 p-2 text-muted-foreground/30 hover:text-muted-foreground transition-colors rounded-full"
        aria-label="Control Panel"
      >
        <Settings size={20} />
      </button>

      {/* Logo: place your logo file at public/logo.png (or .svg/.jpg/.webp) */}
      {logoVisible && (
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto mb-3 max-h-56 w-auto object-contain"
          onError={() => setLogoVisible(false)}
        />
      )}

      {/* Fallback text title shown when no logo is present */}
      {!logoVisible && (
        <>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary mb-1 uppercase tracking-[0.08em]">
            The Thorndike
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-muted-foreground mb-4">
            Speakeasy
          </p>
        </>
      )}

      <div className="max-w-xl mx-auto">
        <p className="text-xl md:text-2xl font-sans text-foreground mb-4">
          DRINKS SERVED:{" "}
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
