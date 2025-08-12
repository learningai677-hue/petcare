import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function Index() {
  const quickStats = [
    {
      title: "Active Pets",
      value: "3",
      change: "+1 this month",
      icon: "🐕",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Upcoming Reminders",
      value: "8",
      change: "Next: Feed Buddy",
      icon: "⏰",
      color: "from-emerald-500 to-cyan-600"
    },
    {
      title: "This Month's Expenses",
      value: "$324",
      change: "-12% from last month",
      icon: "💰",
      color: "from-rose-500 to-pink-600"
    },
    {
      title: "Training Sessions",
      value: "15",
      change: "+5 this week",
      icon: "🎓",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const recentActivities = [
    { type: "reminder", text: "Fed Buddy - Morning meal", time: "2 hours ago", icon: "🍽️" },
    { type: "exercise", text: "Walked Luna for 30 minutes", time: "5 hours ago", icon: "🚶" },
    { type: "photo", text: "Added new photo of Whiskers", time: "1 day ago", icon: "📸" },
    { type: "vet", text: "Scheduled vet appointment for Max", time: "2 days ago", icon: "🏥" },
    { type: "training", text: "Buddy learned 'high-five' command", time: "3 days ago", icon: "🎾" }
  ];

  const upcomingEvents = [
    { event: "Vet Appointment - Luna", date: "Tomorrow, 2:00 PM", icon: "🏥", urgent: true },
    { event: "Grooming - Buddy", date: "Dec 28, 10:00 AM", icon: "✂️", urgent: false },
    { event: "Training Session - Max", date: "Dec 30, 4:00 PM", icon: "🎓", urgent: false },
    { event: "Vaccination Due - Whiskers", date: "Jan 5, 2024", icon: "💉", urgent: true }
  ];

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg" 
          alt="Happy dogs"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-5 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Golden retriever"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-3 rounded-tr-3xl"
        />
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg" 
            alt="Cute kitten"
            className="absolute top-1/3 right-1/4 w-32 h-48 object-cover opacity-8 rounded-2xl transform rotate-12"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your pets today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <span className="text-white text-xl">{stat.icon}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-blue-600">📊</span>
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-orange-600">📅</span>
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${event.urgent ? 'border-l-red-400 bg-red-50' : 'border-l-blue-400 bg-blue-50'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{event.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.event}</p>
                        <p className="text-xs text-gray-600">{event.date}</p>
                      </div>
                      {event.urgent && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Urgent</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-green-600">⚡</span>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Link to="/reminders">
                    <span className="text-lg">⏰</span>
                    <span className="text-xs">Add Reminder</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50">
                  <Link to="/photo-journal">
                    <span className="text-lg">📸</span>
                    <span className="text-xs">Add Photo</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50">
                  <Link to="/exercise">
                    <span className="text-lg">🏃</span>
                    <span className="text-xs">Log Exercise</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2 hover:bg-yellow-50">
                  <Link to="/chatbot">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs">Ask AI</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
