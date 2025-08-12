import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItem {
  href: string;
  icon: string;
  label: string;
  emoji: string;
  gradient: string;
}

const sidebarItems: SidebarItem[] = [
  {
    href: "/",
    icon: "🏠",
    label: "Dashboard",
    emoji: "🏠",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    href: "/reminders",
    icon: "🗓️",
    label: "Reminders",
    emoji: "⏰",
    gradient: "from-emerald-500 to-cyan-600",
  },
  {
    href: "/profiles",
    icon: "🐕",
    label: "Pet Profiles",
    emoji: "🐾",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    href: "/medical",
    icon: "🏥",
    label: "Medical Records",
    emoji: "💊",
    gradient: "from-red-500 to-orange-600",
  },
  {
    href: "/training",
    icon: "🎓",
    label: "Training Log",
    emoji: "🏆",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    href: "/nutrition",
    icon: "🍽️",
    label: "Nutrition",
    emoji: "🥗",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    href: "/exercise",
    icon: "🏃",
    label: "Exercise",
    emoji: "⚽",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    href: "/grooming",
    icon: "✂️",
    label: "Grooming",
    emoji: "🛁",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    href: "/photo-journal",
    icon: "📸",
    label: "Photo Journal",
    emoji: "📷",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    href: "/expenses",
    icon: "💰",
    label: "Expenses",
    emoji: "💳",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    href: "/chatbot",
    icon: "💬",
    label: "AI Assistant",
    emoji: "🤖",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    href: "/delegate",
    icon: "🤝",
    label: "Delegate Care",
    emoji: "👥",
    gradient: "from-rose-500 to-red-600",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl z-30">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🐾</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PetCare Pro
            </h1>
            <p className="text-sm text-gray-500">Your pet's companion</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 overflow-y-auto h-full pb-20">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                location.pathname === item.href
                  ? "bg-gradient-to-r text-white shadow-lg transform scale-105"
                  : "hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:scale-102",
              )}
              style={
                location.pathname === item.href
                  ? {
                      backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }
                  : {}
              }
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-gray-100 group-hover:bg-gray-200",
                )}
              >
                <span className="text-lg">{item.emoji}</span>
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    "font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-white"
                      : "text-gray-900",
                  )}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-pink-400/10 to-rose-400/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
