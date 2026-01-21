import { useEffect, useState } from "react";
import { SECRET_DRINK } from "@/data/cocktails";

interface CelebrationOverlayProps {
  isActive: boolean;
}

const CONFETTI_COLORS = [
  'hsl(15, 85%, 60%)',   // Primary coral
  'hsl(45, 90%, 55%)',   // Accent gold
  'hsl(330, 85%, 60%)',  // Celebration pink
  'hsl(175, 70%, 45%)',  // Secondary teal
  'hsl(0, 0%, 100%)',    // White
];

const Confetti = ({ delay, color }: { delay: number; color: string }) => {
  const randomX = Math.random() * 100;
  const randomSize = 8 + Math.random() * 12;
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
      // Generate confetti
      const pieces = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        delay: Math.random() * 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      }));
      setConfettiPieces(pieces);

      // Show text after a short delay
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
      {/* Background Glow */}
      <div className="absolute inset-0 celebration-bg animate-pulse-glow" />

      {/* Radial Light Burst */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(45, 90%, 55%) 0%, transparent 50%)',
        }}
      />

      {/* Confetti */}
      {confettiPieces.map(piece => (
        <Confetti key={piece.id} delay={piece.delay} color={piece.color} />
      ))}

      {/* Secret Drink Reveal */}
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-scale-in">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-accent neon-text-accent mb-4 animate-float">
              SECRET DRINK UNLOCKED
            </h2>
            <p className="font-display text-3xl md:text-4xl text-foreground/90 mb-2">
              {SECRET_DRINK.name}
            </p>
            <p className="text-xl text-muted-foreground italic">
              {SECRET_DRINK.tagline}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
