import React from "react";

interface MainCTADarkProps {
  onApplyClick: () => void;
}

export default function MainCTADark({ onApplyClick }: MainCTADarkProps) {
  const handleApplyClick = () => {
    onApplyClick();
  };

  const vars = {
    ["--cta-bg" as any]: "#0D0F12",
    ["--cta-card" as any]: "rgba(18, 21, 26, .92)",
    ["--cta-border" as any]: "#2A2F37",
    ["--cta-text" as any]: "#F6F6F6",
    ["--cta-muted" as any]: "#CDBEB4",
    ["--cta-primary" as any]: "#C46D37",
    ["--cta-primary-hover" as any]: "#A54F28",
  } as React.CSSProperties;

  return (
    <section id="cta-principal" className="relative w-full bg-[var(--cta-bg)] py-4 md:py-6" style={vars}>
      {/* Glow/spotlight sutil por trás do card */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-20%] h-[420px] w-[780px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(196,109,55,0.18) 0%, rgba(196,109,55,0.10) 45%, rgba(196,109,55,0.00) 80%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        {/* Card principal */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--cta-border)] bg-[var(--cta-card)] px-6 py-10 md:px-10 md:py-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
          {/* Título de apoio */}
          <p className="text-center text-[15px] md:text-base text-[var(--cta-muted)]">
            Você está a um passo de transformar sua prática clínica.
          </p>

          {/* Título principal */}
          <h2 className="mt-2 text-center text-[22px] md:text-3xl font-extrabold tracking-[.01em] text-[var(--cta-text)]">
            Torne-se referência em TDAH com método, materiais e mentoria direta.
          </h2>

          {/* Selo 7ª Turma + texto explicativo */}
          <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <picture className="flex-shrink-0">
              <source srcSet="/assets/selo-turma7-desktop.webp" media="(min-width: 768px)" type="image/webp" />
              <source srcSet="/assets/selo-turma7-mobile.avif" type="image/avif" />
              <img
                src="/assets/selo-turma7-desktop.webp"
                alt="Selo 7ª Turma em 2 anos"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
                loading="lazy"
              />
            </picture>
            
            <p className="max-w-xs text-center md:text-left text-sm text-[var(--cta-muted)] leading-relaxed">
              Turmas recorrentes e demanda crescente — <strong className="text-[var(--cta-text)]">consistência ao longo de 2 anos</strong>.
            </p>
          </div>

          {/* BOTÃO – grande, sólido, super contrastante */}
          <div className="pt-6 text-center">
            <span className="inline-flex rounded-2xl p-[2px] bg-gradient-to-b from-[#D77A45] to-[#8F3B18] shadow-[0_24px_64px_-16px_rgba(196,109,55,0.55)]">
              <button
                type="button"
                onClick={handleApplyClick}
                className="
                  inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base md:text-lg font-semibold text-white
                  bg-gradient-to-b from-[#C96F3C] to-[#A2542F]
                  hover:from-[#CF7644] hover:to-[#954A29]
                  active:translate-y-px transition
                  ring-1 ring-[#8F3B18]/70
                  shadow-[0_16px_44px_-12px_rgba(196,109,55,0.6),0_8px_24px_-12px_rgba(0,0,0,0.4)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-primary)]/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cta-bg)]
                "
                aria-label="Quero me tornar referência em TDAH"
              >
                ⭐ QUERO ME TORNAR REFERÊNCIA EM TDAH
              </button>
            </span>
          </div>

          {/* Microcopy de urgência/exclusividade */}
          <p className="mx-auto mt-3 max-w-xl text-center text-[12px] text-[var(--cta-muted)]">
            Vagas <strong>exclusivas</strong> para profissionais realmente comprometidos. Aplicações analisadas por
            ordem de chegada.
          </p>

          {/* Selo "Certificado incluso" (abaixo do botão) */}
          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--cta-primary)]/35 bg-white/95 px-3 py-1 text-xs font-medium text-[#1C1C1C] shadow-sm backdrop-blur">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="10" r="5.5" stroke="#C46D37" strokeWidth="1.5" />
                <circle cx="12" cy="10" r="3" fill="#C46D37" />
                <path
                  d="M14.5 14.5l2.4 3.8c.1.2 0 .5-.2.6l-1.7.7c-.2.1-.5 0-.6-.2l-1.5-2.5"
                  fill="none"
                  stroke="#C46D37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 14.5l-2.4 3.8c-.1.2 0 .5.2.6l1.7.7c.2.1.5 0 .6-.2l1.5-2.5"
                  fill="none"
                  stroke="#C46D37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>Certificado incluso</span>
            </span>
          </div>

          {/* Fade sutil interno no rodapé do card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white/5"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
