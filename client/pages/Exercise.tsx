import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface ExerciseSession {
  id: string;
  petName: string;
  activityType: 'walk' | 'run' | 'play' | 'swim' | 'fetch' | 'agility';
  duration: number; // in minutes
  distance?: number; // in miles/km
  intensity: 'low' | 'medium' | 'high';
  notes: string;
  date: string;
  calories?: number;
}


export default function Exercise() {
  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    activityType: '' as ExerciseSession['activityType'] | '',
    duration: '',
    distance: '',
    intensity: 'medium' as ExerciseSession['intensity'],
    notes: '',
    date: new Date().toISOString().split('T')[0],
    calories: ''
  });

  useEffect(() => {
    // Mock data
    setSessions([
      {
        id: '1',
        petName: 'Buddy',
        activityType: 'walk',
        duration: 30,
        distance: 2.5,
        intensity: 'medium',
        notes: 'Great walk in the park, very energetic!',
        date: '2024-01-20',
        calories: 150
      },
      {
        id: '2',
        petName: 'Luna',
        activityType: 'fetch',
        duration: 20,
        intensity: 'high',
        notes: 'Played fetch in the backyard, lots of running',
        date: '2024-01-19',
        calories: 120
      },
      {
        id: '3',
        petName: 'Max',
        activityType: 'run',
        duration: 45,
        distance: 4.2,
        intensity: 'high',
        notes: 'Morning jog together, Max kept up great pace',
        date: '2024-01-18',
        calories: 280
      }
    ]);
  }, []);

  const activityColors = {
    walk: 'from-blue-500 to-cyan-600',
    run: 'from-red-500 to-orange-600',
    play: 'from-yellow-500 to-amber-600',
    swim: 'from-cyan-500 to-blue-600',
    fetch: 'from-green-500 to-emerald-600',
    agility: 'from-purple-500 to-pink-600'
  };

  const activityIcons = {
    walk: '🚶',
    run: '🏃',
    play: '🎾',
    swim: '🏊',
    fetch: '🎾',
    agility: '🏃‍♂️'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: ExerciseSession = {
      id: Date.now().toString(),
      petName: formData.petName,
      activityType: formData.activityType as ExerciseSession['activityType'],
      duration: Number(formData.duration),
      distance: formData.distance ? Number(formData.distance) : undefined,
      intensity: formData.intensity,
      notes: formData.notes,
      date: formData.date,
      calories: formData.calories ? Number(formData.calories) : undefined
    };
    setSessions([newSession, ...sessions]);
    setFormData({
      petName: '', activityType: '', duration: '', distance: '', 
      intensity: 'medium', notes: '', date: new Date().toISOString().split('T')[0], calories: ''
    });
  };

  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
  const totalDistance = sessions.reduce((sum, session) => sum + (session.distance || 0), 0);
  const averageIntensity = sessions.length > 0 ? 
    sessions.filter(s => s.intensity === 'high').length / sessions.length * 100 : 0;

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg" 
          alt="Dogs exercising"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-8 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Active golden retriever"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-6 rounded-tr-3xl"
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            🏃 Exercise Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor your pet's physical activity and fitness progress
          </p>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalMinutes}</div>
              <p className="text-gray-600">Total Minutes</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{Math.round(totalDistance * 10) / 10}</div>
              <p className="text-gray-600">Miles Covered</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{sessions.length}</div>
              <p className="text-gray-600">Total Sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Session Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
          <CardHeader>
            <CardTitle>Log Exercise Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Pet Name"
                  value={formData.petName}
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  required
                />
                <Select value={formData.activityType} onValueChange={(value: ExerciseSession['activityType']) => setFormData({...formData, activityType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Activity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walk">🚶 Walk</SelectItem>
                    <SelectItem value="run">🏃 Run</SelectItem>
                    <SelectItem value="play">🎾 Play</SelectItem>
                    <SelectItem value="swim">🏊 Swimming</SelectItem>
                    <SelectItem value="fetch">🎾 Fetch</SelectItem>
                    <SelectItem value="agility">🏃‍♂️ Agility</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Duration (min)"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Distance (miles)"
                  value={formData.distance}
                  onChange={(e) => setFormData({...formData, distance: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={formData.intensity} onValueChange={(value: ExerciseSession['intensity']) => setFormData({...formData, intensity: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Low Intensity</SelectItem>
                    <SelectItem value="medium">🟡 Medium Intensity</SelectItem>
                    <SelectItem value="high">🔴 High Intensity</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  placeholder="Calories burned"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                />
              </div>
              <Textarea
                placeholder="Notes about the exercise session..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Log Exercise Session
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <Card key={session.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activityColors[session.activityType]} flex items-center justify-center`}>
                    <span className="text-white text-lg">{activityIcons[session.activityType]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {session.activityType.charAt(0).toUpperCase() + session.activityType.slice(1)} Session
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {session.petName} • {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                    </p>
                    {session.distance && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Distance:</span> {session.distance} miles
                      </p>
                    )}
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                      session.intensity === 'low' ? 'bg-green-100 text-green-800' :
                      session.intensity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.intensity.charAt(0).toUpperCase() + session.intensity.slice(1)} Intensity
                    </span>
                    {session.calories && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Calories burned:</span> {session.calories}
                      </p>
                    )}
                    <p className="text-gray-700">{session.notes}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sessions.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏃</div>
              <p className="text-gray-600 text-lg">No exercise sessions logged yet. Start tracking your pet's activity!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
