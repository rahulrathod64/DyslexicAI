"use client";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    const newChat = [...chat, { sender: "user", text: query }];
    setChat(newChat);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat/", {
        message: query,
      });
      console.log("Actual Res: ", res);
      const responseText = res.data.response;
      console.log("Response: ", responseText);
      setChat([...newChat, { sender: "bot", text: responseText }]);
    } catch (err) {
      setChat([
        ...newChat,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition cursor-pointer"
        >
          💬 Chat with AI
        </button>
      ) : (
        <div className="w-80 sm:w-96 h-[32rem] bg-zinc-900 border border-purple-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-purple-800 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">DyslexiAI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 text-lg cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="flex-1 py-2 px-3 text-sm overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-700">
            {chat.length === 0 && !loading && (
              <div className="text-gray-400 text-sm">
                Ask me anything about dyslexia
              </div>
            )}
            {chat.map((entry, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl whitespace-pre-wrap max-w-[90%] ${
                  entry.sender === "user"
                    ? "bg-purple-700 text-white self-end ml-auto"
                    : "bg-zinc-800 text-gray-200 border border-purple-700"
                }`}
              >
                <ReactMarkdown
                  components={{
                    strong: ({ node, ...props }) => (
                      <strong
                        className="text-purple-300 font-semibold"
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="text-purple-400 italic" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li
                        className="ml-4 list-disc text-sm text-gray-300"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-purple-400 font-bold mt-2 mb-1 text-sm"
                        {...props}
                      />
                    ),
                  }}
                >
                  {entry.text}
                </ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="bg-zinc-800 text-purple-300 px-3 py-2 rounded-xl max-w-[90%] border border-purple-700">
                Thinking...
              </div>
            )}
          </div>
          <div className="p-3 bg-zinc-800 border-t border-zinc-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-zinc-700 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleAsk}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
