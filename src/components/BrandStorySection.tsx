import { useState, useEffect, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { CAROUSEL_SLIDE_URLS } from "@/constants/carouselSlides";

/* ─── slide data ────────────────────────────────────────────────── */
const slides = [...CAROUSEL_SLIDE_URLS];

const NAM_STICKERS = [
  "/nam mkt.webp",
  "/nam fin.webp",
  "/nam ibu.webp",
  "/nam accounting.webp",
  "/nam man.webp",
] as const;

const NU_STICKERS = [
  "/nữ mkt.webp",
  "/nữ fin.webp",
  "/nữ ibu.webp",
  "/nữ accounting.webp",
  "/nữ man.webp",
] as const;

/* ─── star decorations ──────────────────────────────────────────── */
const BS_STARS = [
  { src: "/sao xanh lam.png", style: { top: "3%",  left: "5%",  width: "clamp(20px,3.6vw,56px)" } },
  { src: "/sao vàng.png",     style: { top: "2%",  right: "7%", width: "clamp(24px,4.2vw,68px)" } },
  { src: "/sao màu hồng.png", style: { top: "35%", left: "3%",  width: "clamp(18px,3vw,48px)"  } },
  { src: "/sao tím đậm.png",  style: { bottom: "18%", right: "4%", width: "clamp(20px,3.4vw,54px)" } },
  { src: "/sao xanh lam.png", style: { bottom: "8%",  left: "6%",  width: "clamp(18px,3.2vw,52px)" } },
] as const;

/* ─── slide transition duration (match Hero) ────────────────────── */
const SLIDE_MS = 360;
const AUTO_INTERVAL_MS = 2200;

/* ════════════════════════════════════════════════════════════════ */
const BrandStorySection = () => {
  const [active, setActive] = useState(0);

  /* Auto-cycle — drives both mini carousel (V1) and char pair (V3) */
  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      AUTO_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  const slideStyle = {
    "--hero-slide-ms": `${SLIDE_MS}ms`,
  } as CSSProperties;

  return (
    <section
      className="brand-story-section"
      id="brand-story"
      aria-labelledby="bs-heading"
    >
      {/* Star decorations */}
      {BS_STARS.map((s, i) => (
        <div key={i} className="sticker-slot" style={s.style}>
          <img src={s.src} alt="" aria-hidden className="h-auto w-full object-contain" />
        </div>
      ))}

      <h2 className="brand-story-heading" id="bs-heading">
        NoRa là gì?
      </h2>

      {/* ══ BLOCK 1: Brand Narrative — torn paper + tape ══════════ */}
      <div className="bs-full-row">
        <div className="bs-card bs-card--torn">
          {/* Washi tape strips — color palette from buying section */}
          <div className="bs-tape bs-tape--left bs-tape--blue" aria-hidden />
          <div className="bs-tape bs-tape--right bs-tape--pink" aria-hidden />

          {/* /sticker nhân vật.webp floated right as decorative accent */}
          <img
            src="/sticker nhân vật.webp"
            className="bs-narrative-sticker"
            alt=""
            aria-hidden
            draggable={false}
          />

          <p className="bs-narrative-body">
            NoRa bắt đầu từ một điều rất đơn giản: tụi tui nhận ra không ai học
            hay nghĩ giống ai hết.
            <br /><br />
            Có người thích mọi thứ rõ ràng, logic. Có người lại quen ghi nhanh,
            ghi nhiều, rồi quay lại sắp xếp sau. Có người học bằng chữ, có người
            nhớ bằng hình, có người thì phải vừa viết vừa vẽ mới hiểu. Và phần
            lớn thời gian, mọi thứ trong đầu đều… hơi rối.
            <br /><br />
            NoRa không cố làm mọi thứ trở nên giống nhau. Tụi tui chỉ tạo ra
            một cách đơn giản hơn để bạn xử lý nó.
          </p>
        </div>
      </div>

      {/* ══ BLOCK 2: Product Prop — sticky note ══════════════════ */}
      <div className="bs-sticky-row">
        <div className="bs-card bs-card--sticky bs-card--rotate-neg">

          {/* /slogan.png as ghosted watermark */}
          <img
            src="/slogan.png"
            className="bs-slogan-watermark"
            alt=""
            aria-hidden
            draggable={false}
          />

          <h3 className="bs-card-title">Có NoRa, note ra là rõ ✏️</h3>
          <p className="bs-card-body">
            Một cuốn sổ không ép bạn theo một khuôn mẫu cố định, mà cho bạn tự
            do ghi chép theo cách của riêng mình - từ cách bạn học, cách bạn
            nghĩ, cho tới cách bạn tổ chức mọi thứ.
            <br /><br />
            Bạn có thể bắt đầu từ bất cứ đâu, rồi thêm, bớt, sắp xếp lại khi
            cần - miễn là nó vẫn hợp với bạn. Vì mỗi người đều có một "cách
            vận hành" rất riêng, và một cuốn sổ tốt là cuốn sổ theo kịp điều đó.
          </p>
        </div>
      </div>

      {/* ══ BLOCK 3: Values sub-heading ══════════════════════════ */}
      <p className="bs-values-lead">
        Và đây là những gì NoRa đem tới cho bạn
      </p>

      {/* ══ BLOCK 4: 4 Value cards ════════════════════════════════ */}
      <div className="bs-values-grid">

        {/* ── V1: Rõ ràng bản sắc — mini auto carousel ── */}
        <div className="bs-card bs-value-card bs-card--rotate-neg">
          {/* Mini carousel — reuses all .hero-slide-* CSS, NO price badge */}
          <div className="bs-mini-carousel">
            <div
              className="bs-mini-slide-wrap hero-slide-grain-host rounded-2xl border-[3px] border-[#0a1560] bg-white"
              style={slideStyle}
            >
              {/* bg blur layers */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                {slides.map((src, i) => (
                  <img
                    key={`bs-bg-${i}`}
                    src={src}
                    alt=""
                    aria-hidden
                    decoding="async"
                    className={cn(
                      "hero-slide-bg-layer absolute inset-0 h-full w-full object-cover pointer-events-none select-none",
                      i === active && "is-active"
                    )}
                    draggable={false}
                  />
                ))}
              </div>
              {/* fg layers */}
              {slides.map((src, i) => (
                <img
                  key={`bs-fg-${i}`}
                  src={src}
                  alt={i === active ? `Bìa sổ ${i + 1}` : ""}
                  aria-hidden={i !== active}
                  decoding="async"
                  className={cn(
                    "hero-slide-fg-layer absolute inset-0 h-full w-full pointer-events-none",
                    i === active && "is-active"
                  )}
                  draggable={false}
                />
              ))}
            </div>
            {/* Pager dots */}
            <div className="bs-mini-pager">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "hero-slide-pager-dot rounded-full",
                    i === active
                      ? "h-2.5 w-7 bg-[#0a1560]"
                      : "h-2.5 w-2.5 bg-black/20"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="bs-value-text">
            <h3 className="bs-card-title">Rõ ràng bản sắc</h3>
            <p className="bs-card-body">
              Từ 5 thiết kế bìa với những vibe khác nhau, NoRa để bạn chọn kiểu
              thật sự hợp mình. Mỗi bìa là một cách nghĩ, một cách học, để cuốn
              sổ không chỉ để ghi chép, mà còn là nơi bạn thấy mình được phản chiếu.
            </p>
          </div>
        </div>

        {/* ── V2: Mở lối tự do — scattered cover thumbnails (add/remove/reorder) ── */}
        <div className="bs-card bs-value-card bs-card--rotate-pos">
          {/* 3 covers fanned out to show freedom to mix & match, plus floating binder rings */}
          <div className="bs-cover-scatter" aria-hidden>
            {/* Covers */}
            <img src="/mkt (ko nhãn)_result.webp" className="bs-scatter-cover bs-scatter-cover--1" draggable={false} alt="" />
            <img src="/ibu (ko nhãn)_result.webp" className="bs-scatter-cover bs-scatter-cover--2" draggable={false} alt="" />
            <img src="/fin (ko nhãn)_result.webp" className="bs-scatter-cover bs-scatter-cover--3" draggable={false} alt="" />
            
            {/* Rings */}
            <img src="/còng hồng.webp" className="bs-scatter-ring bs-scatter-ring--1" draggable={false} alt="" />
            <img src="/còng xanh lá.webp" className="bs-scatter-ring bs-scatter-ring--2" draggable={false} alt="" />
            <img src="/còng tím.webp" className="bs-scatter-ring bs-scatter-ring--3" draggable={false} alt="" />
            <img src="/còng cam.webp" className="bs-scatter-ring bs-scatter-ring--4" draggable={false} alt="" />
            <img src="/còg xanh dương.webp" className="bs-scatter-ring bs-scatter-ring--5" draggable={false} alt="" />
          </div>

          <div className="bs-value-text">
            <h3 className="bs-card-title">Mở lối tự do</h3>
            <p className="bs-card-body">
              Cấu trúc còng nhựa mỏng nhẹ, dễ tháo rời giúp bạn dễ dàng thêm,
              bớt, sắp xếp lại mọi thứ khi cần. Viết sai thì đổi, rối thì chỉnh.
              Miễn là cách bạn dùng phù hợp với bạn nè!
            </p>
          </div>
        </div>

        {/* ── V3: Chẳng còn đắn đo — character sticker pair ── */}
        <div className="bs-card bs-value-card bs-card--rotate-pos">
          {/* Nam + nữ pair synced to active carousel slide */}
          <div className="bs-char-pair">
            {slides.map((_, i) => (
              <div
                key={i}
                className={cn("bs-char-pair-frame", i === active && "is-active")}
              >
                <img
                  src={NAM_STICKERS[i]}
                  className="bs-char-sticker bs-char-sticker--nam"
                  alt=""
                  aria-hidden
                  draggable={false}
                />
                <img
                  src={NU_STICKERS[i]}
                  className="bs-char-sticker bs-char-sticker--nu"
                  alt=""
                  aria-hidden
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="bs-value-text">
            <h3 className="bs-card-title">Chẳng còn đắn đo</h3>
            <p className="bs-card-body">
              Tụi tui cân bằng giữa tính tiện dụng và tính cá nhân - đủ gọn gàng
              để bạn xử lý bài vở, deadline, nhưng cũng đủ "hợp gu" để bạn thấy
              thích khi dùng mỗi ngày.
            </p>
          </div>
        </div>

        {/* ── V4: Tự tin tròn vẹn — paper swatches (kẻ ngang / caro) visualize 100gsm ── */}
        <div className="bs-card bs-value-card bs-card--rotate-neg">
          <div className="bs-value-text">
            <h3 className="bs-card-title">Tự tin tròn vẹn</h3>
            <p className="bs-card-body">
              Giấy 100gsm mịn, viết êm và rõ nét, giúp bạn ghi chép thoải mái
              mỗi ngày. Dù thế giới ngoài kia có hơi "rối", bạn vẫn đang nắm
              giữ mọi thứ trong tay mình - một cách rõ ràng trên cuốn sổ này.
            </p>
          </div>

          {/* Paper swatches moved here — tactile proof of 100gsm paper quality */}
          <div className="bs-paper-swatches">
            <div className="bs-paper-swatch-frame bs-paper-swatch-frame--lined paper-polaroid-grain-host">
              <div className="bs-paper-swatch-preview paper-preview-lined" aria-hidden />
              <span className="bs-swatch-label">kẻ ngang</span>
            </div>
            <div className="bs-paper-swatch-frame bs-paper-swatch-frame--grid paper-polaroid-grain-host">
              <div className="bs-paper-swatch-preview paper-preview-grid" aria-hidden />
              <span className="bs-swatch-label">caro</span>
            </div>
          </div>
        </div>

      </div>

      {/* ══ SECTION-END CTA — scroll up to customiser ════════════ */}
      <div className="bs-end-cta">
        <button
          type="button"
          className="bs-end-cta-btn"
          aria-label="Tạo nên cuốn sổ của riêng bạn — cuộn lên chọn bìa"
          onClick={() =>
            document
              .getElementById("cover-picker")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <img
            src="/CTA button.webp"
            alt="Tạo nên cuốn sổ của riêng bạn"
            className="bs-end-cta-img"
            draggable={false}
          />
        </button>
      </div>
    </section>
  );
};

export default BrandStorySection;
