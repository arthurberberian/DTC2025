import * as React from "react";

export type TestimonialVariant = "instagram" | "whatsapp";

export interface TestimonialProps {
  variant: TestimonialVariant;
  name: string;
  quote: string;
  avatar?: string;
  verified?: boolean;
}

export default function TestimonialCard({
  variant,
  name,
  quote,
  avatar,
  verified = true,
}: TestimonialProps) {
  const isIg = variant === "instagram";
  const isWa = variant === "whatsapp";

  return (
    <article
      className={[
        "relative rounded-2xl border bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)]",
        "px-5 py-4",
        isWa ? "border-transparent bg-[#F8F9FA]" : "border-[#EAEAEA]",
      ].join(" ")}
    >
      {/* faixa superior (instagram gradient) */}
      {isIg && (
        <div
          className="absolute left-0 right-0 top-0 h-[6px] rounded-t-2xl"
          style={{
            background:
              "radial-gradient(105% 140% at 35% 100%, #FFD600 0%, #FF7A00 40%, #FF0169 70%, #D300C5 100%)",
          }}
        />
      )}

      {/* header */}
      <header className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={avatar || "/assets/avatar-default.png"}
            alt={avatar ? `Foto de ${name}` : "Avatar padrão"}
            className="h-10 w-10 rounded-full object-cover aspect-square bg-[#EFEFEF]"
            loading="lazy"
            decoding="async"
          />
          <span className="font-semibold text-[#333]">{name}</span>
        </div>

        {/* ícones das plataformas */}
        <div aria-hidden>
          {isIg ? (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <radialGradient id="iggrad" cx="0.35" cy="1" r="1">
                  <stop offset="0" stopColor="#FFD600" />
                  <stop offset="0.4" stopColor="#FF7A00" />
                  <stop offset="0.7" stopColor="#FF0169" />
                  <stop offset="1" stopColor="#D300C5" />
                </radialGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5.66" fill="url(#iggrad)" />
              <circle cx="16.5" cy="7.5" r="1.25" fill="#fff" />
              <path d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" stroke="#fff" strokeWidth="2" fill="none" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
              <path d="M19.2 4.8A9.6 9.6 0 0012 2.4 9.6 9.6 0 002.4 12c0 2 .6 3.8 1.8 5.4L2.4 21.6l4.3-1.8c1.6 1.2 3.4 1.8 5.3 1.8h.1a9.6 9.6 0 009.6-9.6c0-2.6-1-5-2.8-6.8zm-7.3 15a8 8 0 01-4.3-1.2l-.3-.2-3.2.8.8-3.1-.2-.3a8 8 0 01-1.2-4.3 8 8 0 0116 0 8 8 0 01-2.3 5.7 8 8 0 01-5.7 2.3zM16.4 14c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1s-.5.6-.7.7c-.1.1-.3.2-.5.1s-.4-.2-1.5-1c-1.2-1-2-2.2-2.2-2.6-.2-.4 0-.6.1-.7l.3-.3c.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4l-.7-1.7c-.3-.7-.5-.6-.7-.6h-.6c-.2 0-.5.1-.7.3s-1 1-1 2.4c0 1.5 1 2.8 1.2 3l.2.3c.2.3 2 3.3 5 4.6.7.3 1.2.5 1.6.6.7.2 1.3.1 1.8-.1.5-.2 1.2-.5 1.3-1 .2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z" />
            </svg>
          )}
        </div>
      </header>

      {/* corpo */}
      {isWa ? (
        <div className="relative rounded-[12px] rounded-bl-none bg-[#E7FFDB] px-4 py-3 text-[#111B21]">
          <p className="text-[15.5px] leading-relaxed m-0">"{quote}"</p>
          <span
            aria-hidden
            className="absolute -bottom-[1px] -left-2 block h-3 w-3 rotate-45 bg-[#E7FFDB]"
          />
        </div>
      ) : (
        <p className="text-[16px] leading-[1.6] text-[#555] m-0">"{quote}"</p>
      )}

      {verified && (
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-[12px] bg-[#EAF5FD] px-2.5 py-1 text-[12px] font-medium text-[#3897f0]">
          <svg width="16" height="16" viewBox="0 0 15 15" aria-hidden>
            <path
              fill="#3897f0"
              d="M7.5 0a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm3.2 5.3L6.5 9.4 4.3 7.2l-1 1 3.2 3.2 5.2-5.2-1-1z"
            />
          </svg>
          <span>Depoimento Verificado</span>
        </div>
      )}
    </article>
  );
}
