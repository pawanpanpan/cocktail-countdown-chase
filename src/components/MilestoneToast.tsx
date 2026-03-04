import { useEffect, useState } from "react";

interface MilestoneToastProps {
  drinkCount: number;
  isVisible: boolean;
  onHide: () => void;
}

const CONFETTI_COLORS = [
  'hsl(215, 40%, 20%)',
  'hsl(38, 60%, 50%)',
  'hsl(38, 55%, 65%)',
  'hsl(215, 30%, 40%)',
  'hsl(40, 20%, 96%)',
];

const Confetti = ({ delay, color }: { delay: number; color: string }) => {
  const randomX = Math.random() * 100;
  const randomSize = 6 + Math.random() * 10;
  const randomDuration = 2 + Math.random() * 2;

  return (
    <div
      className="absolute animate-confetti"
      style={{
        left: `${randomX}%`,
        top: '-20px',
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animationDelay: `${delay}s`,
        animationDuration: `${randomDuration}s`,
      }}
    />
  );
};

export const MilestoneToast = ({ drinkCount, isVisible, onHide }: MilestoneToastProps) => {
  const [confettiPieces, setConfettiPieces] = useState<{ id: number; delay: number; color: string }[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const pieces = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        delay: Math.random() * 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      }));
      setConfettiPieces(pieces);
      const textTimer = setTimeout(() => setShowText(true), 500);
      const hideTimer = setTimeout(onHide, 15000);
      return () => {
        clearTimeout(textTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setConfettiPieces([]);
      setShowText(false);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-background/60" />

      {confettiPieces.map(piece => (
        <Confetti key={piece.id} delay={piece.delay} color={piece.color} />
      ))}

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-scale-in">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary mb-2 animate-float uppercase">
              {drinkCount} Drinks Served!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
