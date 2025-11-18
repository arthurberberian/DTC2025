import React from "react";
import { track } from "@/lib/track";

type RouteKey = "R1" | "R2" | "R3";

export default function PersonalizedPlan() {
  // Vars isoladas (não colidem com :root)
  const vars = {
    ["--pp-primary" as any]: "#C46D37", // terracota
    ["--pp-border" as any]: "#D9C9B7", // borda mais escura
    ["--pp-card" as any]: "#F5EFE6", // bg mais escuro
    ["--pp-muted" as any]: "#3D3D3D", // texto mais escuro
    ["--pp-ribbon" as any]: "#E9D9C7", // conector sutil
    ["--pp-rota1" as any]: "#C46D37", // terracota vibrante
    ["--pp-rota2" as any]: "#C46D37", // terracota vibrante
    ["--pp-rota3" as any]: "#C46D37", // terracota vibrante
  } as React.CSSProperties;

  function chooseRoute(key: RouteKey) {
    track("plan_choose_route", { route: key });
    const el = document.getElementById("oferta");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="personalizacao" className="relative mx-auto max-w-6xl px-4 py-10" style={vars}>
      {/* Conector/ribbon suave atrás do header */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 rotate-6 blur-2xl"
          style={{
            background: "var(--pp-ribbon)",
            opacity: 0.35,
            width: "clamp(680px, 58vw, 980px)",
            height: "110%",
            borderRadius: 9999,
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 55%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="mb-10 text-center">
        <span className="inline-block rounded-full bg-[var(--pp-primary)] px-3 py-1 text-xs font-semibold text-white tracking-[.08em]">
          Personalização
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-[.01em] text-[#2B2B2B]">
          Sua Jornada, <span className="text-[var(--pp-primary)]">no Seu Ritmo</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-[#2B2B2B]">
          Entendemos que "tamanho único" não serve para profissionais de alta performance. Após cada encontro, você
          recebe um <strong>plano de ação sob medida</strong> e escolhe uma das 3 Rotas de Crescimento conforme seu
          momento, objetivos e disponibilidade.
        </p>
      </div>

      {/* Cards das Rotas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* ROTA 1 */}
        <article className="group flex flex-col rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-card)] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.18),0_2px_8px_-2px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.24),0_4px_16px_-4px_rgba(0,0,0,0.16)] hover:-translate-y-0.5">
          <header className="mb-3">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--pp-primary)]/90 px-3 py-1 text-xs font-bold uppercase tracking-[.08em] text-[#C46D37]">
              Rota 1
            </div>
            <h3 className="text-lg font-extrabold text-[var(--pp-rota1)]">Essencial &amp; Aplicável</h3>
            <p className="mt-1 text-[13px] text-[var(--pp-muted)]">
              Perfil: Procura entender o método e busca ferramentas de aplicação — sem excesso de teoria.
            </p>
          </header>
          <ul className="mb-4 space-y-2 text-[14px] leading-[1.55] text-[#2B2B2B]">
            <li>
              ✅ Pensar e agir <strong>estrategicamente</strong> para alcançar resultados melhores, mesmo com pouco
              tempo disponível.
            </li>
            <li>
              ✅ Consolidar o aprendizado do encontro com o <strong>material principal</strong>.
            </li>
            <li>
              ✅ Foco em <strong>aplicação prática</strong> para gerar resultados eficientes, com estudos de caso.
            </li>
          </ul>
          <p className="mb-5 text-[13px] text-[var(--pp-muted)]">
            <em>Resultado:</em> base sólida e progresso imediato — <strong>tempo otimizado ao máximo</strong>.
          </p>
          <button
            onClick={() => chooseRoute("R1")}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-[var(--pp-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Escolher Rota 1
          </button>
        </article>

        {/* ROTA 2 */}
        <article className="group flex flex-col rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-card)] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.18),0_2px_8px_-2px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.24),0_4px_16px_-4px_rgba(0,0,0,0.16)] hover:-translate-y-0.5">
          <header className="mb-3">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--pp-primary)]/90 px-3 py-1 text-xs font-bold uppercase tracking-[.08em] text-[#C46D37]">
              Rota 2
            </div>
            <h3 className="text-lg font-extrabold text-[var(--pp-rota2)]">Aprofundamento &amp; Domínio</h3>
            <p className="mt-1 text-[13px] text-[var(--pp-muted)]">
              Perfil: deseja aplicar <em>e</em> também entender o "porquê" do método, consolidando domínio clínico.
            </p>
          </header>
          <ul className="mb-4 space-y-2 text-[14px] leading-[1.55] text-[#2B2B2B]">
            <li>
              ✅ Tudo da <strong>Rota 1</strong>, mais…
            </li>
            <li>
              📖 Leituras complementares e <strong>artigos científicos</strong> selecionados.
            </li>
            <li>
              🤔 <strong>Estudo de caso guiado</strong> para aprofundar o raciocínio clínico.
            </li>
          </ul>
          <p className="mb-5 text-[13px] text-[var(--pp-muted)]">
            <em>Resultado:</em> diferenciação pela <strong>profundidade</strong> e mais segurança em casos complexos.
          </p>
          <button
            onClick={() => chooseRoute("R2")}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-[var(--pp-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Escolher Rota 2
          </button>
        </article>

        {/* ROTA 3 */}
        <article className="group flex flex-col rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-card)] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.18),0_2px_8px_-2px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.24),0_4px_16px_-4px_rgba(0,0,0,0.16)] hover:-translate-y-0.5">
          <header className="mb-3">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--pp-primary)]/90 px-3 py-1 text-xs font-bold uppercase tracking-[.08em] text-[#C46D37]">
              Rota 3
            </div>
            <h3 className="text-lg font-extrabold text-[var(--pp-rota3)]">Vanguarda &amp; Liderança</h3>
            <p className="mt-1 text-[13px] text-[var(--pp-muted)]">
              Perfil: Tem experiência na área, busca proficiência e desenvolver nova visão para se posicionar como
              profissional.
            </p>
          </header>
          <ul className="mb-4 space-y-2 text-[14px] leading-[1.55] text-[#2B2B2B]">
            <li>
              ✅ Tudo das <strong>Rotas 1 e 2</strong>, mais…
            </li>
            <li>
              🚀 <strong>Desafios de aplicação avançada</strong> (ex.: comorbidades raras).
            </li>
            <li>
              ✍️ Ultrapassar o domínio <strong> e alcançar a</strong> proficiência.
            </li>
          </ul>
          <p className="mb-5 text-[13px] text-[var(--pp-muted)]">
            <em>Resultado:</em> você vai além de seu consultório e constrói <strong>autoridade</strong> na área.
          </p>
          <button
            onClick={() => chooseRoute("R3")}
            className="mt-auto inline-flex items-center justify-center rounded-full bg-[var(--pp-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Escolher Rota 3
          </button>
        </article>
      </div>

      {/* Nota/rodapé da seção com destaque */}
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-[var(--pp-primary)] bg-gradient-to-r from-[var(--pp-primary)]/5 to-[var(--pp-primary)]/10 px-6 py-4 shadow-[0_8px_24px_-8px_rgba(196,109,55,0.35)]">
          <span className="text-2xl" aria-hidden="true">
            🔄
          </span>
          <p className="text-[15px] md:text-[16px] font-bold text-[#1E1E1E] leading-snug">
            Você pode <span className="text-[var(--pp-primary)]">alternar de rota</span> conforme evolui — a
            personalização acompanha o seu ritmo.
          </p>
        </div>
      </div>
    </section>
  );
}
