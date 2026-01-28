// src/components/layouts/PageWrapper/PageWrapper.tsx
import { FC, ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
import useHelmet, {
  LinkProps,
  MetaProps,
  StructuredData,
} from "../../../hooks/useHelmet";
import { useAppData } from "../../../context/AppDataContext";
import ReactGA from "react-ga4";
import appConfig from "../../../config/app.config";

interface IPageWrapperProps {
  children: ReactNode;
  className?: string;
  isProtectedRoute?: boolean;
  title?: string;
  description?: string;
  image?: string;
  metaTags?: MetaProps[];
  linkTags?: LinkProps[];
  structuredData?: StructuredData;
}

const PageWrapper: FC<IPageWrapperProps> = (props) => {
  const { metaData } = useAppData();
  const {
    children,
    className,
    isProtectedRoute = false,
    title,
    description,
    image,
    metaTags,
    linkTags,
    structuredData,
  } = props;

  const [helmetComponent, setHelmetComponent] = useState<JSX.Element | null>(
    null
  );
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Create maps of custom tags by name/rel to check for duplicates
    const customMetaTagNames = new Set(
      metaTags?.map((tag) => tag.name || tag.property) || []
    );
    const customLinkTagRels = new Set(linkTags?.map((tag) => tag.rel) || []);

    // Default image path - use provided image or fallback to static placeholder
    const imagePath = image || `${metaData?.canonical!}assets/logo-square.png`;

    // Only include default meta tags that don't conflict with custom ones
    const defaultMetaTags = [
      {
        name: "description",
        content: description || metaData?.description!,
      },
      {
        name: "keywords",
        content: metaData?.keywords!,
      },
      {
        name: "robots",
        content: "index, follow",
      },
      // Open Graph meta tags
      {
        property: "og:title",
        content: title || metaData?.title!,
      },
      {
        property: "og:description",
        content: description ?? metaData?.description!,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: `${metaData?.canonical!}${pathname.replace("/", "")}`,
      },
      {
        property: "og:image",
        content: imagePath,
      },
      // Twitter meta tags
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: title || metaData?.title!,
      },
      {
        name: "twitter:description",
        content: description ?? metaData?.description!,
      },
      {
        name: "twitter:image",
        content: imagePath,
      },
    ].filter(
      (tag) =>
        !customMetaTagNames.has(tag.name) &&
        !customMetaTagNames.has(tag.property)
    );

    // Only include default link tags that don't conflict with custom ones
    const defaultLinkTags = [
      {
        rel: "canonical",
        href: `${metaData?.canonical!}${pathname.replace("/", "")}`,
      },
      {
        rel: "icon",
        href: `${metaData?.canonical!}favicon.ico`,
      },
    ].filter((tag) => !customLinkTagRels.has(tag.rel));

    const pageTitle = title || metaData?.title!;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const helmet = useHelmet({
      metaTags: [...defaultMetaTags, ...(metaTags || [])],
      linkTags: [...defaultLinkTags, ...(linkTags || [])],
      structuredData,
      title: pageTitle,
    });

    setHelmetComponent(helmet);
  }, [
    description,
    metaTags,
    linkTags,
    structuredData,
    metaData,
    title,
    location,
    image,
    pathname,
  ]);

  // useEffect(() => {
  //   const pageTitle = title || metaData?.title!;
  //   const googleAnalyticsId = appConfig.GA_trackingId;

  //   if (googleAnalyticsId) {
  //     ReactGA.send({
  //       hitType: "pageview",
  //       page: pathname,
  //       title: pageTitle,
  //     });
  //   }
  // }, [location, title, metaData?.title, pathname]);

  // const { authenticatedUser } = useAuth();
  // if (
  //   isProtectedRoute &&
  //   authenticatedUser === null &&
  //   authenticatedUser !== undefined
  // ) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <>
      {helmetComponent}
      <main
        data-component-name="PageWrapper"
        className={classNames("flex shrink-0 grow flex-col", className)}
      >
        {children}
      </main>
    </>
  );
};

export default PageWrapper;
