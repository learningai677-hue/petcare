import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reminders from "./pages/Reminders";
import Profiles from "./pages/Profiles";
import Chatbot from "./pages/Chatbot";
import PhotoJournal from "./pages/PhotoJournal";
import Delegate from "./pages/Delegate";
import Medical from "./pages/Medical";
import Training from "./pages/Training";
import Nutrition from "./pages/Nutrition";
import Exercise from "./pages/Exercise";
import Grooming from "./pages/Grooming";
import Expenses from "./pages/Expenses";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/training" element={<Training />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/exercise" element={<Index />} /> {/* Placeholder */}
          <Route path="/grooming" element={<Index />} /> {/* Placeholder */}
          <Route path="/expenses" element={<Index />} /> {/* Placeholder */}
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/photo-journal" element={<PhotoJournal />} />
          <Route path="/delegate" element={<Delegate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
