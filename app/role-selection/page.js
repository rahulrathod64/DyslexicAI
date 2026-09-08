'use client'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start py-8 min-h-screen text-white bg-black space-y-6">
      <h1 className="text-4xl font-bold">Who are you?</h1>
      <button onClick={() => router.push("/signup/student")} className="px-6 hover:text-pink-200 hover:underline  cursor-pointer py-2 bg-purple-600 rounded-xl">I'm a Student</button>
      <button onClick={() => router.push("/signup/parent")} className="px-6 cursor-pointer hover:underline hover:text-purple-200  py-2 bg-pink-600 rounded-xl">I'm a Parent</button>
    </div>
  );
}
