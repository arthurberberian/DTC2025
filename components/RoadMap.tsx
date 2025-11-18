import React from "react";
import CTA from "./CTA";

interface Portico {
  number: string;
  title: string;
  items: string[];
  svgPath: string;
  iconSrcSet?: {
    w64: string;
    w96: string;
    w128: string;
    w256: string;
  };
}

const porticos: Portico[] = [
  {
    number: "I",
    title: "INÍCIO DA TRAVESSIA",
    items: ["Integração do grupo", "Ambiente seguro e regras", "Objetivos e métrica de sucesso"],
    svgPath: "/assets/P1.svg",
    iconSrcSet: {
      w64: "/assets/porticos/p1-64w.webp",
      w96: "/assets/porticos/p1-96w.webp",
      w128: "/assets/porticos/p1-128w.webp",
      w256: "/assets/porticos/p1-256w.webp",
    },
  },
  {
    number: "II",
    title: "ACOLHER A FAMÍLIA",
    items: ["Entrevistas e escuta ativa", "Hipóteses e avaliações (Psico/NP/TCC)", "Alinhar expectativas e papéis"],
    svgPath: "/assets/P2.svg",
    iconSrcSet: {
      w64: "/assets/porticos/p2-64w.webp",
      w96: "/assets/porticos/p2-96w.webp",
      w128: "/assets/porticos/p2-128w.webp",
      w256: "/assets/porticos/p2-256w.webp",
    },
  },
  {
    number: "III",
    title: "MONTAR O QUEBRA-CABEÇA",
    items: ["Formulação de caso (TCC)", "Mapa do Crescimento", "Psicoeducação para família"],
    svgPath: "/assets/P3.svg",
    iconSrcSet: {
      w64: "/assets/porticos/p3-64w.webp",
      w96: "/assets/porticos/p3-96w.webp",
      w128: "/assets/porticos/p3-128w.webp",
      w256: "/assets/porticos/p3-256w.webp",
    },
  },
  {
    number: "IV",
    title: "ALINHAR A ROTA",
    items: ["Metas claras e mensuráveis", "Orientação parental", "Revisar e refinar metas"],
    svgPath: "/assets/P4.svg",
    iconSrcSet: {
      w64: "/assets/porticos/p4-64w.webp",
      w96: "/assets/porticos/p4-96w.webp",
      w128: "/assets/porticos/p4-128w.webp",
      w256: "/assets/porticos/p4-256w.webp",
    },
  },
  {
    number: "V",
    title: "PLANO DE AÇÃO",
    items: ["Etapas do tratamento", "Adesão e manejo de obstáculos", "Intervenções casa/escola"],
    svgPath: "/assets/P5.svg",
    iconSrcSet: {
      w64: "/assets/porticos/p5-64w.webp",
      w96: "/assets/porticos/p5-96w.webp",
      w128: "/assets/porticos/p5-128w.webp",
      w256: "/assets/porticos/p5-256w.webp",
    },
  },
  {
    number: "VI",
    title: "INTERVENÇÕES",
    items: ["Técnicas baseadas em evidências", "Tarefas com situações reais", "Foco na criança e no contexto"],
    svgPath: "/assets/P6.svg",
    iconSrcSet: {
      w64: "/assets/porticos/p6-64w.webp",
      w96: "/assets/porticos/p6-96w.webp",
      w128: "/assets/porticos/p6-128w.webp",
      w256: "/assets/porticos/p6-256w.webp",
    },
  },
  {
    number: "VII",
    title: "ETAPA FINAL – AUTONOMIA",
    items: ["Consolidar ganhos e follow-up", "Transferir habilidades à família", "Plano de manutenção"],
    svgPath: "/assets/EPM.svg",
    iconSrcSet: {
      w64: "/assets/porticos/epm-64w.webp",
      w96: "/assets/porticos/epm-96w.webp",
      w128: "/assets/porticos/epm-128w.webp",
      w256: "/assets/porticos/epm-256w.webp",
    },
  },
];

interface RoadMapProps {
  onApplyClick: () => void;
}

export default function RoadMap({ onApplyClick }: RoadMapProps) {
  return (
    <section
      className="dtc-roadmap relative mx-auto max-w-5xl px-4 py-4"
      // TEMA ISOLADO (não mexe no site todo)
      style={
        {
          ["--rdm-primary" as any]: "#C46D37",
          ["--rdm-primary-hover" as any]: "#A54F28",
          ["--rdm-card" as any]: "#FAF7F0",
          ["--rdm-card-border" as any]: "#E9D9C7",
          ["--rdm-text" as any]: "#2B2B2B",
          ["--rdm-muted" as any]: "#5A5A5A",
          ["--rdm-ribbon" as any]: "#E9D9C7",
        } as React.CSSProperties
      }
    >
      {/* Ribbon/escadaria (fundo leve) */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-1/2 top-[-8%] -translate-x-1/2 rotate-6 blur-xl"
          style={{
            background: "var(--rdm-ribbon)",
            opacity: 0.25,
            width: 900,
            height: "130%",
            borderRadius: 9999,
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        <header className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[var(--rdm-primary)] px-3 py-1 text-xs font-semibold text-white tracking-[.08em]">
            TRILHA DE APRENDIZADO DTC — 7 PÓRTICOS
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-[.01em] text-[var(--rdm-text)]">
            Suba a Escadaria rumo à Autonomia
          </h2>
        </header>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          {porticos.map((p, i) => (
            <li key={p.number} className={`group flex items-start gap-5 ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
              {/* Círculo do pórtico */}
              <div className="relative shrink-0">
                <div className="flex size-[clamp(4rem,22vw,8rem)] items-center justify-center rounded-full border-2 border-[var(--rdm-primary)] bg-white">
                  <img src={p.svgPath} alt={`Pórtico ${p.number}`} className="h-[82%] w-[82%] object-contain" />
                </div>
                <div className="absolute -right-1 -top-1 rounded-full bg-[var(--rdm-primary)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white sm:-right-1.5 sm:-top-1.5 sm:px-2 sm:text-[11px]">
                  {p.number}
                </div>
              </div>

              {/* Card */}
              <div className="rdm-card w-full rounded-xl border border-[var(--rdm-card-border)] bg-[var(--rdm-card)] p-4 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.08)] transition-all duration-[180ms] ease-out">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--rdm-primary)] px-2.5 py-1 text-[11px] font-semibold text-white tracking-[.06em]">
                  {p.title}
                </div>
                <ul className="space-y-1 text-[14px] leading-[1.5] text-[var(--rdm-text)]">
                  {p.items.map((item, idx) => (
                    <li key={idx}>{idx === 0 ? <strong>{item}</strong> : item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA — Após a grade dos 7 Pórticos */}
        <div className="mt-10 flex justify-center">
          <div className="text-center">
            <p className="text-sm text-[#7A6A5F] mb-3">
              Você viu o método por dentro. Agora, dê o próximo passo.
            </p>

            <CTA
              onClick={onApplyClick}
              size="primary"
              ariaLabel="Quero ter acesso a este método"
            >
              QUERO TER ACESSO A ESTE MÉTODO
              <span aria-hidden="true">→</span>
            </CTA>

            <div className="mt-2 text-[13px] text-[#8A7A6F]">
              Inicie sua aplicação e transforme sua prática clínica.
            </div>
          </div>
        </div>

        <style>{`
/* Aros decorativos sutis */
.rdm-icon-wrapper::before,
.rdm-icon-wrapper::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--rdm-primary);
  opacity: 0.18;
  pointer-events: none;
}

.rdm-icon-wrapper::after {
  inset: -12px;
  opacity: 0.10;
}

/* Microinteração hover */
@media (hover: hover) {
  .rdm-step:hover .rdm-icon-wrapper {
    transform: translateY(-2px);
    transition: transform 0.18s ease;
  }
  
  .rdm-step:hover .rdm-icon-wrapper::before {
    opacity: 0.28;
    transition: opacity 0.18s ease;
  }
  
  .rdm-step:hover .rdm-card {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px -8px rgba(0,0,0,0.12);
    border-color: #e4dfd7;
  }
}

/* Reduz animações para acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .rdm-icon-wrapper,
  .rdm-card {
    transition: none !important;
  }
}

/* Aplica a todos os ícones do RoadMap */
.rdm-icon { 
  position: relative; 
  overflow: hidden; 
  border-radius: 9999px; 
}

.rdm-icon > img {
  position: absolute;
  inset: calc(var(--overfill, 10%) * -1);
  object-fit: cover;
  border-radius: 9999px;
}

@media (min-width:768px){ 
  .rdm-icon > img { 
    inset: calc(var(--overfill-md, 8%) * -1); 
  } 
}

@media (min-width:1024px){ 
  .rdm-icon > img { 
    inset: calc(var(--overfill-lg, 6%) * -1); 
  } 
}
         `}</style>
      </div>
    </section>
  );
}
