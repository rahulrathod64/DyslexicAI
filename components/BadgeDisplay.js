import React from 'react';
import { motion } from 'framer-motion';

const BadgeDisplay = ({ badges, highlightId }) => {
  const groupedBadges = badges.reduce((acc, badge) => {
    if (!acc[badge.game]) {
      acc[badge.game] = [];
    }
    acc[badge.game].push(badge);
    return acc;
  }, {});

  const categories = [
    { id: 'general', label: 'General Achievements' },
    { id: 'wordBuilder', label: 'Word Builder' },
    { id: 'rhymeRace', label: 'Rhyme Race' },
    { id: 'phonics', label: 'Phonics Master' },
  ];

  const getBadgeLabel = (id) => {
    if (id.includes('beginner')) return 'Beginner';
    if (id.includes('bronze')) return 'Bronze';
    if (id.includes('silver')) return 'Silver';
    if (id.includes('gold')) return 'Gold';
    return 'Special';
  };

  const getBadgeColor = (id) => {
    if (id.includes('beginner')) return 'bg-green-800';
    if (id.includes('bronze')) return 'bg-amber-800';
    if (id.includes('silver')) return 'bg-gray-400';
    if (id.includes('gold')) return 'bg-yellow-500';
    return 'bg-purple-700';
  };

  if (badges.length === 0) {
    return (
      <div className="bg-indigo-800/30 rounded-xl p-8 text-center">
        <p className="text-indigo-200 mb-4">
          You haven't earned any badges yet. Play games to start collecting badges!
        </p>
        <div className="flex justify-center space-x-4 opacity-40">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center">
            <span className="text-2xl">🌱</span>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center">
            <span className="text-2xl">🥉</span>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center">
            <span className="text-2xl">🥈</span>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center">
            <span className="text-2xl">🥇</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryBadges = groupedBadges[category.id] || [];
        if (categoryBadges.length === 0) return null;

        return (
          <div key={category.id} className="bg-indigo-800/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">{category.label}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categoryBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  className={`relative rounded-lg p-4 ${getBadgeColor(badge.id)} shadow-lg hover:shadow-xl transition-shadow ${highlightId === badge.id ? 'ring-4 ring-indigo-300 ring-opacity-75' : ''}`}
                  initial={highlightId === badge.id ? { scale: 0.8 } : { scale: 1 }}
                  animate={highlightId === badge.id ? { scale: [0.8, 1.1, 1], transition: { duration: 0.5 } } : { scale: 1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-2">{badge.image}</div>
                    <h4 className="text-white font-bold">{badge.name}</h4>
                    <p className="text-gray-200 text-sm mt-1">{badge.description}</p>
                    <div className="mt-2 bg-black bg-opacity-20 px-2 py-1 rounded text-xs text-gray-200">
                      {getBadgeLabel(badge.id)}
                    </div>
                    <div className="absolute top-2 right-2 text-xs text-gray-300">
                      {new Date(badge.dateAwarded).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BadgeDisplay;