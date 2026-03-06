interface MysteryTeaserProps {
  drinksRemaining: number;
  isUnlocked: boolean;
}

export const MysteryTeaser = ({ drinksRemaining, isUnlocked }: MysteryTeaserProps) => {
  return (
    <div className="text-center py-1 px-4">
      <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-border bg-card">
        {isUnlocked ? (
          <p className="text-sm md:text-base text-accent font-bold uppercase tracking-wider">
            ✦ Secret drinks unlocked ✦
          </p>
        ) : (
          <p className="text-sm md:text-base text-muted-foreground">
            <span className="text-foreground font-bold">{drinksRemaining}</span>
            {" "}drinks until{" "}
            <span className="text-primary font-bold">2 secret cocktails</span>
            {" "}are unlocked
          </p>
        )}
      </div>
    </div>
  );
};
