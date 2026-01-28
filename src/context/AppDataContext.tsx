import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// import soldOutAsset from "../assets/misc/sold_out.webp";
import appConfig from "../config/app.config";
export interface IAppData {
  metaData: {
    title: string | null;
    keywords: string | null;
    canonical: string | null;
    page_title: string | null;
    description: string | null;
    tiktok_pixel: string | null;
    category_title: string | null;
    facebook_pixel: string | null;
    page_description: string | null;
    google_tag_manager: string | null;
    category_description: string | null;
  } | null;

  listData:
    | {
        id: number;
        title: string;
        category: string;
        imageUrl: string;
        link: string;
        images?: string[];
      }[]
    | null;

  galleryData:
    | {
        id: number;
        title: string;
        category: string;
        imageUrl: string;
      }[]
    | null;

  studioData: {
    sections: {
      id: number;
      title: string;
      content: string;
      people?: {
        id: string;
        name: string;
        imageUrl: string;
      }[];
    }[];
    featured: {
      id: number;
      title: string;
      count: string;
      links: {
        title: string;
        url: string;
      }[];
    }[];
  } | null;

  heroData: {
    title: string;
    hashtag: string[];
    description_1: string;
    description_2: string;
    story: string;
  } | null;

  faqData:
    | {
        question: string;
        answer: string;
      }[]
    | null;

  productsData:
    | {
        id: number;
        name: string;
        info: string | null;
        price: number;
        category: string[];
        image: string;
        marketplace: {
          gofood: {
            url: string | null;
            rating: number | null;
          };
          grabfood: {
            url: string | null;
            rating: number | null;
          };
          shopeefood: {
            url: string | null;
            rating: number | null;
          };
        };
      }[]
    | null;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Initialize the context with an empty object
const AppDataContext = createContext<IAppData>({} as IAppData);

// Create a provider component
export const AppDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [metaData, setMetaData] = useState<IAppData["metaData"] | null>(null);
  const [listData, setlistData] = useState<IAppData["listData"] | null>(null);
  const [galleryData, setGalleryData] = useState<
    IAppData["galleryData"] | null
  >(null);
  const [studioData, setStudioData] = useState<IAppData["studioData"] | null>(
    null,
  );
  const [heroData, setHeroData] = useState<IAppData["heroData"] | null>(null);
  const [faqData, setFaqData] = useState<IAppData["faqData"] | null>(null);
  const [productsData, setProductsData] = useState<
    IAppData["productsData"] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const loadData = async () => {
      if (!appConfig.json_file) {
        setHasFetched(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const timeVersion = Math.floor(Date.now() / 600000);
        const response = await fetch(
          `/data/${appConfig.json_file}?v=${timeVersion}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`);
        }

        const data = await response.json();
        if (!isMounted) return;

        setMetaData(data.meta ?? null);
        setlistData(data.list ?? null);
        setGalleryData(data.gallery ?? null);
        setStudioData(data.studio ?? null);
        setHeroData(data.hero ?? null);
        setFaqData(data.faq ?? null);
        setProductsData(data.product ?? null);
        setHasFetched(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error loading the data:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [hasFetched]);

  return (
    <AppDataContext.Provider
      value={{
        loading,
        setLoading,
        metaData,
        listData,
        galleryData,
        studioData,
        heroData,
        faqData,
        productsData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = () => {
  return useContext(AppDataContext);
};
