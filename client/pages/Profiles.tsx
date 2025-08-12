import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface Profile {
  id: string;
  name: string;
  breed: string;
  age: number;
  imageBase64: string;
}

export default function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    image: null as File | null
  });

  useEffect(() => {
    // Mock data for demonstration
    setProfiles([
      {
        id: '1',
        name: 'Buddy',
        breed: 'Golden Retriever',
        age: 3,
        imageBase64: 'https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg'
      }
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: formData.name,
        breed: formData.breed,
        age: parseInt(formData.age),
        imageBase64: event.target?.result as string
      };
      setProfiles([...profiles, newProfile]);
      setFormData({ name: '', breed: '', age: '', image: null });
    };
    reader.readAsDataURL(formData.image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg" 
          alt="Labrador dogs in forest"
          className="absolute top-0 left-0 w-full h-64 object-cover opacity-8"
        />
        <img 
          src="https://images.pexels.com/photos/29217040/pexels-photo-29217040.jpeg" 
          alt="Pug portrait"
          className="absolute bottom-0 right-0 w-64 h-64 object-cover opacity-12 rounded-tl-3xl"
        />
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg" 
            alt="Cute kitten"
            className="absolute top-1/2 left-10 w-28 h-42 object-cover opacity-15 rounded-2xl transform -rotate-12"
            style={{ animationDelay: '1s' }}
          />
        </div>
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
            alt="Golden retriever"
            className="absolute top-1/3 right-16 w-32 h-48 object-cover opacity-12 rounded-2xl transform rotate-6"
            style={{ animationDelay: '3s' }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🐕 Pet Profiles
          </h1>
          <p className="text-lg text-gray-600">
            Create & manage profiles with photos & details for all your beloved pets
          </p>
        </div>

        {/* Add Profile Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Add New Pet Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Pet Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({...formData, breed: e.target.value})}
                  required
                />
              </div>
              <Input
                type="number"
                placeholder="Age (years)"
                min="0"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                required
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                Add Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={profile.imageBase64}
                    alt={`Pet ${profile.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Breed:</span> {profile.breed}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Age:</span> {profile.age} years
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {profiles.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                alt="No profiles"
                className="w-24 h-24 mx-auto mb-6 opacity-50"
              />
              <p className="text-gray-600 text-lg">No pet profiles yet. Add your first pet profile above!</p>
            </CardContent>
          </Card>
        )}

        {/* Attribution */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block shadow-lg">
            <p className="text-lg font-bold font-serif tracking-wide">
              Made by Tanishka Badhai and Jiya Kataria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
