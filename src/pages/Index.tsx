import { useState, useCallback } from "react";
import { cocktails } from "@/data/cocktails";
import { CocktailCard } from "@/components/CocktailCard";
import { ProgressHeader } from "@/components/ProgressHeader";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { MilestoneToast } from "@/components/MilestoneToast";
import { AdminControls } from "@/components/AdminControls";
import { MysteryTeaser } from "@/components/MysteryTeaser";

const TOTAL_GOAL = 100;

const Index = () => {
  // Track individual counts for each cocktail
  const [cocktailCounts, setCocktailCounts] = useState<number[]>(
    () => new Array(cocktails.length).fill(0)
  );
  const [justCompletedIndex, setJustCompletedIndex] = useState<number | null>(null);
  const [milestoneToast, setMilestoneToast] = useState<{ name: string; visible: boolean }>({
    name: "",
    visible: false,
  });

  const totalDrinksServed = cocktailCounts.reduce((sum, count) => sum + count, 0);
  const isComplete = totalDrinksServed >= TOTAL_GOAL;

  // Find the most popular cocktail (highest count, excluding ties at 0)
  const mostPopularIndex = cocktailCounts.reduce((maxIdx, count, idx, arr) => {
    if (count === 0) return maxIdx;
    if (maxIdx === -1) return idx;
    return count > arr[maxIdx] ? idx : maxIdx;
  }, -1);

  const handleIncrement = useCallback((index: number) => {
    if (totalDrinksServed >= TOTAL_GOAL) return;

    setCocktailCounts(prev => {
      const newCounts = [...prev];
      newCounts[index] = prev[index] + 1;
      return newCounts;
    });

    // Check for milestone completion (every 10 total drinks)
    const newTotal = totalDrinksServed + 1;
    if (newTotal % 10 === 0 && newTotal <= TOTAL_GOAL) {
      setJustCompletedIndex(index);
      setMilestoneToast({
        name: `${newTotal} drinks served!`,
        visible: true,
      });
      setTimeout(() => setJustCompletedIndex(null), 600);
    }
  }, [totalDrinksServed]);

  const handleDecrement = useCallback((index: number) => {
    setCocktailCounts(prev => {
      if (prev[index] <= 0) return prev;
      const newCounts = [...prev];
      newCounts[index] = prev[index] - 1;
      return newCounts;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCocktailCounts(new Array(cocktails.length).fill(0));
    setJustCompletedIndex(null);
    setMilestoneToast({ name: "", visible: false });
  }, []);

  const hideMilestoneToast = useCallback(() => {
    setMilestoneToast(prev => ({ ...prev, visible: false }));
  }, []);

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

        {/* Footer Spacer for Controls */}
        <div className="h-24" />
      </div>

      {/* Milestone Toast */}
      <MilestoneToast
        cocktailName={milestoneToast.name}
        isVisible={milestoneToast.visible && !isComplete}
        onHide={hideMilestoneToast}
      />

      {/* Celebration Overlay */}
      <CelebrationOverlay isActive={isComplete} />

      {/* Admin Controls */}
      <AdminControls
        cocktails={cocktails}
        cocktailCounts={cocktailCounts}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
        totalDrinksServed={totalDrinksServed}
      />
    </div>
  );
};

export default Index;
