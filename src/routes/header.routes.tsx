import { RouteProps } from "react-router-dom";
import { appPages } from "../config/pages.config";
import StaggeredMenu from "../components/StaggeredMenu/StaggeredMenu";
import Logo from "../assets/logo/logo_kulo.png";
import appConfig from "../config/app.config";

const menuItems = [
  {
    label: "About",
    ariaLabel: "Go to home page",
    link: appPages.maintenance.to,
  },
  {
    label: "Store",
    ariaLabel: "View grid layout",
    link: appPages.maintenance.to,
  },
  { label: "Career", ariaLabel: "View gallery", link: appPages.maintenance.to },
  {
    label: "Contact",
    ariaLabel: "View gallery",
    link: appPages.maintenance.to,
  },
];

const socialItems = [
  { label: "Instagram", link: "https://instagram.com" },
  { label: "Facebook", link: "https://facebook.com" },
  { label: "Tiktok", link: "https://tiktok.com" },
];

const headerRoutes: RouteProps[] = [
  {
    path: appPages.maintenance.to,
    element: null,
  },
  {
    path: appPages.notFound.to,
    element: null,
  },
  {
    path: "*",
    element: (
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#000"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={[appConfig.accentColor, appConfig.primaryColor]}
        logoUrl={Logo}
        accentColor={appConfig.primaryColor}
        isFixed={true}
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    ),
  },
];

export default headerRoutes;
