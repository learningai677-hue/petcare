import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface HelpRequest {
  id: string;
  ownerName: string;
  petName: string;
  careDetails: string;
  startDate: string;
  endDate: string;
  volunteers: string[];
}

export default function Delegate() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    careDetails: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Mock data for demonstration
    setRequests([
      {
        id: "1",
        ownerName: "Sarah Johnson",
        petName: "Max",
        careDetails:
          "Need someone to walk my dog twice daily and feed him. He loves playing fetch!",
        startDate: "2024-01-15",
        endDate: "2024-01-20",
        volunteers: ["John Doe", "Emma Smith"],
      },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      ownerName: formData.ownerName,
      petName: formData.petName,
      careDetails: formData.careDetails,
      startDate: formData.startDate,
      endDate: formData.endDate,
      volunteers: [],
    };
    setRequests([...requests, newRequest]);
    setFormData({
      ownerName: "",
      petName: "",
      careDetails: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleVolunteer = (requestId: string) => {
    const volunteerName = prompt("Enter your name to volunteer:");
    if (!volunteerName) return;

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, volunteers: [...req.volunteers, volunteerName] }
          : req,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src="https://images.pexels.com/photos/7210486/pexels-photo-7210486.jpeg"
          alt="Woman caring for dogs"
          className="absolute top-0 right-0 w-96 h-72 object-cover opacity-12 rounded-bl-3xl"
        />
        <img
          src="https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg"
          alt="Dogs together"
          className="absolute bottom-0 left-0 w-80 h-60 object-cover opacity-10 rounded-tr-3xl"
        />
        <div className="animate-float">
          <img
            src="https://images.pexels.com/photos/31246311/pexels-photo-31246311.jpeg"
            alt="Happy golden retriever"
            className="absolute top-1/4 left-20 w-36 h-54 object-cover opacity-15 rounded-2xl transform -rotate-6"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="animate-float">
          <img
            src="https://images.pexels.com/photos/33332961/pexels-photo-33332961.jpeg"
            alt="Cute kitten"
            className="absolute top-1/2 right-16 w-28 h-42 object-cover opacity-12 rounded-xl transform rotate-12"
            style={{ animationDelay: "4s" }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-rose-600 hover:text-rose-800 mb-6 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
            🤝 Delegate Pet Care
          </h1>
          <p className="text-lg text-gray-600">
            Share the responsibility of pet care with family and friends
          </p>
        </div>

        {/* Post Help Request Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Post Help Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Pet Name"
                  value={formData.petName}
                  onChange={(e) =>
                    setFormData({ ...formData, petName: e.target.value })
                  }
                  required
                />
              </div>
              <Textarea
                placeholder="Describe the care needed"
                value={formData.careDetails}
                onChange={(e) =>
                  setFormData({ ...formData, careDetails: e.target.value })
                }
                required
                rows={3}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
              >
                Post Help Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Requests List */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Open Help Requests
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requests.map((request) => (
              <Card
                key={request.id}
                className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-red-500 rounded-full flex items-center justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/709/709496.png"
                        alt="Delegate"
                        className="w-6 h-6 invert"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {request.petName} needs care
                      </h3>
                      <p className="text-gray-600">
                        Owner: {request.ownerName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <p className="text-gray-700">
                      <span className="font-medium">Care needed:</span>{" "}
                      {request.careDetails}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">From:</span>{" "}
                      {request.startDate}
                      <span className="font-medium"> To:</span>{" "}
                      {request.endDate}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Volunteers:</span>{" "}
                      {request.volunteers.length}
                      {request.volunteers.length > 0 && (
                        <span className="text-sm text-gray-600">
                          {" "}
                          ({request.volunteers.join(", ")})
                        </span>
                      )}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleVolunteer(request.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Volunteer to Help 🙋‍♀️
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {requests.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="text-center py-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709496.png"
                alt="No requests"
                className="w-24 h-24 mx-auto mb-6 opacity-50"
              />
              <p className="text-gray-600 text-lg">
                No open requests currently. Post the first one above!
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
    </div>
  );
}
