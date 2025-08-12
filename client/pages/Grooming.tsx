import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, Suspense } from "react";
import Layout from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface GroomingSession {
  id: string;
  petName: string;
  serviceType: 'bath' | 'brush' | 'nail-trim' | 'ear-clean' | 'teeth-clean' | 'haircut' | 'full-groom';
  duration: number; // in minutes
  cost?: number;
  groomer: string;
  notes: string;
  date: string;
  nextDue?: string;
}

// 3D Animated Grooming Tools
function GroomingTools3D() {
  return (
    <group>
      {/* Brush */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} position={[-2, 0, 0]}>
        <group>
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.2, 1, 0.1]} />
            <meshPhongMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.3, 0.4, 0.15]} />
            <meshPhongMaterial color="#FF69B4" />
          </mesh>
        </group>
      </Float>

      {/* Scissors */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4} position={[0, 0, 0]}>
        <group rotation={[0, 0, 0.5]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshPhongMaterial color="#C0C0C0" />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.8]} />
            <meshPhongMaterial color="#C0C0C0" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1]} />
            <meshPhongMaterial color="#FFD700" />
          </mesh>
        </group>
      </Float>

      {/* Nail Clippers */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5} position={[2, 0, 0]}>
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.15, 0.6, 0.1]} />
            <meshPhongMaterial color="#4169E1" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.2, 0.2, 0.12]} />
            <meshPhongMaterial color="#1E90FF" />
          </mesh>
        </group>
      </Float>

      {/* Soap Bubbles */}
      {[...Array(8)].map((_, i) => (
        <Float
          key={i}
          speed={0.5 + Math.random()}
          rotationIntensity={0.1}
          floatIntensity={0.8}
          position={[
            (Math.random() - 0.5) * 6,
            Math.random() * 3,
            (Math.random() - 0.5) * 3
          ]}
        >
          <Sphere args={[0.1 + Math.random() * 0.1]}>
            <meshPhongMaterial 
              color={new THREE.Color().setHSL(0.6, 0.3, 0.9)} 
              transparent 
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

// 3D Grooming Stats
function GroomingStats3D({ totalSessions, totalCost }: { totalSessions: number; totalCost: number }) {
  return (
    <group>
      {/* Sessions indicator */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3} position={[-2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.8, Math.min(totalSessions / 3, 2), 0.8]} />
          <meshPhongMaterial color="#FF69B4" />
        </mesh>
        <mesh position={[0, Math.min(totalSessions / 3, 2) / 2 + 0.3, 0]}>
          <sphereGeometry args={[0.2]} />
          <meshPhongMaterial color="#E91E63" />
        </mesh>
      </Float>

      {/* Cost indicator */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4} position={[2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.8, Math.min(totalCost / 50, 2), 0.8]} />
          <meshPhongMaterial color="#32CD32" />
        </mesh>
        <mesh position={[0, Math.min(totalCost / 50, 2) / 2 + 0.3, 0]}>
          <sphereGeometry args={[0.2]} />
          <meshPhongMaterial color="#228B22" />
        </mesh>
      </Float>
    </group>
  );
}

export default function Grooming() {
  const [sessions, setSessions] = useState<GroomingSession[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    serviceType: '' as GroomingSession['serviceType'] | '',
    duration: '',
    cost: '',
    groomer: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    nextDue: ''
  });

  useEffect(() => {
    // Mock data
    setSessions([
      {
        id: '1',
        petName: 'Buddy',
        serviceType: 'full-groom',
        duration: 120,
        cost: 85,
        groomer: 'Professional Groomer - Pet Spa',
        notes: 'Full service grooming, looked amazing afterwards!',
        date: '2024-01-15',
        nextDue: '2024-02-15'
      },
      {
        id: '2',
        petName: 'Luna',
        serviceType: 'bath',
        duration: 45,
        cost: 25,
        groomer: 'Home grooming',
        notes: 'Bath at home, used special shampoo for sensitive skin',
        date: '2024-01-18'
      },
      {
        id: '3',
        petName: 'Max',
        serviceType: 'nail-trim',
        duration: 15,
        cost: 20,
        groomer: 'Vet Clinic',
        notes: 'Quick nail trim during regular checkup',
        date: '2024-01-20'
      }
    ]);
  }, []);

  const serviceColors = {
    'bath': 'from-blue-500 to-cyan-600',
    'brush': 'from-pink-500 to-rose-600',
    'nail-trim': 'from-orange-500 to-yellow-600',
    'ear-clean': 'from-green-500 to-emerald-600',
    'teeth-clean': 'from-purple-500 to-indigo-600',
    'haircut': 'from-red-500 to-pink-600',
    'full-groom': 'from-violet-500 to-purple-600'
  };

  const serviceIcons = {
    'bath': '🛁',
    'brush': '🪥',
    'nail-trim': '✂️',
    'ear-clean': '👂',
    'teeth-clean': '🦷',
    'haircut': '💇',
    'full-groom': '✨'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: GroomingSession = {
      id: Date.now().toString(),
      petName: formData.petName,
      serviceType: formData.serviceType as GroomingSession['serviceType'],
      duration: Number(formData.duration),
      cost: formData.cost ? Number(formData.cost) : undefined,
      groomer: formData.groomer,
      notes: formData.notes,
      date: formData.date,
      nextDue: formData.nextDue || undefined
    };
    setSessions([newSession, ...sessions]);
    setFormData({
      petName: '', serviceType: '', duration: '', cost: '', groomer: '', 
      notes: '', date: new Date().toISOString().split('T')[0], nextDue: ''
    });
  };

  const totalSessions = sessions.length;
  const totalCost = sessions.reduce((sum, session) => sum + (session.cost || 0), 0);
  const averageDuration = sessions.length > 0 ? 
    Math.round(sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length) : 0;

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg" 
          alt="Well-groomed cat"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-8 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Clean golden retriever"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-6 rounded-tr-3xl"
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            ✂️ Grooming Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Keep track of your pet's grooming appointments and beauty care
          </p>
        </div>

        {/* 3D Visualization */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 h-64">
          <CardHeader>
            <CardTitle className="text-center">3D Grooming Studio</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ErrorBoundary>
              <Suspense fallback={<div className="text-center py-8">Loading 3D grooming tools...</div>}>
                <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={0.8} />
                  <pointLight position={[-5, 5, 5]} intensity={0.4} color="#FFB6C1" />
                  <GroomingTools3D />
                  <GroomingStats3D totalSessions={totalSessions} totalCost={totalCost} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">{totalSessions}</div>
              <p className="text-gray-600">Total Sessions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">${totalCost}</div>
              <p className="text-gray-600">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{averageDuration}m</div>
              <p className="text-gray-600">Avg Duration</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Session Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
          <CardHeader>
            <CardTitle>Log Grooming Session</CardTitle>
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
                <Select value={formData.serviceType} onValueChange={(value: GroomingSession['serviceType']) => setFormData({...formData, serviceType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Service Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bath">🛁 Bath</SelectItem>
                    <SelectItem value="brush">🪥 Brushing</SelectItem>
                    <SelectItem value="nail-trim">✂️ Nail Trim</SelectItem>
                    <SelectItem value="ear-clean">👂 Ear Cleaning</SelectItem>
                    <SelectItem value="teeth-clean">🦷 Teeth Cleaning</SelectItem>
                    <SelectItem value="haircut">💇 Haircut</SelectItem>
                    <SelectItem value="full-groom">✨ Full Grooming</SelectItem>
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
                  step="0.01"
                  placeholder="Cost ($)"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Groomer/Location"
                  value={formData.groomer}
                  onChange={(e) => setFormData({...formData, groomer: e.target.value})}
                  required
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
                <Input
                  type="date"
                  placeholder="Next Due Date"
                  value={formData.nextDue}
                  onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
                />
              </div>
              <Textarea
                placeholder="Notes about the grooming session..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                Log Grooming Session
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
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${serviceColors[session.serviceType]} flex items-center justify-center`}>
                    <span className="text-white text-lg">{serviceIcons[session.serviceType]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {session.serviceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {session.petName} • {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Groomer:</span> {session.groomer}
                    </p>
                    {session.cost && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-medium">Cost:</span> ${session.cost}
                      </p>
                    )}
                    {session.nextDue && (
                      <p className="text-orange-600 mb-2">
                        <span className="font-medium">Next Due:</span> {new Date(session.nextDue).toLocaleDateString()}
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
              <div className="text-6xl mb-4">✂️</div>
              <p className="text-gray-600 text-lg">No grooming sessions logged yet. Start tracking your pet's beauty care!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
