import React from "react";
import { useTranslation } from "react-i18next";
import logoSquare from "../../../assets/logo/logo_square.png";
import logoEnterkomputer from "../../../assets/logo/enterkomputer-logo.png";
import LogoLoop from "../../../components/LogoLoop/LogoLoop";
import entertopup from "../../../assets/patner/entertopup.webp";
import entruv from "../../../assets/patner/entruv.svg";
import epun from "../../../assets/patner/epun.webp";
import ezpz from "../../../assets/patner/ezpz.webp";
import gtid from "../../../assets/patner/gtid.webp";
import masdog from "../../../assets/patner/masdog.webp";
import mayrekber from "../../../assets/patner/mayrekber.webp";
import powertopup from "../../../assets/patner/powertopup.webp";
import rajakarina from "../../../assets/patner/rajakarina.webp";

const defaultStatsData = [
  { key: "transactions", value: "100K+", label: "Transaksi Berhasil" },
  { key: "resellers", value: "1000+", label: "Reseller Terdaftar" },
  { key: "uptime", value: "99%", label: "Uptime SLA" },
  { key: "support", value: "24/7", label: "Customer Support" },
  { key: "processing", value: "<60s", label: "Proses Transaksi" },
  { key: "games", value: "2000+", label: "Game Tersedia" },
];

const defaultAboutContent = {
  title: "Dipercaya oleh Gamers",
  description:
    "MabarTopup hadir sebagai solusi terpercaya untuk kebutuhan top up game para gamers di Indonesia. Dengan sistem yang cepat, aman, dan harga kompetitif, kami berkomitmen memberikan pengalaman terbaik bagi pelanggan dan reseller kami. Misi kami adalah menjadi platform top up game nomor 1 di Indonesia dengan jaringan reseller terbesar dan terpercaya.",
  partnerNote:
    "Fokus tanpa henti, kami terus memberi kepuasan terbaik bagi pengguna dan klien.",
  titlePrefix: "Tentang",
  titleHighlight: "Kami",
  subtitle:
    "MabarTopup adalah platform top up game dan program reseller terpercaya di Indonesia.",
  badgeLabel: "Powered by",
};

const partnerLogos = [
  { src: entertopup, alt: "Entertopup", href: "https://entertopup.com" },
  { src: entruv, alt: "Entruv", href: "https://entruvstore.com" },
  { src: epun, alt: "Epun", href: "https://epuntopup.com" },
  { src: ezpz, alt: "Ezpz", href: "https://ezpztopup.com" },
  { src: gtid, alt: "GTID", href: "https://gtidtopup.com" },
  { src: masdog, alt: "Masdog", href: "https://masdoggamingshop.com" },
  { src: mayrekber, alt: "Mayrekber", href: "https://mayrekberstore.com" },
  { src: powertopup, alt: "PowerTopup", href: "https://powertopup.id" },
  { src: rajakarina, alt: "Raja Karina", href: "https://rajakarina.com" },
];

const About: React.FC = () => {
  const { t } = useTranslation("language");

  const aboutContent = {
    title: t("about.content_title") || defaultAboutContent.title,
    description: t("about.description") || defaultAboutContent.description,
    partnerNote: t("about.partner_note") || defaultAboutContent.partnerNote,
  };

  const heading = {
    prefix: t("about.title_prefix") || defaultAboutContent.titlePrefix,
    highlight: t("about.title_highlight") || defaultAboutContent.titleHighlight,
    subtitle: t("about.subtitle") || defaultAboutContent.subtitle,
  };

  const statsData = defaultStatsData.map((stat) => ({
    value: t(`about.stats.${stat.key}.value`) || stat.value,
    label: t(`about.stats.${stat.key}.label`) || stat.label,
  }));

  return (
    <div className="w-full bg-black">
      <section className="containercustom mx-auto px-4 py-8 md:py-16 xl:py-24">
        <div className="text-center mb-10 md:mb-16 max-w-sm md:max-w-lg xl:max-w-2xl mx-auto">
          <h2 className="relative bg-gradient-to-br pb-1.5 from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent font-semibold tracking-tighter text-3xl md:text-4xl lg:text-5xl leading-tight">
            {heading.prefix}
            <span className="font-display px-1 italic font-bold text-4xl lg:text-5xl bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent">
              {heading.highlight}
            </span>
          </h2>
          <p className="text-[#e9e9e9] leading-tight tracking-tight text-[15px] mt-1.5">
            {heading.subtitle}
          </p>
        </div>

        <div className="lg:grid grid-cols-10 gap-8 items-start lg:items-stretch">
          <div className="lg:col-span-6 flex flex-col gap-8 h-full">
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-2 lg:mb-4">
                {aboutContent.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                {aboutContent.description}
              </p>
            </div>

            {/* Partner Section - Responsive */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-start lg:items-center w-full overflow-hidden">
              {/* Partner Note */}
              <div className="border-l-2 border-primary-500 pl-2 w-full lg:flex-[0_0_32%] lg:max-w-[220px] lg:min-w-[140px]">
                <p className="text-white/70 text-[10px] font-medium">
                  {aboutContent.partnerNote}
                </p>
              </div>

              {/* Logo Loop */}
              <div className="w-full lg:flex-1 lg:min-w-0 overflow-hidden">
                <LogoLoop
                  logos={partnerLogos}
                  speed={30}
                  direction="left"
                  logoHeight={30}
                  gap={20}
                  pauseOnHover={true}
                  fadeOut={true}
                  fadeOutColor="#000"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 justify-center mt-8 lg:mt-0 items-center text-center gap-3 h-full">
            {statsData.map(({ value, label }) => (
              <div key={label} className="justify-center items-center">
                <p className="text-primary-200 text-2xl md:text-3xl font-bold">
                  {value}
                </p>
                <p className="text-neutral-400 text-[10px] md:text-sm leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
