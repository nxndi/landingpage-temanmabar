import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import { appPages } from "../config/pages.config";

const HomePage = lazy(() => import("../pages/Home/Home.page"));
const MaintenancePage = lazy(() => import("../pages/Maintenance/Maintenance"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"));

const contentRoutes: RouteProps[] = [
  { path: appPages.home.to, element: <HomePage /> },
  { path: appPages.maintenance.to, element: <MaintenancePage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default contentRoutes;
