import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reminders() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗓️ Reminder Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Set and manage feeding, walking, and vet visit reminders for your pets
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3595/3595450.png"
              alt="Reminder Assistant"
              className="w-24 h-24 mx-auto mb-6 opacity-50"
            />
            <p className="text-gray-600 mb-8">
              We're working hard to bring you the best reminder system for your pets.
              Stay tuned for updates!
            </p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
