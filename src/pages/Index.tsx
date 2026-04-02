import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoverPickerSection from "@/components/CoverPickerSection";
import PaperAndAccessoriesSection from "@/components/PaperAndAccessoriesSection";
import BrandStorySection from "@/components/BrandStorySection";
import OrderCTASection from "@/components/OrderCTASection";
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
          <CoverPickerSection />
          <PaperAndAccessoriesSection />
          <OrderCTASection />
          <BrandStorySection />
        </main>
      </div>
    </CartProvider>
  );
};

export default Index;
