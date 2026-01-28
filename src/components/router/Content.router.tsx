import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import contentRoutes from "../../routes/content.routes";
import LoadingScreen from "../layouts/Loading/LoadingScreen";

const ContentRouter = () => {
  const location = useLocation();
  let fallback = <LoadingScreen />;

  return (
    <Suspense fallback={fallback}>
      <Routes location={location}>
        {contentRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default ContentRouter;
