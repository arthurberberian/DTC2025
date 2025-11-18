import { useEffect, useState } from "react";

interface StickyCtaProps {
  onApplyClick: () => void;
}

export default function StickyCta({ onApplyClick }: StickyCtaProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector("#hero-cta");
    if (!heroCta) return;

    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(heroCta);
    return () => io.disconnect();
  }, []);

  const handleClick = () => {
    onApplyClick();
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur
      md:hidden transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-800">
            Mentoria em TDAH — próxima turma
          </p>
          <p className="truncate text-xs text-slate-500">
            100% online • vagas limitadas • certificado incluso
          </p>
        </div>
        <button
          onClick={handleClick}
          className="shrink-0 rounded-xl bg-[#C46D37] px-4 py-2 text-sm font-semibold text-white shadow
          hover:brightness-110 active:translate-y-px"
        >
          Aplicar agora
        </button>
      </div>
    </div>
  );
}
