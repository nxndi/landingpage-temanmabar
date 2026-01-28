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
  reseller: {
    title: string;
    items: FooterLink[];
  };
  socials: {
    title: string;
    items: FooterLink[];
  };
};

const defaultSections: FooterSections = {
  links: {
    title: "Link Cepat",
    items: [
      { label: "Tentang Kami", href: "#" },
      { label: "Produk", href: "#" },
      { label: "Jadi Reseller", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  reseller: {
    title: "Reseller",
    items: [{ label: "Daftar Reseller", href: "#" }],
  },
  socials: {
    title: "Social Media",
    items: [
      { label: "WhatsApp", href: "#", external: true },
      { label: "Telegram", href: "#", external: true },
      {
        label: "support@mabartopup.com",
        href: "mailto:support@mabartopup.com",
      },
    ],
  },
};

const Footer = () => {
  const { t } = useTranslation("language");

  const translatedSections = t("footer.sections", {
    returnObjects: true,
  }) as FooterSections | undefined;

  const sections: FooterSections = {
    links: translatedSections?.links ?? defaultSections.links,
    reseller: translatedSections?.reseller ?? defaultSections.reseller,
    socials: translatedSections?.socials ?? defaultSections.socials,
  };

  const currentYear = new Date().getFullYear();
  const copyrightText =
    t("footer.copyright", { year: currentYear }) ||
    `© ${currentYear} Teman Mabar. All Rights Reserved.`;
  const brandText = t("footer.brand") || "TEMAN MABAR";

  return (
    <div className="fixed bottom-0 left-0 z-0 px-4 w-full pb-[1em] pt-20 md:pb-[2em] md:pt-40 bg-primary-500 bg-gradient-to-t from-accent-500 via-accent-500/70 to-transparent">
      <div className="containercustom mx-auto flex flex-col gap-10">
        <div className="grid gap-4 md:gap-16 grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-3xl font-display tracking-wide text-white">
              {sections.links.title}
            </h3>
            <ul className="-my-2 flex flex-col items-start text-sm text-neutral-300">
              {sections.links.items.map((link) => (
                <li className="py-1.5" key={`links-${link.label}`}>
                  <a
                    className="transition hover:text-primary-200"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-3xl font-display tracking-wide text-white">
              {sections.reseller.title}
            </h3>
            <ul className="-my-2 flex flex-col items-start text-sm text-neutral-300">
              {sections.reseller.items.map((link) => (
                <li className="py-1.5" key={`reseller-${link.label}`}>
                  <a
                    className="transition hover:text-primary-200"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl md:text-3xl font-display tracking-wide text-white">
              {sections.socials.title}
            </h3>
            <ul className="-my-2 flex flex-col items-start text-sm text-neutral-300">
              {sections.socials.items.map((link) => (
                <li className="py-1.5" key={`social-${link.label}`}>
                  <a
                    className="transition hover:text-primary-200"
                    href={link.href}
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

        <div className="flex flex-col gap--0 md:gap-4 border-t border-neutral-500 pt-6 text-neutral-300 md:flex-row md:items-end md:justify-between">
          <p className="text-xs hidden md:block mb-3 lg:mb-4 xl:mb-[26px]">
            {copyrightText}
          </p>
          <span className="font-display bg-gradient-to-r from-primary-500 via-primary-200 to-primary-500 bg-clip-text text-transparent text-[calc(1.7rem+4vw)] sm:text-[calc(2.5rem+4vw)] md:text-[calc(1rem+5vw)] xl:text-[calc(1rem+5vw)] leading-none tracking-tight text-center md:text-right font-bold">
            {brandText}
          </span>
          <p className="text-xs text-center md:hidden">{copyrightText}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
