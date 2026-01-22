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
  } = useCocktailSync();

  const [justCompletedIndex, setJustCompletedIndex] = useState<number | null>(null);
  const [milestoneToast, setMilestoneToast] = useState<{ name: string; visible: boolean }>({
    name: "",
    visible: false,
  });

  const prevTotalRef = useRef(totalDrinksServed);

  const isComplete = totalDrinksServed >= TOTAL_GOAL;

  // Watch for milestone completions
  useEffect(() => {
    const prevTotal = prevTotalRef.current;
    const newTotal = totalDrinksServed;

    if (newTotal > prevTotal && newTotal % 10 === 0 && newTotal <= TOTAL_GOAL) {
      // Find which cocktail was just incremented
      const changedIndex = cocktailCounts.findIndex((count, idx) => count > 0);
      setJustCompletedIndex(changedIndex >= 0 ? changedIndex : null);
      setMilestoneToast({
        name: `${newTotal} drinks served!`,
        visible: true,
      });
      setTimeout(() => setJustCompletedIndex(null), 600);
    }

    prevTotalRef.current = newTotal;
  }, [totalDrinksServed, cocktailCounts]);

  const hideMilestoneToast = () => {
    setMilestoneToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(15, 85%, 60%) 0%, transparent 50%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(ellipse at 0% 100%, hsl(175, 70%, 45%) 0%, transparent 40%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(ellipse at 100% 100%, hsl(45, 90%, 55%) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <ProgressHeader 
          drinksServed={totalDrinksServed} 
          totalGoal={TOTAL_GOAL} 
          isCelebrating={isComplete}
        />

        {/* Mystery Teaser */}
        <MysteryTeaser drinksRemaining={TOTAL_GOAL - totalDrinksServed} isComplete={isComplete} />

        {/* Cocktail Grid */}
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="grid grid-cols-5 grid-rows-2 gap-4 md:gap-6 max-w-7xl w-full">
            {cocktails.map((cocktail, index) => (
              <div 
                key={cocktail.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CocktailCard
                  cocktail={cocktail}
                  count={cocktailCounts[index]}
                  isMostPopular={mostPopularIndex === index}
                  justCompleted={justCompletedIndex === index}
                />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Milestone Toast */}
      <MilestoneToast
        cocktailName={milestoneToast.name}
        isVisible={milestoneToast.visible && !isComplete}
        onHide={hideMilestoneToast}
      />

      {/* Celebration Overlay */}
      <CelebrationOverlay isActive={isComplete} />
    </div>
  );
};

export default Index;
