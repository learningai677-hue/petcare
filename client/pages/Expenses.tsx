import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface Expense {
  id: string;
  petName: string;
  category: 'food' | 'medical' | 'grooming' | 'toys' | 'accessories' | 'training' | 'boarding' | 'other';
  description: string;
  amount: number;
  date: string;
  vendor: string;
  notes: string;
}


export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    category: '' as Expense['category'] | '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    vendor: '',
    notes: ''
  });

  useEffect(() => {
    // Mock data
    setExpenses([
      {
        id: '1',
        petName: 'Buddy',
        category: 'food',
        description: 'Premium dry dog food (20lb bag)',
        amount: 65.99,
        date: '2024-01-15',
        vendor: 'Pet Supply Store',
        notes: 'Monthly food purchase'
      },
      {
        id: '2',
        petName: 'Luna',
        category: 'medical',
        description: 'Annual vaccination',
        amount: 125.00,
        date: '2024-01-18',
        vendor: 'ABC Veterinary Clinic',
        notes: 'DHPP + Rabies shots'
      },
      {
        id: '3',
        petName: 'Max',
        category: 'grooming',
        description: 'Full grooming service',
        amount: 85.00,
        date: '2024-01-20',
        vendor: 'Pampered Pets Salon',
        notes: 'Bath, haircut, nail trim'
      },
      {
        id: '4',
        petName: 'Buddy',
        category: 'toys',
        description: 'Interactive puzzle toy',
        amount: 24.99,
        date: '2024-01-22',
        vendor: 'Online Pet Store',
        notes: 'Mental stimulation toy'
      }
    ]);
  }, []);

  const categoryColors = {
    food: 'from-orange-500 to-red-600',
    medical: 'from-blue-500 to-cyan-600',
    grooming: 'from-pink-500 to-rose-600',
    toys: 'from-green-500 to-emerald-600',
    accessories: 'from-yellow-500 to-amber-600',
    training: 'from-purple-500 to-indigo-600',
    boarding: 'from-teal-500 to-cyan-600',
    other: 'from-gray-500 to-slate-600'
  };

  const categoryIcons = {
    food: '🍽️',
    medical: '🏥',
    grooming: '✂️',
    toys: '🎾',
    accessories: '🦴',
    training: '🎓',
    boarding: '🏠',
    other: '💼'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      petName: formData.petName,
      category: formData.category as Expense['category'],
      description: formData.description,
      amount: Number(formData.amount),
      date: formData.date,
      vendor: formData.vendor,
      notes: formData.notes
    };
    setExpenses([newExpense, ...expenses]);
    setFormData({
      petName: '', category: '', description: '', amount: '', 
      date: new Date().toISOString().split('T')[0], vendor: '', notes: ''
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <Layout>
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg" 
          alt="Happy pets"
          className="absolute top-0 right-0 w-96 h-64 object-cover opacity-8 rounded-bl-3xl"
        />
        <img 
          src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
          alt="Pet care"
          className="absolute bottom-0 left-72 w-80 h-80 object-cover opacity-6 rounded-tr-3xl"
        />
      </div>

      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            💰 Expense Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor and manage all your pet-related expenses
          </p>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">${totalExpenses.toFixed(2)}</div>
              <p className="text-gray-600">Total Expenses</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">${thisMonthExpenses.toFixed(2)}</div>
              <p className="text-gray-600">This Month</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{expenses.length}</div>
              <p className="text-gray-600">Total Records</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="text-lg font-bold text-orange-600 mb-2">
                {topCategory ? topCategory[0] : 'N/A'}
              </div>
              <p className="text-gray-600">Top Category</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-4xl">
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
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
                <Select value={formData.category} onValueChange={(value: Expense['category']) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">🍽️ Food</SelectItem>
                    <SelectItem value="medical">🏥 Medical</SelectItem>
                    <SelectItem value="grooming">✂️ Grooming</SelectItem>
                    <SelectItem value="toys">🎾 Toys</SelectItem>
                    <SelectItem value="accessories">🦴 Accessories</SelectItem>
                    <SelectItem value="training">🎓 Training</SelectItem>
                    <SelectItem value="boarding">🏠 Boarding</SelectItem>
                    <SelectItem value="other">💼 Other</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Amount ($)"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
                <Input
                  placeholder="Vendor/Store"
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  required
                />
              </div>
              <Textarea
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
              <Button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {expenses.map((expense) => (
            <Card key={expense.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryColors[expense.category]} flex items-center justify-center`}>
                    <span className="text-white text-lg">{categoryIcons[expense.category]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{expense.description}</h3>
                      <span className="text-xl font-bold text-green-600">${expense.amount.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {expense.petName} • {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Vendor:</span> {expense.vendor}
                    </p>
                    {expense.notes && (
                      <p className="text-gray-700">{expense.notes}</p>
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

        {expenses.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-gray-600 text-lg">No expenses recorded yet. Start tracking your pet expenses!</p>
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
