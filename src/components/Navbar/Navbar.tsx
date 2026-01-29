import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/icon/Icon";
import LogoLandscape from "../../assets/logo/logo_landscape.png";
import gsap from "gsap";
import ThemeContext from "../../context/themeContext";
import LANG from "../../constants/lang.constant";
import { TLang } from "../../types/lang.type";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { t, i18n } = useTranslation("language");
  const { language, setLanguage } = useContext(ThemeContext);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const languageRef = useRef<HTMLDivElement>(null);
  const languageItemsRef = useRef<HTMLButtonElement[]>([]);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const [languagePosition, setLanguagePosition] = useState({ top: 0, left: 0 });

  // Create language options array from LANG constants
  const langArray = Object.values(LANG).map((lang) => ({
    value: lang.lng,
    label: lang.text,
    flag: lang.icon,
  }));

  // Translated menu items using i18n with section IDs
  const menuItems = [
    {
      label: t("header.services") || "Layanan",
      href: "#service-section",
      id: "service-section",
    },
    {
      label: t("header.calculator") || "Kalkulator Keuntungan",
      href: "#calculator-section",
      id: "calculator-section",
    },
    {
      label: t("header.about_us") || "Tentang Kami",
      href: "#about-section",
      id: "about-section",
    },
    {
      label: t("header.faq") || "FAQ",
      href: "#faq-section",
      id: "faq-section",
    },
  ];

  // Handle smooth scroll to section
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 57; // Approximate navbar height in pixels
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, pointerEvents: "none" },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          pointerEvents: "auto",
        },
      );

      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.1,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });

      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        pointerEvents: "none",
        delay: 0.1,
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });
    }

    if (menuItemsRef.current.length > 0) {
      gsap.set(menuItemsRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (!languageRef.current) return;

    if (isLanguageOpen) {
      gsap.fromTo(
        languageRef.current,
        { opacity: 0, pointerEvents: "none" },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          pointerEvents: "auto",
        },
      );

      gsap.fromTo(
        languageItemsRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.1,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(languageItemsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });

      gsap.to(languageRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        pointerEvents: "none",
        delay: 0.1,
      });
    }
  }, [isLanguageOpen]);

  useEffect(() => {
    if (languageRef.current) {
      gsap.set(languageRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });
    }

    if (languageItemsRef.current.length > 0) {
      gsap.set(languageItemsRef.current, { opacity: 0 });
    }
  }, []);

  const updateLanguagePosition = useCallback(() => {
    if (!languageButtonRef.current) return;
    const rect = languageButtonRef.current.getBoundingClientRect();
    setLanguagePosition({
      top: rect.bottom + 16,
      left: rect.left + rect.width / 2,
    });
  }, []);

  const handleLanguageChange = (lang: TLang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const handleLanguageToggle = () => {
    setIsLanguageOpen((prev) => {
      const next = !prev;
      if (!prev) {
        updateLanguagePosition();
      }
      return next;
    });
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    if (isLanguageOpen) {
      setIsLanguageOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500
        ${isScrolled ? "bg-black/40 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="containercustom mx-auto px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-12">
              <img
                src={LogoLandscape}
                alt="Landing Page Reseller Game Topup"
                className="h-9 w-auto object-contain"
              />

              <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.id)}
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language */}
              <button
                ref={languageButtonRef}
                onClick={handleLanguageToggle}
                className="p-1.5 rounded-full border-2 border-gray-700/50 bg-gray-900 hover:border-gray-600 transition-colors"
                aria-label="Language"
              >
                <img
                  src={LANG[language].icon}
                  alt={LANG[language].text}
                  className="w-5 h-5 rounded-full object-cover"
                />
              </button>

              {isLanguageOpen &&
                createPortal(
                  <div
                    ref={languageRef}
                    className="
                      fixed
                      transform
                      -translate-x-1/2
                      rounded-2xl
                      border border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                      z-[9999]
                      min-w-[150px]
                    "
                    style={{
                      WebkitBackdropFilter: "blur(18px)",
                      top: languagePosition.top,
                      left: languagePosition.left,
                    }}
                  >
                    <div className="p-2 flex flex-col gap-2">
                      <button
                        ref={(el) => {
                          if (el) languageItemsRef.current[0] = el;
                        }}
                        onClick={() => handleLanguageChange("id")}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                          language === "id"
                            ? "bg-primary-500/30 text-primary-300"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <img
                          src={LANG.id.icon}
                          alt={LANG.id.text}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">
                          {LANG.id.text}
                        </span>
                      </button>

                      <button
                        ref={(el) => {
                          if (el) languageItemsRef.current[1] = el;
                        }}
                        onClick={() => handleLanguageChange("en")}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                          language === "en"
                            ? "bg-primary-500/30 text-primary-300"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <img
                          src={LANG.en.icon}
                          alt={LANG.en.text}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">
                          {LANG.en.text}
                        </span>
                      </button>
                    </div>
                  </div>,
                  document.body,
                )}
              {/* Contact */}
              <a
                href="https://wa.me/6281116601691"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1.5 rounded-full border-2 border-primary-400 bg-primary-500 p-1.5 lg:px-3 lg:py-1.5 text-xs lg:text-sm text-white hover:bg-primary-600 transition-all"
              >
                <Icon icon="HeroPhone" className="w-5 h-5" />
                <span className="hidden lg:inline">
                  {t("header.contact_us") || "Hubungi Kami"}
                </span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMenuToggle}
                className="md:hidden p-1.5 rounded-full border-2 border-gray-700/50 bg-gray-900"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <Icon icon="HeroXMark" className="w-5 h-5 text-white" />
                ) : (
                  <Icon icon="HeroBars3" className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="
              md:hidden
              fixed
              left-4 right-4
              top-16
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              z-[9999]
            "
            style={{ WebkitBackdropFilter: "blur(18px)" }}
          >
            <div className="p-4 flex flex-col gap-2 text-lg font-medium">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  ref={(el) => {
                    if (el) menuItemsRef.current[index] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.id)}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-white/60 whitespace-nowrap">
                    0{index + 1}
                  </span>
                  <span className="leading-none">{item.label}</span>
                </a>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Navbar;
