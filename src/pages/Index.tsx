import { useState, useEffect, useRef } from "react";
import { cocktails } from "@/data/cocktails";
import { CocktailCard } from "@/components/CocktailCard";
import { ProgressHeader } from "@/components/ProgressHeader";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { MilestoneToast } from "@/components/MilestoneToast";
import { MysteryTeaser } from "@/components/MysteryTeaser";
import { useCocktailSync } from "@/hooks/useCocktailSync";

const TOTAL_GOAL = 100;

const Index = () => {
  const {
    cocktailCounts,
    totalDrinksServed,
    mostPopularIndex,
    soldOut,
  } = useCocktailSync();

  const [justCompletedIndex, setJustCompletedIndex] = useState<number | null>(null);
  const [milestoneToast, setMilestoneToast] = useState<{ name: string; visible: boolean }>({
    name: "",
    visible: false,
  });
  const [showCelebration, setShowCelebration] = useState(false);

  const prevTotalRef = useRef(totalDrinksServed);

  const isUnlocked = totalDrinksServed >= TOTAL_GOAL;

  // Watch for milestone completions
  useEffect(() => {
    const prevTotal = prevTotalRef.current;
    const newTotal = totalDrinksServed;

    if (newTotal >= TOTAL_GOAL && prevTotal < TOTAL_GOAL) {
      setShowCelebration(true);
    }

    if (newTotal > prevTotal && newTotal % 10 === 0 && newTotal <= TOTAL_GOAL) {
      setMilestoneToast({ name: `${newTotal} drinks served!`, visible: true });
    }

    prevTotalRef.current = newTotal;
  }, [totalDrinksServed]);

  const hideMilestoneToast = () => {
    setMilestoneToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen">
        <ProgressHeader
          drinksServed={totalDrinksServed}
          totalGoal={TOTAL_GOAL}
          isCelebrating={isUnlocked}
        />

        <MysteryTeaser drinksRemaining={Math.max(0, TOTAL_GOAL - totalDrinksServed)} isUnlocked={isUnlocked} />

        {/* Cocktail Grid */}
        <main className="flex-1 flex items-center justify-center p-3 md:p-6">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 max-w-7xl w-full">
            {cocktails.map((cocktail, index) => {
              const isLocked = cocktail.locked && !isUnlocked;
              return (
                <div key={cocktail.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CocktailCard
                    cocktail={cocktail}
                    count={cocktailCounts[index] || 0}
                    isMostPopular={mostPopularIndex === index}
                    justCompleted={justCompletedIndex === index}
                    isSoldOut={soldOut[index] || false}
                    isLocked={!!isLocked}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <MilestoneToast
        cocktailName={milestoneToast.name}
        isVisible={milestoneToast.visible && !showCelebration}
        onHide={hideMilestoneToast}
      />

      <CelebrationOverlay isActive={showCelebration} />
    </div>
  );
};

export default Index;
