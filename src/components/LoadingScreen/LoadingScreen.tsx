import React, { useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Logo from "../../assets/preloader/logo.png";
import Teman from "../../assets/preloader/teman.png";
import mabar from "../../assets/preloader/mabar.png";
import RightWing from "../../assets/preloader/rightwing.png";
import LeftWing from "../../assets/preloader/leftwing.png";

interface LoadingScreenProps {
  isLoading: boolean;
}

// Container variants for the exit animation
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

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const leftWingRef = useRef<HTMLImageElement>(null);
  const temanRef = useRef<HTMLImageElement>(null);
  const rightWingRef = useRef<HTMLImageElement>(null);
  const mabarRef = useRef<HTMLImageElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Animation using GSAP
  useEffect(() => {
    if (!isLoading) return;

    // Kill previous timeline if exists
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Initial state
    gsap.set(logoRef.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set(temanRef.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set([leftWingRef.current, rightWingRef.current], {
      opacity: 0,
      x: 0,
    });

    gsap.set(mabarRef.current, {
      opacity: 0,
      y: 20,
    });

    // Entrance animation sequence
    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0)
      .to(temanRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.4)
      .to(
        leftWingRef.current,
        {
          opacity: 1,
          x: -15,
          duration: 0.6,
        },
        0.6,
      )
      .to(
        rightWingRef.current,
        {
          opacity: 1,
          x: 15,
          duration: 0.6,
        },
        0.6,
      )
      .to(mabarRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.7);

    // Continuous looping animations
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    // Left wing: move from center to left
    gsap.to(leftWingRef.current, {
      x: -20,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    // Right wing: move from center to right
    gsap.to(rightWingRef.current, {
      x: 20,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    gsap.to(temanRef.current, {
      y: -8,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    gsap.to(mabarRef.current, {
      y: -6,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
      gsap.killTweensOf([
        logoRef.current,
        leftWingRef.current,
        temanRef.current,
        rightWingRef.current,
        mabarRef.current,
      ]);
    };
  }, [isLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-500 bg-gradient-to-t from-accent-500/80 via-accent-500/60 to-primary-500"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        transformOrigin: "top center",
        pointerEvents: isLoading ? "auto" : "none",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-0">
        <motion.div className="flex items-center justify-center">
          <img
            ref={logoRef}
            src={Logo}
            alt="Logo"
            className="h-32 w-auto object-contain"
          />
        </motion.div>

        <motion.div className="relative flex items-center justify-center w-40">
          {/* Left Wing - Behind Teman */}
          <motion.div className="absolute left-0 z-0">
            <img
              ref={leftWingRef}
              src={LeftWing}
              alt="Left Wing"
              className="h-7 w-auto object-contain"
            />
          </motion.div>

          {/* Teman Center - On Top */}
          <motion.div className="relative z-10 flex-shrink-0">
            <img
              ref={temanRef}
              src={Teman}
              alt="Teman"
              className="h-9 w-auto object-contain"
            />
          </motion.div>

          {/* Right Wing - Behind Teman */}
          <motion.div className="absolute right-0 z-0">
            <img
              ref={rightWingRef}
              src={RightWing}
              alt="Right Wing"
              className="h-7 w-auto object-contain"
            />
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center justify-center">
          <img
            ref={mabarRef}
            src={mabar}
            alt="Mabar Bottom"
            className="h-11 w-auto object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
