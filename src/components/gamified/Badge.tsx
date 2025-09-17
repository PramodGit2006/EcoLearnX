import { cn } from "@/lib/utils";

export type BadgeType = "bronze" | "silver" | "gold" | "diamond";

interface BadgeProps {
  type: BadgeType;
  title: string;
  description?: string;
  icon?: string;
  earned?: boolean;
  className?: string;
}

const badgeIcons = {
  bronze: "🥉",
  silver: "🥈", 
  gold: "🥇",
  diamond: "💎",
};

export const Badge = ({ 
  type, 
  title, 
  description, 
  icon, 
  earned = false, 
  className = "" 
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "relative p-4 rounded-xl glass card-hover transition-all duration-300",
        earned ? "opacity-100" : "opacity-50 grayscale",
        `badge-${type}`,
        className
      )}
    >
      <div className="text-center space-y-2">
        <div className="text-3xl">
          {icon || badgeIcons[type]}
        </div>
        
        <h3 className="font-bold text-sm text-white">{title}</h3>
        
        {description && (
          <p className="text-xs text-white/80">{description}</p>
        )}
        
        {earned && (
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        )}
      </div>
      
      {earned && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-gentle" />
      )}
    </div>
  );
};