import { Plus, Minus, RotateCcw } from "lucide-react";
import type { Cocktail } from "@/data/cocktails";
import { useState } from "react";

interface AdminControlsProps {
  cocktails: Cocktail[];
  cocktailCounts: number[];
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  onReset: () => void;
  totalDrinksServed: number;
}

export const AdminControls = ({ 
  cocktails, 
  cocktailCounts, 
  onIncrement, 
  onDecrement, 
  onReset, 
  totalDrinksServed 
}: AdminControlsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="glass-card px-6 py-4 rounded-2xl flex flex-col items-center gap-3">
        {/* Cocktail Selector */}
        <div className="flex items-center gap-2 flex-wrap justify-center max-w-xl">
          {cocktails.map((cocktail, index) => (
            <button
              key={cocktail.id}
              onClick={() => setSelectedIndex(index)}
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                ${selectedIndex === index 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }
              `}
            >
              {cocktail.name} ({cocktailCounts[index]})
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onDecrement(selectedIndex)}
            disabled={cocktailCounts[selectedIndex] === 0}
            className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
            aria-label="Remove drink"
          >
            <Minus className="w-6 h-6" />
          </button>

          <button
            onClick={() => onIncrement(selectedIndex)}
            disabled={totalDrinksServed >= 100}
            className="p-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Add drink"
          >
            <Plus className="w-8 h-8" />
          </button>

          <button
            onClick={onReset}
            className="p-3 rounded-full bg-muted hover:bg-destructive/80 text-foreground hover:text-destructive-foreground transition-all duration-200 hover:scale-110"
            aria-label="Reset counter"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
