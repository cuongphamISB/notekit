import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import BrandStory from "./pages/BrandStory";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/contexts/CartContext";
import GlobalLoader from "@/components/GlobalLoader";
import InstallPrompt from "@/components/InstallPrompt";

import { useEffect } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient();

// Detect Electron environment (set by preload.js)
const isElectron = !!(window as any).electronAPI?.isElectron;
const Router = isElectron ? HashRouter : BrowserRouter;

const App = () => {
  useEffect(() => {
    const handleAppInstalled = () => {
      toast.success("Cài đặt thành công!", {
        description: "NORA đã xuất hiện trên màn hình chính của thiết bị.",
        duration: 5000,
      });
    };

    window.addEventListener("appinstalled", handleAppInstalled);
    return () => window.removeEventListener("appinstalled", handleAppInstalled);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <GlobalLoader />
          <InstallPrompt />
          <Router>
            <Routes>
              <Route path="/goc-chon-so" element={<Index />} />
              <Route path="/note-ra-la-ro" element={<BrandStory />} />
              <Route path="/" element={<Navigate to="/goc-chon-so" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;

