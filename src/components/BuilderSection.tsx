import { useState } from "react";
import { Upload, Sparkles, Target, Grid3X3, Layers, Palette } from "lucide-react";

interface NotebookOption {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  isCustom?: boolean;
}

const options: NotebookOption[] = [
  {
    id: 1,
    name: "HỆ SÁNG TẠO",
    description: "Dành cho đầu nảy số nhanh. Vẽ vời, lên idea bao mượt.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "HỆ CHIẾN",
    description: "Dành cho dân cày cuốc. Tính tiền hay tính tương lai đều chuẩn.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "HỆ TỈ MỈ",
    description: "Dành cho người ngăn nắp. Thẳng hàng ngay lối.",
    icon: <Grid3X3 className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "HỆ ĐA NĂNG",
    description: "Nhạc nào cũng nhảy. Cân mọi loại môn.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: 5,
    name: "HỆ TỰ DO",
    description: "Không thích đụng hàng? Tự thiết kế bìa riêng.",
    icon: <Palette className="w-6 h-6" />,
    isCustom: true,
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
    <section id="builder" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 rotate-chaos-2 inline-block">
            <span className="marker-underline">CHỌN HỆ CỦA BẠN</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
            Mỗi người một vibe. Chọn bìa phù hợp với phong cách của bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Product Preview */}
          <div className="order-2 lg:order-1">
            <div className="brutal-box p-6 bg-background sticky top-28">
              <div className="aspect-[4/5] bg-muted border-[3px] border-foreground flex items-center justify-center relative overflow-hidden">
                <div className="text-center p-8">
                  <div className="font-heading text-6xl mb-4">
                    {currentOption?.icon}
                  </div>
                  <p className="font-heading text-2xl mb-2">{currentOption?.name}</p>
                  <p className="font-body text-muted-foreground text-sm">
                    (Preview sản phẩm)
                  </p>
                </div>

                {/* Selected badge */}
                <div className="absolute top-4 right-4 sticker text-xs">
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

                <button
                  onClick={handleCTAClick}
                  className={`w-full brutal-btn text-lg flex items-center justify-center gap-3 ${
                    isCustomOption
                      ? "bg-background text-foreground"
                      : "bg-primary text-primary-foreground"
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
                  className={`brutal-box p-3 ${
                    selectedOption === option.id
                      ? "bg-background"
                      : "bg-secondary"
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
                  className={`w-6 h-6 border-[3px] border-foreground flex items-center justify-center ${
                    selectedOption === option.id ? "bg-foreground" : "bg-background"
                  }`}
                >
                  {selectedOption === option.id && (
                    <span className="text-background text-xs">✓</span>
                  )}
                </div>
              </div>
            ))}

            {/* Info box */}
            <div className="brutal-box p-4 bg-primary mt-8 rotate-chaos-1">
              <p className="font-heading text-lg text-center">
                💡 Tip: "HỆ TỰ DO" cho phép bạn tải ảnh riêng lên làm bìa!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
