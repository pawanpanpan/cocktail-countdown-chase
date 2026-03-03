import { cocktails } from "@/data/cocktails";
import { useCocktailSync } from "@/hooks/useCocktailSync";
import { Plus, Minus, RotateCcw, Monitor, Ban } from "lucide-react";

const TOTAL_GOAL = 100;

const Admin = () => {
  const {
    cocktailCounts,
    totalDrinksServed,
    mostPopularIndex,
    soldOut,
    increment,
    decrement,
    toggleSoldOut,
    reset,
  } = useCocktailSync();

  const isUnlocked = totalDrinksServed >= TOTAL_GOAL;
  const drinksRemaining = Math.max(0, TOTAL_GOAL - totalDrinksServed);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-display text-foreground">
            Bartender Controls
          </h1>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
          >
            <Monitor className="w-4 h-4" />
            Open Display
          </a>
        </div>

        {/* Progress Summary */}
        <div className="glass-card p-5 rounded-xl mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Total Served</p>
              <p className="text-4xl font-display text-primary">
                {totalDrinksServed} <span className="text-lg text-muted-foreground">/ {TOTAL_GOAL}</span>
              </p>
            </div>
            <div className="text-right">
              {isUnlocked ? (
                <p className="text-accent font-bold">✦ Secret Drinks Unlocked</p>
              ) : (
                <div>
                  <p className="text-muted-foreground text-xs">Until Secret Drinks</p>
                  <p className="text-2xl font-bold text-accent">{drinksRemaining}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${Math.min((totalDrinksServed / TOTAL_GOAL) * 100, 100)}%` }}
            />
          </div>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Cocktail Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cocktails.map((cocktail, index) => {
          const isLocked = cocktail.locked && !isUnlocked;
          const isSold = soldOut[index] || false;

          return (
            <div
              key={cocktail.id}
              className={`
                glass-card rounded-xl overflow-hidden transition-all duration-300
                ${mostPopularIndex === index && !isLocked ? 'ring-2 ring-accent' : ''}
                ${isLocked ? 'opacity-50' : ''}
                ${isSold ? 'opacity-60 grayscale' : ''}
              `}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cocktail.image}
                  alt={cocktail.name}
                  className="w-full h-full object-cover"
                />
                {mostPopularIndex === index && !isLocked && (
                  <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold text-center py-0.5 uppercase tracking-wider">
                    Top
                  </div>
                )}
                {isSold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                    <span className="text-background font-bold text-sm uppercase tracking-wider">Sold Out</span>
                  </div>
                )}
                <div className="absolute bottom-1.5 right-1.5 bg-background/90 px-2.5 py-0.5 rounded-full text-base font-bold text-foreground">
                  {cocktailCounts[index] || 0}
                </div>
              </div>

              {/* Name & Controls */}
              <div className="p-3">
                <h3 className="font-bold text-foreground text-center mb-3 text-sm truncate uppercase tracking-wide">
                  {cocktail.name}
                  {isLocked && " 🔒"}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => decrement(index)}
                    disabled={cocktailCounts[index] === 0 || isLocked}
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label={`Remove ${cocktail.name}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => increment(index)}
                    disabled={isLocked || isSold}
                    className="p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                    aria-label={`Add ${cocktail.name}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => toggleSoldOut(index)}
                    disabled={isLocked}
                    className={`p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      isSold
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive'
                    }`}
                    aria-label={`Toggle sold out for ${cocktail.name}`}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
