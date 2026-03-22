import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-transparent">
        <GlobalLoader />
        <Header />
        <main>
          <HeroSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
