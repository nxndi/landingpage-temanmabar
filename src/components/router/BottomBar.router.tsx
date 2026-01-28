import { Route, Routes } from "react-router-dom";
import bottomBarRoutes from "../../routes/bottomBar.routes";

const BottomBarRouter = () => {
  return (
    <Routes>
      {bottomBarRoutes.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
    </Routes>
  );
};

export default BottomBarRouter;
