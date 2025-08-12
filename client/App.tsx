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

// Create QueryClient as singleton to prevent re-creation on HMR
let queryClient = (globalThis as any).__queryClient;
if (!queryClient) {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  (globalThis as any).__queryClient = queryClient;
}

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
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/expenses" element={<Expenses />} />
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

// Ensure root is only created once and handle HMR properly
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

let root = (rootElement as any).__reactRoot;

if (!root) {
  root = createRoot(rootElement);
  (rootElement as any).__reactRoot = root;
}

// Render the app
try {
  root.render(<App />);
} catch (error) {
  console.error("Error rendering app:", error);
}

// HMR cleanup
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // No cleanup needed for createRoot approach
  });
}
