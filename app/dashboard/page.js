'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Award, 
  Brain, 
  Sparkles,
  Music,
  TrendingUp,
  Medal,
  Volume2
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useGame } from '@/context/GameContext';
import BadgeDisplay from '@/components/BadgeDisplay';

const Dashboard = () => {
  const router=useRouter();
  const { user } = useUser();
  const { getTopScores } = useGame();
  const [activeTab, setActiveTab] = useState('games');

  if (!user) {
    return <div className="text-center p-10">Loading...</div>;
  }

  const games = [
    {
      id: 'wordBuilder',
      name: 'Word Builder',
      description: 'Enhance vocabulary by building words from letters',
      icon: <Brain className="w-8 h-8 text-indigo-400" />,
      path: '/word-build',
      stats: user.gameStats?.wordBuilder || { played: 0, highScore: 0, accuracy: 0 },
      color: 'from-purple-500 to-indigo-600',
      progress: Math.min(100, ((user.gameStats?.wordBuilder?.played || 0) / 10) * 100),
    },
    {
      id: 'rhymeRace',
      name: 'Rhyme Race',
      description: 'Improve phonemic awareness by identifying rhyming words',
      icon: <Music className="w-8 h-8 text-pink-400" />,
      path: '/rhyme-race',
      stats: user.gameStats?.rhymeRace || { played: 0, highScore: 0, accuracy: 0 },
      color: 'from-pink-500 to-red-600',
      progress: Math.min(100, ((user.gameStats?.rhymeRace?.played || 0) / 10) * 100),
    },
    {
      id: 'phonics',
      name: 'Phonics Master',
      description: 'Learn letter sounds and phonological awareness',
      icon: <Volume2 className="w-8 h-8 text-green-400" />,
      path: '/phonics',
      stats: user.gameStats?.phonics || { played: 0, highScore: 0, accuracy: 0 },
      color: 'from-green-500 to-teal-600',
      progress: Math.min(100, ((user.gameStats?.phonics?.played || 0) / 10) * 100),
    }
  ];

  return (
    <div className="max-w-7xl mx-auto my-4 w-[90vw]">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl my-4 font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
          Learning Dashboard
        </h1>
        <p className="text-lg text-indigo-200 max-w-2xl text-center">
          Welcome to your personalized learning journey! Play games, earn badges, and track your progress.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-700 rounded-lg">
              <TrendingUp className="h-6 w-6 text-indigo-200" />
            </div>
            <div className="ml-4">
              <p className="text-indigo-300 text-sm">Total Points</p>
              <p className="text-white text-2xl font-bold">{user.points}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-purple-700 rounded-lg">
              <Sparkles className="h-6 w-6 text-purple-200" />
            </div>
            <div className="ml-4">
              <p className="text-purple-300 text-sm">Games Played</p>
              <p className="text-white text-2xl font-bold">
                {(user.gameStats?.wordBuilder?.played || 0) + 
                 (user.gameStats?.rhymeRace?.played || 0) + 
                 (user.gameStats?.phonics?.played || 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-800 to-pink-900 rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-pink-700 rounded-lg">
              <Award className="h-6 w-6 text-pink-200" />
            </div>
            <div className="ml-4">
              <p className="text-pink-300 text-sm">Badges Earned</p>
              <p className="text-white text-2xl font-bold">{user.badges.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-4 shadow-lg">
          <div className="flex items-center">
            <div className="p-2 bg-blue-700 rounded-lg">
              <Medal className="h-6 w-6 text-blue-200" />
            </div>
            <div className="ml-4">
              <p className="text-blue-300 text-sm">Highest Score</p>
              <p className="text-white text-2xl font-bold">
                {Math.max(
                  user.gameStats?.wordBuilder?.highScore || 0,
                  user.gameStats?.rhymeRace?.highScore || 0,
                  user.gameStats?.phonics?.highScore || 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-indigo-700">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab('games')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'games'
                  ? 'border-indigo-400 text-indigo-300'
                  : 'border-transparent text-indigo-400 hover:text-indigo-300 hover:border-indigo-700'
              }`}
            >
              Available Games
            </button>
            <button
              onClick={() => router.replace('/leaderboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'badges'
                  ? 'border-indigo-400 text-indigo-300'
                  : 'border-transparent text-indigo-400 hover:text-indigo-300 hover:border-indigo-700'
              }`}
            >
              Leader Board
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leaderboard'
                  ? 'border-indigo-400 text-indigo-300'
                  : 'border-transparent text-indigo-400 hover:text-indigo-300 hover:border-indigo-700'
              }`}
            >
              Top Players
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}

<div className="animate-fadeIn">
  {activeTab === 'games' && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {games.map((game) => (
        <Link
          key={game.id}
          href={game.path}
          className="bg-indigo-800/30 hover:bg-indigo-800/60 transition-all rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-900/40 transform hover:-translate-y-1 duration-300"
        >
          <div className={`h-2 bg-gradient-to-r ${game.color}`} style={{ width: `${game.progress}%` }}></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${game.color}`}>
                {game.icon}
              </div>
              <h3 className="ml-4 text-xl font-bold text-white">{game.name}</h3>
            </div>
            <p className="text-indigo-200 mb-4">{game.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-indigo-900/50 rounded-lg p-2">
                <p className="text-indigo-300">Games Played</p>
                <p className="text-white font-semibold">{game.stats.played}</p>
              </div>
              <div className="bg-indigo-900/50 rounded-lg p-2">
                <p className="text-indigo-300">High Score</p>
                <p className="text-white font-semibold">{game.stats.highScore}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )}

  {activeTab === 'badges' && (
    <div>
      <BadgeDisplay badges={user.badges} />
    </div>
  )}

  {activeTab === 'leaderboard' && (
    <div className="bg-indigo-800/30 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Top Players This Week</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries({
          'Word Builder': getTopScores('wordBuilder', 3),
          'Rhyme Race': getTopScores('rhymeRace', 3),
          'Phonics': getTopScores('phonics', 3)
        }).map(([game, scores]) => (
          <div key={game} className="bg-indigo-900/50 rounded-lg p-4">
            <h4 className="text-indigo-300 font-bold mb-2">{game}</h4>
            {scores.length > 0 ? (
              <ul className="space-y-2">
                {scores.map((score, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`inline-block w-5 text-center ${
                        index === 0 ? 'text-yellow-400' : 
                        index === 1 ? 'text-gray-300' : 'text-amber-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="ml-2 text-white">{score.username}</span>
                    </div>
                    <span className="text-indigo-200">{score.score}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-indigo-400">No scores yet</p>
            )}
            <Link 
              href="/leaderboard" 
              className="mt-4 inline-block text-indigo-300 hover:text-indigo-100 text-sm font-medium"
            >
              View full leaderboard
            </Link>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default Dashboard;
// 'use client'
// import { Sparkles, BookOpen, Volume2, Puzzle } from 'lucide-react';
// import '@/app/script.css'
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//   const router=useRouter();

//   const games = [
//     {
//       name: "Phonics Game",
//       desc: "Sound recognition & letter pairing",
//       benefits: [
//         "Improves phonemic awareness",
//         "Builds letter-sound relationships",
//         "Enhances auditory processing",
//         "Increases vocabulary",
//         "Boosts confidence in reading"
//       ]
//     },
//     {
//       name: "Rhyme Race",
//       desc: "Find rhyming patterns",
//       benefits: [
//         "Enhances auditory discrimination",
//         "Supports word prediction skills",
//         "Improves listening memory",
//         "Fosters reading rhythm",
//         "Develops sound-based sorting"
//       ]
//     },
//     {
//       name: "Word Build Game",
//       desc: "Construct meaningful words",
//       benefits: [
//         "Strengthens word formation",
//         "Encourages spelling accuracy",
//         "Builds vocabulary contextually",
//         "Improves sequencing ability",
//         "Increases reading fluency"
//       ]
//     }
//   ];

//   function GameCard({ icon: Icon, title, onClick }) {
//     return (
//       <div
//         onClick={onClick}
//         className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 border border-white/10 text-left"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <Icon className="w-6 h-6 text-purple-300" />
//           <h2 className="text-xl font-bold text-white">{title}</h2>
//         </div>
//         <p className="text-sm text-gray-300">
//           Click to start playing and improving reading skills.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black from-purple-900 via-indigo-900 to-indigo-950 text-white p-8 font-sans animate-gradient bg-[length:400%_400%]">
//       {/* Header */}
//       <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-indigo-400 drop-shadow-md">
//         Dyslexi Ai Game Dashboard
//       </h1>

//       {/* Motivational Quote */}
//       <div className="flex justify-center items-center mb-10 text-indigo-300 gap-2 text-lg italic">
//         <Sparkles className="w-5 h-5" />
//         &rdquo;Learning is a treasure that will follow its owner everywhere.&rdquo;
//       </div>

//       {/* Game Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
//         <GameCard icon={Volume2} title="Phonics Game" onClick={() => router.push('/phonics')} />
//         <GameCard icon={Puzzle} title="Rhyme Race" onClick={() => router.push('/rhyme-race')} />
//         <GameCard icon={BookOpen} title="Word Build Game" onClick={() => router.push('/word-build')} />
//       </div>

//       {/* Info Section */}
//       <div className="bg-gray-950 py-16 px-6 text-white text-center">
//       <h2 className="text-4xl font-bold mb-12 text-indigo-300">Why These Games Help with Dyslexia</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
//         {games.map((game, index) => (
//           <div
//             key={index}
//             className="group relative bg-indigo-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center"
//           >
//             <h3 className="text-xl font-bold mb-2">{game.name}</h3>
//             <p className="text-sm text-gray-200">{game.desc}</p>

//             {/* Floating Hover Box */}
//             <div className="reveal-box">
//               <h4 className="text-lg font-semibold mb-2 text-indigo-300">Why It Helps:</h4>
//               <ul className="list-disc text-left pl-5 text-sm space-y-1">
//                 {game.benefits.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

// </div>
// );
// }