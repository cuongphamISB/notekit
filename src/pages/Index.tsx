import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GlobalLoader from "@/components/GlobalLoader";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-transparent font-main">
        <GlobalLoader />
        <Header />
        <main className="relative">
          <HeroSection />
        </main>
      </div>
    </CartProvider>
  );
};

export default Index;
