import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BrandStory from "./pages/BrandStory";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/contexts/CartContext";
import GlobalLoader from "@/components/GlobalLoader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalLoader />
        <BrowserRouter>
          <Routes>
            <Route path="/goc-chon-so" element={<Index />} />
            <Route path="/note-ra-la-ro" element={<BrandStory />} />
            <Route path="/" element={<Navigate to="/goc-chon-so" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
