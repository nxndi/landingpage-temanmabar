import React from "react";
import PageWrapper from "../../components/layouts/PageWrapper/PageWrapper";
import { useAppData } from "../../context/AppDataContext";

const Maintenance: React.FC = () => {
  const { metaData } = useAppData();
  return (
    <PageWrapper
      title={metaData?.page_title?.replace("{page}", "Maintenance")}
      description={metaData?.page_description?.replace("{page}", "Maintenance")}
      className="flex min-h-[100dvh] items-center justify-center bg-secondary-500"
    >
      <h1 className="px-6 text-center font-display text-primary-500 text-[calc(1.1rem+6vw)] md:text-[calc(1rem+10vw)] xl:text-[calc(1rem+14vw)] uppercase leading-[0.9] md:leading-[0.85] lg:leading-[0.8] tracking-tight">
        We’re Currently Under Maintenance
      </h1>
    </PageWrapper>
  );
};

export default Maintenance;
