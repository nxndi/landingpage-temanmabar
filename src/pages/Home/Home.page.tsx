import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "./_partial/Hero.partial";
import Story from "./_partial/Story.partial";
import Service from "./_partial/Service.partial";
import About from "./_partial/About.partial";
import Calculator from "./_partial/Calculator.partial";
import Products from "../../components/Product/Products";
import Customer from "./_partial/Customer.partial";
import Faq from "./_partial/Faq.partial";
import FlippingCardScroll from "../../components/FlippingCardScroll/FlippingCardScroll";
import Testimonial from "./_partial/Testimonial.partial";

// Card assets
import card1 from "../../assets/cards/card_cover_1.png";
import card2 from "../../assets/cards/card_cover_2.png";
import card3 from "../../assets/cards/card_cover_3.png";

// Service icons
import service1 from "../../assets/content/service-1.png";
import service2 from "../../assets/content/service-2.png";
import service3 from "../../assets/content/service-3.png";

const Home: React.FC = () => {
  const { t } = useTranslation("language");

  const cards = [
    {
      id: "card-1",
      frontImage: card1,
      backTitle: t("flipping.cards.card1.title") || "Produk Resmi",
      backSubtitle:
        t("flipping.cards.card1.subtitle") ||
        "Kami hanya menjual product dari distributor Resmi",
      backBadge: t("flipping.cards.card1.badge") || "100% Legal",
      backIcon: service1,
      backBgColor: "bg-gradient-to-br from-primary-400 to-primary-600",
      backTextColor: "text-white",
      number: "01",
      roundedClass: "rounded-l-[20px]",
      serviceCategory: t("flipping.cards.card1.category") || "Security",
    },
    {
      id: "card-2",
      frontImage: card2,
      backTitle: t("flipping.cards.card2.title") || "Multi Currency",
      backSubtitle:
        t("flipping.cards.card2.subtitle") ||
        "Mendukung berbagai mata uang termasuk crypto dan USDT dengan 99% SLA ketersediaan stok",
      backBadge: t("flipping.cards.card2.badge") || "IDR & USDT",
      backIcon: service2,
      backBgColor: "bg-gradient-to-br from-primary-600 to-primary-800",
      backTextColor: "text-white",
      number: "02",
      roundedClass: "",
      serviceCategory: t("flipping.cards.card2.category") || "Payment",
    },
    {
      id: "card-3",
      frontImage: card3,
      backTitle: t("flipping.cards.card3.title") || "API Service",
      backSubtitle:
        t("flipping.cards.card3.subtitle") ||
        "API service yang cepat dan aman untuk integrasi sistem transaksi",
      backBadge: t("flipping.cards.card3.badge") || "Cepat & Aman",
      backIcon: service3,
      backBgColor: "bg-gradient-to-br from-slate-700 to-slate-900",
      backTextColor: "text-white",
      number: "03",
      roundedClass: "rounded-r-[20px]",
      serviceCategory: t("flipping.cards.card3.category") || "API",
    },
  ];

  return (
    <main>
      <div className="relative z-10">
        <Hero />
        <FlippingCardScroll title="" subtitle="" cards={cards} />
        <Service />
        <Calculator />
        <About />
        <Testimonial />
        <Faq />
      </div>

      <div className="pointer-events-none h-[670px] sm:h-[670px] md:h-[780px] lg:h-[630px] xl:h-[655px] 2xl:h-[670px] w-full"></div>
    </main>
  );
};

export default Home;
