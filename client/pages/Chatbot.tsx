import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import Layout from "@/components/Layout";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI-powered Pet Care Assistant! 🐾\n\nI can help you with:\n• Pet health and nutrition advice\n• Training tips and behavior guidance\n• Grooming and care routines\n• Emergency pet care information\n• Breed-specific advice\n\nWhat would you like to know about your pet today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      text: "🤔 Thinking...",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // Call your backend chat endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      const data = await response.json();

      // Remove typing indicator and add real response
      setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));

      if (data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't process your request. Please try again.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);

      // Remove typing indicator and show error
      setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please check your connection and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg"
          alt="Happy woman with dogs"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-10 rounded-bl-3xl"
        />
        <img
          src="https://images.pexels.com/photos/29217040/pexels-photo-29217040.jpeg"
          alt="Pug portrait"
          className="absolute bottom-0 left-72 w-72 h-72 object-cover opacity-12 rounded-tr-3xl"
        />
        <div className="animate-float">
          <img
            src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg"
            alt="Labrador dogs"
            className="absolute top-1/4 left-16 w-40 h-28 object-cover opacity-8 rounded-2xl transform rotate-12"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="animate-float">
          <img
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg"
            alt="Cute kitten"
            className="absolute top-1/2 right-20 w-24 h-36 object-cover opacity-15 rounded-xl transform -rotate-6"
            style={{ animationDelay: "4s" }}
          />
        </div>
      </div>

      <div className="relative z-10 p-8 h-screen flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            💬 AI Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            Get instant answers to your pet care questions anytime, anywhere
          </p>
        </div>

        {/* Chat Container */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2044/2044552.png"
                alt="Chatbot"
                className="w-8 h-8"
              />
              Pet Care Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.isUser
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none"
                          : message.id === "typing"
                            ? "bg-blue-50 text-blue-600 rounded-bl-none border border-blue-200"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p
                        className={`whitespace-pre-wrap ${message.id === "typing" ? "animate-pulse" : ""}`}
                      >
                        {message.text}
                      </p>
                      {message.id !== "typing" && (
                        <p
                          className={`text-xs mt-2 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-white/50 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your pet..."
                  className="flex-1"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Send
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Attribution */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg inline-block shadow-lg">
            <p className="text-lg font-bold font-serif tracking-wide">
              Made by Tanishka Badhai and Jiya Kataria
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
