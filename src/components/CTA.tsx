import * as React from "react";

interface CTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "light";
  size?: "primary" | "intermediate" | "small";
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "_self";
  rel?: string;
}

export default function CTA({
  children,
  onClick,
  href,
  variant = "primary",
  size = "primary",
  className = "",
  ariaLabel,
  target,
  rel,
}: CTAProps) {
  const baseClasses = `
    group relative inline-flex items-center justify-center gap-2 rounded-2xl
    transition-[transform,box-shadow] duration-300 ease-out
    hover:scale-[1.03] active:translate-y-px overflow-hidden
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C46D37]/65 focus-visible:ring-offset-2
  `;

  const sizeClasses = {
    primary: "px-7 py-4 text-base font-semibold",
    intermediate: "px-6 py-3.5 text-[15px] font-semibold",
    small: "px-6 py-3 text-[15px] font-semibold",
  };

  const variantClasses =
    variant === "primary"
      ? `text-white
         bg-gradient-to-b from-[#C96F3C] to-[#A2542F]
         ring-1 ring-[#8F3B18]/70
         shadow-[0_16px_44px_-12px_rgba(196,109,55,0.58)]`
      : `text-[#0D0F12] bg-white
         ring-1 ring-[#E8D8CE] hover:ring-[#C46D37]/40
         shadow-[0_12px_34px_-12px_rgba(196,109,55,0.45)]`;

  const shineOpacity = variant === "primary" ? "via-white/40" : "via-white/70";

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`;

  const shineElement = (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0
        before:absolute before:inset-y-0 before:-left-1/3 before:w-1/2 before:rotate-12
        before:bg-gradient-to-r before:from-transparent before:${shineOpacity} before:to-transparent
        before:translate-x-[-120%] before:transition-transform before:duration-700
        group-hover:before:translate-x-[220%]`}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {shineElement}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} aria-label={ariaLabel}>
      {shineElement}
      {children}
    </button>
  );
}
