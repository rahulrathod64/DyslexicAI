'use client'
import axios from "axios";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShareStoryPage() {
  const [title, setTitle] = useState('');
  const [videoLinks, setVideoLinks] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await axios.post('/appi/post',{ videoLinks,title, description } );
        // console.log("res: ",res.json());
        router.replace('/community');
    } catch (err) {
        alert(err || "Error");
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-purple-700 rounded-xl p-8 w-full max-w-lg space-y-4 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Share Your Story</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="YouTube Link"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white focus:outline-none"
          value={videoLinks}
          onChange={(e) => setVideoLinks(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white h-24 resize-none focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-purple-600 cursor-pointer hover:bg-purple-700 px-5 py-2 rounded font-semibold w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
