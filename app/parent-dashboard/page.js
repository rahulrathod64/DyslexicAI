'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Pie } from "recharts";
import { BarChart, Bar as BarComponent, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie as PieComponent, Cell, Legend } from "recharts";
import { useState } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const gameStats = [
  { name: "Phonics Game", score: 85 },
  { name: "Rhyme Race", score: 78 },
  { name: "Word Builder", score: 92 },
];

const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 40 },
  { name: "Week 3", progress: 65 },
  { name: "Week 4", progress: 80 },
  { name: "Week 5", progress: 90 },
];

const ParentsDashboard = () => {
  const [studentName] = useState("Aarav Sharma");

  return (
    <div className="min-h-screen bg-[#10020f] text-white p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">Welcome, Parent of {studentName}</h1>
      <div className="grid md:grid-cols-2 gap-6 w-[90%] mx-auto">
        <Card className="bg-[#1e293b] shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl text-white font-semibold mb-4">Recent Progress</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={progressData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <BarComponent dataKey="progress" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl text-white font-semibold mb-4">Overall Game Stats</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <PieComponent
                  data={gameStats}
                  dataKey="score"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {gameStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </PieComponent>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1e293b] shadow-xl rounded-2xl w-[90%] mx-auto">
        <CardContent className="p-6">
          <h2 className="text-3xl text-white font-semibold mb-4">Game Performance Breakdown</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {gameStats.map((game, index) => (
              <div key={index} className="bg-[#334155] p-4 rounded-xl shadow-md">
                <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                <p className="text-sm text-gray-300">Score: <span className="text-white font-bold">{game.score}%</span></p>
                <div className="mt-2 h-2 w-full bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-400"
                    style={{ width: `${game.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentsDashboard;
