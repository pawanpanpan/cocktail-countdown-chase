import { useState, useCallback, useEffect } from "react";
import { cocktails } from "@/data/cocktails";
import { CocktailCard } from "@/components/CocktailCard";
import { ProgressHeader } from "@/components/ProgressHeader";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { MilestoneToast } from "@/components/MilestoneToast";
import { AdminControls } from "@/components/AdminControls";

const TOTAL_GOAL = 100;
const DRINKS_PER_COCKTAIL = 10;

const Index = () => {
  const [drinksServed, setDrinksServed] = useState(0);
  const [justCompletedIndex, setJustCompletedIndex] = useState<number | null>(null);
  const [milestoneToast, setMilestoneToast] = useState<{ name: string; visible: boolean }>({
    name: "",
    visible: false,
  });

  const isComplete = drinksServed >= TOTAL_GOAL;

  // Calculate progress for each cocktail (0-10)
  const getCocktailProgress = useCallback((index: number) => {
    const drinksForThisCocktail = Math.floor(drinksServed / DRINKS_PER_COCKTAIL);
    const remainder = drinksServed % DRINKS_PER_COCKTAIL;

    if (index < drinksForThisCocktail) {
      return DRINKS_PER_COCKTAIL; // Fully complete
    } else if (index === drinksForThisCocktail) {
      return remainder; // Partial progress
    }
    return 0; // Not started
  }, [drinksServed]);

  const handleIncrement = useCallback(() => {
    if (drinksServed >= TOTAL_GOAL) return;

    const newCount = drinksServed + 1;
    setDrinksServed(newCount);

    // Check for milestone completion
    if (newCount % DRINKS_PER_COCKTAIL === 0) {
      const completedIndex = Math.floor(newCount / DRINKS_PER_COCKTAIL) - 1;
      setJustCompletedIndex(completedIndex);
      setMilestoneToast({
        name: cocktails[completedIndex].name,
        visible: true,
      });

      // Clear the just completed state after animation
      setTimeout(() => setJustCompletedIndex(null), 600);
    }
  }, [drinksServed]);

  const handleDecrement = useCallback(() => {
    if (drinksServed <= 0) return;
    setDrinksServed(prev => prev - 1);
  }, [drinksServed]);

  const handleReset = useCallback(() => {
    setDrinksServed(0);
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
          drinksServed={drinksServed} 
          totalGoal={TOTAL_GOAL} 
          isCelebrating={isComplete}
        />

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
                  progress={getCocktailProgress(index)}
                  isComplete={getCocktailProgress(index) === DRINKS_PER_COCKTAIL}
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
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
        drinksServed={drinksServed}
      />
    </div>
  );
};

export default Index;
