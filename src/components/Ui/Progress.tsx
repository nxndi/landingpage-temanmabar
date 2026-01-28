import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { TColors } from "../../types/colors.type";
import { TColorIntensity } from "../../types/colorIntensities.type";
import { TRounded } from "../../types/rounded.type";

interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  color?: TColors;
  colorIntensity?: TColorIntensity;
  rounded?: TRounded;
  isAnimation?: boolean;
}
const Progress: FC<IProgressProps> = (props) => {
  const {
    value,
    className,
    min = 0,
    max = 100,
    rounded = "rounded-lg",
    color = "primary",
    colorIntensity = "500",
    isAnimation = false,
    ...rest
  } = props;

  const calculatedValue =
    typeof value !== "undefined" &&
    typeof min !== "undefined" &&
    typeof max !== "undefined"
      ? (100 * (value - min)) / (max - min)
      : "";

  return (
    <div
      data-component-name="Progress"
      className={classNames(
        "flex",
        "h-5 w-full",
        "bg-primary-500",
        "overflow-hidden",

        rounded,
        className,
      )}
      {...rest}
    >
      <div
        className={classNames(
          "h-full",
          [`bg-${color}-${colorIntensity}`],
          { "animate-pulse": isAnimation },
          rounded,
          "transition-all duration-500 ease-in-out",
        )}
        style={{ width: `${calculatedValue}%` }}
      />
    </div>
  );
};
Progress.displayName = "Progress";

export default Progress;
