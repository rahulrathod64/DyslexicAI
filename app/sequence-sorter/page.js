'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, Timer, Award, ArrowLeft } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { qModel } from '@/utils/qlearning';
import { useUser } from '@/context/UserContext';
import { useGame } from '@/context/GameContext';

const MONTH_SERIES = [
  ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  ['February', 'March', 'April', 'May', 'June', 'July', 'August'],
  ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
  ['April', 'May', 'June', 'July', 'August', 'September', 'October'],
  ['May', 'June', 'July', 'August', 'September', 'October', 'November'],
  ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ['July', 'August', 'September', 'October', 'November', 'December', 'January'],
  ['August', 'September', 'October', 'November', 'December', 'January', 'February'],
  ['September', 'October', 'November', 'December', 'January', 'February', 'March'],
  ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
  ['November', 'December', 'January', 'February', 'March', 'April', 'May'],
  ['December', 'January', 'February', 'March', 'April', 'May', 'June'],
];

const EASY_SERIES = [
  ['1', '2', '3', '4', '5'],
  ['One', 'two', 'three', 'four', 'five'],
  ['six', 'seven', 'eight', 'nine', 'ten'],
  ['6', '7', '8', '9', '10'],
];

const MEDIUM_SERIES = [
  ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'],
  ['sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
  ['Tens', 'Hundreds', 'Thousands', 'Ten thousand', 'Hundred thousand'],
  ['January', 'February', 'March', 'April', 'May'],
];

const SEQUENCES = {
  easy: {
    items: EASY_SERIES[Math.floor(Math.random() * EASY_SERIES.length)],
    time: 60,
  },
  medium: {
    items: MEDIUM_SERIES[Math.floor(Math.random() * MEDIUM_SERIES.length)],
    time: 45,
  },
  hard: {
    items: MONTH_SERIES[Math.floor(Math.random() * MONTH_SERIES.length)],
    time: 55,
  },
};

export default function SequenceSorterGame() {
  const { user, updateGameStats } = useUser();
  const { addScore } = useGame();
  const [items, setItems] = useState([]);
  const [reverseItems, setReverseItems] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(SEQUENCES[difficulty].time);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [phase, setPhase] = useState(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endRound(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    const sequence = SEQUENCES[difficulty].items;
    const shuffled = [...sequence]
      .sort(() => Math.random() - 0.5)
      .map(item => ({ id: item.toLowerCase(), value: item }));

    setReverseItems(shuffled);
    setItems([]);
    setTimeLeft(SEQUENCES[difficulty].time);
    setIsPlaying(true);
    setPhase('reverse');
  };

  const handleDragEnd = (event, isReverse) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const updateItems = (items) => {
      const oldIndex = items.findIndex(item => item.id === activeId);
      const newIndex = items.findIndex(item => item.id === overId);
      return arrayMove(items, oldIndex, newIndex);
    };

    if (isReverse) {
      setReverseItems(updateItems);
    } else {
      setItems(updateItems);
    }
  };

  const checkPhase = () => {
    const originalSequence = SEQUENCES[difficulty].items;
    const reverseSequence = [...originalSequence].reverse();

    if (phase === 'reverse') {
      const currentReverse = reverseItems.map(item => item.value);
      return JSON.stringify(currentReverse) === JSON.stringify(reverseSequence);
    } else if (phase === 'original') {
      const currentOriginal = items.map(item => item.value);
      return JSON.stringify(currentOriginal) === JSON.stringify(originalSequence);
    }
    return false;
  };

  const endRound = (submitted) => {
    const correct = submitted && checkPhase();

    if (phase === 'reverse') {
      if (correct) {
        // Move to original phase using same shuffled items
        const preserved = reverseItems.map(item => ({ ...item }));
        setItems(preserved);
        setTimeLeft(SEQUENCES[difficulty].time);
        setPhase('original');
      } else {
        finishRound(false);
      }
    } else if (phase === 'original') {
      finishRound(correct);
    }
  };

  const handleGameCompletion = () => {
    const finalAccuracy = rounds > 0 ? (score / (rounds * 2)) * 100 : 0;
    
    updateGameStats('sequenceSorter', {
      score: score,
      accuracy: finalAccuracy,
    });
    
    if (user) {
      addScore('sequenceSorter', {
        userId: user.id,
        username: user.name,
        score: score,
        accuracy: finalAccuracy,
        difficulty: difficulty,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const finishRound = (success) => {
    const timeBonus = success ? Math.floor(timeLeft * 0.5) : 0;
    const roundScore = success ? 10 + timeBonus : 0;

    setScore(prev => prev + roundScore);
    setStreak(success ? prev => prev + 1 : 0);
    setRounds(prev => prev + 1);
    setIsPlaying(false);
    setPhase(null);

    if (success) {
      setShowCompletionMessage(true);
      setTimeout(() => {
        setShowCompletionMessage(false);
      }, 1500);
    }

    setPerformanceHistory(prev => [...prev, {
      round: rounds + 1,
      score: roundScore,
      difficulty,
      timeBonus,
    }]);

    if ((rounds + 1) % 5 === 0) {
      const accuracy = streak / 5;
      const nextDifficulty = qModel.getNextAction(streak, 5, difficulty);

      qModel.update(
        streak,
        5,
        difficulty,
        roundScore,
        streak,
        5
      );

      setDifficulty(nextDifficulty);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-800 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-300 flex items-center gap-2">
              <Brain className="w-8 h-8" />
              Sequence Sorter
            </h1>
            <Link href="/" className="...">
              <div className="flex items-center text-indigo-300 hover:text-indigo-100">
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span>Dashboard</span>
              </div>
            </Link>

          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-400">
                Level: {difficulty.toUpperCase()}
              </span>
              <div className="flex items-center gap-4">
                <Timer className="w-5 h-5 text-indigo-400" />
                <span className="text-xl font-bold text-indigo-300">{timeLeft}s</span>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${(timeLeft / SEQUENCES[difficulty].time) * 100}% `}}
              />
            </div>
          </div>

          {!isPlaying ? (
            <button
              onClick={startGame}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Game
            </button>
          ) : (
            <>
              <div className="space-y-6">
                {phase === 'reverse' && (
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Arrange in Reverse Order</h2>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEnd(event, true)}
                    >
                      <SortableContext items={reverseItems} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          {reverseItems.map((item) => (
                            <SortableItem key={item.id} id={item.id}>
                              {item.value}
                            </SortableItem>
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}

                {phase === 'original' && (
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Arrange in Original Order</h2>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEnd(event, false)}
                    >
                      <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <SortableItem key={item.id} id={item.id}>
                              {item.value}
                            </SortableItem>
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => endRound(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>

                <Link href="/">
                  <div className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-center">
                    Finish Game
                  </div>
                </Link>

              </div>
            </>
          )}

          {showCompletionMessage && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg z-10 animate-bounce">
              <div className="text-xl font-bold flex items-center">
                <Award className="mr-2 h-6 w-6" /> Perfect Sequence!
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-8 w-8 text-indigo-300" />
            <h2 className="text-2xl font-bold text-gray-300">Performance Dashboard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-900/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-200 mb-2">Current Status</h3>
              <p className="text-gray-300">Score: {score}</p>
              <p className="text-gray-300">Streak: {streak}</p>
            </div>

            <div className="bg-indigo-900/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-200 mb-2">Level Info</h3>
              <p className="text-gray-300">Current: {difficulty}</p>
              <p className="text-gray-300">Items: {SEQUENCES[difficulty].items.length}</p>
            </div>
          </div>

          {performanceHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Progress Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceHistory}>
                  <XAxis dataKey="round" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563', color: 'white' }} />
                  <Line type="monotone" dataKey="score" stroke="#4F46E5" name="Score" />
                  <Line type="monotone" dataKey="timeBonus" stroke="#059669" name="Time Bonus" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
 </div>
)};
