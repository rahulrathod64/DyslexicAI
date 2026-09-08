import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatbotWidget from "@/components/chatbot";
import { UserProvider } from "@/context/UserContext";
import { GameProvider } from "@/context/GameContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dyslexic Ai",
  description: "Dyslexia Detection and Therapy platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        
        <div className="black">
          <UserProvider>
          <GameProvider>
        <Navbar/>
        {children}
        <ChatbotWidget/>
        <Footer/>
        </GameProvider>
        </UserProvider>
          </div>
    
      </body>
    </html>
  );
}
