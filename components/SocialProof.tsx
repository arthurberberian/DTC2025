import React, { useState, useEffect } from "react";
import { Play, Check, Star, X } from "lucide-react";
import CTA from "./CTA";
import TestimonialCard from "./TestimonialCard";
import { SectionHeader } from "./SectionHeader";
import { BadgeWax } from "@/components/Badges";

interface TranscriptHighlight {
  time: number;
  label: string;
}

interface VideoTranscript {
  summary: string;
  highlights: TranscriptHighlight[];
  fullText: string;
}

interface VideoTestimonial {
  embedUrl: string;
  thumbnail: string;
  thumbnailSrcSet?: {
    w640: string;
    w960: string;
    w1280: string;
    w1920: string;
  };
  transcript?: VideoTranscript;
}

interface TextCard {
  avatar?: string;
  name: string;
  quote: string;
  verified?: boolean;
}

interface Props {
  // Seção 1: Valeu a pena
  section1Video: VideoTestimonial;
  section1Cards: TextCard[];
  
  // Seção 2: Milestones
  section2Video: VideoTestimonial;
  section2Cards: TextCard[];
  
  // Seção 3: Agradecimentos
  section3Video: VideoTestimonial;
  section3Cards: TextCard[];

  // Handler para abrir o modal
  onApplyClick: () => void;
}

interface VideoTranscriptProps {
  transcript: VideoTranscript;
  onSeek?: (seconds: number) => void;
}

function VideoTranscript({ transcript, onSeek }: VideoTranscriptProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-4 rounded-xl border border-[#E9E5DF] bg-[#FFFCF8] p-4">
      <div className="mb-2 text-sm text-[#667085]">
        <strong className="font-semibold">Resumo rápido:</strong> {transcript.summary}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-lg border border-[#E9E5DF] bg-white px-3 py-2.5 font-semibold text-[#0E3D4B] transition-all hover:translate-y-[-2px] hover:shadow-md"
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Ocultar transcrição' : 'Mostrar transcrição'}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path fill="currentColor" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-3 text-[15.5px] leading-relaxed text-[#0E3D4B]">
          {transcript.highlights.length > 0 && (
            <ol className="mb-3 space-y-1 pl-5 list-decimal">
              {transcript.highlights.map((h, i) => (
                <li key={i}>
                  <button
                    onClick={() => onSeek?.(h.time)}
                    className="mr-2 rounded-full border border-[#E9E5DF] bg-white px-2 py-0.5 text-xs text-[#C46D37] hover:bg-[#FFF8F2] transition"
                  >
                    {formatTime(h.time)}
                  </button>
                  {h.label}
                </li>
              ))}
            </ol>
          )}

          <div className="rounded-lg bg-white/50 p-3 text-sm leading-relaxed">
            <strong className="block mb-1 font-bold">Transcrição:</strong>
            <p className="whitespace-pre-line">{transcript.fullText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SocialProof({
  section1Video,
  section1Cards,
  section2Video,
  section2Cards,
  section3Video,
  section3Cards,
  onApplyClick,
}: Props) {
  const [modalEmbedUrl, setModalEmbedUrl] = useState<string | null>(null);

  // Bloquear scroll quando modal aberto
  useEffect(() => {
    if (modalEmbedUrl) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [modalEmbedUrl]);

  // ESC para fechar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalEmbedUrl) {
        setModalEmbedUrl(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [modalEmbedUrl]);

  const openModal = (url: string) => {
    setModalEmbedUrl(null);
    setTimeout(() => setModalEmbedUrl(url), 10);
  };
  const closeModal = () => setModalEmbedUrl(null);

  return (
    <section className="relative mx-auto max-w-[1100px] px-5 py-14" aria-label="Prova social">
      {/* ======================= SEÇÃO 1 – VALEU A PENA ======================= */}
      <SectionHeader
        title="Valeu a pena"
        subtitle="Histórias reais de quem colocou o método em prática."
      />
      
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 mb-9">
        {/* Vídeo âncora */}
        <div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
            <img
              src={section1Video.thumbnail}
              srcSet={section1Video.thumbnailSrcSet ? `
                ${section1Video.thumbnailSrcSet.w640} 640w,
                ${section1Video.thumbnailSrcSet.w960} 960w,
                ${section1Video.thumbnailSrcSet.w1280} 1280w,
                ${section1Video.thumbnailSrcSet.w1920} 1920w
              `.trim() : undefined}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="Depoimento em vídeo — Valeu a pena"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <button
              onClick={() => openModal(section1Video.embedUrl)}
              className="absolute left-3 bottom-3 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-2.5 text-sm font-bold text-foreground hover:bg-white/90 transition"
              type="button"
              aria-label="Assistir vídeo Valeu a pena"
            >
              <Play className="w-[18px] h-[18px]" />
              Assistir
            </button>
          </div>

          {section1Video.transcript && (
            <VideoTranscript
              transcript={section1Video.transcript}
              onSeek={(time) => {
                const separator = section1Video.embedUrl.includes('?') ? '&' : '?';
                openModal(`${section1Video.embedUrl}${separator}start=${time}&autoplay=1`);
              }}
            />
          )}
        </div>
        
        {/* Cards (Instagram style) */}
        <div className="grid gap-4 grid-cols-1">
          {section1Cards.map((card, i) => (
            <TestimonialCard
              key={i}
              variant="instagram"
              name={card.name}
              quote={card.quote}
              avatar={card.avatar}
              verified={card.verified}
            />
          ))}
        </div>
      </div>

      {/* CTA — Depois de "Valeu a pena" */}
      <div className="mb-10 mt-2 flex justify-center">
        <div className="text-center">
          <CTA
            onClick={onApplyClick}
            size="primary"
            className="focus-visible:ring-offset-white"
            ariaLabel="Quero ter uma história de sucesso como esta"
          >
            QUERO TER UMA HISTÓRIA DE SUCESSO COMO ESTA
            <span aria-hidden="true">→</span>
          </CTA>
          <div className="mt-2 text-[13px] text-[#7A7A7A]">
            Aplicações abertas por tempo limitado. Inicie sua jornada.
          </div>
        </div>
      </div>

      {/* ======================= SEÇÃO 2 – MILESTONES ======================== */}
      <SectionHeader
        title="Conquistas por etapa"
        subtitle="Avanços medidos ao longo da jornada — passo a passo."
      />
      
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 mb-9">
        {/* Vídeo âncora */}
        <div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
            <img
              src={section2Video.thumbnail}
              srcSet={section2Video.thumbnailSrcSet ? `
                ${section2Video.thumbnailSrcSet.w640} 640w,
                ${section2Video.thumbnailSrcSet.w960} 960w,
                ${section2Video.thumbnailSrcSet.w1280} 1280w,
                ${section2Video.thumbnailSrcSet.w1920} 1920w
              `.trim() : undefined}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="Depoimento em vídeo — Conquistas por etapa"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <button
              onClick={() => openModal(section2Video.embedUrl)}
              className="absolute left-3 bottom-3 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-2.5 text-sm font-bold text-foreground hover:bg-white/90 transition"
              type="button"
              aria-label="Assistir vídeo Milestone"
            >
              <Play className="w-[18px] h-[18px]" />
              Assistir
            </button>
          </div>

          {section2Video.transcript && (
            <VideoTranscript
              transcript={section2Video.transcript}
              onSeek={(time) => {
                const separator = section2Video.embedUrl.includes('?') ? '&' : '?';
                openModal(`${section2Video.embedUrl}${separator}start=${time}&autoplay=1`);
              }}
            />
          )}
        </div>
        
        {/* Cards (WhatsApp para 1º, Instagram para 2º e 3º) */}
        <div className="grid gap-4 grid-cols-1">
          {section2Cards.map((card, i) => (
            <TestimonialCard
              key={i}
              variant={i === 0 ? "whatsapp" : "instagram"}
              name={card.name}
              quote={card.quote}
              avatar={card.avatar}
              verified={card.verified}
            />
          ))}
          <p className="text-[11px] text-muted-foreground italic text-center mt-1">
            *Fotos ilustrativas para preservar a privacidade dos alunos
          </p>
        </div>
      </div>

      {/* ======================= SEÇÃO 3 – AGRADECIMENTOS ===================== */}
      <SectionHeader
        title="Agradecimentos"
        subtitle="Mensagens que traduzem impacto — na clínica e na vida."
      />
      
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-5">
        {/* Vídeo âncora */}
        <div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
            <img
              src={section3Video.thumbnail}
              srcSet={section3Video.thumbnailSrcSet ? `
                ${section3Video.thumbnailSrcSet.w640} 640w,
                ${section3Video.thumbnailSrcSet.w960} 960w,
                ${section3Video.thumbnailSrcSet.w1280} 1280w,
                ${section3Video.thumbnailSrcSet.w1920} 1920w
              `.trim() : undefined}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="Depoimento em vídeo — Agradecimento"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <button
              onClick={() => openModal(section3Video.embedUrl)}
              className="absolute left-3 bottom-3 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-2.5 text-sm font-bold text-foreground hover:bg-white/90 transition"
              type="button"
              aria-label="Assistir vídeo Agradecimento"
            >
              <Play className="w-[18px] h-[18px]" />
              Assistir
            </button>
          </div>

          {section3Video.transcript && (
            <VideoTranscript
              transcript={section3Video.transcript}
              onSeek={(time) => {
                const separator = section3Video.embedUrl.includes('?') ? '&' : '?';
                openModal(`${section3Video.embedUrl}${separator}start=${time}&autoplay=1`);
              }}
            />
          )}
        </div>
        
        {/* Cards (WhatsApp style) */}
        <div className="grid gap-4 grid-cols-1">
          {section3Cards.map((card, i) => (
            <TestimonialCard
              key={i}
              variant="whatsapp"
              name={card.name}
              quote={card.quote}
              avatar={card.avatar}
              verified={card.verified}
            />
          ))}
        </div>
      </div>

      {/* Selo institucional de cera */}
      <div className="mt-16 mb-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        <BadgeWax 
          className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0" 
          textTop="7ª TURMA" 
          textBottom="EM APENAS 2 ANOS" 
          rotate={-6}
        />
        <p className="text-center md:text-left text-xs text-[#6B6F7A] max-w-xs leading-relaxed">
          Selo representativo da excelência e continuidade da mentoria — 
          <em>comprometimento com a formação de referências em TDAH desde 2023</em>.
        </p>
      </div>

      {/* ======================= MODAL GLOBAL (ÚNICO) ======================= */}
      {modalEmbedUrl && (
        <div
          className="fixed inset-0 bg-black/72 z-[9999] flex items-center justify-center p-5"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-label="Reprodutor de vídeo"
        >
          <div
            className="max-w-[960px] w-full bg-black rounded-xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white/90 rounded-full w-9 h-9 grid place-items-center hover:bg-white transition z-10"
              aria-label="Fechar"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
            <div className="aspect-video w-full h-full">
              <iframe
                title="Depoimento em vídeo"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                src={modalEmbedUrl}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
