import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import sepeda from "../../../assets/person/sepeda.webp";
import juruparkir from "../../../assets/person/juruparkir.webp";
import ibu from "../../../assets/person/ibuibu.webp";
import anakkecil from "../../../assets/person/anakkecil.webp";
import petani from "../../../assets/person/petani.webp";
import genz from "../../../assets/person/genz.webp";

const customersData = [
  {
    id: 1,
    name: "Anak Sepeda (ASEP) Vida Bekasi",
    image: sepeda,
    className: "right-[0%] z-[1]",
  },
  {
    id: 2,
    name: "Juru Parkir Karang Tengah",
    image: juruparkir,
    className: "right-[8%] z-[2]",
  },
  {
    id: 3,
    name: "Ibu-ibu Tetangga BSD",
    image: ibu,
    className: "right-[12%] z-[1]",
  },
  {
    id: 4,
    name: "Tetangga Kecil Cipete",
    image: anakkecil,
    className: "right-[17%] z-[1]",
  },
  {
    id: 5,
    name: "Petani Garut",
    image: petani,
    className: "right-[18%] z-[2]",
  },
  {
    id: 6,
    name: "NFTetangga Bintaro",
    image: genz,
    className: "right-[22%] z-[1]",
  },
];

const Customer: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Deteksi apakah layar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (id: number) => {
    if (isMobile) {
      setActiveId((prev) => (prev === id ? null : id));
    }
  };

  const handleHover = (id: number | null) => {
    if (!isMobile) setHoveredId(id);
  };

  return (
    <section
      id="customer-section"
      className="relative w-full min-h-[calc(100vh-272px)] text-text-900 bg-primary-500 mb-[6rem] md:mb-[10rem] z-40 flex flex-col"
    >
      {/* Sticky Header */}
      <div className="sticky md:static top-0 z-40 backdrop-blur-lg md:backdrop-blur-none pt-0 md:pt-6">
        <div className="flex flex-col px-[1em] md:px-[2em] pt-[1em] md:pt-0 items-center sm:items-start text-center sm:text-left">
          <div>
            <h2 className="font-display text-white text-[2rem] sm:text-6xl leading-none tracking-tight">
              Our Neighbors
            </h2>
            <p className="text-sm text-text-100 sm:text-lg font-medium pb-[0.1rem]">
              Friendly faces behind every cup.
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Customer Slider */}
      <div className="relative flex h-[50dvh] md:h-[73dvh] w-fit min-w-full flex-shrink-0 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar px-[1em] mt-16 md:mt-6 items-end">
        {customersData.map((customer) => {
          const showCaption =
            (isMobile && activeId === customer.id) ||
            (!isMobile && hoveredId === customer.id);

          return (
            <div
              key={customer.id}
              onClick={() => handleClick(customer.id)}
              onMouseEnter={() => handleHover(customer.id)}
              onMouseLeave={() => handleHover(null)}
              className={`relative flex-shrink-0 inline-flex items-end justify-center w-auto h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-visible cursor-pointer ${customer.className}`}
            >
              <img
                alt={customer.name}
                loading="lazy"
                decoding="async"
                src={customer.image}
                className="max-h-full w-auto object-contain"
                style={{ color: "transparent" }}
              />

              {/* Animated Caption */}
              <AnimatePresence>
                {showCaption && (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-5 md:bottom-10 z-10 -translate-x-1/2 whitespace-nowrap 
                      border border-black bg-accent-100/80 backdrop-blur-sm px-3 py-2 
                      font-display text-md md:text-2xl text-black shadow-lg"
                  >
                    {customer.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Customer;
