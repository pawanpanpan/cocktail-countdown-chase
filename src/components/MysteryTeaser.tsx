interface MysteryTeaserProps {
  drinksRemaining: number;
  isComplete: boolean;
}

export const MysteryTeaser = ({ drinksRemaining, isComplete }: MysteryTeaserProps) => {
  if (isComplete) return null;

  return (
    <div className="text-center py-2 px-4">
      <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full">
        <span className="text-2xl animate-pulse">🍹</span>
        <p className="text-lg md:text-xl font-medium text-foreground">
          <span className="text-muted-foreground">Only </span>
          <span className="text-accent font-bold neon-text-accent">{drinksRemaining}</span>
          <span className="text-muted-foreground"> drinks until the </span>
          <span className="text-primary font-bold neon-text">Mystery Cocktail</span>
          <span className="text-muted-foreground"> is unlocked!</span>
        </p>
        <span className="text-2xl animate-pulse">✨</span>
      </div>
    </div>
  );
};
