import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import Found from "./pages/Found";
import Showcase from "./pages/Showcase";
import MainLayout from "./components/MainLayout";
import Contact from "./pages/Contact";
import ReportBug from "./pages/ReportBug";
import Generate from "./pages/Generate";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Imprint from "./pages/Imprint";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Showcase />} />
            <Route path="/create" element={<Create />} />
            <Route path="/found" element={<Found />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report-bug" element={<ReportBug />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/imprint" element={<Imprint />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;