import { useState } from "react";
import Hero from "@/components/Hero";
import InstructorSection from "@/components/InstructorSection";
import RoadMap from "@/components/RoadMap";
import MainCTADark from "@/components/MainCTADark";
import PersonalizedPlan from "@/components/PersonalizedPlan";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ForWho from "@/components/ForWho";
import FAQ from "@/components/FAQ";
import StickyCta from "@/components/StickyCta";
import FooterWithReferences from "@/components/FooterWithReferences";
import TerracottaDividerEdgeToEdge from "@/components/TerracottaDividerEdgeToEdge";
import SocialProof from "@/components/SocialProof";
import ApplyFormModal from "@/components/ApplyFormModal";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openApplyModal = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 1. Hero (DARK) */}
      <Hero onApplyClick={openApplyModal} />

      {/* 2. Por que TDAH é complexo? (problema) */}
      <ProblemSolutionSection onApplyClick={openApplyModal} />

      {/* 3. Quem ensina (autoridade DARK) */}
      <InstructorSection />

      {/* 4. Como ensina - método (RoadMap) */}
      <section id="metodo" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <RoadMap onApplyClick={openApplyModal} />
      </section>

      {/* 5. Faixa terracota (foco em resultados) */}
      <TerracottaDividerEdgeToEdge acimaCor="#FAF7F0" abaixoCor="#0D0F12" />

      {/* 6. CTA forte (conversão DARK) */}
      <MainCTADark onApplyClick={openApplyModal} />

      {/* 7. Personalização (rotas) */}
      <section className="mx-auto max-w-6xl px-4">
        <PersonalizedPlan />
      </section>

      {/* 8. Para quem é (qualificação tardia DARK) */}
      <ForWho onApplyClick={openApplyModal} />

      {/* 9. Prova social (3 seções: vídeo + cards) */}
      <SocialProof
        onApplyClick={openApplyModal}
        section1Video={{
          embedUrl:
            "https://player.curseduca.com/embed/c9f39bcd-8719-492c-bc9c-d9f442f21e7d?api_key=e0224d680d7ad653901256c89d606bb33c10bf9c",
          thumbnail: "/social-proof/valeu-a-pena-960w.webp",
          thumbnailSrcSet: {
            w640: "/social-proof/valeu-a-pena-640w.webp",
            w960: "/social-proof/valeu-a-pena-960w.webp",
            w1280: "/social-proof/valeu-a-pena-1280w.webp",
            w1920: "/social-proof/valeu-a-pena-1920w.webp",
          },
          transcript: {
            summary: "Como cada encontro rende insights aplicáveis e a troca de experiências acelera o aprendizado.",
            highlights: [
              { time: 15, label: "\"Não dá para perder nem um minuto\" — valor de cada sessão." },
              { time: 48, label: "Crescimento para oferecer o melhor aos pacientes." },
              { time: 72, label: "Estratégias prontas para desenvolver limites e dificuldades." },
            ],
            fullText: `Eu vejo que ela chegou num momento que eu tava assim Meu Deus, onde que eu vou? Por onde que eu vou trilhar os meus passos, os meus caminhos? E ela veio direcionando isso. Foi muita mudança que aconteceu. Mas assim é tão e tão precioso que às vezes eu falo assim Olha, eu já perdi uma hora. Acho que eu não vou entrar. Se você entrar uma hora, se você ficar quinze minutos, você sai. É tão enriquecedor que vale. Não dá para perder nem um minuto. Cada caso que que vocês compartilham, que a gente troca, a experiência que a gente. Eu não sou muito de falar, mas assim que a gente ouve, vai dando uns uns cliques. Nossa, isso eu posso usar aqui. Isso vai dando um insight assim para a gente criar, crescer, aprender, né? Então assim é muito enriquecedor, né? E eu agradeço assim de coração, cada um de vocês. E eu vejo assim o quanto que eu não sei quem falou, né? Mas o quanto que essa mentoria a gente cresce para oferecer o melhor para os nossos pacientes. Mas como a gente também cresce interiormente, como a gente passa a enxergar os nossos limites, as nossas dificuldades. E o melhor já vem com as estratégias. Tudo que a gente tem, que tem que desenvolver.`,
          },
        }}
        section1Cards={[
          {
            avatar: "/social-proof/avatar-thaisa.webp",
            name: "Thaísa Accioly",
            quote:
              "Iniciei o ano com a mentoria que fez toda diferença na minha vida profissional! Muitoooooo obrigada!",
            verified: true,
          },
          {
            avatar: "/social-proof/avatar1.webp",
            name: "Aluna (Instagram Direct)",
            quote: "Gratidão sem fim pelos seus ensinamentos e pelo cuidado em transmitir com tanto carinho.",
            verified: true,
          },
        ]}
        section2Video={{
          embedUrl: "https://player.curseduca.com/embed/1d2cf103-f9d3-459a-a413-c32de109d66c?api_key=e0224d680d7ad653901256c89d606bb33c10bf9c",
          thumbnail: "/social-proof/milestone-960w.webp",
          thumbnailSrcSet: {
            w640: "/social-proof/milestone-640w.webp",
            w960: "/social-proof/milestone-960w.webp",
            w1280: "/social-proof/milestone-1280w.webp",
            w1920: "/social-proof/milestone-1920w.webp",
          },
          transcript: {
            summary: "Transformação na gestão da clínica, equilíbrio pessoal e crescimento da equipe.",
            highlights: [
              { time: 25, label: "Pilates 2x por semana inegociável + tempo para vida pessoal." },
              { time: 58, label: "Marketing profissional: estúdio, redes sociais e posicionamento." },
              { time: 95, label: "Equipe expandida: de 3 para 8 profissionais + estagiária de marketing." },
            ],
            fullText: `Quando eu ingressei minha vida pessoal, até de falta de funcionária. Eu já falei um dia na história do avançado e tanto de vida pessoal, na relação com o trabalho e pensando em fechar as portas da clínica e fazer só meu consultório, eu sozinha. E aí assim eu acho que os meus avanços foram foram maiores na parte da gestão mesmo da clínica, sabe? Eu termino hoje fazendo pilates duas vezes por semana. Eu comecei logo que eu comecei a avançado, então tenho tempo de avançar. Deu tempo praticamente de pilates duas vezes por semana, que é inegociável. Eu não tiro por nada. Voltei a ir à missa, coisa que eu tinha parado de ir, né? Deixei de ser Mulher Maravilha. Falei Vou contratar uma pessoa para trabalhar na minha casa. Eu termino esses ganhos aí da vida pessoal. Passei aí por cirurgia do marido, tratamento de câncer, de tireoide, tudo dentro da mentoria. E graças a Deus está tudo bem. E comecei a fazer marketing lá da clínica, então tô gravando uns vídeos lá com o estúdio, Fiz uma uma um treinamento sobre esses aspectos aí. Tô com uma estagiária, uma moça que é de marketing digital, ela é acadêmica, ela veio com estágio extracurricular e tá lá cuidando das redes. Termino com a equipe muito maior, né? Então agora a gente tá eu e três psicólogas, duas fonoaudiólogas, uma psicopedagoga e um assistente terapêutico que também e psicomotricista. E a estagiária de marketing? Então, nós éramos três e agora a gente tá num grupo muito maior, né?`,
          },
        }}
        section2Cards={[
          {
            avatar: "/social-proof/avatar-anayara.webp",
            name: "Anayara",
            quote: "Criei minha carinha digital e reorganizei padronização, financeiro e posicionamento.",
            verified: true,
          },
          {
            avatar: "/social-proof/avatar-aluna-ig.webp",
            name: "Aluna (Instagram Direct)",
            quote: "Cumpri o prazo: 31/07 foi meu último dia no serviço público; em agosto virei full time.",
            verified: true,
          },
          {
            avatar: "/social-proof/avatar-aluna-dtc.webp",
            name: "Aluna (Grupo DTC)",
            quote: "Abri meu negócio, montei equipe e negociei com 2 neuropediatras.",
            verified: true,
          },
        ]}
        section3Video={{
          embedUrl:
            "https://player.curseduca.com/embed/04b7db01-e52d-48fa-ab4c-136d04a58a09?api_key=e0224d680d7ad653901256c89d606bb33c10bf9c",
          thumbnail: "/social-proof/agradecimento-960w.webp",
          thumbnailSrcSet: {
            w640: "/social-proof/agradecimento-640w.webp",
            w960: "/social-proof/agradecimento-960w.webp",
            w1280: "/social-proof/agradecimento-1280w.webp",
            w1920: "/social-proof/agradecimento-1920w.webp",
          },
          transcript: {
            summary: "Estrutura clara, metas SMART e como a mentoria destravar resultados mensuráveis.",
            highlights: [
              { time: 42, label: "Intervenção travada: como ver resultados e medir evolução." },
              { time: 88, label: "Metas SMART: a chave para resultados concretos." },
              { time: 125, label: "\"É tudo que eu precisava\" — estrutura + aplicação prática." },
            ],
            fullText: `Sim, em poucas, poucas poucas oportunidades que a gente tem de dicas desse tipo mais de empreendedorismo, que a gente não tem tanto espaço no TCC, né? Você já aplica e o negócio já acontece, já tem retorno. Teve dias que eu falei assim Gente do céu, eu não tô conseguindo aproveitar a mentoria, eu não tô conseguindo aproveitar porque eu não tô conseguindo estudar, porque eu sempre tive isso de gostar, estudar. E agora com essa correria, às vezes eu não consigo ler tudo que eu queria ler, fazer tudo que eu queria fazer. Mas assim, o que eu posso, tenho colocado em prática e assim tem feito muito sentido pra mim, porque assim, principalmente na intervenção, eu sempre fui muito travada na intervenção, sempre fui muito insegura, nem na intervenção e todas as vezes que eu começava a fazer intervenção parece que eu não conseguia ver melhora. Então eu falava não, não vou fazer intervenção porque eu quero ver o resultado, porque eu gosto de ver as coisas dar resultado. Então você fica ali, né? E aí eu falei Não, não é possível que não tem um jeito de dá resultado, coisa de ver, de medir isso. Porque eu sou muito assim, né? De medir, de ver onde que. E fez muito sentido isso pra mim, com a minha forma de ver o mundo também. Porque eu sou assim, eu gosto de ver as coisas evoluindo, não gosto de nada. Muito está conseguindo ver as evoluções, as intervenções. Agora eu gosto de ver dados, entendeu? Gosto de ver dados reais ali. Acho que por isso que eu gosto tanto da avaliação de PSI também, porque eu vejo os dados, né? E enfim, aí eu fiz, eu até imprimi. Nesse dia eu fiz um modelinho de registro de metas. Até coloquei Smart que você colocou pra gente deixar embaixo pra não esquecer. Eu falei É isso. A chave das metas é isso, é ter metas SMART. Não tem jeito. É a chave. Na verdade, assim eu tava pensando na última aula. Eu falei gente, que foi sobre o plano, né? Agora eu falei nossa, essa mentoria da Bruna é tudo que eu fiz, tudo que eu precisava, tudo que eu precisava. Agora eu tenho que saber por isso em prática e ver o resultado acontecer. E é muito estruturado, sabe? É o que eu realmente é, o que eu buscava e busco, né? Agora eu tenho que por isso tudo em prática.`,
          },
        }}
        section3Cards={[
          {
            avatar: "/social-proof/avatar2.webp",
            name: "Mensagem (Anexo 1)",
            quote:
              "Parabéns pela excelente explicação, muito didática. O que muitos acham básico e não usam na prática!",
            verified: true,
          },
          {
            avatar: "/social-proof/avatar1.webp",
            name: "Mensagem (Anexo 2)",
            quote:
              "Obrigada pelo trabalho, pelo respaldo teórico e pelas estratégias. Você incentiva e confia na gente!",
            verified: true,
          },
        ]}
      />

      {/* 10. FAQ (DARK) */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <FAQ onApplyClick={openApplyModal} />
      </section>

      {/* 11. Formulário removido - agora é modal */}

      {/* 12. Rodapé com Referências Científicas (DARK) */}
      <FooterWithReferences />

      {/* 13. StickyCta (conversão flutuante) */}
      <StickyCta onApplyClick={openApplyModal} />

      {/* Modal de Aplicação */}
      <ApplyFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
}
