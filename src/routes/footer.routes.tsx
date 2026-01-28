import { RouteProps } from "react-router-dom";
import { appPages } from "../config/pages.config";
import Footer from "../components/Footer/Footer";

const footerRoutes: RouteProps[] = [
  {
    path: appPages.maintenance.to,
    element: null,
  },
  {
    path: appPages.notFound.to,
    element: null,
  },
  { path: "*", element: <Footer /> },
];

export default footerRoutes;
