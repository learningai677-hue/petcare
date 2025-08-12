import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface TrainingSession {
  id: string;
  petName: string;
  command: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  success: boolean;
  notes: string;
  date: string;
}

export default function Training() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    command: '',
    difficulty: '' as TrainingSession['difficulty'] | '',
    duration: '',
    success: false,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Mock data
    setSessions([
      {
        id: '1',
        petName: 'Buddy',
        command: 'High Five',
        difficulty: 'intermediate',
        duration: 15,
        success: true,
        notes: 'Great progress! Buddy is getting the hang of it.',
        date: '2024-01-20'
      },
      {
        id: '2',
        petName: 'Luna',
        command: 'Stay',
        difficulty: 'beginner',
        duration: 10,
        success: false,
        notes: 'Still working on holding position for more than 5 seconds.',
        date: '2024-01-19'
      },
      {
        id: '3',
        petName: 'Max',
        command: 'Fetch',
        difficulty: 'beginner',
        duration: 20,
        success: true,
        notes: 'Max loves fetch! Bringing the ball back consistently now.',
        date: '2024-01-18'
      }
    ]);
  }, []);

  const difficultyColors = {
    beginner: 'from-green-500 to-emerald-600',
    intermediate: 'from-yellow-500 to-orange-600',
    advanced: 'from-red-500 to-purple-600'
  };

  const popularCommands = [
    'Sit', 'Stay', 'Come', 'Down', 'Heel', 'Fetch', 'Drop it', 'Leave it',
    'Roll over', 'Shake', 'High five', 'Spin', 'Play dead', 'Speak', 'Quiet'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: TrainingSession = {
      id: Date.now().toString(),
      petName: formData.petName,
      command: formData.command,
      difficulty: formData.difficulty as TrainingSession['difficulty'],
      duration: Number(formData.duration),
      success: formData.success,
      notes: formData.notes,
      date: formData.date
    };
    setSessions([newSession, ...sessions]);
    setFormData({ 
      petName: '', 
      command: '', 
      difficulty: '', 
      duration: '', 
      success: false, 
      notes: '', 
      date: new Date().toISOString().split('T')[0] 
    });
  };

  const successRate = sessions.length > 0 ? Math.round((sessions.filter(s => s.success).length / sessions.length) * 100) : 0;
  const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg" 
          alt="Training dogs"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-8 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Happy golden retriever"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-6 rounded-tr-3xl"
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
            🎓 Training Log
          </h1>
          <p className="text-gray-600 text-lg">Track your pet's training progress and skills development</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{successRate}%</div>
              <p className="text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{sessions.length}</div>
              <p className="text-gray-600">Total Sessions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{totalTime}m</div>
              <p className="text-gray-600">Training Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Session Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
          <CardHeader>
            <CardTitle>Log Training Session</CardTitle>
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
                <Select value={formData.command} onValueChange={(value) => setFormData({...formData, command: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Command/Skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCommands.map(cmd => (
                      <SelectItem key={cmd} value={cmd}>{cmd}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={formData.difficulty} onValueChange={(value: TrainingSession['difficulty']) => setFormData({...formData, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">🟢 Beginner</SelectItem>
                    <SelectItem value="intermediate">🟡 Intermediate</SelectItem>
                    <SelectItem value="advanced">🔴 Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Duration (min)"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.success}
                      onChange={(e) => setFormData({...formData, success: e.target.checked})}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm">Successful Session</span>
                  </label>
                </div>
              </div>
              <Textarea
                placeholder="Notes about the session..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
                Log Training Session
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
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${difficultyColors[session.difficulty]} flex items-center justify-center`}>
                    <span className="text-white text-lg">🎯</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{session.command}</h3>
                      {session.success ? (
                        <span className="text-green-500 text-lg">✅</span>
                      ) : (
                        <span className="text-orange-500 text-lg">📝</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">
                      {session.petName} • {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                      session.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      session.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                    </span>
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
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-gray-600 text-lg">No training sessions logged yet. Start tracking your pet's progress!</p>
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
