interface SectionHeaderProps {
  title: string;
  subtitle: string;
  accent?: string;
}

export function SectionHeader({
  title,
  subtitle,
  accent = "#C46D37",
}: SectionHeaderProps) {
  return (
    <header className="mb-6 md:mb-8 text-center">
      {/* Badge fino */}
      <div
        className="mx-auto mb-3 w-fit rounded-full px-3 py-1 text-[11px] font-semibold tracking-[.12em] uppercase"
        style={{
          color: accent,
          backgroundColor: "rgba(196,109,55,0.10)",
          border: `1px solid ${accent}1A`,
        }}
      >
        Mentoria DTC
      </div>

      {/* Título serif "editorial" com ícones laterais */}
      <div className="flex items-center justify-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="opacity-80 text-[#C46D37]/70 flex-shrink-0"
          aria-hidden="true"
        >
          <path
            d="M12 3l2.5 4.5L19 10l-4.5 2.5L12 17l-2.5-4.5L5 10l4.5-2.5L12 3z"
            fill="currentColor"
          />
        </svg>
        
        <h3 className="font-serif text-[22px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em] text-[#1F2330]">
          {title}
        </h3>
        
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="opacity-80 text-[#C46D37]/70 flex-shrink-0"
          aria-hidden="true"
        >
          <path
            d="M12 3l2.5 4.5L19 10l-4.5 2.5L12 17l-2.5-4.5L5 10l4.5-2.5L12 3z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Subtítulo */}
      <p className="mx-auto mt-3 max-w-2xl text-[14.5px] md:text-[15.5px] leading-relaxed text-[#5B616E]">
        {subtitle}
      </p>
    </header>
  );
}
