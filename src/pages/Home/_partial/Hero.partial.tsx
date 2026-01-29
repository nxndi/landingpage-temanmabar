import React, { useRef, useEffect } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import LaserFlow from "../../../components/LaserFlow/LaserFlow";
import Background from "../../../assets/content/background-hero.jpg";
import HeroImage from "../../../assets/content/hero-image.png";
import EnterkompurerLogo from "../../../assets/logo/enterkomputer-logo.png";
import appConfig from "../../../config/app.config";

const Hero: React.FC = () => {
  const { t } = useTranslation("language");

  const revealImgRef = useRef<HTMLImageElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);

  // Handle mouse interaction for the reveal effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRightRef.current || !revealImgRef.current) return;

      const rect = heroRightRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      revealImgRef.current.style.setProperty("--mx", `${x}px`);
      revealImgRef.current.style.setProperty("--my", `${y}px`);
    };

    const handleMouseLeave = () => {
      if (revealImgRef.current) {
        revealImgRef.current.style.setProperty("--mx", "-9999px");
        revealImgRef.current.style.setProperty("--my", "-9999px");
      }
    };

    const rightSide = heroRightRef.current;
    if (rightSide) {
      rightSide.addEventListener("mousemove", handleMouseMove);
      rightSide.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        rightSide.removeEventListener("mousemove", handleMouseMove);
        rightSide.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Preload the background image for better performance
  useEffect(() => {
    const img = new Image();
    img.src = Background;
    img.fetchPriority = "high";
  }, []);

  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute xxs:top-[45.5%] xs:top-[33%] sm:top-[32.5%] md:top-[33%] lg:top-[30.5%] xl:top-[25%] 2xl:top-[20%] left-1/2 w-screen h-full -translate-x-1/2 -translate-y-1/4">
          <LaserFlow
            color={appConfig.primaryColor}
            horizontalBeamOffset={0}
            verticalBeamOffset={0}
            horizontalSizing={1}
            verticalSizing={1.2}
            wispDensity={1}
            wispSpeed={15}
            wispIntensity={6}
            flowSpeed={0.35}
            flowStrength={0.45}
            fogIntensity={0.5}
            fogScale={0.35}
            fogFallSpeed={0.6}
            decay={1.1}
            falloffStart={1.2}
          />
        </div>
      </div>
      <div className="containercustom mx-auto px-4 relative z-20 pt-[102px] sm:pt-28 lg:pt-44">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-start z-20">
            <div className="max-w-[300px] sm:max-w-xl">
              <h1 className="text-[32px] md:text-[56px] lg:text-[72px] font-semibold leading-[0.9] tracking-tight bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent">
                {t("hero.title_prefix")}{" "}
                <span className="font-display italic font-bold bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent">
                  {t("hero.title_highlight")}
                </span>
              </h1>

              <p className="text-[#e9e9e9] leading-snug tracking-tight text-[15px] md:text-[16px] max-w-md mt-3 md:mt-3.5 lg:mt-4">
                {t("hero.subtitle")}
              </p>

              <div className="relative inline-flex items-center z-10 lg:mt-9 md:mt-7 mt-5">
                <div className="p-1.5 rounded-full border border-white/30">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScaaZa82NyGscfI4NdiPmz-3n13It94GIypQHl8jVXHN_pPPA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all text-xs sm:text-sm duration-200 uppercase font-medium flex items-center justify-center gap-1.5 h-8 sm:h-10 px-6 sm:px-12 text-black/80 -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] hover:bg-white/80 hover:border-white"
                  >
                    <span>{t("hero.cta")}</span>
                    <IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Card - Full width image, auto height */}
          <div ref={heroRightRef} className="relative z-20 w-full mt-16">
            <div className="w-full rounded-xl p-[4px] pb-0 bg-gradient-to-b from-primary-700 to-transparent">
              {/* Hero Image */}
              <div className="relative">
                <img
                  src={HeroImage}
                  alt={t("hero.hero_image_alt")}
                  width={600}
                  height={450}
                  className="w-full h-auto block rounded-[10px]"
                />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-1">
                  {/* Powered by content */}
                  <div className="flex flex-col gap-0">
                    <p className="text-white/70 text-[10px] font-medium">
                      {t("hero.powered_by")}
                    </p>
                    <img
                      src={EnterkompurerLogo}
                      alt="Enterkomputer Logo"
                      width={120}
                      height={24}
                      className="h-4 sm:h-6 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
