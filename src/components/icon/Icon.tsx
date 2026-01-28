import React, { forwardRef, HTMLAttributes, memo, ReactNode } from "react";
import classNames from "classnames";
import pascalcase from "pascalcase";
import * as SvgIcon from "./svg-icons";
import * as DuoToneIcon from "./duotone";
import * as HeroIcon from "./heroicons";
import { TIcons } from "../../types/icons.type";
import { TColors } from "../../types/colors.type";
import { TColorIntensity } from "../../types/colorIntensities.type";
import { textColor } from "../../utils/textColor.util";
import { TFontSizes } from "../../types/fontSizes.type";
import { IconContext } from "react-icons"; // Import the IconContext from react-icons
import * as FaIcons from "react-icons/fa6"; // Example icon from Font Awesome
import appConfig from "../../config/app.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IRefWrapperProps extends Record<string, any> {
  children: ReactNode;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RefWrapper = forwardRef<HTMLSpanElement, IRefWrapperProps>(
  ({ children }, ref) => {
    if (ref) {
      return (
        <span ref={ref} data-only-ref="true">
          {children}
        </span>
      );
    }
    return children;
  }
);
RefWrapper.displayName = "RefWrapper";

export interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: TIcons;
  className?: string;
  color?: TColors;
  colorIntensity?: TColorIntensity;
  size?: TFontSizes;
}
const Icon = forwardRef<HTMLSpanElement, IIconProps>((props, ref) => {
  const { icon, className, color, colorIntensity, size, ...rest } = props;
  const IconName = pascalcase(icon);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const SvgIconWrapper = SvgIcon[IconName];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const DuoToneWrapper = DuoToneIcon[IconName];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const HeroWrapper = HeroIcon[IconName];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ReactIconWrapper = FaIcons[IconName]; // Example: You should map your icon name to react-icons here

  const CLASS_NAMES = classNames(
    "svg-icon",
    { [`${size as TFontSizes}`]: typeof size !== "undefined" },
    textColor(color, colorIntensity),
    appConfig.transition,
    className
  );

  if (typeof SvgIconWrapper === "function") {
    return (
      <RefWrapper ref={ref}>
        <SvgIconWrapper
          data-component-name="Icon-A"
          data-name={`SvgIcon--${IconName}`}
          className={CLASS_NAMES}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </RefWrapper>
    );
  }
  if (typeof DuoToneWrapper === "function") {
    return (
      <RefWrapper ref={ref}>
        <DuoToneWrapper
          data-component-name="Icon-B"
          data-name={`Duotone--${icon}`}
          className={CLASS_NAMES}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </RefWrapper>
    );
  }
  if (typeof HeroWrapper === "function") {
    return (
      <RefWrapper ref={ref}>
        <HeroWrapper
          data-component-name="Icon-C"
          data-name={`Hero--${icon}`}
          className={CLASS_NAMES}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </RefWrapper>
    );
  }
  // Add support for react-icons
  if (typeof ReactIconWrapper === "function") {
    return (
      <RefWrapper ref={ref}>
        <IconContext.Provider value={{ className: CLASS_NAMES }}>
          <ReactIconWrapper
            data-component-name="Icon-D"
            data-name={`ReactIcon--${icon}`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        </IconContext.Provider>
      </RefWrapper>
    );
  }
  return null;
});
Icon.displayName = "Icon";

export default memo(Icon);
