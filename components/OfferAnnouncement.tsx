import { useEffect, useState } from "react";

const OfferAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const scrollToRoadmap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const roadmapSection = document.getElementById("metodo");
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`
        sticky top-0 z-50
        flex gap-2 items-center justify-center
        px-4 py-3
        bg-[#C46D37] text-white
        font-medium text-sm
        shadow-md
        transition-transform duration-[350ms] ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
      role="region"
      aria-label="Conheça"
    >
      <span className="text-center">Mentoria em TDAH na Clínica </span>
      <a
        href="#metodo"
        onClick={scrollToRoadmap}
        className="
          bg-[#f5efe6] text-[#0f3b46]
          px-3 py-1.5
          rounded-full
          text-sm font-bold
          border border-[#0f3b46]/15
          hover:bg-[#ebe1d4]
          transition-colors
          no-underline
        "
        aria-label="Conheça"
      >
        Conheça
      </a>
    </div>
  );
};

export default OfferAnnouncement;
