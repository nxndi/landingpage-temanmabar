import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";

import Logo from "../../assets/logo/logo_kulo.png";
import RotatingText from "./_partial.tsx/RotatingText.partial";
import { useAppData } from "../../context/AppDataContext";

type FadeConfig = {
  direction: "left" | "right";
  delay?: number;
};

const containerVariants: Variants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 1 },
  exit: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const fadeLeftVariants: Variants = {
  hidden: (custom?: FadeConfig) => {
    const direction = custom?.direction ?? "left";
    return {
      opacity: 0,
      x: direction === "left" ? -48 : 48,
    };
  },
  visible: (custom?: FadeConfig) => {
    const delay = custom?.delay ?? 0;
    return {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    };
  },
};

const PRELOADER_HASHTAGS = [
  "#DailyBrew",
  "#CoffeeLovers",
  "#FreshRoast",
  "#MorningEnergy",
  "#CaffeineKick",
  "#SipAndChill",
];

const Preloader: React.FC = () => {
  const { heroData } = useAppData();
  const hashtags = useMemo(() => {
    const dynamicHashtags = heroData?.hashtag?.filter(Boolean);
    return dynamicHashtags && dynamicHashtags.length > 0
      ? dynamicHashtags
      : PRELOADER_HASHTAGS;
  }, [heroData]);

  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[120] flex h-[100dvh] w-full items-center justify-center bg-primary-500 text-white"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ transformOrigin: "top center" }}
    >
      <div className="inline-flex items-center">
        <motion.div
          className="flex-shrink-0 !invert(100%)"
          custom={{ direction: "left", delay: 0 }}
          initial="hidden"
          animate="visible"
          variants={fadeLeftVariants}
          style={{
            filter: "invert(100%)",
          }}
        >
          <img
            src={Logo}
            alt="Kedai Kopi Kulo"
            className="h-16 md:h-28 w-full object-contain"
          />
        </motion.div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <motion.h1
            className="font-display text-3xl md:text-6xl"
            custom={{ direction: "right", delay: 0.4 }}
            initial="hidden"
            animate="visible"
            variants={fadeLeftVariants}
          >
            {heroData?.title}
          </motion.h1>

          <motion.div
            className="overflow-hidden"
            custom={{ direction: "right", delay: 0.8 }}
            initial="hidden"
            animate="visible"
            variants={fadeLeftVariants}
          >
            <RotatingText
              texts={hashtags}
              mainClassName="overflow-hidden text-sm md:text-2xl font-semibold tracking-wide"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={1500}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
