// src/types/tracking.d.ts
declare module "tiktok-pixel" {
  interface TikTokPixel {
    init(pixelId: string, options?: any): void;
    pageView(): void;
    track(event: string, data?: Record<string, any>): void;
  }
  const TikTokPixel: TikTokPixel;
  export default TikTokPixel;
}

declare module "react-facebook-pixel" {
  interface ReactFacebookPixel {
    init(pixelId: string, options?: any): void;
    pageView(): void;
    track(event: string, data?: Record<string, any>): void;
  }
  const ReactFacebookPixel: ReactFacebookPixel;
  export default ReactFacebookPixel;
}

declare module "react-gtm-module" {
  export function initialize(args: { gtmId: string; dataLayer?: object }): void;
  export function dataLayer(args: { dataLayer: object }): void;
}
