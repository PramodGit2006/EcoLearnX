import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
  duration: string;
  timeLimit: number;
  xp: number;
  completed?: boolean;
  score?: number;
}

interface QuizContextType {
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  updateQuiz: (id: number, quiz: Partial<Quiz>) => void;
  deleteQuiz: (id: number) => void;
  getQuizById: (id: number) => Quiz | undefined;
  completeQuiz: (quizId: number, score: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [nextId, setNextId] = useState(1);

  const addQuiz = (quiz: Omit<Quiz, 'id'>) => {
    const newQuiz = { ...quiz, id: nextId };
    setQuizzes(prev => [...prev, newQuiz]);
    setNextId(prev => prev + 1);
  };

  const updateQuiz = (id: number, updatedQuiz: Partial<Quiz>) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === id ? { ...quiz, ...updatedQuiz } : quiz
    ));
  };

  const deleteQuiz = (id: number) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
  };

  const getQuizById = (id: number) => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const completeQuiz = (quizId: number, score: number) => {
    updateQuiz(quizId, { completed: true, score });
  };

  return (
    <QuizContext.Provider value={{
      quizzes,
      addQuiz,
      updateQuiz,
      deleteQuiz,
      getQuizById,
      completeQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};