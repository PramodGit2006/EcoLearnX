import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface UserStats {
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  totalPoints: number;
  quizzesCompleted: number;
  challengesCompleted: number;
  rank: number;
  streak: number;
  lastActivity?: string;
}

interface UserContextType {
  userStats: UserStats;
  updateUserStats: (updates: Partial<UserStats>) => void;
  addXP: (xp: number) => void;
  completeQuiz: (xp: number) => void;
  completeChallenge: (xp: number) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>({
    name: "Eco Learner",
    level: 1,
    currentXP: 0,
    maxXP: 1000,
    totalPoints: 0,
    quizzesCompleted: 0,
    challengesCompleted: 0,
    rank: 0,
    streak: 0,
  });

  const updateUserStats = (updates: Partial<UserStats>) => {
    setUserStats(prev => ({ ...prev, ...updates }));
  };

  const addXP = (xp: number) => {
    setUserStats(prev => {
      let newCurrentXP = prev.currentXP + xp;
      let newLevel = prev.level;
      let newMaxXP = prev.maxXP;
      let newTotalPoints = prev.totalPoints + xp;

      // Level up logic
      while (newCurrentXP >= newMaxXP) {
        newCurrentXP -= newMaxXP;
        newLevel += 1;
        newMaxXP = Math.floor(newMaxXP * 1.2); // Increase XP requirement by 20% each level
      }

      return {
        ...prev,
        currentXP: newCurrentXP,
        level: newLevel,
        maxXP: newMaxXP,
        totalPoints: newTotalPoints,
        lastActivity: new Date().toISOString().split('T')[0]
      };
    });
  };

  const completeQuiz = (xp: number) => {
    setUserStats(prev => ({ ...prev, quizzesCompleted: prev.quizzesCompleted + 1 }));
    addXP(xp);
    updateStreak();
  };

  const completeChallenge = (xp: number) => {
    setUserStats(prev => ({ ...prev, challengesCompleted: prev.challengesCompleted + 1 }));
    addXP(xp);
    updateStreak();
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    setUserStats(prev => {
      if (prev.lastActivity === today) {
        // Already active today, no streak change
        return prev;
      } else if (prev.lastActivity === yesterday) {
        // Consecutive day, increase streak
        return { ...prev, streak: prev.streak + 1, lastActivity: today };
      } else {
        // Streak broken, reset to 1
        return { ...prev, streak: 1, lastActivity: today };
      }
    });
  };

  // Calculate rank based on total points (simplified ranking)
  useEffect(() => {
    const calculateRank = () => {
      // Simple ranking based on total points
      // In real app, this would be calculated server-side
      const ranks = [
        { min: 0, max: 999, rank: 100 },
        { min: 1000, max: 2499, rank: 50 },
        { min: 2500, max: 4999, rank: 25 },
        { min: 5000, max: 9999, rank: 15 },
        { min: 10000, max: 19999, rank: 10 },
        { min: 20000, max: 49999, rank: 5 },
        { min: 50000, max: Infinity, rank: 1 },
      ];

      const userRank = ranks.find(r => 
        userStats.totalPoints >= r.min && userStats.totalPoints <= r.max
      )?.rank || 100;

      if (userRank !== userStats.rank) {
        setUserStats(prev => ({ ...prev, rank: userRank }));
      }
    };

    calculateRank();
  }, [userStats.totalPoints]);

  return (
    <UserContext.Provider value={{
      userStats,
      updateUserStats,
      addXP,
      completeQuiz,
      completeChallenge,
      updateStreak
    }}>
      {children}
    </UserContext.Provider>
  );
};