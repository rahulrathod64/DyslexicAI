'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const stories_others = [
  {
    title: "Overcoming Challenges with Dyslexia",
    videoUrl: "https://www.youtube.com/watch?v=zafiGBrFkRM",
    description: "This TED Talk explores how individuals with dyslexia can thrive with the right mindset and support."
  },
  {
    title: "Dyslexia and Creativity",
    videoUrl: "https://www.youtube.com/watch?v=CYM40HN82l4",
    description: "A documentary about how dyslexia contributes to unique creative talents."
  },
  {
    title: "How I Learned to Read with Dyslexia",
    videoUrl: "https://www.youtube.com/watch?v=tjl0_K-FPBM",
    description: "A personal story of a dyslexic individual's journey to literacy and confidence."
  },
];

export default function CommunitySupportPage() {
  const [posts,setposts]=useState([]);
  async function doit(params) {
    try {
        //get the array of posts and show them in UI
        const response = await fetch('/appi/getposts', { method: 'POST' });
        const { stories } = await response.json();
        console.log("Stories: ",stories);
        setposts(stories)
    } catch (err) {
        alert(err.response?.data?.error || "Error");
    }
  }
  useEffect(()=>{
    doit();
  },[])

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Community Voices
        </h1>
        <p className="text-center text-gray-300 mb-10">
          Real stories from real people – sharing experiences, spreading awareness, and uplifting others with dyslexia.
        </p>

        <div className="text-center mb-8">
          <Link href="/share-story">
            <button className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-all">
              📹 Share Your Story
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories_others.map((story, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-purple-700 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <a href={story.videoUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`https://img.youtube.com/vi/${story.videoUrl.split('v=')[1]}/hqdefault.jpg`}
                    alt={story.title}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90"
                  />
                </a>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-purple-400 mb-2">
                  {story.title}
                </h2>
                <p className="text-sm text-gray-300">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {posts.map((story, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-purple-700 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <a href={story.videoLinks} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`https://img.youtube.com/vi/${story.videoLinks.split('v=')[1]}/hqdefault.jpg`}
                    alt={story.title}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90"
                  />
                </a>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-purple-400 mb-2">
                  {story.title}
                </h2>
                <p className="text-sm text-gray-300">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
