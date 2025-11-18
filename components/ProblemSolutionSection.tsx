import { Users, Hourglass } from "lucide-react";
import epmSelo from "@/assets/epm-selo-48.webp";

interface ProblemSolutionSectionProps {
  onApplyClick: () => void;
}

export default function ProblemSolutionSection({ onApplyClick }: ProblemSolutionSectionProps) {
  return (
    <section className="relative border-t">
      {/* BG image super leve */}
      <picture aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* mobile */}
        <source media="(max-width: 640px)" srcSet="/img/escadaria-800.avif" type="image/avif" />
        <source media="(max-width: 640px)" srcSet="/img/escadaria-800.webp" type="image/webp" />
        {/* desktop */}
        <source srcSet="/img/escadaria-1600.avif" type="image/avif" />
        <source srcSet="/img/escadaria-1600.webp" type="image/webp" />
        <img
          src="/img/escadaria-1600.webp"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>
      {/* Overlays para manter texto escuro legível */}
      <div className="absolute inset-0 -z-10 bg-white/82" /> {/* "apaga" a foto */}
      <div className="absolute inset-0 -z-10 bg-[#C46D37]/10 mix-blend-multiply" /> {/* tom terracota sutil */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-transparent to-white/70" />
      {/* Seu conteúdo original (inalterado) */}
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <h2 className="text-center text-[32px] md:text-[40px] font-serif font-medium tracking-tight text-[#2A2A3A] leading-tight mb-8 md:mb-10">
          Por que uma mentoria focada em TDAH?
        </h2>

        <div className="mx-auto max-w-4xl space-y-6">
          <p className="text-[18px] md:text-[19px] leading-relaxed text-[#3A3A3A] text-justify">
            O TDAH é um dos quadros mais complexos da prática clínica. As manifestações variam de paciente para
            paciente, tornando a avaliação e a intervenção desafiadoras{" "}
            <strong className="font-semibold">até para profissionais experientes.</strong>
          </p>

          <p className="text-[18px] md:text-[19px] leading-relaxed text-[#3A3A3A] text-justify">
            Sintomas que se confundem com outros transtornos, variações de comportamento e impactos nas diferentes áreas
            da vida exigem mais do que teoria: exigem raciocínio clínico com critério e método.{" "}
            <strong className="font-semibold">É isso que vamos construir aqui.</strong>
          </p>

          <p className="text-[18px] md:text-[19px] leading-relaxed text-[#3A3A3A] text-justify">
            <strong className="font-semibold">Esta mentoria foi desenhada para caminhar ao seu lado,</strong> da
            avaliação à condução de casos, oferecendo três pilares essenciais:
            {/* 👇 ESPAÇO ADICIONADO AQUI, ANTES DO SPAN */}
            <span className="font-semibold text-[#C46D37]"> clareza, método e feedback prático. </span>
            {/* 👇 ESPAÇO ADICIONADO AQUI, DEPOIS DO SPAN */}
            Resultados clínicos são uma consequência. Nossa missão é transformar seu conhecimento em ação, dando-lhe o
            método, o propósito e a confiança para fazer a diferença na vida de seus pacientes.
          </p>

          <figure className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/90 backdrop-blur-sm px-6 py-5">
            <blockquote className="text-lg md:text-xl text-slate-800">
              <span className="block font-semibold">"82% dos participantes</span> relatam mais segurança para conduzir
              casos de TDAH."
            </blockquote>
            <figcaption className="mt-2 text-sm text-slate-500">
              Pesquisa interna com alunos da EPM (últimas 3 turmas).
            </figcaption>
          </figure>

          <div className="pt-6 text-center">
            <span className="inline-flex rounded-2xl p-[2px] bg-gradient-to-b from-[#D77A45] to-[#8F3B18] shadow-[0_20px_50px_-12px_rgba(196,109,55,0.55)]">
              <button
                type="button"
                onClick={onApplyClick}
                className="
                  inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white
                  bg-gradient-to-b from-[#C96F3C] to-[#A2542F]
                  hover:from-[#CF7644] hover:to-[#954A29]
                  active:translate-y-px transition
                  ring-1 ring-[#8F3B18]/70
                  shadow-[0_14px_40px_-10px_rgba(196,109,55,0.6),0_6px_22px_-10px_rgba(0,0,0,0.35)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C46D37]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                "
                aria-label="Quero mais segurança na clínica"
              >
                ⚡ QUERO MAIS SEGURANÇA NA CLÍNICA
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
