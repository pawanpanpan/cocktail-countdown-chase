import { cocktails } from "@/data/cocktails";
import { useCocktailSync } from "@/hooks/useCocktailSync";
import { Plus, Minus, RotateCcw, Monitor } from "lucide-react";

const TOTAL_GOAL = 100;

const Admin = () => {
  const {
    cocktailCounts,
    totalDrinksServed,
    mostPopularIndex,
    increment,
    decrement,
    reset,
  } = useCocktailSync();

  const isComplete = totalDrinksServed >= TOTAL_GOAL;
  const drinksRemaining = TOTAL_GOAL - totalDrinksServed;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Bartender Controls
          </h1>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Monitor className="w-5 h-5" />
            Open Display
          </a>
        </div>

        {/* Progress Summary */}
        <div className="glass-card p-6 rounded-2xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-wide">Total Drinks Served</p>
              <p className="text-5xl font-display font-bold text-primary neon-text">
                {totalDrinksServed} <span className="text-2xl text-muted-foreground">/ {TOTAL_GOAL}</span>
              </p>
            </div>
            <div className="text-right">
              {isComplete ? (
                <div className="text-accent font-bold text-xl">🎉 Mystery Cocktail Unlocked!</div>
              ) : (
                <div>
                  <p className="text-muted-foreground text-sm">Until Mystery Cocktail</p>
                  <p className="text-3xl font-bold text-accent">{drinksRemaining} drinks</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${(totalDrinksServed / TOTAL_GOAL) * 100}%` }}
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {/* Cocktail Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cocktails.map((cocktail, index) => (
          <div
            key={cocktail.id}
            className={`
              glass-card rounded-xl overflow-hidden transition-all duration-300
              ${mostPopularIndex === index ? 'ring-2 ring-accent' : ''}
            `}
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={cocktail.image}
                alt={cocktail.name}
                className="w-full h-full object-cover"
              />
              {mostPopularIndex === index && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-xs font-bold text-center py-1">
                  🔥 TOP
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-background/90 px-3 py-1 rounded-full text-lg font-bold">
                {cocktailCounts[index]}
              </div>
            </div>

            {/* Name & Controls */}
            <div className="p-3">
              <h3 className="font-medium text-foreground text-center mb-3 truncate">
                {cocktail.name}
              </h3>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => decrement(index)}
                  disabled={cocktailCounts[index] === 0}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label={`Remove ${cocktail.name}`}
                >
                  <Minus className="w-5 h-5" />
                </button>

                <button
                  onClick={() => increment(index)}
                  disabled={isComplete}
                  className="p-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
                  aria-label={`Add ${cocktail.name}`}
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
