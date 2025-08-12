import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Index() {
  const features = [
    {
      title: "🗓️ Reminder Assistant",
      description: "Set and manage feeding, walking, and vet visit reminders for your pets.",
      image: "https://cdn-icons-png.flaticon.com/512/3595/3595450.png",
      href: "/reminders",
      gradient: "from-emerald-400 to-cyan-400"
    },
    {
      title: "🐕 Pet Profiles",
      description: "Create & manage profiles with photos & details.",
      image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      href: "/profiles",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      title: "💬 Pet Care Bot",
      description: "Get instant answers to your pet care questions anytime, anywhere.",
      image: "https://cdn-icons-png.flaticon.com/512/2044/2044552.png",
      href: "/chatbot",
      gradient: "from-blue-400 to-indigo-400"
    },
    {
      title: "📸 Photo Journal",
      description: "Upload daily pics, track your pet's growth and funny moments.",
      image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
      href: "/photo-journal",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      title: "🤝 Delegate Pet Care",
      description: "Allow someone else to view & take care of your pet reminders.",
      image: "https://cdn-icons-png.flaticon.com/512/709/709496.png",
      href: "/delegate",
      gradient: "from-rose-400 to-red-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Animals */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg"
            alt="Happy pets playing"
            className="absolute top-0 right-0 w-80 h-60 object-cover opacity-15 rounded-bl-3xl"
          />
          <img
            src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg"
            alt="Golden retriever"
            className="absolute bottom-0 left-0 w-64 h-64 object-cover opacity-10 rounded-tr-3xl"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-30 animate-pulse" />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                  alt="Pet Care"
                  className="relative w-24 h-24 mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              🐾 Pet Care Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your all-in-one companion for managing your furry friend's health, happiness, and daily care needs
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Background Animals for Features Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg"
            alt="Labrador dogs in nature"
            className="absolute top-20 right-10 w-48 h-32 object-cover opacity-8 rounded-2xl transform rotate-12"
          />
          <img
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg"
            alt="Cute kitten"
            className="absolute bottom-20 left-10 w-40 h-60 object-cover opacity-8 rounded-2xl transform -rotate-12"
          />
          <img
            src="https://images.pexels.com/photos/29217040/pexels-photo-29217040.jpeg"
            alt="Pug portrait"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 object-cover opacity-5 rounded-full"
          />
        </div>

        <div className="relative text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything Your Pet Needs
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive tools to keep your pet healthy and happy
          </p>
        </div>

        {/* Floating Animals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-float">
            <img
              src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg"
              alt="Golden retriever"
              className="absolute top-32 right-20 w-24 h-36 object-cover opacity-15 rounded-xl shadow-lg"
              style={{ animationDelay: '0s' }}
            />
          </div>
          <div className="animate-float">
            <img
              src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg"
              alt="Cute cat"
              className="absolute top-96 left-16 w-20 h-30 object-cover opacity-12 rounded-lg shadow-lg"
              style={{ animationDelay: '1.5s' }}
            />
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`} />
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-lg opacity-20 rounded-full`} />
                    <div className="relative w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <Button variant="ghost" className="group-hover:bg-blue-50 group-hover:text-blue-600">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 overflow-hidden">
        {/* Background Animals for CTA */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg"
            alt="Happy woman with dogs"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of pet owners who trust our platform for their pet's well-being
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
