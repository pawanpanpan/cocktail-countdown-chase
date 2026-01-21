import { useEffect, useState } from "react";

interface MilestoneToastProps {
  cocktailName: string;
  isVisible: boolean;
  onHide: () => void;
}

export const MilestoneToast = ({ cocktailName, isVisible, onHide }: MilestoneToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
      <div className="animate-scale-in text-center">
        <div className="text-6xl mb-4">🍸</div>
        <div className="bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 px-8 py-6 rounded-2xl shadow-2xl">
          <p className="font-display text-3xl md:text-4xl text-foreground tracking-wide">
            {cocktailName}
          </p>
          <p className="font-display text-xl text-foreground/80 mt-2">
            COMPLETE!
          </p>
        </div>
      </div>
    </div>
  );
};
