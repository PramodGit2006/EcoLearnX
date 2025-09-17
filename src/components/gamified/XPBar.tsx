import { useEffect, useState } from "react";

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
}

export const XPBar = ({ currentXP, maxXP, level, className = "" }: XPBarProps) => {
  const [animatedXP, setAnimatedXP] = useState(0);
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedXP(currentXP);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentXP]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Level {level}</span>
        <span className="text-muted-foreground">
          {animatedXP} / {maxXP} XP
        </span>
      </div>
      
      <div className="xp-bar">
        <div
          className="xp-bar-fill animate-glow"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-gentle" />
      </div>
      
      {percentage === 100 && (
        <div className="text-center">
          <span className="text-xs font-bold text-primary animate-pulse">
            🎉 Ready to Level Up! 🎉
          </span>
        </div>
      )}
    </div>
  );
};