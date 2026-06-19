import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FlippingCardScrollProps {
  sectionRef: RefObject<HTMLElement>;
  headerRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLElement>;
  cardRefs: RefObject<HTMLElement[]>;
}

function useFlippingCardScroll({ sectionRef, headerRef, containerRef, cardRefs }: FlippingCardScrollProps) {
  const isGapAnimationCompleted = useRef<boolean>(false);
  const isFlipAnimationCompleted = useRef<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current.querySelector('div.flex.flex-col') as HTMLElement | null;
    const container = containerRef.current;
    const cards = cardRefs.current || [];

    function initAnimations() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      isGapAnimationCompleted.current = false;
      isFlipAnimationCompleted.current = false;

      const isMobile = window.innerWidth < 1024;
      const startWidth = isMobile ? 97 : 75;
      const endWidth = isMobile ? 92 : 60;
      const gapSize = isMobile ? '12px' : '20px';
      const borderRadiusOpen = isMobile ? '10px' : '20px';
      const borderRadiusLeft = isMobile ? '10px 0 0 10px' : '20px 0 0 20px';
      const borderRadiusRight = isMobile ? '0 10px 10px 0' : '0 20px 20px 0';

      // Reset to clean initial state — use gsap.set (not clearProps) to keep GSAP 3D context
      cards.forEach((card) => {
        if (card) {
          card.style.position = '';
          card.style.top = '';
          card.style.zIndex = '';
          gsap.set(card, { rotationY: 0, rotationZ: 0, y: 0, clearProps: 'borderRadius' });
        }
      });

      if (container) {
        gsap.set(container, { width: `${startWidth}%`, gap: '0px' });
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Header animation
          if (progress >= 0.1 && progress <= 0.25) {
            const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
            gsap.set(header, { y: yValue, opacity: opacityValue });
          } else if (progress < 0.1) {
            gsap.set(header, { y: 40, opacity: 0 });
          } else if (progress > 0.25) {
            gsap.set(header, { y: 0, opacity: 1 });
          }

          // Container width animation
          if (progress <= 0.25) {
            const widthPercentage = gsap.utils.mapRange(0, 0.25, startWidth, endWidth, progress);
            gsap.set(container, { width: `${widthPercentage}%` });
          } else {
            gsap.set(container, { width: `${endWidth}%` });
          }

          // Gap animation
          if (progress >= 0.35 && !isGapAnimationCompleted.current) {
            gsap.to(container, { gap: gapSize, duration: 0.5, ease: 'power3.out' });
            gsap.to(cards, { borderRadius: borderRadiusOpen, duration: 0.5, ease: 'power3.out' });
            isGapAnimationCompleted.current = true;
          } else if (progress < 0.35 && isGapAnimationCompleted.current) {
            gsap.to(container, { gap: '0px', duration: 0.5, ease: 'power3.out' });
            if (cards[0]) gsap.to(cards[0], { borderRadius: borderRadiusLeft, duration: 0.5, ease: 'power3.out' });
            if (cards[1]) gsap.to(cards[1], { borderRadius: '0px', duration: 0.5, ease: 'power3.out' });
            if (cards[2]) gsap.to(cards[2], { borderRadius: borderRadiusRight, duration: 0.5, ease: 'power3.out' });
            isGapAnimationCompleted.current = false;
          }

          // Flip animation
          if (progress >= 0.7 && !isFlipAnimationCompleted.current) {
            gsap.to(cards, { rotationY: 180, duration: 0.75, ease: 'power3.out', stagger: 0.1 });
            gsap.to([cards[0], cards[2]], {
              y: 30,
              rotationZ: (i) => [-15, 15][i],
              duration: 0.75,
              ease: 'power3.out',
            });
            isFlipAnimationCompleted.current = true;
          } else if (progress < 0.7 && isFlipAnimationCompleted.current) {
            gsap.to(cards, { rotationY: 0, duration: 0.75, ease: 'power3.out', stagger: -0.1 });
            gsap.to([cards[0], cards[2]], { y: 0, rotationZ: 0, duration: 0.75, ease: 'power3.out' });
            isFlipAnimationCompleted.current = false;
          }
        },
      });
    }

    initAnimations();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimations();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sectionRef, headerRef, containerRef, cardRefs]);
}

export default useFlippingCardScroll;
