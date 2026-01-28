import { RouteProps } from "react-router-dom";
import { appPages } from "../config/pages.config";
import BottomBar from "../components/BottomBar/BottomBar";

const footerRoutes: RouteProps[] = [
  {
    path: appPages.home.to,
    element: <BottomBar />,
  },
  { path: "*", element: <BottomBar /> },
];

export default footerRoutes;
