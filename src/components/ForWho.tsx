import { Check } from "lucide-react";
import CTA from "./CTA";

interface ForWhoProps {
  onApplyClick: () => void;
}

export default function ForWho({ onApplyClick }: ForWhoProps) {
  return (
    <section className="relative isolate">
      {/* faixa full-bleed */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#2C2C2C]">
        {/* degradês superior/inferior */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-transparent to-[#2C2C2C]/70" />
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-6 bg-gradient-to-t from-transparent to-[#2C2C2C]/70" />

        {/* conteúdo central */}
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          {/* badge (sem shadcn) */}
          <div className="relative mx-auto mb-6 w-fit">
            <div
              className="relative rounded-full bg-[#C46D37] text-white border border-[#C46D37]
                  px-4 py-1.5 text-sm font-medium hover:bg-[#A94F27] transition
                  shadow-[0_6px_20px_-6px_rgba(196,109,55,0.45)]"
            >
              Para quem é esta mentoria
            </div>
          </div>

          {/* título */}
          <h2 className="mx-auto mb-8 text-center text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Esta mentoria foi desenhada para você que busca:
          </h2>

          {/* card */}
          <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 shadow-[0_8px_24px_-12px_rgba(196,109,55,0.30)] md:p-8">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              {/* item */}
              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#C46D37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <p className="text-white/90">
                  Conduzir o atendimento de pessoas com TDAH com{" "}
                  <span className="text-[#C46D37] font-semibold">autonomia e segurança do início ao fim</span>.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#C46D37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <p className="text-white/90">
                  Deixar para trás as dúvidas sobre a melhor abordagem e o tratamento do paciente com TDAH{" "}
                  <span className="whitespace-nowrap">infantojuvenil</span>.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#C46D37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <p className="text-white/90">
                  Ir além do básico e gerar <span className="font-semibold text-white">impacto profundo</span>,
                  orientando famílias com maestria e promovendo transformações reais.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#C46D37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <p className="text-white/90">
                  Um método claro para <span className="font-medium text-white">formular casos</span>,{" "}
                  <span className="font-medium text-white">identificar ciclos de manutenção dos sintomas</span> e{" "}
                  <span className="font-medium text-white">propor tratamento estratégico</span>.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#C46D37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <p className="text-white/90">
                  <span className="font-medium text-white">Dominar um método validado</span>, sabendo exatamente o que
                  fazer em cada etapa — do raciocínio clínico à devolutiva final.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[#C46D37]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                <p className="text-white/90">
                  Ir além da teoria e aplicar{" "}
                  <span className="font-medium text-white">ferramentas práticas, validadas e aplicáveis</span> para
                  oferecer os melhores caminhos a cada paciente.
                </p>
              </li>
            </ul>
          </div>

          {/* CTA — Após a lista de identificação */}
          <div className="mt-8 text-center">
            <CTA
              onClick={onApplyClick}
              size="intermediate"
              className="focus-visible:ring-offset-[#2C2C2C]"
              ariaLabel="Se você se identificou, aplique agora"
            >
              SE VOCÊ SE IDENTIFICOU, APLIQUE AGORA
              <span aria-hidden="true">→</span>
            </CTA>

            <div className="mt-2 text-[13px] text-white/70">
              Junte-se a profissionais que não se contentam com o básico.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
