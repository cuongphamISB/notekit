import { Minus, Grid2X2, CircleDot } from "lucide-react";
import bookfillLined from "@/assets/bookfill-lined.png";
import bookfillCaro from "@/assets/bookfill-caro.png";
import bookfillDot from "@/assets/bookfill-dot.png";
import stickerBunny from "@/assets/sticker-bunny.svg";

interface PaperCard {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  accentColor: string;
}

const papers: PaperCard[] = [
  {
    id: 1,
    name: "KẺ NGANG",
    description: "Chép bài giảng siêu tốc.",
    icon: <Minus className="w-8 h-8" />,
    image: bookfillLined,
    accentColor: "bg-pastel-blue",
  },
  {
    id: 2,
    name: "KẺ CARO",
    description: "Vẽ hình, kẻ bảng, Bullet Journal.",
    icon: <Grid2X2 className="w-8 h-8" />,
    image: bookfillCaro,
    accentColor: "bg-pastel-pink",
  },
  {
    id: 3,
    name: "CHẤM (DOT GRID)",
    description: "Layout linh hoạt. Dùng cho Journal hay vẽ biểu đồ.",
    icon: <CircleDot className="w-8 h-8" />,
    image: bookfillDot,
    accentColor: "bg-pastel-orange",
  },
];

const PaperSection = () => {
  return (
    <section className="py-16 md:py-24 bg-card relative overflow-hidden">
      {/* Floating sticker decoration */}
      <div className="sticker-slot top-10 right-10 w-24 h-24 hidden lg:block animate-float opacity-50">
        <img src={stickerBunny} alt="Decorative sticker" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="marker-underline marker-underline-blue">CHỌN GIẤY CHO VŨ KHÍ</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
            Giấy nào cũng dày, cũng chất. Chọn theo nhu cầu của bạn thôi.
          </p>
        </div>

        {/* Paper Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {papers.map((paper, index) => (
            <div
              key={paper.id}
              className="paper-card text-center"
              style={{
                transform: `rotate(${index === 0 ? "-2deg" : index === 2 ? "2deg" : "0deg"})`,
              }}
            >
              {/* Icon */}
              <div className={`scrapbook-box w-20 h-20 mx-auto mb-6 flex items-center justify-center ${paper.accentColor}`}>
                {paper.icon}
              </div>

              {/* Name */}
              <h3 className="font-heading text-2xl md:text-3xl mb-3">
                {paper.name}
              </h3>

              {/* Description */}
              <p className="font-body text-muted-foreground">
                {paper.description}
              </p>

              {/* Paper image preview */}
              <div className="mt-6 scrapbook-box p-2 bg-card">
                <div className="h-32 border-sketch bg-card overflow-hidden">
                  <img 
                    src={paper.image} 
                    alt={paper.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Badge */}
        <div className="flex justify-center">
          <div className="sticker sticker-pink text-lg md:text-xl px-6 py-3">
            📝 BAO DÀY - KHÔNG LEM MỰC 📝
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaperSection;
