import logoHorizontal from "@/assets/logo-branco-horizontal.svg";
import { WHATSAPP_CONTACT_URL } from "@/constants/whatsapp";
import { MessageCircle } from "lucide-react";

const FooterWithReferences = () => {
  return (
    <section className="py-14 bg-[#0D0F12]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo horizontal */}
        <div className="flex items-center justify-center mb-12">
          <img src={logoHorizontal} alt="Escola do Psicólogo Master" className="h-16 md:h-20 lg:h-24 w-auto" />
        </div>

        {/* Botão expansível com referências */}
        <details className="group rounded-2xl border border-[#E8D8CE] bg-white/95 backdrop-blur-sm mx-auto max-w-4xl shadow-sm open:shadow-md transition">
          <summary className="list-none cursor-pointer px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-3">
            <span className="text-sm md:text-base font-semibold text-gray-900">
              Clique aqui para consultar as <span className="text-[#C46D37]">Principais Referências Científicas</span>{" "}
              desta Mentoria
            </span>
            <span
              className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#E8D8CE] text-[#C46D37] transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              ▼
            </span>
          </summary>

          <div className="px-5 pb-5 md:px-6 md:pb-6">
            <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
              <li>
                Trevisan, B. T., Dias, N. M., Berberian, A. A., &amp; Seabra, A. G. (2017).
                <em>
                  {" "}
                  Childhood Executive Functioning Inventory: Adaptação e propriedades psicométricas da versão brasileira
                  (CHEXI)
                </em>
                .<strong> Psico-USF, 22</strong>(1), 63–74.
                <a
                  href="https://doi.org/10.1590/1413-82712017220106"
                  target="_blank"
                  rel="noopener"
                  className="underline text-[#C46D37] hover:text-[#C46D37]/80 transition-colors ml-1"
                >
                  DOI
                </a>
              </li>
              <li>
                Trevisan, B. T., Berberian, A. A., Dias, N. M., Roama-Alves, R. J., &amp; Seabra, A. G. (2022).
                <em> Development and psychometric properties of the IFERA-I</em>.
                <strong> Avaliação Psicológica, 21</strong>(3), 261–272.
                <a
                  href="https://doi.org/10.15689/ap.2022.2103.19957.02"
                  target="_blank"
                  rel="noopener"
                  className="underline text-[#C46D37] hover:text-[#C46D37]/80 transition-colors ml-1"
                >
                  DOI
                </a>
              </li>
              <li>
                National Institute of Mental Health. (2024). <em>NIH Publication No. 24-8300</em>.
              </li>
              <li>
                Rohde, L. A., Buitelaar, J. K., Gerlach, M., &amp; Faraone, S. V. (2019).
                <em> ADHD in children and adolescents: Diagnosis, treatment, and management.</em>
              </li>
              <li>
                American Psychiatric Association. (2022).
                <em> DSM-5-TR: Diagnostic and Statistical Manual of Mental Disorders.</em>
              </li>
              <li>
                Australian ADHD Professionals Association. (2022).
                <em> Australian evidence-based clinical practice guideline for ADHD.</em>
              </li>
              <li>
                National Institute for Health and Care Excellence (NICE). (2025).
                <em> Guidelines for ADHD assessment and management.</em>
              </li>
              <li>
                Barkley, R. A. (2020).
                <em> TDAH: transtorno do déficit de atenção com hiperatividade</em> (L. R. Gil, Trad.). Belo Horizonte:
                Autêntica Editora.
              </li>
              <li>
                Barkley, R. A. (2024).
                <em> Tratando TDAH em crianças e adolescentes: O que todo clínico deve saber.</em> São Paulo: Artmed.
              </li>
              <li>
                Barkley, R. A. (2008).
                <em> Transtorno de déficit de atenção/hiperatividade: manual para diagnóstico e tratamento</em> (R. C.
                Costa, Trad.). Porto Alegre: Artmed.
              </li>
            </ul>
          </div>
        </details>

        {/* Links rápidos */}
        <div className="mt-10 grid sm:grid-cols-3 gap-6 text-sm text-[#E8D8CE]/90">
          <div>
            <h4 className="font-bold text-white mb-2">Contato</h4>
            <ul className="space-y-1">
              <li>✉️ contato@escoladopsicologo.com.br</li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 inline-block" aria-hidden="true" />
                <span>WhatsApp:</span>
                <a
                  href={WHATSAPP_CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  (75) 99142-9877
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Mentoria DTC</h4>
            <ul className="space-y-1">
              <li>Avaliação Neuropsicológica</li>
              <li>Terapia Cognitivo-Comportamental </li>
              <li>Práticas Baseadas em Evidências</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Garantias</h4>
            <ul className="space-y-1">
              <li>Satisfação garantida</li>
              <li>Certificado incluso</li>
              <li>Pagamento seguro</li>
            </ul>
          </div>
        </div>

        {/* Rodapé legal */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-[#E8D8CE]/70">
          © 2025 Escola do Psicólogo Master. Todos os direitos reservados.
        </div>
      </div>
    </section>
  );
};

export default FooterWithReferences;
