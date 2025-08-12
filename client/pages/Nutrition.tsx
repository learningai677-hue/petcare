import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface NutritionEntry {
  id: string;
  petName: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodType: string;
  amount: number;
  unit: 'cups' | 'grams' | 'ounces';
  calories?: number;
  notes: string;
  timestamp: string;
}

interface WeightEntry {
  id: string;
  petName: string;
  weight: number;
  unit: 'lbs' | 'kg';
  date: string;
  notes: string;
}

export default function Nutrition() {
  const [nutritionEntries, setNutritionEntries] = useState<NutritionEntry[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'feeding' | 'weight'>('feeding');
  
  const [feedingForm, setFeedingForm] = useState({
    petName: '',
    mealType: '' as NutritionEntry['mealType'] | '',
    foodType: '',
    amount: '',
    unit: 'cups' as NutritionEntry['unit'],
    calories: '',
    notes: '',
    timestamp: new Date().toISOString().slice(0, 16)
  });

  const [weightForm, setWeightForm] = useState({
    petName: '',
    weight: '',
    unit: 'lbs' as WeightEntry['unit'],
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    // Mock data
    setNutritionEntries([
      {
        id: '1',
        petName: 'Buddy',
        mealType: 'breakfast',
        foodType: 'Royal Canin Adult',
        amount: 1.5,
        unit: 'cups',
        calories: 350,
        notes: 'Ate eagerly',
        timestamp: '2024-01-20T08:00'
      },
      {
        id: '2',
        petName: 'Luna',
        mealType: 'snack',
        foodType: 'Training Treats',
        amount: 10,
        unit: 'grams',
        calories: 45,
        notes: 'Reward for good behavior',
        timestamp: '2024-01-20T14:30'
      }
    ]);

    setWeightEntries([
      {
        id: '1',
        petName: 'Buddy',
        weight: 65,
        unit: 'lbs',
        date: '2024-01-20',
        notes: 'Healthy weight, maintaining well'
      },
      {
        id: '2',
        petName: 'Luna',
        weight: 28,
        unit: 'lbs',
        date: '2024-01-15',
        notes: 'Slight weight gain, monitoring'
      }
    ]);
  }, []);

  const mealTypeColors = {
    breakfast: 'from-orange-500 to-yellow-600',
    lunch: 'from-green-500 to-emerald-600',
    dinner: 'from-blue-500 to-indigo-600',
    snack: 'from-purple-500 to-pink-600'
  };

  const mealTypeIcons = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍪'
  };

  const handleFeedingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NutritionEntry = {
      id: Date.now().toString(),
      petName: feedingForm.petName,
      mealType: feedingForm.mealType as NutritionEntry['mealType'],
      foodType: feedingForm.foodType,
      amount: Number(feedingForm.amount),
      unit: feedingForm.unit,
      calories: feedingForm.calories ? Number(feedingForm.calories) : undefined,
      notes: feedingForm.notes,
      timestamp: feedingForm.timestamp
    };
    setNutritionEntries([newEntry, ...nutritionEntries]);
    setFeedingForm({
      petName: '', mealType: '', foodType: '', amount: '', unit: 'cups', 
      calories: '', notes: '', timestamp: new Date().toISOString().slice(0, 16)
    });
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      petName: weightForm.petName,
      weight: Number(weightForm.weight),
      unit: weightForm.unit,
      date: weightForm.date,
      notes: weightForm.notes
    };
    setWeightEntries([newEntry, ...weightEntries]);
    setWeightForm({
      petName: '', weight: '', unit: 'lbs', 
      date: new Date().toISOString().split('T')[0], notes: ''
    });
  };

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg" 
          alt="Pet eating"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-8 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Healthy pet"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-6 rounded-tr-3xl"
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            🍽️ Nutrition Tracker
          </h1>
          <p className="text-gray-600 text-lg">Monitor your pet's diet, weight, and nutritional health</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'feeding' ? 'default' : 'outline'}
            onClick={() => setActiveTab('feeding')}
            className={activeTab === 'feeding' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}
          >
            🍽️ Feeding Log
          </Button>
          <Button
            variant={activeTab === 'weight' ? 'default' : 'outline'}
            onClick={() => setActiveTab('weight')}
            className={activeTab === 'weight' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : ''}
          >
            ⚖️ Weight Tracking
          </Button>
        </div>

        {activeTab === 'feeding' && (
          <>
            {/* Feeding Form */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
              <CardHeader>
                <CardTitle>Log Feeding</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Pet Name"
                      value={feedingForm.petName}
                      onChange={(e) => setFeedingForm({...feedingForm, petName: e.target.value})}
                      required
                    />
                    <Select value={feedingForm.mealType} onValueChange={(value: NutritionEntry['mealType']) => setFeedingForm({...feedingForm, mealType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Meal Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                        <SelectItem value="lunch">☀️ Lunch</SelectItem>
                        <SelectItem value="dinner">🌙 Dinner</SelectItem>
                        <SelectItem value="snack">🍪 Snack</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Food Type/Brand"
                      value={feedingForm.foodType}
                      onChange={(e) => setFeedingForm({...feedingForm, foodType: e.target.value})}
                      required
                    />
                    <Input
                      type="datetime-local"
                      value={feedingForm.timestamp}
                      onChange={(e) => setFeedingForm({...feedingForm, timestamp: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Amount"
                      value={feedingForm.amount}
                      onChange={(e) => setFeedingForm({...feedingForm, amount: e.target.value})}
                      required
                    />
                    <Select value={feedingForm.unit} onValueChange={(value: NutritionEntry['unit']) => setFeedingForm({...feedingForm, unit: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cups">Cups</SelectItem>
                        <SelectItem value="grams">Grams</SelectItem>
                        <SelectItem value="ounces">Ounces</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Calories (optional)"
                      value={feedingForm.calories}
                      onChange={(e) => setFeedingForm({...feedingForm, calories: e.target.value})}
                    />
                  </div>
                  <Textarea
                    placeholder="Notes (behavior, appetite, etc.)"
                    value={feedingForm.notes}
                    onChange={(e) => setFeedingForm({...feedingForm, notes: e.target.value})}
                  />
                  <Button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    Log Feeding
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Feeding Entries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {nutritionEntries.map((entry) => (
                <Card key={entry.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${mealTypeColors[entry.mealType]} flex items-center justify-center`}>
                        <span className="text-white text-lg">{mealTypeIcons[entry.mealType]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{entry.foodType}</h3>
                        <p className="text-gray-600 mb-2">
                          {entry.petName} • {entry.mealType} • {new Date(entry.timestamp).toLocaleString()}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">Amount:</span> {entry.amount} {entry.unit}
                          {entry.calories && <span> • {entry.calories} calories</span>}
                        </p>
                        <p className="text-gray-700">{entry.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'weight' && (
          <>
            {/* Weight Form */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
              <CardHeader>
                <CardTitle>Record Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWeightSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Pet Name"
                      value={weightForm.petName}
                      onChange={(e) => setWeightForm({...weightForm, petName: e.target.value})}
                      required
                    />
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Weight"
                      value={weightForm.weight}
                      onChange={(e) => setWeightForm({...weightForm, weight: e.target.value})}
                      required
                    />
                    <Select value={weightForm.unit} onValueChange={(value: WeightEntry['unit']) => setWeightForm({...weightForm, unit: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="date"
                      value={weightForm.date}
                      onChange={(e) => setWeightForm({...weightForm, date: e.target.value})}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Notes about weight, body condition, etc."
                    value={weightForm.notes}
                    onChange={(e) => setWeightForm({...weightForm, notes: e.target.value})}
                  />
                  <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    Record Weight
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Weight Entries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {weightEntries.map((entry) => (
                <Card key={entry.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white text-lg">⚖️</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{entry.petName}</h3>
                        <p className="text-gray-600 mb-2">{new Date(entry.date).toLocaleDateString()}</p>
                        <p className="text-2xl font-bold text-blue-600 mb-2">{entry.weight} {entry.unit}</p>
                        <p className="text-gray-700">{entry.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {((activeTab === 'feeding' && nutritionEntries.length === 0) || 
          (activeTab === 'weight' && weightEntries.length === 0)) && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">
                {activeTab === 'feeding' ? '🍽️' : '⚖️'}
              </div>
              <p className="text-gray-600 text-lg">
                No {activeTab === 'feeding' ? 'feeding entries' : 'weight records'} yet. Start tracking above!
              </p>
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
