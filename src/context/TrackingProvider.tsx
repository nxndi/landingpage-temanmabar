// src/context/TrackingProvider.tsx
import { createContext } from "react";
import { useTracking } from "../hooks/useTracking";

interface TrackingContextType {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
}

interface TrackingProviderProps {
  children: React.ReactNode;
  tiktokPixelId?: string | null;
  facebookPixelId?: string | null;
  googleTagManagerId?: string | null;
  googleAnalyticsId?: string | null; // Add this line
}

const TrackingContext = createContext<TrackingContextType | undefined>(
  undefined
);

export const TrackingProvider: React.FC<TrackingProviderProps> = ({
  children,
  tiktokPixelId,
  facebookPixelId,
  googleTagManagerId,
  googleAnalyticsId, // Add this line
}) => {
  const { trackEvent } = useTracking({
    tiktokPixelId,
    facebookPixelId,
    googleTagManagerId,
    googleAnalyticsId, // Add this line
  });

  return (
    <TrackingContext.Provider value={{ trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};
