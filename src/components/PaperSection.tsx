import { Minus, Grid2X2, Circle } from "lucide-react";

interface PaperCard {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const papers: PaperCard[] = [
  {
    id: 1,
    name: "KẺ NGANG",
    description: "Chép bài giảng siêu tốc.",
    icon: <Minus className="w-8 h-8" />,
  },
  {
    id: 2,
    name: "CARO (GRID)",
    description: "Vẽ hình, kẻ bảng, Bullet Journal.",
    icon: <Grid2X2 className="w-8 h-8" />,
  },
  {
    id: 3,
    name: "GIẤY TRƠN",
    description: "Vẽ Mindmap tự do.",
    icon: <Circle className="w-8 h-8" />,
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

              {/* Pattern preview */}
              <div className="mt-6 brutal-box p-4 bg-background">
                <div className="h-24 border-[2px] border-foreground bg-background flex items-center justify-center overflow-hidden">
                  {paper.id === 1 && (
                    <div className="w-full space-y-3 px-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-0.5 bg-muted-foreground/30 w-full" />
                      ))}
                    </div>
                  )}
                  {paper.id === 2 && (
                    <div className="w-full h-full grid grid-cols-6 grid-rows-4">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="border border-muted-foreground/30" />
                      ))}
                    </div>
                  )}
                  {paper.id === 3 && (
                    <p className="font-heading text-muted-foreground/50 text-sm">
                      Trống trơn, tự do sáng tạo
                    </p>
                  )}
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
