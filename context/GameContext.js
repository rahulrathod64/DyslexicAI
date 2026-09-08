'use client'
import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext(undefined);

// Mock initial data for demonstration
const initialLeaderboards = {
  wordBuilder: [
    { userId: 'user-2', username: 'Aarav', score: 520, accuracy: 92, difficulty: 'hard', timestamp: '2023-05-15T10:30:00Z' },
    { userId: 'user-3', username: 'Priya', score: 480, accuracy: 88, difficulty: 'medium', timestamp: '2023-05-14T14:20:00Z' },
    { userId: 'user-4', username: 'Raj', score: 420, accuracy: 85, difficulty: 'hard', timestamp: '2023-05-13T09:45:00Z' },
  ],
  rhymeRace: [
    { userId: 'user-5', username: 'Meera', score: 310, accuracy: 94, difficulty: 'medium', timestamp: '2023-05-15T11:20:00Z' },
    { userId: 'user-2', username: 'Aarav', score: 280, accuracy: 89, difficulty: 'hard', timestamp: '2023-05-14T16:10:00Z' },
    { userId: 'user-6', username: 'Arjun', score: 260, accuracy: 82, difficulty: 'easy', timestamp: '2023-05-13T13:30:00Z' },
  ],
  phonics: [
    { userId: 'user-3', username: 'Priya', score: 450, accuracy: 96, difficulty: 'hard', timestamp: '2023-05-15T09:15:00Z' },
    { userId: 'user-7', username: 'Aisha', score: 410, accuracy: 90, difficulty: 'medium', timestamp: '2023-05-14T15:40:00Z' },
    { userId: 'user-8', username: 'Dev', score: 380, accuracy: 87, difficulty: 'medium', timestamp: '2023-05-13T10:25:00Z' },
  ],
  sequenceSorter: []
};

export const GameProvider = ({ children }) => {
  const [leaderboards, setLeaderboards] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eduGamesLeaderboards');
      return stored ? JSON.parse(stored) : initialLeaderboards;
    }
    return initialLeaderboards;
  });

  const addScore = (game, score) => {
    setLeaderboards(prev => {
      const updatedLeaderboard = {
        ...prev,
        [game]: [...prev[game], score].sort((a, b) => b.score - a.score)
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('eduGamesLeaderboards', JSON.stringify(updatedLeaderboard));
      }

      return updatedLeaderboard;
    });
  };

  const getTopScores = (game, limit = 10) => {
    return leaderboards[game]?.slice(0, limit) || [];
  };

  const value = {
    leaderboards,
    addScore,
    getTopScores,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
