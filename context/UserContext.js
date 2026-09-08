'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(undefined);

// Default user data
const defaultUser = {
  id: 'user-1',
  name: 'Player',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=player',
  points: 0,
  badges: [],
  gameStats: {
    wordBuilder: { played: 0, highScore: 0, accuracy: 0 },
    rhymeRace: { played: 0, highScore: 0, accuracy: 0 },
    phonics: { played: 0, highScore: 0, accuracy: 0 },
    sequenceSorter: { played: 0, highScore: 0, accuracy: 0 },
  },
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('eduGamesUser');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(defaultUser);

      // Award beginner badge after 1 second
      setTimeout(() => {
        addBadge({
          id: 'beginner',
          name: 'Beginner',
          description: 'Started your learning journey',
          image: '🌱',
          dateAwarded: new Date().toISOString(),
          game: 'sequenceSorter',
        });
      }, 1000);
    }

    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('eduGamesUser', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updates) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, ...updates };
    });
  };

  const addBadge = (badge) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const badgeExists = prevUser.badges.some((b) => b.id === badge.id);
      if (badgeExists) return prevUser;

      return {
        ...prevUser,
        badges: [...prevUser.badges, badge],
        points: prevUser.points + getBadgePoints(badge.id),
      };
    });
  };

  const getBadgePoints = (badgeId) => {
    const pointsMap = {
      beginner: 10,
      'bronze-wordBuilder': 50,
      'silver-wordBuilder': 100,
      'gold-wordBuilder': 200,
      'bronze-rhymeRace': 50,
      'silver-rhymeRace': 100,
      'gold-rhymeRace': 200,
      'bronze-phonics': 50,
      'silver-phonics': 100,
      'gold-phonics': 200,
    };

    return pointsMap[badgeId] || 25;
  };

  const updateGameStats = (game, stats) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const currentStats = prevUser.gameStats[game];
      const played = currentStats.played + 1;
      let updatedStats = {
        ...currentStats,
        played,
      };

      if (stats.score !== undefined && stats.score > currentStats.highScore) {
        updatedStats.highScore = stats.score;
      }

      if (stats.accuracy !== undefined) {
        const totalAccuracy = currentStats.accuracy * currentStats.played;
        updatedStats.accuracy = (totalAccuracy + stats.accuracy) / played;

        if (stats.accuracy === 100) {
          let badgeLevel = 'gold';
          if (played <= 5) badgeLevel = 'bronze';
          else if (played <= 15) badgeLevel = 'silver';

          addBadge({
            id: `${badgeLevel}-${game}`,
            name: `${badgeLevel.charAt(0).toUpperCase() + badgeLevel.slice(1)} ${game.charAt(0).toUpperCase() + game.slice(1)}`,
            description:
              badgeLevel === 'gold'
                ? `Mastered ${game} with perfect accuracy`
                : badgeLevel === 'silver'
                ? `Consistently achieved high accuracy in ${game}`
                : `Achieved 100% accuracy in ${game}`,
            image: badgeLevel === 'gold' ? '🥇' : badgeLevel === 'silver' ? '🥈' : '🥉',
            dateAwarded: new Date().toISOString(),
            game,
          });
        }
      }

      return {
        ...prevUser,
        gameStats: {
          ...prevUser.gameStats,
          [game]: updatedStats,
        },
      };
    });
  };

  const value = {
    user,
    isLoading,
    updateUser,
    addBadge,
    updateGameStats,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
