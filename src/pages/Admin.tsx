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
    <div className="h-screen overflow-hidden bg-background p-2 md:p-3 flex flex-col">
      {/* Header — compact, fixed height */}
      <div className="w-full max-w-5xl mx-auto shrink-0 mb-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-display text-foreground tracking-tight">
            Bartender Controls
          </h1>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs"
          >
            <Monitor className="w-3.5 h-3.5" />
            Open Display
          </a>
        </div>

        {/* Progress — single compact row */}
        <div className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-4 mb-2">
          <div className="shrink-0">
            <p className="text-muted-foreground text-[10px] uppercase tracking-wider leading-none mb-0.5">Total Served</p>
            <p className="text-2xl font-display text-primary leading-none">
              {totalDrinksServed}
              <span className="text-xs text-muted-foreground ml-1">/ {TOTAL_GOAL}</span>
            </p>
          </div>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${Math.min((totalDrinksServed / TOTAL_GOAL) * 100, 100)}%` }}
            />
          </div>
          <div className="shrink-0 text-right">
            {isUnlocked ? (
              <p className="text-accent font-bold text-xs">✦ Unlocked!</p>
            ) : (
              <>
                <p className="text-muted-foreground text-[10px] leading-none mb-0.5">Until Secret</p>
                <p className="text-xl font-bold text-accent leading-none">{drinksRemaining}</p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-xs"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Cocktail Grid — fills remaining space, no scroll */}
      <div className="flex-1 min-h-0 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 h-full" style={{ gridTemplateRows: "repeat(3, 1fr)" }}>
          {cocktails.map((cocktail, index) => {
            const isLocked = cocktail.locked && !isUnlocked;
            const isSold = soldOut[index] || false;

            return (
              <div
                key={cocktail.id}
                className={`
                  glass-card rounded-xl overflow-hidden transition-all duration-300 flex flex-col min-h-0
                  ${mostPopularIndex === index && !isLocked ? 'ring-2 ring-accent' : ''}
                  ${isLocked ? 'opacity-50' : ''}
                  ${isSold ? 'opacity-60 grayscale' : ''}
                `}
              >
                {/* Image — fills available space */}
                <div className="relative flex-1 min-h-0 overflow-hidden">
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    className="w-full h-full object-cover"
                  />
                  {mostPopularIndex === index && !isLocked && (
                    <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-[9px] font-bold text-center py-0.5 uppercase tracking-wider">
                      Top
                    </div>
                  )}
                  {isSold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                      <span className="text-background font-bold text-xs uppercase tracking-wider">Sold Out</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-background/90 px-2 py-0.5 rounded-full text-sm font-bold text-foreground leading-none">
                    {cocktailCounts[index] || 0}
                  </div>
                </div>

                {/* Name & Controls — fixed height, compact */}
                <div className="shrink-0 px-2 py-1.5">
                  <p className="font-bold text-foreground text-center text-[10px] truncate uppercase tracking-wide mb-1.5">
                    {cocktail.name}
                    {isLocked && " 🔒"}
                  </p>

                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => decrement(index)}
                      disabled={cocktailCounts[index] === 0 || isLocked}
                      className="p-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label={`Remove ${cocktail.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => increment(index)}
                      disabled={isLocked || isSold}
                      className="p-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                      aria-label={`Add ${cocktail.name}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleSoldOut(index)}
                      disabled={isLocked}
                      className={`p-1.5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                        isSold
                          ? 'bg-destructive text-destructive-foreground'
                          : 'bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive'
                      }`}
                      aria-label={`Toggle sold out for ${cocktail.name}`}
                    >
                      <Ban className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
