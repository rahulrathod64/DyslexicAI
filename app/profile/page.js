import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
  Settings,
  User as UserIcon,
  Award,
  BarChart3,
  Clock,
  TrendingUp,
  Medal,
} from 'lucide-react';
import BadgeDisplay from './BadgeDisplay';

const Profile = () => {
  const { user, updateUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'stats'>('overview');

  if (!user) {
    return <div className="text-center p-10">Loading...</div>;
  }

  const startEditing = () => {
    setUsername(user.name);
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    if (username.trim()) {
      updateUser({ name: username });
      setEditMode(false);
    }
  };

  const totalGames =
    user.gameStats.wordBuilder.played +
    user.gameStats.rhymeRace.played +
    user.gameStats.phonics.played;

  const averageAccuracy =
    totalGames > 0
      ? (
          (user.gameStats.wordBuilder.accuracy * user.gameStats.wordBuilder.played +
            user.gameStats.rhymeRace.accuracy * user.gameStats.rhymeRace.played +
            user.gameStats.phonics.accuracy * user.gameStats.phonics.played) /
          totalGames
        ).toFixed(1)
      : '0';

  const gameStats = [
    {
      name: 'Word Builder',
      played: user.gameStats.wordBuilder.played,
      score: user.gameStats.wordBuilder.highScore,
      accuracy: user.gameStats.wordBuilder.accuracy,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      name: 'Rhyme Race',
      played: user.gameStats.rhymeRace.played,
      score: user.gameStats.rhymeRace.highScore,
      accuracy: user.gameStats.rhymeRace.accuracy,
      color: 'from-pink-500 to-red-500',
    },
    {
      name: 'Phonics Master',
      played: user.gameStats.phonics.played,
      score: user.gameStats.phonics.highScore,
      accuracy: user.gameStats.phonics.accuracy,
      color: 'from-green-500 to-teal-500',
    },
  ];

  const renderProgressBar = (value, color) => (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-indigo-900">
        <div
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${color}`}
          style={{ width: `${Math.min(100, value)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-indigo-800/30 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-1/3 bg-indigo-900/50 p-6 flex flex-col items-center">
            <div className="mb-4 relative">
              <div className="h-24 w-24 rounded-full bg-indigo-700 flex items-center justify-center text-white text-4xl font-bold">
                {user.name.charAt(0)}
              </div>
              {user.badges.length > 0 && (
                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Medal className="h-6 w-6 text-yellow-400" />
                </div>
              )}
            </div>

            {editMode ? (
              <div className="text-center mb-4 w-full">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-indigo-800 text-white rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  maxLength={20}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-green-600 text-white py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex-1 bg-red-600 text-white py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-indigo-300">Player since {new Date().toLocaleDateString()}</p>
                <button
                  onClick={startEditing}
                  className="mt-2 inline-flex items-center text-sm text-indigo-300 hover:text-white"
                >
                  <Settings className="h-3 w-3 mr-1" /> Edit Profile
                </button>
              </div>
            )}

            <div className="bg-indigo-800/50 rounded-lg p-4 w-full mt-4 space-y-2">
              <Stat label="Points" value={user.points} />
              <Stat label="Games Played" value={totalGames} />
              <Stat label="Badges" value={user.badges.length} />
              <Stat label="Avg. Accuracy" value={`${averageAccuracy}%`} />
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 p-6">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'overview' && (
              <OverviewSection gameStats={gameStats} totalGames={totalGames} user={user} />
            )}

            {activeTab === 'badges' && <BadgeDisplay badges={user.badges} />}

            {activeTab === 'stats' && (
              <StatsSection gameStats={gameStats} user={user} renderProgressBar={renderProgressBar} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-indigo-300">{label}</span>
    <span className="text-white font-bold">{value}</span>
  </div>
);

const Tabs = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { key: 'overview', icon: <UserIcon className="h-4 w-4 mr-1" />, label: 'Overview' },
    { key: 'badges', icon: <Award className="h-4 w-4 mr-1" />, label: 'Badges' },
    { key: 'stats', icon: <BarChart3 className="h-4 w-4 mr-1" />, label: 'Game Stats' },
  ];

  return (
    <nav className="flex space-x-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            activeTab === tab.key
              ? 'bg-indigo-800 text-white'
              : 'text-indigo-300 hover:bg-indigo-800/50 hover:text-white'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

const OverviewSection = ({ gameStats, totalGames, user }) => (
  <div className="space-y-6">
    <SectionTitle icon={<Clock className="h-5 w-5 text-indigo-400" />} title="Recent Activity" />
    {totalGames > 0 ? (
      <div className="space-y-4">
        {gameStats
          .filter((g) => g.played > 0)
          .sort((a, b) => b.played - a.played)
          .map((g, i) => (
            <div key={i} className="bg-indigo-800/20 rounded-lg p-4 space-y-2">
              <h4 className="text-white font-medium">{g.name}</h4>
              <div className="flex flex-wrap gap-2">
                <MiniStat label="Played" value={`${g.played} times`} />
                <MiniStat label="Best Score" value={g.score} />
                <MiniStat label="Accuracy" value={`${g.accuracy.toFixed(1)}%`} />
              </div>
              <div className="pt-2">
                <div className="overflow-hidden h-2 rounded-full bg-indigo-900">
                  <div
                    className={`bg-gradient-to-r ${g.color} h-2 rounded-full`}
                    style={{ width: `${Math.min(100, g.accuracy)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    ) : (
      <p className="text-indigo-300 bg-indigo-800/20 rounded-lg p-6 text-center">
        You haven't played any games yet.
      </p>
    )}

    <SectionTitle icon={<TrendingUp className="h-5 w-5 text-indigo-400" />} title="Your Progress" />
    <div className="bg-indigo-800/20 rounded-lg p-4 space-y-2">
      {user.points < 100 ? (
        <LevelProgress level="2" current={user.points} max={100} />
      ) : user.points < 300 ? (
        <LevelProgress level="3" current={user.points} max={300} />
      ) : (
        <LevelProgress level="MAX" current={user.points} max={user.points} />
      )}
    </div>
  </div>
);

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center space-x-2 mb-4">
    {icon}
    <h3 className="text-xl font-bold text-white">{title}</h3>
  </div>
);

const MiniStat = ({ label, value }) => (
  <div className="bg-indigo-900/50 px-2 py-1 rounded text-sm">
    <span className="text-indigo-300">{label}:</span> <span className="text-white">{value}</span>
  </div>
);

const LevelProgress = ({ level, current, max }) => (
  <>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-indigo-300">
        {level === 'MAX' ? 'Maximum Level Reached!' : `Progress to Level ${level}`}
      </span>
      <span className="text-white">{current}/{max} points</span>
    </div>
    <div className="overflow-hidden h-2 rounded-full bg-indigo-900">
      <div
        className={`h-2 rounded-full ${
          level === '2'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
            : level === '3'
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
            : 'bg-gradient-to-r from-yellow-500 to-orange-500'
        }`}
        style={{ width: `${Math.min(100, (current / max) * 100)}%` }}
      ></div>
    </div>
  </>
);

const StatsSection = ({ gameStats, user, renderProgressBar }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {gameStats.map((game, idx) => (
        <div key={idx} className="bg-indigo-800/20 rounded-lg p-4 space-y-4">
          <h4 className="text-white font-medium mb-2">{game.name} Stats</h4>
          {[
            { label: 'Games Played', value: game.played, max: 20 },
            { label: 'High Score', value: game.score, max: 500 },
            { label: 'Accuracy', value: game.accuracy.toFixed(1), max: 100 },
          ].map((stat, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-indigo-300">{stat.label}</span>
                <span className="text-white">{stat.value}{stat.label === 'Accuracy' ? '%' : ''}</span>
              </div>
              {renderProgressBar((+stat.value / stat.max) * 100, game.color)}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Profile;
