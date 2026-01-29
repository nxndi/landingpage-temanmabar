// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
import Wrapper from "./components/layouts/Wrapper/Wrapper";
import ContentRouter from "./components/router/Content.router";
import FooterRouter from "./components/router/Footer.router";
import Navbar from "./components/Navbar/Navbar";
// import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const minLoadingTime = 2500;

  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, minLoadingTime);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {/* <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" isLoading={isLoading} />}
      </AnimatePresence> */}
      <div className="flex grow flex-col bg-[#030303] dark:bg-background-900 text-text-900 dark:text-text-50">
        <Wrapper>
          <Navbar />
          <ContentRouter />
          <FooterRouter />
        </Wrapper>
      </div>
    </>
  );
}

export default App;
