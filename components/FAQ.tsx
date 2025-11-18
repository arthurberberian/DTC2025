import { useId } from "react";
import { track } from "@/lib/track";
import CTA from "./CTA";
import { WHATSAPP_CONTACT_URL } from "@/constants/whatsapp";

const qa = [
  {
    q: "Não tenho tempo agora.",
    a: "Entendemos perfeitamente. A mentoria foi criada para profissionais com a agenda cheia. Por isso, o foco é em aplicação imediata, não em volume de teoria. Com encontros gravados e materiais prontos, você economiza anos de estudo independente e ganha um método que, a longo prazo, otimizará seu tempo e seus atendimentos.",
  },
  {
    q: "Já fiz cursos de TDAH.",
    a: "Ótimo! Isso mostra que você busca a excelência. A diferença fundamental é: um curso informa, esta mentoria transforma sua prática. Aqui, você não é um espectador. Você traz seus casos reais, recebe feedback direto da Dra. Bruna, aplica um método validado e mede a evolução. É a ponte que faltava entre o conhecimento que você já tem e a maestria clínica que você busca.",
  },
  {
    q: "Atendo pouco TDAH.",
    a: "Na verdade, esta mentoria é ainda mais valiosa para você. O raciocínio clínico para o diagnóstico diferencial de TDAH é a base para identificar com segurança quadros de ansiedade, depressão, TEA e outras condições. Você não aprenderá apenas sobre TDAH; você vai aprimorar sua principal ferramenta de trabalho: sua capacidade de diagnóstico preciso, independentemente do desfecho.",
  },
  {
    q: "Online não é prático.",
    a: "Pelo contrário, o formato online foi desenhado para ser o mais prático possível. Em vez de teoria abstrata, cada encontro ao vivo gera um arsenal de ferramentas digitais — checklists, roteiros e scripts — que você pode baixar e usar no seu próximo atendimento, seja ele presencial ou online. É a praticidade do conhecimento organizado, acessível de onde você estiver.",
  },
  {
    q: "É investimento alto?",
    a: "Sim, é um investimento estratégico na sua carreira. Pense no custo da insegurança: horas de estudo não direcionado, retrabalho em casos que não evoluem e a perda de oportunidades. Nossa mentoria é 🧭 focada em resultados reais — sem promessas irreais ou atalhos. O retorno não é apenas financeiro (com o aumento da sua reputação e valor por sessão), mas principalmente clínico: a confiança inabalável de saber que você está oferecendo o melhor tratamento possível.",
  },
];

interface FAQProps {
  onApplyClick: () => void;
}

export default function FAQ({ onApplyClick }: FAQProps) {
  const vars = {
    ["--faq-primary" as any]: "#C46D37",
    ["--faq-border" as any]: "#E8D8CE",
    ["--faq-card" as any]: "rgba(255,255,255,0.95)",
    ["--faq-muted" as any]: "#CDBEB4",
    ["--faq-soft" as any]: "#FFF3E9",
    ["--faq-bg" as any]: "#0D0F12",
  } as React.CSSProperties;

  const arrowId = useId();

  return (
    <section id="faq" className="bg-[#0D0F12]" style={vars}>
      <div className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          {/* Card escuro abraçando tudo */}
          <div className="rounded-2xl bg-[var(--faq-bg)] px-4 py-8 md:px-6 md:py-10">
            {/* Cabeçalho */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                <span className="mr-1">❓</span>Dúvidas Comuns
              </h2>
              <p className="text-[#E8D8CE]/90 mt-2">
                Confira as respostas para as perguntas mais frequentes sobre a Mentoria DTC.
              </p>
            </div>

            {/* Lista */}
            <div className="space-y-3">
              {qa.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-[var(--faq-border)] bg-[var(--faq-card)] backdrop-blur-sm shadow-sm open:shadow-md transition"
                  onToggle={(e) => e.currentTarget.open && track("faq_expand", { q: item.q, i })}
                >
                  <summary className="flex w-full cursor-pointer items-center justify-between px-4 py-4 md:px-5">
                    <span className="font-semibold text-gray-900">{item.q}</span>
                    <svg
                      aria-labelledby={arrowId}
                      className="h-5 w-5 text-[var(--faq-primary)] transition-transform group-open:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <title id={arrowId}>Abrir/Fechar</title>
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 01.94 1.17l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.4a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>
                  <div className="border-t border-[var(--faq-border)]/50 px-4 py-4 md:px-5">
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* CTA — Final do FAQ */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* WhatsApp */}
                <CTA
                  href={WHATSAPP_CONTACT_URL}
                  variant="light"
                  size="small"
                  target="_blank"
                  rel="noreferrer"
                  ariaLabel="Tirar dúvidas no WhatsApp"
                  onClick={() => track("whatsapp_click", { placement: "faq" })}
                >
                  TIRAR DÚVIDAS NO WHATSAPP
                </CTA>

                {/* Aplicação */}
                <CTA
                  onClick={onApplyClick}
                  size="small"
                  className="focus-visible:ring-offset-[#0D0F12]"
                  ariaLabel="Iniciar minha aplicação"
                >
                  INICIAR MINHA APLICAÇÃO
                  <span aria-hidden="true">→</span>
                </CTA>
              </div>

              <p className="text-[13px] text-[#CDBEB4] mt-1 text-center">
                Não deixe para depois. O próximo patamar da sua carreira começa aqui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
