import * as React from "react";
import type { SVGProps } from "react";

const SvgCustomIndonesia = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    
    className="svg-icon"
    viewBox="0 0 36 36"
    {...props}
  >
    {/* Top Red Stripe */}
    <rect width="36" height="18" fill="#FF0000" rx="2" ry="2" />
    {/* Bottom White Stripe */}
    <rect y="18" width="36" height="18" fill="#FFFFFF" rx="2" ry="2" />
  </svg>
);

export default SvgCustomIndonesia;