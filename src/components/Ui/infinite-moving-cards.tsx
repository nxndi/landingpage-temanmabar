"use client";

import { cn } from "../../utils/utils";
import React, { useEffect, useState } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    image: string;
    website?: string;
    rating?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className="relative w-[250px] max-w-full shrink-0 rounded-2xl border border-b-0 border-gray-800 px-4 py-3 md:w-[350px] bg-gradient-to-br from-primary-700/50 to-gray-700/20"
            key={item.name}
          >
            <blockquote className="flex flex-col justify-between h-full">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div>
                <span className="relative z-20 text-sm leading-[1.6] font-normal text-gray-100">
                  {item.quote}
                </span>
              </div>
              <div className="relative z-20 mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col sm:max-w-[65%]">
                  <span className="text-sm leading-[1.6] font-medium text-gray-300">
                    {item.name}
                  </span>
                  {item.website && (
                    <span className="text-xs text-neutral-400">
                      {item.website}
                    </span>
                  )}
                </div>
                {item.rating !== undefined && (
                  <div className="flex flex-wrap justify-start sm:justify-end gap-0 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < (item.rating ?? 0) ? (
                          <IconStarFilled className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <IconStar className="w-4 h-4 text-neutral-400" />
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
