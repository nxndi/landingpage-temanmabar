import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import Icon from "../../../components/icon/Icon";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const Faq: React.FC = () => {
  const { t } = useTranslation("language");
  const [activeIds, setActiveIds] = useState<Set<number>>(new Set());
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const iconRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});

  const translatedFaq = t("faq.items", {
    returnObjects: true,
  }) as FaqItem[] | undefined;

  const faqItems: FaqItem[] = (translatedFaq || []).map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const headingPrefix = t("faq.title_prefix") || "Pertanyaan";
  const headingHighlight = t("faq.title_highlight") || "Umum";
  const subtitle =
    t("faq.subtitle") ||
    "Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan reseller kami";

  const toggleFaq = (id: number) => {
    setActiveIds((prev) => {
      const newActiveIds = new Set(prev);
      const isActive = newActiveIds.has(id);

      if (isActive) {
        newActiveIds.delete(id);
      } else {
        newActiveIds.add(id);
      }

      // Animate icon rotation
      if (iconRefs.current[id]) {
        gsap.to(iconRefs.current[id], {
          rotation: !isActive ? 45 : 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Animate content height
      if (contentRefs.current[id]) {
        const content = contentRefs.current[id];
        if (!isActive) {
          gsap.fromTo(
            content,
            { opacity: 0, height: 0 },
            { opacity: 1, height: "auto", duration: 0.3, ease: "power2.out" },
          );
        } else {
          gsap.to(content, {
            opacity: 0,
            height: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      return newActiveIds;
    });
  };

  // Format number to add leading zero
  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="w-full bg-gradient-to-t from-primary-500 via-black/95 to-black">
      <section
        id="faq-section"
        className="containercustom mx-auto px-4 py-8 md:py-16 xl:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Title & Subtitle */}
          <div className="text-center md:text-left max-w-sm md:max-w-md mx-auto md:mx-0">
            <h2 className="relative bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-semibold tracking-tighter text-3xl md:text-4xl lg:text-5xl leading-tight">
              {headingPrefix}{" "}
              <span className="font-display px-1 italic font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent">
                {headingHighlight}
              </span>
            </h2>
            <p className="text-[#e9e9e9] leading-tight tracking-tight text-[15px] mt-3">
              {subtitle}
            </p>
          </div>

          {/* Right Section - FAQ Accordion */}
          <div className="space-y-4">
            {faqItems.map((item) => {
              const isActive = activeIds.has(item.id);

              return (
                <div key={item.id} className="">
                  {/* Header */}
                  <button
                    className="w-full flex items-center justify-between py-3 cursor-pointer group"
                    onClick={() => toggleFaq(item.id)}
                  >
                    <div className="flex items-center gap-3 text-base md:text-lg">
                      <span
                        className={`transition-colors ${isActive ? "text-primary-300" : "text-gray-100 group-hover:text-primary-400"}`}
                      >
                        {formatNumber(item.id)}
                      </span>
                      <h3
                        className={`text-left font-medium transition-colors ${isActive ? "text-primary-300" : "text-gray-100 group-hover:text-primary-400"}`}
                      >
                        {item.question}
                      </h3>
                    </div>
                    <span
                      ref={(el) => {
                        if (el) iconRefs.current[item.id] = el;
                      }}
                      className={`transition-colors text-xl ${isActive ? "text-primary-300" : "text-gray-100 group-hover:text-primary-400"} flex-shrink-0 inline-flex`}
                    >
                      <Icon icon="HeroPlus" />
                    </span>
                  </button>

                  {/* Content */}
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[item.id] = el;
                    }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <p className="pl-8 text-gray-300 text-sm md:text-base pt-2 pb-3">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
