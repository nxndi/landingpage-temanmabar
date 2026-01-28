import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppData } from "../../context/AppDataContext";

const FALLBACK_CATEGORY = "all menu";

const Products: React.FC = () => {
  const { productsData, loading } = useAppData();
  const products = useMemo(() => productsData ?? [], [productsData]);

  const [selectedCategory, setSelectedCategory] = useState(FALLBACK_CATEGORY);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileMenuContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileCategoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(() => {
    if (!products.length) return [FALLBACK_CATEGORY];

    const unique = new Set<string>();
    products.forEach((product) => {
      if (Array.isArray(product.category)) {
        product.category
          .filter((cat): cat is string => Boolean(cat))
          .forEach((cat) => unique.add(cat));
      }
    });

    return [FALLBACK_CATEGORY, ...Array.from(unique)];
  }, [products]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(FALLBACK_CATEGORY);
    }
  }, [categories, selectedCategory]);

  const handleCategoryClick = useCallback(
    (category: string, index?: number) => {
      setSelectedCategory(category);

      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth < 768;

      if (isMobile && typeof index === "number") {
        const button = mobileCategoryRefs.current[index];
        const container = mobileMenuContainerRef.current;

        if (button && container) {
          button.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }

      if (!isMobile) return;

      window.requestAnimationFrame(() => {
        const target = sectionRef.current;
        if (!target) return;

        const offset = 0;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: top < 0 ? 0 : top,
          behavior: "smooth",
        });
      });
    },
    []
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === FALLBACK_CATEGORY) {
      return products;
    }

    return products.filter((product) =>
      Array.isArray(product.category)
        ? product.category.includes(selectedCategory)
        : false
    );
  }, [products, selectedCategory]);

  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (loading) return;

    setVisibleIndices([]);
    const baseDelay = 140;
    const timeouts = filteredProducts.map((_, index) =>
      window.setTimeout(() => {
        setVisibleIndices((prev) => {
          if (prev.includes(index)) return prev;
          return [...prev, index];
        });
      }, baseDelay * index)
    );

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [filteredProducts, loading]);

  useEffect(() => {
    if (
      expandedProductId !== null &&
      !filteredProducts.some((product) => product.id === expandedProductId)
    ) {
      setExpandedProductId(null);
    }
  }, [expandedProductId, filteredProducts]);

  const handleBuyNowClick = useCallback((productId: number) => {
    setExpandedProductId((prev) => (prev === productId ? null : productId));
  }, []);

  const isLoading = loading && !products.length;

  return (
    <section
      ref={sectionRef}
      className="w-full text-text-900 bg-white pb-[6rem] md:pb-[10rem]"
    >
      <div className="sticky md:static top-0 z-40 backdrop-blur-lg md:backdrop-blur-none">
        {/* Header */}
        <div className="flex flex-col px-[1em] md:px-[2em] pt-[1em] md:pt-6 items-center sm:items-start text-center sm:text-left">
          <div>
            <h2 className="font-display text-primary-500 text-[2rem] sm:text-6xl leading-none tracking-tight">
              Explore Our Menu
            </h2>
            <p className="text-sm text-primary-400 sm:text-lg font-medium pb-[0.1rem]">
              Crafted for coffee lovers.
            </p>
          </div>
        </div>

        {/* Scrollable Menu (Mobile) */}
        <div className="lg:hidden py-1">
          <div
            ref={mobileMenuContainerRef}
            className="flex gap-4 overflow-x-auto px-2 scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((cat, index) => (
              <button
                key={cat}
                ref={(el) => {
                  mobileCategoryRefs.current[index] = el;
                }}
                onClick={() => handleCategoryClick(cat, index)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold uppercase whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-primary-500 text-white"
                    : "bg-white/70 text-zinc-700 hover:bg-primary-400 hover:text-white"
                }`}
                disabled={isLoading}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col sm:px-[1em] md:px-[2em] md:flex-row gap-10 mt-[2.5rem] md:mt-[5rem]">
        {/* Sidebar (Desktop Only) */}
        <div className="hidden lg:flex md:flex-col gap-4 md:w-[200px]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`group flex items-center text-left uppercase text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-black"
                    : "text-zinc-600 hover:text-primary-500"
                }`}
                disabled={isLoading}
              >
                <span>{cat}</span>

                {/* Dot indicator (animated) */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      key={cat}
                      initial={{ opacity: 0, scale: 0.4, x: 4 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.4, x: 4 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="w-2 h-2 ml-2 rounded-full bg-primary-500"
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5 gap-3 md:gap-6 px-[1em] md:px-[2em] w-full">
          {isLoading ? (
            <div className="col-span-full py-8 text-center text-sm text-zinc-500">
              Memuat produk...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-8 text-center text-sm text-zinc-500">
              Produk belum tersedia untuk kategori ini.
            </div>
          ) : (
            filteredProducts.map((product, index) => {
              const isExpanded = expandedProductId === product.id;
              const deliveryOptions = [
                {
                  key: "gofood",
                  label: "GoFood",
                  url: product.marketplace.gofood.url,
                  rating: product.marketplace.gofood.rating,
                },
                {
                  key: "grabfood",
                  label: "GrabFood",
                  url: product.marketplace.grabfood.url,
                  rating: product.marketplace.grabfood.rating,
                },
                {
                  key: "shopeefood",
                  label: "ShopeeFood",
                  url: product.marketplace.shopeefood.url,
                  rating: product.marketplace.shopeefood.rating,
                },
              ].filter(
                (
                  option
                ): option is {
                  key: string;
                  label: string;
                  url: string;
                  rating: number | null;
                } => Boolean(option.url)
              );

              return (
                <div
                  key={product.id}
                  className={`group flex flex-col justify-between bg-white/90 border border-zinc-200 hover:border-zinc-400 transition-all duration-700 ease-out transform ${
                    visibleIndices.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Gambar Produk */}
                  <div className="relative w-full h-[192px] overflow-hidden md:h-[300px] md:bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ color: "transparent" }}
                    />
                    {/* Overlay halus saat hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                  </div>

                  {/* Info Produk */}
                  <div className="flex flex-col gap-2 flex-grow justify-between text-left bg-secondary-300">
                    <div className="">
                      <AnimatePresence mode="wait" initial={false}>
                        {isExpanded ? (
                          <motion.div
                            key="links"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="md:px-4 md:py-[10px] p-2"
                          >
                            <div className="flex flex-col gap-2">
                              {deliveryOptions.length ? (
                                deliveryOptions.map((option) => (
                                  <motion.a
                                    key={option.key}
                                    href={option.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between md:text-sm text-xs font-semibold text-zinc-700 transition-colors hover:text-primary-600"
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    <span className="flex flex-col gap-0.5 text-left">
                                      <span>{option.label}</span>
                                    </span>
                                    {typeof option.rating === "number" ? (
                                      <span className="text-xs uppercase text-primary-500">
                                        {option.rating.toFixed(1)} ★
                                      </span>
                                    ) : null}
                                  </motion.a>
                                ))
                              ) : (
                                <div className="rounded-lg bg-white/70 px-3 py-3 text-sm text-zinc-500">
                                  Online ordering links coming soon.
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="md:p-4 p-2"
                          >
                            <p className="text-base md:text-xl font-display tracking-[0.08em] uppercase text-zinc-700 font-semibold">
                              {product.name}
                            </p>
                            {product.info ? (
                              <p className="mt-1 text-[10px] md:text-base text-zinc-600">
                                {product.info}
                              </p>
                            ) : null}
                            <p className="text-base md:text-lg font-medium text-primary-500 mt-2">
                              Rp {(product.price ?? 0).toLocaleString()}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tombol Beli */}
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleBuyNowClick(product.id)}
                      className="md:mt-4 mt-0 w-full py-[0.6rem] text-sm font-semibold uppercase bg-primary-500 text-white hover:bg-primary-500/90 transition-all tracking-wide"
                    >
                      {isExpanded ? "Close Links" : "Buy Now"}
                    </motion.button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
