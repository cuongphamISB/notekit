import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BuilderSection from "@/components/BuilderSection";
import PaperSection from "@/components/PaperSection";
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
          <BuilderSection />
          <PaperSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
