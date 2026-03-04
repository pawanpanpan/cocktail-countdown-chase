import { useEffect } from "react";

interface MilestoneToastProps {
  drinkCount: number;
  isVisible: boolean;
  onHide: () => void;
}

export const MilestoneToast = ({ drinkCount, isVisible, onHide }: MilestoneToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none w-full max-w-2xl px-6">
      <div className="animate-scale-in text-center">
        <div className="bg-primary border-2 border-accent rounded-2xl shadow-2xl px-10 py-8">
          <div className="text-6xl mb-3">🍸</div>
          <p className="font-display tracking-[0.4em] text-xl text-accent/70 uppercase mb-1">
            Milestone
          </p>
          <div className="flex items-center gap-4 justify-center my-3">
            <div className="flex-1 h-px bg-accent/40" />
            <span className="text-accent text-sm">✦</span>
            <div className="flex-1 h-px bg-accent/40" />
          </div>
          <p className="font-display text-8xl md:text-9xl text-accent tracking-wide leading-none">
            {drinkCount}
          </p>
          <p className="font-display text-3xl md:text-4xl text-foreground tracking-widest mt-2 uppercase">
            Drinks Served
          </p>
        </div>
      </div>
    </div>
  );
};
