'use client'
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useUser } from '@/context/UserContext';
import { Medal, TrendingUp, Calendar, Filter } from 'lucide-react';

const Leaderboard = () => {
  const { leaderboards } = useGame();
  const { user } = useUser();
  const [activeGame, setActiveGame] = useState('wordBuilder');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const gameNames = {
    wordBuilder: 'Word Builder',
    rhymeRace: 'Rhyme Race',
    phonics: 'Phonics Master',
  };

  const filteredScores = leaderboards[activeGame]
    .filter((score) => filterDifficulty === 'all' || score.difficulty === filterDifficulty);

  const userPosition = user
    ? leaderboards[activeGame].findIndex((score) => score.userId === user.id) + 1
    : 0;

  return (
    <div className="max-w-7xl mx-auto my-6 w-[90vw]">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
          Leaderboard
        </h1>
        <p className="text-lg text-indigo-200 max-w-2xl text-center">
          See how you stack up against other players and compete for the top spots!
        </p>
      </div>

      <div className="bg-indigo-800/30 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b border-indigo-700">
          {Object.keys(gameNames).map((game) => (
            <button
              key={game}
              onClick={() => setActiveGame(game)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeGame === game
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-300 hover:bg-indigo-800/50 hover:text-white'
              }`}
            >
              {gameNames[game]}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-indigo-900/30">
          <h2 className="text-xl font-bold text-white">{gameNames[activeGame]} Rankings</h2>
          <div className="flex items-center">
            <div className="flex items-center mr-4 text-sm text-indigo-300">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Updated: {'26/4/2025'}</span>
            </div>
            <div className="relative">
              <div className="flex items-center bg-indigo-800 rounded-lg px-3 py-1.5">
                <Filter className="w-4 h-4 mr-2 text-indigo-300" />
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="bg-transparent text-indigo-200 text-sm focus:outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {userPosition > 0 && (
          <div className="bg-indigo-700/50 p-4 border-l-4 border-yellow-400 flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Your Ranking: #{userPosition}</span>
            </div>
            <div className="text-indigo-200 text-sm">
              Keep playing to improve your position!
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-indigo-900/50">
                <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Accuracy</th>
                <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-800">
              {filteredScores.length > 0 ? (
                filteredScores.map((score, index) => {
                  const isUser = user && score.userId === user.id;
                  const rankStyles = [
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                    index === 0 ? 'bg-yellow-500 text-yellow-900' :
                    index === 1 ? 'bg-gray-400 text-gray-800' :
                    index === 2 ? 'bg-amber-700 text-amber-200' :
                    'bg-indigo-700 text-indigo-200'
                  ].join(' ');

                  return (
                    <tr
                      key={`${score.userId}-${index}`}
                      className={`${
                        isUser ? 'bg-indigo-700/20' : 'bg-transparent hover:bg-indigo-800/20'
                      } transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={rankStyles}>
                            {index < 3 ? <Medal className="w-4 h-4" /> : index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {score.username} {isUser && <span className="text-indigo-300">(You)</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-100 font-bold">
                        {score.score}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative w-24 h-3 bg-indigo-900 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full rounded-full ${
                                score.accuracy >= 90
                                  ? 'bg-green-500'
                                  : score.accuracy >= 75
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${score.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-indigo-200">{score.accuracy}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          score.difficulty === 'easy'
                            ? 'bg-green-900 text-green-200'
                            : score.difficulty === 'medium'
                            ? 'bg-blue-900 text-blue-200'
                            : 'bg-red-900 text-red-200'
                        }`}>
                          {score.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                        {'26/04/25'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-indigo-300">
                    No scores to display. Try a different filter or be the first to play!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
