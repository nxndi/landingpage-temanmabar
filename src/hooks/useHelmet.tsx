// src/hooks/useHelmet.tsx
import { Helmet, HelmetProvider } from "react-helmet-async";

export interface MetaProps {
  name?: string;
  content: string;
  property?: string;
}

export interface LinkProps {
  rel: string;
  href: string;
  as?: string;
}

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any; // Allows for any other properties
}

interface UseHelmetProps {
  metaTags?: MetaProps[];
  linkTags?: LinkProps[];
  structuredData?: StructuredData;
  title: string;
}

const useHelmet = (props: UseHelmetProps) => {
  const { metaTags = [], linkTags = [], structuredData, title = "" } = props;

  const helmetComponent = (
    <HelmetProvider>
      <Helmet title={title}>
        {metaTags.map((meta, index) => (
          <meta key={`meta-${index}`} {...meta} />
        ))}
        {linkTags.map((link, index) => (
          <link key={`link-${index}`} {...link} />
        ))}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
        <meta name="format-detection" content="telephone=no" />
      </Helmet>
    </HelmetProvider>
  );

  return helmetComponent;
};

export default useHelmet;
