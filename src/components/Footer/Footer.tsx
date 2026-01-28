import { useTranslation } from "react-i18next";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSections = {
  links: {
    title: string;
    items: FooterLink[];
  };
  tools: {
    title: string;
    items: FooterLink[];
  };
  socials: {
    title: string;
    items: FooterLink[];
  };
};

const Footer = () => {
  const { t } = useTranslation("language");

  const translatedSections = t("footer.sections", {
    returnObjects: true,
  }) as FooterSections | undefined;

  const sections: FooterSections = translatedSections || {
    links: { title: "", items: [] },
    tools: { title: "", items: [] },
    socials: { title: "", items: [] },
  };

  const currentYear = new Date().getFullYear();
  const copyrightText =
    t("footer.copyright", { year: currentYear }) ||
    `© ${currentYear} Teman Mabar. All Rights Reserved.`;
  const brandText = t("footer.brand") || "TEMAN MABAR";

  // Handle smooth scroll to section
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Check if href is a section ID (starts with #)
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 57;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-0 px-4 w-full pb-[1em] pt-20 md:pb-[2em] sm:pt-24 lg:pt-40 bg-primary-500 bg-gradient-to-t from-accent-500 via-accent-500/70 to-transparent">
      <div className="containercustom mx-auto flex flex-col gap-0 md:gap-10">
        <div className="grid gap-8 md:gap-16 grid-cols-1 lg:grid-cols-2">
          {/* left Section - CTA */}
          <div className="flex flex-col items-start justify-start gap-6 lg:gap-8">
            <div className="max-w-[300px] sm:max-w-xl lg:max-w-md">
              <h2 className="text-[28px] md:text-[40px] lg:text-[36px] font-semibold leading-[1.1] tracking-tight bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent">
                {t("footer.cta_title") ||
                  "Siap Mulai Bisnis Top Up Bareng Teman Mabar?"}
              </h2>
              <div className="relative inline-flex items-center z-10 mt-4 lg:mt-8">
                <div className="p-1.5 rounded-full border border-white/30">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScaaZa82NyGscfI4NdiPmz-3n13It94GIypQHl8jVXHN_pPPA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all text-xs sm:text-sm duration-200 uppercase font-medium flex items-center justify-center gap-1.5 h-8 sm:h-10 px-6 sm:px-12 text-black/80 -tracking-[0.015em] relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] hover:bg-white/80 hover:border-white"
                  >
                    <span>
                      {t("footer.cta_button") || "Daftar Reseller Sekarang"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right Section - Menu */}
          <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-xl md:text-2xl font-display tracking-wide text-white">
                {sections.links.title}
              </h3>
              <ul className="-my-1 md:-my-2 flex flex-col items-start text-sm text-neutral-300">
                {sections.links.items.map((link) => (
                  <li className="py-1.5" key={`links-${link.label}`}>
                    <a
                      className="transition hover:text-primary-200 cursor-pointer"
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-xl md:text-2xl font-display tracking-wide text-white">
                {sections.tools.title}
              </h3>
              <ul className="-my-1 md:-my-2 flex flex-col items-start text-sm text-neutral-300">
                {sections.tools.items.map((link) => (
                  <li className="py-1.5" key={`tools-${link.label}`}>
                    <a
                      className="transition hover:text-primary-200 cursor-pointer"
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 md:gap-4 col-span-2 lg:col-span-1">
              <h3 className="text-xl md:text-2xl font-display tracking-wide text-white">
                {sections.socials.title}
              </h3>
              <ul className="-my-1 md:-my-2 flex flex-col items-start text-sm text-neutral-300">
                {sections.socials.items.map((link) => (
                  <li className="py-1.5" key={`social-${link.label}`}>
                    <a
                      className="transition hover:text-primary-200 cursor-pointer"
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0 md:gap-4 border-t border-neutral-500 pt-6 text-neutral-300 md:flex-row md:items-end md:justify-between">
          <p className="text-xs hidden md:block mb-3 lg:mb-4 xl:mb-[26px]">
            {copyrightText}
          </p>
          <span className="font-display bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent text-[calc(1.7rem+4vw)] sm:text-[calc(2.5rem+4vw)] md:text-[calc(1rem+4vw)] xl:text-[calc(1rem+5vw)] leading-none tracking-tight text-center md:text-right font-bold">
            {brandText}
          </span>
          <p className="text-xs text-center md:hidden">{copyrightText}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
