'use client';
import React from 'react';

const services = [
  {
    title: 'Multilingual Support',
    description: 'Reach learners across diverse linguistic backgrounds with multi-language capabilities.',
  },
  {
    title: 'AI-Powered Assessments',
    description: 'Accurate detection using DBT test by Bangor University and real-time reading assessments.',
  },
  {
    title: 'Real-Time Progress Tracking',
    description: 'Monitor therapy game progress in real-time, ensuring personalized learning journeys.',
  },
  {
    title: 'Collaborative Ecosystem',
    description: 'Empower parents and educators with shared insights into student performance and progress.',
  },
  {
    title: 'Gamified Learning',
    description: 'Engage users with interactive games like Phonics Game, Rhyme Race, and Word Builder.',
  },
  {
    title: 'Expert Guidance',
    description: 'Access specialized help from professionals for children requiring expert intervention.',
  },
  {
    title: 'Supportive Community',
    description: 'Foster motivation and normalize dyslexia with awareness and peer support networks.',
  },
  {
    title: 'Intelligent Chatbot',
    description: 'Real-time symptom explanation and guidance through an AI-powered conversational assistant.',
  },
  {
    title: 'Leaderboard & Badges',
    description: 'Encourage engagement through achievement tracking with badges and leaderboards that celebrate progress and consistency in therapy games.',
  }  
];

const Services = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Our Services
        </h1>
        {/* <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          DyslexiAI offers a comprehensive suite of tools and experiences to empower children, parents, and educators in the early detection and personalized therapy of dyslexia.
        </p> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-700 rounded-2xl shadow-xl p-[2px] hover:shadow-purple-500/50 transition duration-300 ease-in-out"
            >
              <div className="bg-black rounded-2xl h-full p-5 hover:bg-gray-900 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-2 text-purple-400">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
