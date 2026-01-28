import { FC, ReactNode } from "react";
import classNames from "classnames";
import { TColors } from "../../types/colors.type";
import { TColorIntensity } from "../../types/colorIntensities.type";
import appConfig from "../../config/app.config";
import useColorIntensity from "../../hooks/useColorIntensity";
import { TBorderWidth } from "../../types/borderWidth.type";
import { TRounded } from "../../types/rounded.type";
import useDarkMode from "../../hooks/useDarkMode";

export type TBadgeVariants = "solid" | "outline" | "default";

interface IBadgeProps {
  borderWidth?: TBorderWidth;
  children: ReactNode;
  className?: string;
  color?: TColors;
  colorIntensity?: TColorIntensity;
  rounded?: TRounded;
  variant?: TBadgeVariants;
}
const Badge: FC<IBadgeProps> = (props) => {
  const {
    borderWidth = appConfig.borderWidth,
    children,
    className,
    color = "secondary",
    colorIntensity = "500",
    rounded = appConfig.rounded,
    variant = "default",
    ...rest
  } = props;

  const { isDarkTheme } = useDarkMode();

  const { textColor } = useColorIntensity(colorIntensity);

  const badgeVariant: { [key in TBadgeVariants]: string } = {
    solid: classNames(
      [`${textColor}`],
      [`bg-${color}-${colorIntensity}`],
      "border-transparent",
    ),
    outline: classNames(
      [`border-${color}-500`],
      [`bg-${color}-500/10`],
      [`text-${color}-${isDarkTheme ? "500" : "900"}`],
    ),
    default: classNames(
      [`text-${color}-${colorIntensity}`],
      "border-transparent",
    ),
  };
  const badgeVariantClasses = badgeVariant[variant];

  const classes = classNames(
    "inline-flex items-center justify-center",
    "px-2",
    [`${borderWidth}`],
    [`${rounded}`],
    badgeVariantClasses,
    className,
  );

  return (
    <span data-component-name="Badge" className={classes} {...rest}>
      {children}
    </span>
  );
};
Badge.displayName = "Badge";

export default Badge;
