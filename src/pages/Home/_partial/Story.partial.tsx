import React from "react";
import ScrollReveal from "../../../components/ScrollReveal/ScrollReveal";
import { useAppData } from "../../../context/AppDataContext";

const Story: React.FC = () => {
  const { heroData } = useAppData();
  return (
    <section
      id="story-section"
      className="w-full sticky top-0 -z-10 text-text-900 px-[1em] md:px-[2em] py-[4rem] md:py-[7rem] bg-secondary-500 overflow-hidden"
    >
      <div className="w-full mx-auto">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={15}
        >
          {heroData?.story}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Story;
