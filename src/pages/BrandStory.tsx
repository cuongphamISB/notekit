import Header from "@/components/Header";
import BrandStorySection from "@/components/BrandStorySection";

const BrandStory = () => {
  return (
    <div className="min-h-screen bg-transparent font-main">
      <Header />
      <main className="relative">
        <BrandStorySection />
      </main>
    </div>
  );
};

export default BrandStory;
