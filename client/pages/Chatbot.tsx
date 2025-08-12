import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Pet Care Assistant. Ask me anything about taking care of your furry friends! 🐾",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const botResponses = [
    "That's a great question about pet care! Regular feeding schedules are very important for your pet's health.",
    "Remember to always provide fresh water for your pet and ensure they get enough exercise daily.",
    "If you're concerned about your pet's behavior, it's always best to consult with a veterinarian.",
    "Proper grooming helps keep your pet healthy and happy. Regular brushing can prevent matting and reduce shedding.",
    "Training your pet with positive reinforcement is the most effective and humane approach.",
    "Different pets have different dietary needs. Make sure you're feeding appropriate food for your pet's age and species."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
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
          className="absolute bottom-0 left-0 w-72 h-72 object-cover opacity-12 rounded-tr-3xl"
        />
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg" 
            alt="Labrador dogs"
            className="absolute top-1/4 left-16 w-40 h-28 object-cover opacity-8 rounded-2xl transform rotate-12"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg" 
            alt="Cute kitten"
            className="absolute top-1/2 right-20 w-24 h-36 object-cover opacity-15 rounded-xl transform -rotate-6"
            style={{ animationDelay: '4s' }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 h-screen flex flex-col">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            💬 Pet Care Chatbot
          </h1>
          <p className="text-lg text-gray-600">
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
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.isUser
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
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
      </div>
    </div>
  );
}
