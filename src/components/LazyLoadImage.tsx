import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import appConfig from "../config/app.config";

interface LazyLoadImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
  showDebug?: boolean;
  debugId?: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({
  src,
  alt = "",
  placeholder,
  className = "",
  height,
  width,
  loading = "lazy",
  decoding = "async",
  showDebug = false,
  debugId = "",
  ...rest
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const id = debugId || src?.substring(0, 20) + "...";

  // Default placeholder as a data URI for a very small gray image if none provided
  const defaultPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23cccccc'/%3E%3C/svg%3E";
  const placeholderSrc = placeholder || defaultPlaceholder;

  // Set up intersection observer
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      if (showDebug)
        console.log(
          `[LazyLoad:${id}] IntersectionObserver not supported, loading immediately`
        );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (showDebug)
            console.log(`[LazyLoad:${id}] Image entered viewport, loading now`);
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
      if (showDebug)
        console.log(
          `[LazyLoad:${id}] Observer attached, waiting for image to enter viewport`
        );
    }

    return () => {
      if (currentImgRef) {
        observer.disconnect();
        if (showDebug) console.log(`[LazyLoad:${id}] Observer disconnected`);
      }
    };
  }, [id, showDebug]);

  // Reset states when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
    if (showDebug) console.log(`[LazyLoad:${id}] Source changed, reset states`);
  }, [src, id, showDebug]);

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (showDebug) console.log(`[LazyLoad:${id}] Image loaded successfully`);
  };

  // Handle image error event
  const handleImageError = () => {
    setHasError(true);
    console.warn(`[LazyLoad:${id}] Failed to load image: ${src}`);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        ref={imgRef}
        src={hasError ? placeholderSrc : isInView ? src : placeholderSrc}
        alt={alt}
        className={classNames(
          "opacity-100 w-auto h-auto max-w-[95%] max-h-[95%] object-contain",
          {
            "opacity-50": !isLoaded && !hasError,
          },
          className,
          appConfig.transition.replace("300", "500")
        )}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        onLoad={isInView ? handleImageLoad : undefined}
        onError={handleImageError}
        {...rest}
      />
      {hasError && alt && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-xs text-center p-2">
          {alt}
        </div>
      )}

      {/* Debug indicator */}
      {showDebug && (
        <div className="absolute top-0 right-0 p-1 text-xs font-mono">
          <div
            className={`px-2 py-1 rounded ${
              isInView ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isInView ? "In View" : "Not In View"}
          </div>
          <div
            className={`mt-1 px-2 py-1 rounded ${
              isLoaded ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {isLoaded ? "Loaded" : "Loading"}
          </div>
          <div
            className={`mt-1 px-2 py-1 rounded ${
              hasError ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {hasError ? "Error" : "OK"}
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyLoadImage;
