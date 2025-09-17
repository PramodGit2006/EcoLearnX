import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  deadline: string;
  requirements: string[];
  status: 'active' | 'completed';
  progress?: number;
  totalDays?: number;
  completedDate?: string;
  score?: number;
}

interface ChallengeContextType {
  challenges: Challenge[];
  addChallenge: (challenge: Omit<Challenge, 'id'>) => void;
  updateChallenge: (id: number, challenge: Partial<Challenge>) => void;
  deleteChallenge: (id: number) => void;
  getChallengeById: (id: number) => Challenge | undefined;
  completeChallenge: (challengeId: number, score: number) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};

export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [nextId, setNextId] = useState(1);

  const addChallenge = (challenge: Omit<Challenge, 'id'>) => {
    const newChallenge = { ...challenge, id: nextId };
    setChallenges(prev => [...prev, newChallenge]);
    setNextId(prev => prev + 1);
  };

  const updateChallenge = (id: number, updatedChallenge: Partial<Challenge>) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === id ? { ...challenge, ...updatedChallenge } : challenge
    ));
  };

  const deleteChallenge = (id: number) => {
    setChallenges(prev => prev.filter(challenge => challenge.id !== id));
  };

  const getChallengeById = (id: number) => {
    return challenges.find(challenge => challenge.id === id);
  };

  const completeChallenge = (challengeId: number, score: number) => {
    updateChallenge(challengeId, { 
      status: 'completed', 
      score, 
      completedDate: new Date().toISOString().split('T')[0] 
    });
  };

  return (
    <ChallengeContext.Provider value={{
      challenges,
      addChallenge,
      updateChallenge,
      deleteChallenge,
      getChallengeById,
      completeChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};