import * as React from "react";

/** Tamanhos: sm | md | lg */
type Size = "sm" | "md" | "lg";
const SIZES: Record<Size, { box: string; title: string; sub: string; pad: string }> = {
  sm: { box: "w-[92px] h-[92px]", title: "text-[16px]", sub: "text-[9px]", pad: "px-4 py-3" },
  md: { box: "w-[120px] h-[120px]", title: "text-[20px]", sub: "text-[11px]", pad: "px-6 py-4" },
  lg: { box: "w-[140px] h-[140px]", title: "text-[22px]", sub: "text-[12px]", pad: "px-7 py-5" },
};

/* =========================================================================
   🥇 1) Selo Dourado / Terracota — para destaque (hero)
   =======================================================================*/
export function BadgeGold({
  size = "md",
  rotate = -5,
  title = "7ª Turma",
  subtitle = "em apenas 2 anos",
  className = "",
}: {
  size?: Size;
  rotate?: number; // rotação tipo "carimbo"
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <div
      aria-label={`${title} — ${subtitle}`}
      className={[
        "relative select-none rounded-full text-white text-center",
        "shadow-[0_8px_28px_-6px_rgba(196,109,55,0.55)]",
        "border-[3px] border-[#B85C2C]/80",
        "flex flex-col items-center justify-center leading-none",
        s.box,
        s.pad,
        className,
      ].join(" ")}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "radial-gradient(110% 140% at 35% 100%, #C46D37 0%, #D27A4A 40%, #E5A06D 80%)",
      }}
    >
      {/* anel interno sutil */}
      <span className="pointer-events-none absolute inset-[6px] rounded-full ring-1 ring-white/30" />
      <span className={`font-extrabold ${s.title}`}>{title}</span>
      <span className={`uppercase tracking-[.14em] opacity-90 mt-1 ${s.sub}`}>{subtitle}</span>
    </div>
  );
}

/* =========================================================================
   🩶 2) Selo Clean — reforço visual em seções internas
   =======================================================================*/
export function BadgeClean({
  size = "md",
  rotate = -4,
  title = "7ª",
  subtitleTop = "TURMA",
  caption = "em 2 anos",
  className = "",
}: {
  size?: Size;
  rotate?: number;
  title?: string;
  subtitleTop?: string;
  caption?: string;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <div
      aria-label={`${title} ${subtitleTop} — ${caption}`}
      className={[
        "relative select-none rounded-full",
        "bg-white/95 backdrop-blur-sm text-[#C46D37]",
        "border border-[#C46D37]/40",
        "shadow-[0_6px_20px_-6px_rgba(196,109,55,0.35)]",
        "flex flex-col items-center justify-center",
        s.box,
        s.pad,
        className,
      ].join(" ")}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className={`font-extrabold leading-none ${s.title}`}>{title}</span>
      <span className="text-sm font-bold leading-none">{subtitleTop}</span>
      <span className={`mt-1 uppercase tracking-[.14em] text-[10px] opacity-80 ${s.sub}`}>{caption}</span>
    </div>
  );
}

/* =========================================================================
   🪶 3) Selo de Cera (Wax Seal) — institucional, vintage
   =======================================================================*/
export function BadgeWax({
  textTop = "7ª TURMA",
  textBottom = "EM APENAS 2 ANOS",
  rotate = -6,
  className = "",
}: {
  textTop?: string;
  textBottom?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      aria-label={`${textTop} — ${textBottom}`}
      className={[
        "relative select-none rounded-full",
        "text-white text-center",
        "shadow-[0_10px_32px_-8px_rgba(156,63,33,0.6)]",
        "border-[4px] border-[#9C3F21]/70",
        "flex flex-col items-center justify-center leading-none",
        "w-32 h-32 px-6 py-5",
        className,
      ].join(" ")}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "radial-gradient(120% 150% at 40% 110%, #9C3F21 0%, #B8472A 35%, #CC5C38 70%, #D67250 100%)",
      }}
    >
      {/* Anel interno texturizado */}
      <span className="pointer-events-none absolute inset-[8px] rounded-full ring-[2px] ring-white/25 shadow-inner" />
      {/* Textura sutil de cera */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse at 30% 30%, transparent 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
        }}
      />
      <span className="relative z-10 font-extrabold text-[13px] tracking-tight">{textTop}</span>
      <span className="relative z-10 mt-1.5 uppercase tracking-[.16em] text-[9px] opacity-95 font-bold">{textBottom}</span>
    </div>
  );
}
