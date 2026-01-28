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

      const mm = gsap.matchMedia();

      mm.add('(max-width: 1023px)', () => {
        // Mobile: implement stacking scroll effect
        if (header) {
          gsap.set(header, {
            y: 0,
            opacity: 1,
            clearProps: 'transform',
          });
        }
        if (container) {
          gsap.set(container, {
            width: '100%',
            gap: '1rem',
            clearProps: 'transform',
          });
        }
        
        // Apply sticky positioning with different top values for each card
        const topValues = [40, 60, 80];
        cards.forEach((card, index) => {
          if (card) {
            const topValue = topValues[index] || 40;
            card.style.position = 'sticky';
            card.style.top = `${topValue}px`;
            card.style.zIndex = String(index);
            gsap.set(card, {
              clearProps: 'transform,rotationY,rotationZ,y',
            });
          }
        });

        return {};
      });

      mm.add('(min-width: 1024px)', () => {
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

              gsap.set(header, {
                y: yValue,
                opacity: opacityValue,
              });
            } else if (progress < 0.1) {
              gsap.set(header, {
                y: 40,
                opacity: 0,
              });
            } else if (progress > 0.25) {
              gsap.set(header, {
                y: 0,
                opacity: 1,
              });
            }

            // Container width animation
            if (progress <= 0.25) {
              const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
              gsap.set(container, { width: `${widthPercentage}%` });
            } else {
              gsap.set(container, { width: '60%' });
            }

            // Gap animation
            if (progress >= 0.35 && !isGapAnimationCompleted.current) {
              gsap.to(container, {
                gap: '20px',
                duration: 0.5,
                ease: 'power3.out',
              });

              gsap.to(cards, {
                borderRadius: '20px',
                duration: 0.5,
                ease: 'power3.out',
              });

              isGapAnimationCompleted.current = true;
            } else if (progress < 0.35 && isGapAnimationCompleted.current) {
              gsap.to(container, {
                gap: '0px',
                duration: 0.5,
                ease: 'power3.out',
              });

              if (cards[0]) {
                gsap.to(cards[0], {
                  borderRadius: '20px 0 0 20px',
                  duration: 0.5,
                  ease: 'power3.out',
                });
              }

              if (cards[1]) {
                gsap.to(cards[1], {
                  borderRadius: '0px',
                  duration: 0.5,
                  ease: 'power3.out',
                });
              }

              if (cards[2]) {
                gsap.to(cards[2], {
                  borderRadius: '0 20px 20px 0',
                  duration: 0.5,
                  ease: 'power3.out',
                });
              }

              isGapAnimationCompleted.current = false;
            }

            // Flip animation
            if (progress >= 0.7 && !isFlipAnimationCompleted.current) {
              gsap.to(cards, {
                rotationY: 180,
                duration: 0.75,
                ease: 'power3.out',
                stagger: 0.1,
              });

              gsap.to([cards[0], cards[2]], {
                y: 30,
                rotationZ: (i) => [-15, 15][i],
                duration: 0.75,
                ease: 'power3.out',
              });

              isFlipAnimationCompleted.current = true;
            } else if (progress < 0.7 && isFlipAnimationCompleted.current) {
              gsap.to(cards, {
                rotationY: 0,
                duration: 0.75,
                ease: 'power3.out',
                stagger: -0.1,
              });

              gsap.to([cards[0], cards[2]], {
                y: 0,
                rotationZ: 0,
                duration: 0.75,
                ease: 'power3.out',
              });

              isFlipAnimationCompleted.current = false;
            }
          },
        });
      });

      return mm;
    }

    const mm = initAnimations();

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
      mm?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sectionRef, headerRef, containerRef, cardRefs]);
}

export default useFlippingCardScroll;
