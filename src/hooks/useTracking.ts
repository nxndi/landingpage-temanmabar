// src/hooks/useTracking.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import TagManager from "react-gtm-module";
import TikTokPixel from "tiktok-pixel"; // Keep your original import
import ReactGA from "react-ga4"; // Add this import

export const useTracking = (options: {
  tiktokPixelId?: string | null;
  facebookPixelId?: string | null;
  googleTagManagerId?: string | null;
  googleAnalyticsId?: string | null; // Add this parameter
}) => {
  const {
    tiktokPixelId,
    facebookPixelId,
    googleTagManagerId,
    googleAnalyticsId,
  } = options;
  const location = useLocation();

  useEffect(() => {
    // Initialize trackers
    if (tiktokPixelId) {
      TikTokPixel.init(tiktokPixelId);
    }
    if (facebookPixelId) {
      ReactPixel.init(facebookPixelId, { autoConfig: true });
    }
    // if (googleTagManagerId) {
    //   TagManager.initialize({ gtmId: googleTagManagerId });
    // }
    if (googleAnalyticsId) {
      ReactGA.initialize(googleAnalyticsId, {
        gtagUrl: "https://www.googletagmanager.com/gtag/js",
      }); // Initialize GA4
    }
  }, [tiktokPixelId, facebookPixelId, googleTagManagerId, googleAnalyticsId]);

  useEffect(() => {
    // Track page views
    if (tiktokPixelId) TikTokPixel.pageView();
    if (facebookPixelId) ReactPixel.pageView();
    if (googleTagManagerId) {
      TagManager.dataLayer({
        dataLayer: { event: "pageview", page: location.pathname },
      });
    }
    // Remove GA4 page view tracking from here since it's now handled in PageWrapper
    // This prevents duplicate page view events
    // if (googleAnalyticsId) {
    //   ReactGA.send({
    //     hitType: "pageview",
    //     page: location.pathname,
    //   });
    //   console.log({
    //     hitType: "pageview",
    //     page: location.pathname,
    //     title: document.title,
    //   });
    // }
  }, [
    location,
    tiktokPixelId,
    facebookPixelId,
    googleTagManagerId,
    googleAnalyticsId,
  ]);

  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (tiktokPixelId) TikTokPixel.track(eventName, eventData);
    if (facebookPixelId) ReactPixel.track(eventName, eventData);
    if (googleTagManagerId) {
      TagManager.dataLayer({ dataLayer: { event: eventName, ...eventData } });
    }
    if (googleAnalyticsId) {
      ReactGA.event({
        // Track GA4 events
        category: eventData?.category || "User Interaction",
        action: eventName,
        label: eventData?.label,
        value: eventData?.value,
        ...eventData,
      });
    }
  };

  return { trackEvent };
};
