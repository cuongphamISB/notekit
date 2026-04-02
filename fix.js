const fs = require('fs');
const lines = fs.readFileSync('src/index.css', 'utf8').split('\n');

// Keep lines 0 to 1996 (which includes up to `.bs-mini-carousel { ... }`)
// Wait, in the file, line 1997 is `.bs-mini-slide-wrap {`.
// lines.slice(0, 1996) will keep indices 0 through 1995.
// Let's check:
// 1990: /* ── V1: Mini cover carousel ── */
// 1991: .bs-mini-carousel {
// 1992:   position: relative;
// 1993:   width: 100%;
// 1994:   flex-shrink: 0;
// 1995: }
// 1996: 

const goodCSS = lines.slice(0, 1996).join('\n');

const restOfCSS = `.bs-mini-slide-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: visible;
  /* Halve the grain-depth from the inherited hero-slide-grain-host default */
  --grain-depth: clamp(2.5px, 0.7vw, 5.5px);
}

.bs-mini-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
}

/* ── V2: Paper swatches ── */
.bs-paper-swatches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(8px, 1.5vw, 16px);
  flex-shrink: 0;
}

/* Override paper-polaroid-grain-host max-width (380px) so swatches fill column */
.bs-paper-swatch-frame {
  max-width: none !important;
  width: 100%;
  padding: 6px 6px 14px !important;
  margin-inline: 0 !important;
}

.bs-paper-swatch-frame--lined { transform: rotate(-2.5deg); }
.bs-paper-swatch-frame--grid  { transform: rotate(2.5deg);  }

.bs-paper-swatch-preview {
  aspect-ratio: 3 / 4;
  border-radius: 2px;
  width: 100%;
}

.bs-swatch-label {
  display: block;
  margin-top: 6px;
  font-family: var(--font-main);
  font-size: clamp(13px, 1.6vw, 17px);
  color: rgba(129, 135, 217, 0.9);
  text-align: center;
  line-height: 1;
}

/* ── V3: Character sticker pair — larger to fill card visual area ── */
.bs-char-pair {
  position: relative;
  display: grid;
  flex-shrink: 0;
  min-height: clamp(140px, 24vw, 260px);
}

.bs-char-pair-frame {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(4px, 1vw, 12px);
  padding: clamp(6px, 1.2vw, 14px);
  grid-area: 1 / 1;
  opacity: 0.001;
  transition: opacity 0.3s cubic-bezier(0.33, 0.88, 0.36, 1);
  will-change: opacity;
}

.bs-char-pair-frame.is-active {
  opacity: 1;
}

.bs-char-sticker {
  width: clamp(72px, 13vw, 148px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(2px 3px 8px rgba(0, 0, 0, 0.14));
}

/* ── Shared card text ── */
.bs-value-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* subtitle (card-title) */
.bs-card-title {
  font-family: var(--font-main);
  font-size: clamp(22px, 3vw, 36px);
  color: rgba(100, 108, 195, 1);
  margin-bottom: clamp(4px, 0.7vw, 8px);
  line-height: 1.2;
  font-weight: normal;
}

/* body text */
.bs-card-body {
  font-family: var(--font-main);
  font-size: clamp(14px, 1.8vw, 17px);
  line-height: 1.72;
  color: rgba(129, 135, 217, 0.78);
  font-weight: normal;
}

/* ── V2 (new): Scattered cover thumbnails — larger fills whitespace ── */
.bs-cover-scatter {
  position: relative;
  width: 100%;
  min-height: clamp(150px, 26vw, 280px);
  flex-shrink: 0;
}

.bs-scatter-cover {
  position: absolute;
  width: clamp(90px, 15vw, 164px);
  height: auto;
  object-fit: contain;
  border: 2.5px solid #0a1560;
  border-radius: 10px;
  background: #fff;
  box-shadow: 3px 5px 14px rgba(10, 21, 96, 0.18);
}

.bs-scatter-cover--1 { left: 4%;  top: 0;   transform: rotate(-9deg); z-index: 1; }
.bs-scatter-cover--2 { left: 30%; top: 18px; transform: rotate(2deg);  z-index: 3; }
.bs-scatter-cover--3 { left: 57%; top: -6px; transform: rotate(8deg);  z-index: 2; }

/* ── Mobile ── */
@media (max-width: 699px) {
  .brand-story-section {
    padding-left: calc(var(--red-line-x) + 1.5vw);
  }

  .bs-values-grid {
    grid-template-columns: 1fr;
    max-width: min(380px, 100%);
  }

  .bs-narrative-sticker {
    width: clamp(56px, 18vw, 88px);
  }
}

@media (min-width: 700px) {
  /* Ensure paper swatch frames don't inherit mobile max-width from .paper-polaroid-grid */
  .bs-paper-swatch-frame {
    max-width: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bs-card           { transition: none; }
  .bs-card:hover     { transform: none !important; }
  .bs-char-pair-frame { transition: none; }
}

/* ── Brand story section-end CTA ── */
.bs-end-cta {
  margin-top: clamp(40px, 6vw, 80px);
  /* Break out of the section's left padding (red-line inset) */
  margin-left: calc(-1 * (var(--red-line-x) + 2vw));
  margin-right: calc(-1 * var(--hero-pad-right));
  display: flex;
  justify-content: center;
  padding-left: var(--hero-pad-right);
  padding-right: var(--hero-pad-right);
  /* Shift right to compensate for red-line visual imbalance
     (content starts ~8.5vw from left vs a small pad on right) */
  transform: translateX(clamp(24px, 4vw, 52px));
}

.bs-end-cta-btn {
  display: block;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  line-height: 0;
  border-radius: 12px;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.bs-end-cta-btn:hover  { transform: scale(1.04); filter: brightness(1.04); }
.bs-end-cta-btn:active { transform: scale(0.97); }

.bs-end-cta-btn:focus-visible {
  outline: 3px solid rgba(129, 135, 217, 0.85);
  outline-offset: 6px;
}

.bs-end-cta-img {
  display: block;
  width: min(100%, 560px);
  height: auto;
  user-select: none;
  pointer-events: none;
}
`;

fs.writeFileSync('src/index.css', goodCSS + '\n' + restOfCSS + '\n');
console.log('Fixed index.css successfully');
