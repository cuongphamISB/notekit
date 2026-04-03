import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoverPickerSection from "@/components/CoverPickerSection";
import PaperAndAccessoriesSection from "@/components/PaperAndAccessoriesSection";
import OrderCTASection from "@/components/OrderCTASection";
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Ép vị trí cuộn lên đầu trang TRƯỚC KHI trình duyệt kịp vẽ UI trang Index
    // Để loại bỏ hoàn toàn hiện tượng chớp hình/nháy khó chịu.
    if (location.state?.scrollTo === "cover-picker") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.scrollTo === "cover-picker") {
      // Delay nhẹ để hiệu ứng cuộn bắt đầu một cách êm ái sau khi render xong
      setTimeout(() => {
        document.getElementById("cover-picker")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-transparent font-main">
      <Header />
      <main className="relative">
        <HeroSection />
        <CoverPickerSection />
        <PaperAndAccessoriesSection />
        <OrderCTASection />
      </main>
    </div>
  );
};

export default Index;
