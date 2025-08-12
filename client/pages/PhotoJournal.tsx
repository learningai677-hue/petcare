import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface Photo {
  id: string;
  petName: string;
  imageBase64: string;
  caption: string;
  createdAt: Date;
}

export default function PhotoJournal() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [formData, setFormData] = useState({
    petName: '',
    image: null as File | null,
    caption: ''
  });

  useEffect(() => {
    // Mock data for demonstration
    setPhotos([
      {
        id: '1',
        petName: 'Buddy',
        imageBase64: 'https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg',
        caption: 'Playing in the park on a sunny day! 🌞',
        createdAt: new Date()
      },
      {
        id: '2',
        petName: 'Whiskers',
        imageBase64: 'https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg',
        caption: 'Napping after a big meal 😴',
        createdAt: new Date(Date.now() - 86400000)
      }
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        petName: formData.petName,
        imageBase64: event.target?.result as string,
        caption: formData.caption,
        createdAt: new Date()
      };
      setPhotos([newPhoto, ...photos]);
      setFormData({ petName: '', image: null, caption: '' });
    };
    reader.readAsDataURL(formData.image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg" 
          alt="Happy dogs with owner"
          className="absolute top-0 left-0 w-full h-48 object-cover opacity-8"
        />
        <img 
          src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg" 
          alt="Labrador dogs in nature"
          className="absolute bottom-0 right-0 w-80 h-60 object-cover opacity-10 rounded-tl-3xl"
        />
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/29217040/pexels-photo-29217040.jpeg" 
            alt="Cute pug"
            className="absolute top-1/3 right-10 w-32 h-32 object-cover opacity-15 rounded-full"
            style={{ animationDelay: '1.5s' }}
          />
        </div>
        <div className="animate-float">
          <img 
            src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg" 
            alt="Golden retriever"
            className="absolute top-2/3 left-16 w-28 h-42 object-cover opacity-12 rounded-2xl transform rotate-12"
            style={{ animationDelay: '3s' }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            📸 Pet Photo Journal
          </h1>
          <p className="text-lg text-gray-600">
            Upload daily pics, track your pet's growth and capture funny moments
          </p>
        </div>

        {/* Add Photo Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Add New Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Pet Name"
                value={formData.petName}
                onChange={(e) => setFormData({...formData, petName: e.target.value})}
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                required
              />
              <Textarea
                placeholder="Caption (optional)"
                value={formData.caption}
                onChange={(e) => setFormData({...formData, caption: e.target.value})}
                rows={2}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
                Add Photo
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={photo.imageBase64}
                    alt={`Photo of ${photo.petName}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white font-bold text-lg">{photo.petName}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-3 min-h-[48px]">
                    {photo.caption || 'No caption provided'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Added on: {photo.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {photos.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
                alt="No photos"
                className="w-24 h-24 mx-auto mb-6 opacity-50"
              />
              <p className="text-gray-600 text-lg">No photos yet. Add some memories above!</p>
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
    </div>
  );
}
