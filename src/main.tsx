import { useEffect } from "react";
import gsap from "gsap";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/themeContext.tsx";
import { AppDataProvider } from "./context/AppDataContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./i18n";

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll wrapper
function AppWithLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeContextProvider>
      <BrowserRouter>
        <AppDataProvider>
          <AppWithLenis />
        </AppDataProvider>
      </BrowserRouter>
    </ThemeContextProvider>
  </ErrorBoundary>,
);
