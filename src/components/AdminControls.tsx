import { Plus, Minus, RotateCcw } from "lucide-react";

interface AdminControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  drinksServed: number;
}

export const AdminControls = ({ onIncrement, onDecrement, onReset, drinksServed }: AdminControlsProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="glass-card px-6 py-4 rounded-full flex items-center gap-4">
        <button
          onClick={onDecrement}
          disabled={drinksServed === 0}
          className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
          aria-label="Remove drink"
        >
          <Minus className="w-6 h-6" />
        </button>

        <button
          onClick={onIncrement}
          disabled={drinksServed >= 100}
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
  );
};
