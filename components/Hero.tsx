import { track } from "@/lib/track";
import brunaHeroProfessional from "@/assets/bruna-hero-professional.png";
import logoBranco from "@/assets/logo-branco-horizontal.png";

interface HeroProps {
  onApplyClick: () => void;
}

export default function Hero({ onApplyClick }: HeroProps) {
  function onPrimary() {
    track("cta_click_hero", { page: "mentoria_tdah" });
    onApplyClick();
  }

  return (
    <section className="border-b bg-gradient-to-br from-[#141A26] to-[#0D1320] relative">
      {/* Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Column - Content */}
          <div className="text-white space-y-6 animate-fade-in">
            {/* Vagas Limitadas Tag */}
            <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full" style={{color: '#FF6B6B', background: 'rgba(255,107,107,.12)'}}>
              <span className="inline-block w-2 h-2 rounded-full" style={{background: '#FF6B6B'}}></span>
              Vagas limitadas
            </div>

            {/* Logo Oficial */}
            <div className="mb-8">
              <a
                href="https://www.escoladopsicologo.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
                aria-label="Visitar site da Escola do Psicólogo"
              >
                <img src={logoBranco} alt="Escola do Psicólogo Master" className="h-16 md:h-24 w-auto" />
              </a>
            </div>

            {/* Headline */}
            <h1 className="space-y-2">
              <span className="block max-w-[26ch] text-3xl md:text-5xl leading-tight tracking-tight font-bold text-white [text-wrap:balance]">
                Para psicólogos que não aceitam ser 'mais do mesmo'.
              </span>

              <span className="block max-w-[22ch] text-2xl md:text-3xl leading-tight tracking-tight font-semibold text-[#C46D37] [text-wrap:balance]">
                Domine o Atendimento Clínico do TDAH.
              </span>
              <span className="block max-w-[22ch] text-2xl md:text-3xl leading-tight tracking-tight font-semibold text-[#C46D37] [text-wrap:balance]">
                Conduza casos complexos com segurança.
              </span>
            </h1>

            {/* Descrição */}
            <p className="max-w-[90%] text-base text-white/80 leading-relaxed">
              Mentoria especializada, lado a lado com a Dra. Bruna Trevisan, para profissionais que desejam excelência
              no tratamento de crianças e adolescentes com TDAH.
            </p>

            <button
              id="hero-cta"
              type="button"
              onClick={onPrimary}
              className="cta-hero text-lg md:text-xl bg-[#C46D37] hover:bg-gradient-to-r hover:from-[#C46D37] hover:to-[#E48A55] text-[#FAF9F4] font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E48A55]/60 transform hover:scale-[1.03] active:scale-[0.99] will-change-transform"
              aria-label="Aplicar para a Mentoria em TDAH"
            >
              INICIAR MINHA APLICAÇÃO
            </button>

            <p className="text-white/70 text-sm mt-4">
              Analisamos cada aplicação cuidadosamente. Retornamos em até 2 dias úteis.
            </p>

            {/* Linha de credibilidade */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 mt-5 text-white/80 text-sm md:text-base" aria-label="pontos de credibilidade">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span aria-hidden="true">🧠</span>
                <span>Método</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <span aria-hidden="true">🎯</span>
                <span>Critério</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <span aria-hidden="true">📘</span>
                <span>Materiais aplicáveis</span>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Image + Card sincronizado */}
          <div className="relative">
            {/* Wrapper com a mesma largura da foto */}
            <div className="relative mx-auto w-full max-w-md overflow-visible">
              {/* Badge 7ª Turma */}
              <div className="absolute -top-7 right-4 md:-top-9 md:right-6 badge-grad text-white rounded-full w-28 h-28 md:w-32 md:h-32 grid place-items-center shadow-xl ring-[10px] ring-[#0E1621] z-10">
                <div className="text-center leading-tight txt-shadow">
                  <div className="text-base md:text-lg font-black">7ª</div>
                  <div className="text-lg md:text-xl font-black -mt-0.5">Turma</div>
                  <div className="text-[10px] md:text-xs opacity-95">em</div>
                  <div className="text-[10px] md:text-xs font-semibold">apenas 2 anos</div>
                </div>
              </div>

              {/* Professional Photo */}
              <aside className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl min-h-[520px] md:min-h-[640px] flex items-end">
                  {/* Overlay de gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C46D37]/10 to-transparent pointer-events-none" />
                  
                  <img
                    src={brunaHeroProfessional}
                    alt="Dra. Bruna Trevisan, mentora da Mentoria em TDAH"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </aside>

              {/* Professional Info Card */}
              {/* No mobile: card vem abaixo (estático).
       Em md+: absoluto, canto inferior direito, mas sempre limitado pelo wrapper */}
              <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4">
                <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,.12)] overflow-hidden w-[clamp(220px,60%,320px)] sm:w-[clamp(240px,56%,340px)] md:w-[clamp(240px,50%,320px)] max-w-full">
                  <div className="px-3 py-1.5 md:px-4 md:py-2">
                    {/* Nome + PhD */}
                    <h3 className="font-extrabold text-gray-900 text-lg md:text-xl leading-none tracking-tight">
                      Bruna Trevisan<span className="font-semibold text-[#C46D37]">, PhD</span>
                    </h3>

                    {/* Divider limitado ao card */}
                    <div className="mt-2 h-px w-full bg-gray-200" />

                    {/* Rating Stars */}
                    <div className="mt-3 flex items-center gap-0.5 text-[#C46D37]" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="sr-only">Avaliação: 5 de 5 estrelas</span>

                    {/* Credentials */}
                    <p className="text-sm text-gray-600 mt-2 leading-snug">
                      +18 anos de experiência clínica e pesquisa em TDAH
                    </p>
                  </div>
                </div>
              </div>
              {/* /Professional Info Card */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
