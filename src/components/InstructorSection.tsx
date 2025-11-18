import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import brunaInstructor900 from "@/assets/bruna-instructor-900.webp";
import brunaInstructor600 from "@/assets/bruna-instructor-600.webp";
import logoUsp from "@/assets/logo-usp-new.svg";
import logoNeuroUsp from "@/assets/logo-neurousp.svg";
import logoUnifesp from "@/assets/logo-unifesp-new.svg";
import logoMackenzie from "@/assets/logo-mackenzie-new.svg";
import logoFaap from "@/assets/logo-faap-new.svg";

type Logo = { src: string; alt: string; needInvert?: boolean; className?: string };

const logos: Logo[] = [
  { src: logoUsp, alt: "USP", needInvert: true, className: "transform scale-100" },
  { src: logoNeuroUsp, alt: "NeuroUsp", needInvert: true, className: "transform scale-100" },
  { src: logoUnifesp, alt: "UNIFESP", needInvert: true, className: "transform scale-100" },
  { src: logoMackenzie, alt: "Mackenzie", needInvert: true, className: "transform scale-100" },
  { src: logoFaap, alt: "FAAP", needInvert: true, className: "transform scale-100" },
];

const credentials = [
  {
    icon: "📜",
    text: "Doutora com Pós-Doutorado em Distúrbios do Desenvolvimento",
  },
  {
    icon: "🧠",
    text: "Mestre em Distúrbios do Desenvolvimento",
  },
  {
    icon: "💬",
    text: "Especialista em Terapia Cognitivo-Comportamental pelo Centro Veda e pelo DGERT (União Europeia)",
  },
  {
    icon: "🏛️",
    text: "Docente e Supervisora Clínica das Especializações em Neuropsicologia da FMUSP-HC e UNIFESP.",
  },
  {
    icon: "🧬",
    text: "Pesquisadora do grupo de Neuropsicologia Infantil da Universidade Presbiteriana Mackenzie",
  },
  { icon: "❤️", text: "Esposa, mãe de dois filhos" },
];

const achievements = [
  "+18 anos de pesquisa e experiência clínica dedicados ao neurodesenvolvimento.",
  "Referência em avaliação neuropsicológica infantil",
  "Neuropsicologia brasileira: autora de ferramentas e publicações relevantes na área.",
  "Professora em programas de pós-graduação Lato-Sensu (UNIFESP, FMUSP-HC, FAAP, CTC Veda)",
  "Acompanhou e impulsionou centenas de profissionais que hoje são referência e inspiração em diferentes áreas e regiões.",
];

export default function InstructorSection() {
  return (
    <section
      id="instrutora"
      aria-labelledby="instructor-heading"
      className="relative overflow-hidden border-t bg-[#2C2C2C]"
    >
      {/* textura sutil para sofisticação */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background:radial-gradient(1200px_600px_at_-10%_-20%,#ffffff20_0%,transparent_60%),radial-gradient(800px_400px_at_120%_120%,#ffffff1a_0%,transparent_60%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 py-14 md:grid-cols-2 md:gap-14 md:py-20">
        {/* Foto + badges */}
        <div className="order-first md:order-none">
          <div className="relative mx-auto w-full max-w-[440px] overflow-visible">
            <div className="relative overflow-hidden rounded-[22px] bg-black/10 ring-1 ring-black/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] md:h-[700px]">
              <picture>
                <source media="(min-width: 768px)" srcSet={brunaInstructor900} />
                <img
                  src={brunaInstructor600}
                  alt="Dra. Bruna Trevisan"
                  className="h-full w-full object-cover [object-position:55%_center]"
                  loading="eager"
                />
              </picture>
            </div>

            {/* +18 anos */}
            <div className="absolute -top-5 -right-6 z-10 rounded-xl bg-[#C46D37] px-5 py-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
              <div className="text-center leading-tight">
                <div className="text-[22px] font-bold">+18</div>
                <div className="text-[11px] opacity-90">Anos de experiência</div>
              </div>
            </div>

            {/* +1.000 casos */}
            <div className="absolute -bottom-5 -left-6 z-10 rounded-xl bg-[#C46D37] px-5 py-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
              <div className="text-center leading-tight">
                <div className="text-[22px] font-bold">+1.000</div>
                <div className="text-[12px] opacity-80">Casos clínicos supervisionados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-3 border-[#C46D37] bg-[#C46D37] text-white hover:bg-[#A94F27] text-sm font-medium">
              Sua mentora
            </Badge>

            <p className="text-sm text-white/80 leading-relaxed mb-3">
              Suba a nossa Escadaria rumo a um novo patamar clínico. Conheça quem vai encurtar o seu caminho.
            </p>

            <h2 id="instructor-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl mb-3">
              Bruna Trevisan, PhD
            </h2>

            <p className="text-sm leading-relaxed text-white/90">
              Psicóloga e neuropsicóloga clínica; pesquisadora e docente, com sólida experiência em TDAH.
            </p>
          </div>

          {/* credenciais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {credentials.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20"
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-xs font-medium text-white/90">{c.text}</span>
              </div>
            ))}
          </div>

          {/* biografia / destaques */}
          <Card className="border-white/10 bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <CardContent className="p-5">
              <h3 className="text-base font-bold text-white mb-3">Biografia Resumida</h3>
              <div className="space-y-2">
                {achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-[#C46D37] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-white/90 text-xs leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* logos */}
          <div className="w-full">
            <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-6 md:gap-8">
              {logos.map((l) => (
                <img
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  title={l.alt}
                  loading="lazy"
                  decoding="async"
                  className={`block mx-auto h-[52px] md:h-[60px] w-auto object-contain
                              opacity-85 transition hover:opacity-100
                              ${l.needInvert ? "brightness-0 invert" : ""} ${l.className ?? ""}`}
                />
              ))}
            </div>
          </div>

          {/* Citação inspiradora */}
          <blockquote className="border-l-4 border-[#C46D37] pl-5 italic text-white/80 text-sm leading-relaxed">
            "Minha missão é guiar profissionais em uma jornada da insegurança à autonomia, para que você conduza seus
            atendimentos caso com a confiança que só a excelência técnica e científica pode dar."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
