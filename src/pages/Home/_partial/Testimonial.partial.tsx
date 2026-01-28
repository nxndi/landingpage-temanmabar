import React from "react";
import { useTranslation } from "react-i18next";
import { InfiniteMovingCards } from "../../../components/Ui/infinite-moving-cards";

type TestimonialItem = {
  quote: string;
  name: string;
  website?: string;
  rating?: number;
  image: string;
};

type TestimonialTranslationItem = Partial<TestimonialItem>;

const Testimonial: React.FC = () => {
  const { t } = useTranslation("language");

  const translatedTestimonials = t("testimonial.items", {
    returnObjects: true,
  }) as TestimonialTranslationItem[] | undefined;

  const testimonialData: TestimonialItem[] = (translatedTestimonials || []).map(
    (item, index) => ({
      quote: item.quote || "",
      name: item.name || `Reseller #${index + 1}`,
      website: item.website,
      rating: item.rating,
      image: item.image ?? "",
    }),
  );

  const headingPrefix = t("testimonial.title_prefix") || "Testimoni";
  const headingHighlight = t("testimonial.title_highlight") || "Reseller";
  const subtitle =
    t("testimonial.subtitle") ||
    "Pendapat dari para reseller terpercaya yang telah bermitra dengan kami";

  return (
    <div className="w-full bg-black">
      <section className="containercustom mx-auto px-4 py-8 md:py-16 xl:py-24 flex flex-col items-center">
        <div className="text-center mb-10 md:mb-16 max-w-sm md:max-w-lg xl:max-w-2xl">
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

        <div className="w-full flex justify-center">
          <InfiniteMovingCards
            items={testimonialData}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
