import { useState } from "react";
import { Upload, Sparkles, Target, Grid3X3, Layers, Palette } from "lucide-react";
import bookcoverMar from "@/assets/bookcover-mar.png";
import bookcoverFin from "@/assets/bookcover-fin.png";
import bookcoverAcc from "@/assets/bookcover-acc.png";
import bookcoverIb from "@/assets/bookcover-ib.png";
import stickerBow from "@/assets/sticker-bow.svg";

interface NotebookOption {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  isCustom?: boolean;
  accentColor: string;
}

const options: NotebookOption[] = [
  {
    id: 1,
    name: "HỆ SÁNG TẠO",
    description: "Dành cho đầu nảy số nhanh. Vẽ vời, lên idea bao mượt.",
    icon: <Sparkles className="w-6 h-6" />,
    image: bookcoverMar,
    accentColor: "bg-pastel-pink",
  },
  {
    id: 2,
    name: "HỆ CHIẾN",
    description: "Dành cho dân cày cuốc. Tính tiền hay tính tương lai đều chuẩn.",
    icon: <Target className="w-6 h-6" />,
    image: bookcoverFin,
    accentColor: "bg-pastel-blue",
  },
  {
    id: 3,
    name: "HỆ TỈ MỈ",
    description: "Dành cho người ngăn nắp. Thẳng hàng ngay lối.",
    icon: <Grid3X3 className="w-6 h-6" />,
    image: bookcoverAcc,
    accentColor: "bg-pastel-orange",
  },
  {
    id: 4,
    name: "HỆ ĐA NĂNG",
    description: "Nhạc nào cũng nhảy. Cân mọi loại môn.",
    icon: <Layers className="w-6 h-6" />,
    image: bookcoverIb,
    accentColor: "bg-pastel-pink",
  },
  {
    id: 5,
    name: "HỆ TỰ DO",
    description: "Không thích đụng hàng? Tự thiết kế bìa riêng.",
    icon: <Palette className="w-6 h-6" />,
    isCustom: true,
    accentColor: "bg-pastel-blue",
  },
];

const BuilderSection = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);

  const currentOption = options.find((opt) => opt.id === selectedOption);
  const isCustomOption = currentOption?.isCustom;

  const handleCTAClick = () => {
    if (isCustomOption) {
      window.open("https://forms.google.com", "_blank");
    } else {
      // Add to cart logic
      alert("Đã thêm vào giỏ hàng! 🎉");
    }
  };

  return (
    <section id="builder" className="py-16 md:py-24 bg-pastel-cream/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 rotate-playful-2 inline-block">
            <span className="marker-underline marker-underline-orange">CHỌN HỆ CỦA BẠN</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
            Mỗi người một vibe. Chọn bìa phù hợp với phong cách của bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Product Preview */}
          <div className="order-2 lg:order-1">
            <div className="scrapbook-box p-6 bg-card sticky top-28 relative">
              <div className="aspect-[4/5] bg-pastel-cream border-sketch flex items-center justify-center relative overflow-hidden">
                {currentOption?.image ? (
                  <img 
                    src={currentOption.image} 
                    alt={currentOption.name}
                    className="w-full h-full object-contain transform scale-[1.4]"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="font-heading text-6xl mb-4">
                      {currentOption?.icon}
                    </div>
                    <p className="font-heading text-2xl mb-2">{currentOption?.name}</p>
                    <p className="font-body text-muted-foreground text-sm">
                      (Tải ảnh của bạn lên)
                    </p>
                  </div>
                )}

                {/* Selected badge */}
                <div className="absolute top-4 right-4 sticker sticker-pink text-xs">
                  ĐANG CHỌN ✓
                </div>
              </div>

              {/* Price and CTA */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-3xl">149.000đ</span>
                  <span className="font-body text-sm text-muted-foreground line-through">
                    179.000đ
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={handleCTAClick}
                    className={`w-full washi-btn text-lg flex items-center justify-center gap-3 ${
                      isCustomOption
                        ? "bg-pastel-blue"
                        : "bg-pastel-pink"
                    }`}
                  >
                    {isCustomOption ? (
                      <>
                        <Upload className="w-5 h-5" />
                        TẢI ẢNH LÊN (GOOGLE FORM)
                      </>
                    ) : (
                      "THÊM VÀO GIỎ"
                    )}
                  </button>
                  {/* Sticker on button */}
                  <div className="sticker-slot -top-4 -right-4 w-10 h-10 hidden md:block">
                    <img src={stickerBow} alt="Bow decoration" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Options List */}
          <div className="order-1 lg:order-2 space-y-4">
            {options.map((option, index) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`option-card flex items-start gap-4 ${
                  selectedOption === option.id ? "selected" : ""
                }`}
                style={{
                  transform: `rotate(${index % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                }}
              >
                <div
                  className={`scrapbook-box p-3 ${
                    selectedOption === option.id
                      ? "bg-card"
                      : option.accentColor
                  }`}
                >
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl mb-1">
                    {option.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 border-sketch flex items-center justify-center ${
                    selectedOption === option.id ? "bg-pastel-pink" : "bg-card"
                  }`}
                >
                  {selectedOption === option.id && (
                    <span className="text-foreground text-xs">✓</span>
                  )}
                </div>
              </div>
            ))}

            {/* Handwritten note */}
            <div className="scrapbook-box p-4 bg-pastel-orange/80 mt-8 rotate-playful-4 relative">
              <p className="font-heading text-lg text-center italic">
                ✏️ "Ảnh idol, mèo cưng hay người yêu cũ đều được."
              </p>
              <span className="absolute -top-2 -left-2 text-xs font-heading text-muted-foreground rotate-[-8deg]">psst...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
