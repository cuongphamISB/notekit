import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BuilderSection from "@/components/BuilderSection";
import PaperSection from "@/components/PaperSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BuilderSection />
        <PaperSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
