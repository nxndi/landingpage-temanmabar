import React from "react";
import { useTranslation } from "react-i18next";
import { GlowingEffect } from "../../../components/Ui/GlowingEffect";
import Icon from "../../../components/icon/Icon";
import appConfig from "../../../config/app.config";
import { TIcons } from "../../../types/icons.type";

interface GridItemProps {
  area: string;
  icon: TIcons;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[13rem] list-none ${area}`}>
      <div className="relative h-full bg-primary-900/50 rounded-2xl border border-gray-800 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          borderWidth={3}
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          color={appConfig.primaryColor}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-2 shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-xl border border-primary-500/40 p-2 bg-gradient-to-br from-primary-500/15 to-primary-500/5 backdrop-blur-md shadow-lg shadow-primary-500/10 transition-all duration-300 group-hover:border-primary-500/60 group-hover:from-primary-500/25 group-hover:shadow-primary-500/20">
              <Icon icon={icon} className="w-8 h-8 text-primary-200" />
            </div>
            <div className="space-y-1">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance md:text-xl text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] md:text-sm text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const cardLayouts = [
  {
    key: "card1",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: "HeroBolt" as TIcons,
  },
  {
    key: "card2",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: "HeroClock" as TIcons,
  },
  {
    key: "card3",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: "HeroShieldCheck" as TIcons,
  },
  {
    key: "card4",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: "HeroBanknotes" as TIcons,
  },
  {
    key: "card5",
    area: "md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/10]",
    icon: "HeroChartBar" as TIcons,
  },
  {
    key: "card6",
    area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/10/3/13]",
    icon: "HeroGift" as TIcons,
  },
];

const Service: React.FC = () => {
  const { t } = useTranslation("language");

  const heading = {
    prefix: t("service.title_prefix") || "Layanan",
    highlight: t("service.title_highlight") || "Kami",
    subtitle:
      t("service.subtitle") ||
      "Kami menyediakan berbagai layanan terbaik untuk memastikan bisnis top up Anda berjalan lancar",
  };

  const cardTranslations = t("service.cards", {
    returnObjects: true,
  }) as Record<string, { title?: string; description?: string }> | undefined;

  const services: GridItemProps[] = cardLayouts.map((layout) => ({
    area: layout.area,
    icon: layout.icon,
    title: cardTranslations?.[layout.key]?.title || layout.key,
    description: cardTranslations?.[layout.key]?.description || "",
  }));

  return (
    <div className="w-full bg-black">
      <section
        id="service-section"
        className="containercustom mx-auto px-4 py-8 md:py-16 xl:py-24"
      >
        <div className="text-center mb-10 md:mb-16 max-w-sm md:max-w-lg xl:max-w-2xl mx-auto">
          <h2 className="relative bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-semibold tracking-tighter text-3xl md:text-4xl lg:text-5xl leading-tight">
            {heading.prefix}
            <span className="font-display px-1 italic font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent">
              {heading.highlight}
            </span>
          </h2>
          <p className="text-[#e9e9e9] leading-tight tracking-tight text-[15px] mt-3">
            {heading.subtitle}
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          {services.map((service) => (
            <GridItem key={service.title} {...service} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Service;
