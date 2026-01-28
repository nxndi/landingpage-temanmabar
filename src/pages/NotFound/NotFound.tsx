import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layouts/PageWrapper/PageWrapper";
import { useAppData } from "../../context/AppDataContext";

const NotFound: React.FC = () => {
  const { metaData } = useAppData();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  return (
    <PageWrapper
      title={metaData?.page_title?.replace("{page}", "404")}
      description={metaData?.page_description?.replace("{page}", "404")}
      className="flex flex-col items-center justify-center bg-secondary-500 min-h-[100dvh] text-center"
    >
      <h1 className="text-[128px] lg:text-[256px] leading-[1] text-primary-500 font-bold">
        404
      </h1>
    </PageWrapper>
  );
};

export default NotFound;
