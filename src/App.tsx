
import { Toaster } from "@/components/ui/toaster"; // show message notifs to users
import { Toaster as Sonner } from "@/components/ui/sonner"; 
import { TooltipProvider } from "@/components/ui/tooltip"; // for little popups that appear when you hover over elements
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // for data fetching and caching
import { BrowserRouter, Routes, Route } from "react-router-dom"; // for routing (app navigation)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import BackgroundMusic from "./components/BackgroundMusic";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* TODO need?*/}
      <Sonner /> {/* TODO need?*/}
      <BackgroundMusic />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
