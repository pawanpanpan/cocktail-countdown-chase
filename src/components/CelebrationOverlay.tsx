import { useEffect, useState } from "react";
import { SECRET_DRINK } from "@/data/cocktails";

interface CelebrationOverlayProps {
  isActive: boolean;
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

export const CelebrationOverlay = ({ isActive }: CelebrationOverlayProps) => {
  const [confettiPieces, setConfettiPieces] = useState<{ id: number; delay: number; color: string }[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isActive) {
      const pieces = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        delay: Math.random() * 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      }));
      setConfettiPieces(pieces);
      const textTimer = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(textTimer);
    } else {
      setConfettiPieces([]);
      setShowText(false);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-background/60" />

      {confettiPieces.map(piece => (
        <Confetti key={piece.id} delay={piece.delay} color={piece.color} />
      ))}

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-scale-in">
            <div className="text-5xl mb-4">✦</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary mb-4 animate-float uppercase">
              Secret Drinks Unlocked
            </h2>
            <p className="font-display text-2xl md:text-3xl text-foreground mb-2">
              {SECRET_DRINK.name}
            </p>
            <p className="text-base text-muted-foreground italic">
              {SECRET_DRINK.tagline}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
