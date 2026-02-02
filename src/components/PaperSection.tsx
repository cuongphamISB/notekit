import { Minus, Grid2X2, CircleDot } from "lucide-react";
import bookfillLined from "@/assets/bookfill-lined.png";
import bookfillCaro from "@/assets/bookfill-caro.png";
import bookfillDot from "@/assets/bookfill-dot.png";

interface PaperCard {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const papers: PaperCard[] = [
  {
    id: 1,
    name: "KẺ NGANG",
    description: "Chép bài giảng siêu tốc.",
    icon: <Minus className="w-8 h-8" />,
    image: bookfillLined,
  },
  {
    id: 2,
    name: "KẺ CARO",
    description: "Vẽ hình, kẻ bảng, Bullet Journal.",
    icon: <Grid2X2 className="w-8 h-8" />,
    image: bookfillCaro,
  },
  {
    id: 3,
    name: "KẺ CHẤM",
    description: "Vẽ Mindmap tự do.",
    icon: <CircleDot className="w-8 h-8" />,
    image: bookfillDot,
  },
];

const PaperSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="marker-underline">CHỌN GIẤY CHO VŨ KHÍ</span>
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
              <div className="brutal-box w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-secondary">
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
              <div className="mt-6 brutal-box p-2 bg-background">
                <div className="h-32 border-[2px] border-foreground bg-background overflow-hidden">
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
          <div className="sticker text-lg md:text-xl px-6 py-3">
            📝 BAO DÀY - KHÔNG LEM MỰC 📝
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaperSection;
