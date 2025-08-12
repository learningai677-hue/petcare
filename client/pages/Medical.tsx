import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface MedicalRecord {
  id: string;
  petName: string;
  type: 'vaccination' | 'checkup' | 'treatment' | 'surgery' | 'medication';
  title: string;
  description: string;
  date: string;
  veterinarian: string;
  cost?: number;
  nextDue?: string;
}

export default function Medical() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    type: '' as MedicalRecord['type'] | '',
    title: '',
    description: '',
    date: '',
    veterinarian: '',
    cost: '',
    nextDue: ''
  });

  useEffect(() => {
    // Mock data
    setRecords([
      {
        id: '1',
        petName: 'Buddy',
        type: 'vaccination',
        title: 'Annual Vaccination',
        description: 'DHPP + Rabies vaccination',
        date: '2024-01-15',
        veterinarian: 'Dr. Smith - Pet Care Clinic',
        cost: 85,
        nextDue: '2025-01-15'
      },
      {
        id: '2',
        petName: 'Luna',
        type: 'checkup',
        title: 'Routine Health Check',
        description: 'General health examination, weight check, dental inspection',
        date: '2024-01-10',
        veterinarian: 'Dr. Johnson - Animal Hospital',
        cost: 120
      }
    ]);
  }, []);

  const typeColors = {
    vaccination: 'from-green-500 to-emerald-600',
    checkup: 'from-blue-500 to-cyan-600',
    treatment: 'from-orange-500 to-yellow-600',
    surgery: 'from-red-500 to-pink-600',
    medication: 'from-purple-500 to-indigo-600'
  };

  const typeIcons = {
    vaccination: '💉',
    checkup: '🩺',
    treatment: '🏥',
    surgery: '⚕️',
    medication: '💊'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      petName: formData.petName,
      type: formData.type as MedicalRecord['type'],
      title: formData.title,
      description: formData.description,
      date: formData.date,
      veterinarian: formData.veterinarian,
      cost: formData.cost ? Number(formData.cost) : undefined,
      nextDue: formData.nextDue || undefined
    };
    setRecords([newRecord, ...records]);
    setFormData({ petName: '', type: '', title: '', description: '', date: '', veterinarian: '', cost: '', nextDue: '' });
  };

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/29217040/pexels-photo-29217040.jpeg" 
          alt="Pug at vet"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-8 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg" 
          alt="Healthy dogs"
          className="absolute bottom-0 left-72 w-80 h-60 object-cover opacity-6 rounded-tr-3xl"
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
            🏥 Medical Records
          </h1>
          <p className="text-gray-600 text-lg">Track your pet's health history and veterinary care</p>
        </div>

        {/* Add Record Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
          <CardHeader>
            <CardTitle>Add Medical Record</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Pet Name"
                  value={formData.petName}
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  required
                />
                <Select value={formData.type} onValueChange={(value: MedicalRecord['type']) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Record Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vaccination">💉 Vaccination</SelectItem>
                    <SelectItem value="checkup">🩺 Checkup</SelectItem>
                    <SelectItem value="treatment">🏥 Treatment</SelectItem>
                    <SelectItem value="surgery">⚕️ Surgery</SelectItem>
                    <SelectItem value="medication">💊 Medication</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Title (e.g., Annual Vaccination)"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <Input
                  placeholder="Veterinarian/Clinic"
                  value={formData.veterinarian}
                  onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
                  required
                />
              </div>
              <Textarea
                placeholder="Description/Notes"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Cost ($)"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                />
                <Input
                  type="date"
                  placeholder="Next Due Date"
                  value={formData.nextDue}
                  onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
                Add Medical Record
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Records List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {records.map((record) => (
            <Card key={record.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${typeColors[record.type]} flex items-center justify-center`}>
                    <span className="text-white text-lg">{typeIcons[record.type]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{record.title}</h3>
                    <p className="text-gray-600 mb-2">{record.petName} • {new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-3">{record.description}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Veterinarian:</span> {record.veterinarian}
                    </p>
                    {record.cost && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Cost:</span> ${record.cost}
                      </p>
                    )}
                    {record.nextDue && (
                      <p className="text-sm text-orange-600 mb-2">
                        <span className="font-medium">Next Due:</span> {new Date(record.nextDue).toLocaleDateString()}
                      </p>
                    )}
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

        {records.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-gray-600 text-lg">No medical records yet. Add your first record above!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
