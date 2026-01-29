import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import useFlippingCardScroll from "./useFlippingCardScroll";

interface Card {
  id: string;
  frontImage: string;
  backTitle: string;
  backSubtitle: string;
  backBadge: string;
  backIcon?: string;
  backBgColor: string;
  backTextColor: string;
  number: string;
  roundedClass: string;
  serviceCategory?: string;
}

interface FlippingCardScrollProps {
  title: string;
  subtitle?: string;
  cards: Card[];
}

const FlippingCardScroll: React.FC<FlippingCardScrollProps> = ({ cards }) => {
  const { t } = useTranslation("language");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useFlippingCardScroll({
    sectionRef,
    headerRef,
    containerRef,
    cardRefs,
  });

  return (
    <div className="w-full bg-black">
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="sticky containercustom bg-black mx-auto h-[90dvh] p-4 bg-bg text-fg flex justify-center items-center max-[1000px]:h-max max-[1000px]:py-16 max-[1000px]:px-4 max-[1000px]:flex-col"
      >
        <div
          ref={headerRef}
          className="sticky-header absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-[1000px]:relative max-[1000px]:top-0 max-[1000px]:left-0 max-[1000px]:translate-x-0 max-[1000px]:translate-y-0 max-[1000px]:mb-0"
        >
          <div className="flex flex-col gap-1 max-w-2xl will-change-transform translate-y-10 opacity-0 max-[1000px]:opacity-100 max-[1000px]:translate-y-0">
            <h1 className="relative text-center bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-semibold tracking-tighter text-4xl lg:text-5xl/[100%] leading-none">
              {t("flipping.title_prefix")}{" "}
              <span className="font-display px-1 italic font-bold text-4xl lg:text-6xl/[100%] bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent">
                {t("flipping.title_highlight")}
              </span>{" "}
              {t("flipping.title_suffix")}
            </h1>
            <p className="text-[#e9e9e9] leading-tight tracking-tight text-[15px] text-center">
              {t("flipping.subtitle")}
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="card-container relative w-3/4 grid grid-cols-3 gap-0 translate-y-10 max-lg:w-full max-md:gap-0 max-md:grid-cols-1 max-sm:gap-0 max-xs:auto-rows-max"
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              id={card.id}
              className={`card relative flex-1 aspect-[4/5] shadow-xl origin-top ${card.roundedClass} max-lg:w-full max-lg:max-w-[400px] max-lg:mx-auto max-lg:rounded-[20px] max-lg:transform-none max-sm:aspect-[5/6] max-md:h-[320px] max-xs:mb-[300px]`}
              style={{ zIndex: index }}
            >
              <div className="card-front absolute inset-0 rounded-[inherit] overflow-hidden backface-hidden flex items-center justify-center bg-black">
                <img
                  src={card.frontImage}
                  alt={`Card ${card.number}`}
                  width={400}
                  height={500}
                  {...(index < 2 ? { fetchpriority: "high" } : {})}
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className={`card-back absolute inset-0 rounded-[inherit] overflow-hidden backface-hidden flex flex-col justify-between text-center p-4 md:p-2 lg:p-4 ${card.backBgColor} ${card.backTextColor} bg-gradient-to-br border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`}
                style={{ transform: "rotateY(180deg)" }}
                suppressHydrationWarning
              >
                <div className="flex items-center justify-between w-full text-left">
                  <span className="text-base sm:text-xs xl:text-base uppercase text-white/50">
                    {card.number}
                  </span>
                  <div className="px-3 py-1 xs:px-2 xs:py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-medium text-white/80">
                    {card.backBadge}
                  </div>
                </div>

                <div className="flex flex-col items-start text-start justify-center flex-1 w-full py-2 xl:py-4">
                  {card.backIcon && (
                    <div className="mb-4">
                      <img
                        src={card.backIcon}
                        alt={`${card.serviceCategory ?? card.backTitle} icon`}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-16 w-16 sm:h-12 sm:w-12 lg:h-9 lg:w-9 xl:h-14 xl:w-14 object-contain"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h1 className="text-2xl lg:text-base xl:text-xl font-semibold leading-tight tracking-tight text-white">
                      {card.backTitle}
                    </h1>
                    <p className="text-sm lg:text-[10px] xl:text-sm leading-relaxed text-white/80 max-w-[220px]">
                      {card.backSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full text-[11px] xs:text-[10px] uppercase tracking-[0.3em] text-white/50">
                  <span>{card.serviceCategory}</span>
                  <span className="text-base sm:text-xs xl:text-base uppercase text-white/50">
                    {card.number}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FlippingCardScroll;
