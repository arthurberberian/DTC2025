import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

type VideoItem = {
  embedUrl: string;
  thumbnail: string;
  title: string;
  duration?: string;
  meta?: string;
};

interface Props {
  videos: VideoItem[];
  title?: string;
  subtitle?: string;
}

export default function VideoGallery({
  videos,
  title = "Depoimentos em vídeo",
  subtitle = "Clique para assistir — o player só carrega após o clique.",
}: Props) {
  const [openVideoUrl, setOpenVideoUrl] = useState<string | null>(null);

  // Bloqueia scroll quando modal está aberto
  useEffect(() => {
    if (openVideoUrl) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [openVideoUrl]);

  // Fecha modal com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openVideoUrl) {
        setOpenVideoUrl(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [openVideoUrl]);

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-12 md:py-16"
      aria-labelledby="videos-title"
    >
      <h2
        id="videos-title"
        className="text-center text-3xl md:text-4xl font-semibold mb-3"
      >
        {title}
      </h2>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        {subtitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[18px]">
        {videos.map((video, index) => (
          <article
            key={index}
            className="relative bg-[#f7f7f9] border border-[#eceff4] rounded-[14px] overflow-hidden shadow-[0_8px_18px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.02]"
          >
            <div className="relative aspect-video bg-black">
              <img
                src={video.thumbnail}
                alt={`${video.title} — thumbnail`}
                className="w-full h-full object-cover opacity-92 transition-opacity hover:opacity-86"
              />
              <button
                onClick={() => setOpenVideoUrl(video.embedUrl)}
                className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#e6e6e6] rounded-full px-3 py-2 text-sm font-semibold text-[#111] hover:bg-white/95 transition-colors"
                type="button"
                aria-label={`Assistir ${video.title}`}
              >
                <Play className="w-[18px] h-[18px] fill-current" />
                Assistir
              </button>
            </div>
            <div className="p-3 pb-2">
              <h3 className="font-semibold text-[#111] leading-tight">
                {video.title}
              </h3>
            </div>
            {(video.meta || video.duration) && (
              <div className="px-3 pb-3 text-sm text-[#6b7280]">
                {video.meta && video.duration
                  ? `${video.meta} · ${video.duration}`
                  : video.meta || video.duration}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* MODAL */}
      {openVideoUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/72 p-5 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenVideoUrl(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Reprodutor de vídeo"
        >
          <div className="relative w-full max-w-[960px] bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setOpenVideoUrl(null)}
              className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full w-9 h-9 grid place-items-center transition-colors"
              aria-label="Fechar"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
            <div className="aspect-video bg-black">
              <iframe
                src={openVideoUrl}
                title="Depoimento em vídeo"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
