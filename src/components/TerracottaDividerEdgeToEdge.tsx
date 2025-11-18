import React from "react";

interface Props {
  acimaCor?: string;  // cor da seção clara acima (padrão: #FAF7F0)
  abaixoCor?: string; // cor da seção dark abaixo (padrão: #0D0F12)
}

export default function TerracottaDividerEdgeToEdge({
  acimaCor = "#FAF7F0",
  abaixoCor = "#0D0F12",
}: Props) {
  return (
    <section aria-label="Faixa de foco em resultados" className="relative">
      {/* FULL-BLEED WRAPPER */}
      <div className="relative w-screen -mx-[calc(50vw-50%)]">
        {/* FAIXA TERRACOTA FULL-BLEED (sem max-width e sem cantos arredondados) */}
        <div
          className="py-6 md:py-8 text-center shadow-[0_14px_40px_-12px_rgba(196,109,55,0.45)]"
          style={{ background: "#C46D37" }}
        >
          <span className="inline-flex items-center justify-center gap-2 text-white px-4 md:px-6">
            <span aria-hidden className="text-lg md:text-xl">🎯</span>
            <span className="text-[15px] md:text-[16px] font-semibold leading-snug uppercase tracking-wide">
              Nosso foco é em resultados reais — sem promessas irreais ou atalhos
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
