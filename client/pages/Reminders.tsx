import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface Reminder {
  id: string;
  petName: string;
  type: string;
  datetimeISO: string;
  message: string;
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    type: '',
    datetime: '',
    message: ''
  });

  const petTypeImages = {
    feed: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    walk: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    vet: "https://cdn-icons-png.flaticon.com/512/2913/2913750.png"
  };

  useEffect(() => {
    // Mock data for demonstration
    setReminders([
      {
        id: '1',
        petName: 'Buddy',
        type: 'feed',
        datetimeISO: new Date().toISOString(),
        message: 'Morning breakfast time!'
      }
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReminder: Reminder = {
      id: Date.now().toString(),
      petName: formData.petName,
      type: formData.type,
      datetimeISO: new Date(formData.datetime).toISOString(),
      message: formData.message
    };
    setReminders([...reminders, newReminder]);
    setFormData({ petName: '', type: '', datetime: '', message: '' });
  };

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg" 
          alt="Happy dogs playing"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-10 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Golden retriever"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-8 rounded-tr-3xl"
        />
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg" 
            alt="Cute kitten"
            className="absolute top-1/3 right-1/4 w-32 h-48 object-cover opacity-15 rounded-2xl transform rotate-12"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🗓️ Reminders
          </h1>
          <p className="text-gray-600 text-lg">
            Set and manage feeding, walking, and vet visit reminders for your pets
          </p>
        </div>

        {/* Add Reminder Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Add New Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Pet Name"
                  value={formData.petName}
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  required
                />
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Reminder Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feed">Feed</SelectItem>
                    <SelectItem value="walk">Walk</SelectItem>
                    <SelectItem value="vet">Vet Visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="datetime-local"
                value={formData.datetime}
                onChange={(e) => setFormData({...formData, datetime: e.target.value})}
                required
              />
              <Textarea
                placeholder="Reminder Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Add Reminder
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reminders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className={`bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 ${
              reminder.type === 'feed' ? 'border-l-green-400' :
              reminder.type === 'walk' ? 'border-l-blue-400' : 'border-l-red-400'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img
                      src={petTypeImages[reminder.type as keyof typeof petTypeImages]}
                      alt={reminder.type}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {reminder.petName} — {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(reminder.datetimeISO).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{reminder.message}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {reminders.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3595/3595450.png"
                alt="No reminders"
                className="w-24 h-24 mx-auto mb-6 opacity-50"
              />
              <p className="text-gray-600 text-lg">No reminders yet. Add your first reminder above!</p>
            </CardContent>
          </Card>
        )}

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
