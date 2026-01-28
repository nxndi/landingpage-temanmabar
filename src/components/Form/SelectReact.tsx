import React, { FC } from "react";
import ReactSelect, {
  ClassNamesConfig,
  ControlProps,
  GroupBase,
  MultiValueProps,
  MultiValueRemoveProps,
  OptionProps,
} from "react-select";
import { PublicBaseSelectProps } from "react-select/base";
import classNames from "classnames";
import CreatableSelect from "react-select/creatable";
import { TBorderWidth } from "../../types/borderWidth.type";
import appConfig from "../../config/app.config";
import { TRounded } from "../../types/rounded.type";
import { TColors } from "../../types/colors.type";
import { TColorIntensity } from "../../types/colorIntensities.type";
import useColorIntensity from "../../hooks/useColorIntensity";
import useRoundedSize from "../../hooks/useRoundedSize";
import { IValidationBaseProps } from "./Validation";

export type TSelectVariant = "solid";
export type TSelectDimension = "sm" | "default" | "lg" | "xl";

export type TSelectOption =
  | {
      value: any;
      label: string;
      isFixed?: boolean;
      isDisabled?: boolean;
    }
  | undefined;
export type TSelectOptions = TSelectOption[];
export type TSelectGroups = GroupBase<TSelectOption>[];

type TReactSelect = Partial<
  PublicBaseSelectProps<TSelectOption, boolean, GroupBase<TSelectOption>>
>;

interface OptionPropsExtend extends Partial<OptionProps> {
  data: { isDisabled: boolean };
}
interface MultiValuePropsExtends extends Partial<MultiValueProps> {
  data: { isFixed: boolean };
}
interface MultiValueRemovePropsExtend extends Partial<MultiValueRemoveProps> {
  data: { isFixed: boolean; isDisabled: boolean };
}

const components = {
  DropdownIndicator: null,
};

interface ISelectReactProps
  extends TReactSelect,
    Partial<IValidationBaseProps> {
  borderWidth?: TBorderWidth;
  className?: string;
  color?: TColors;
  colorIntensity?: TColorIntensity;
  name: string;
  rounded?: TRounded;
  dimension?: TSelectDimension;
  variant?: TSelectVariant;
  disabled?: boolean;
  isCreatable?: boolean;
}
const SelectReact: FC<ISelectReactProps> = (props) => {
  const {
    borderWidth = appConfig.borderWidth,
    className,
    color = "primary",
    colorIntensity = "500",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValidMessage,
    name,
    rounded = appConfig.rounded,
    dimension = "default",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validFeedback,
    variant = "solid",
    isValid,
    isTouched,
    invalidFeedback,
    disabled = false,
    isCreatable = false,
    ...rest
  } = props;

  const { textColor } = useColorIntensity(colorIntensity);

  const selectVariant: {
    [key in TSelectVariant]: {
      control: string;
      controlFocus: string;
      validation: string;
      validationFocus: string;
    };
  } = {
    solid: {
      control: classNames(
        // Default
        [`${borderWidth} border-primary-500 dark:border-primary-500`],
        "bg-secondary-500 dark:bg-secondary-700",
        "w-full",
        "text-text-100 dark:text-text-100",
        appConfig.transition,
        [`${rounded}`],
        { "!border-zinc-500 !opacity-25": disabled },
        // Hover
        [`hover:border-${color}-${colorIntensity}`],
        [`dark:hover:border-${color}-${colorIntensity}`]
      ),
      controlFocus: classNames(
        {
          "!border-zinc-300 dark:!border-zinc-800": isValid,
        },
        "!bg-transparent dark:!bg-transparent"
      ),
      validation: classNames({
        "!border-red-500 ring-4 ring-red-500/30":
          !isValid && isTouched && invalidFeedback,
        "!border-green-500": !isValid && isTouched && !invalidFeedback,
      }),
      validationFocus: classNames({
        "!ring-4 !ring-green-500/30": !isValid && isTouched && !invalidFeedback,
      }),
    },
  };
  const selectControlVariantClasses =
    selectVariant[variant as TSelectVariant].control;
  const selectControlFocusVariantClasses =
    selectVariant[variant as TSelectVariant].controlFocus;
  const selectControlValidationsClasses =
    selectVariant[variant as TSelectVariant].validation;
  const selectControlValidationFocusClasses =
    selectVariant[variant as TSelectVariant].validationFocus;

  const selectDimensions: { [key in TSelectDimension]: { control: string } } = {
    sm: { control: classNames("!min-h-[2rem] text-sm") },
    default: { control: classNames("!min-h-[2.5rem]") },
    lg: { control: classNames("!min-h-[3rem] text-lg") },
    xl: { control: classNames("!min-h-[3.25rem] text-xl") },
  };
  const selectDimensionClasses = selectDimensions[dimension].control;

  const { roundedCustom } = useRoundedSize(rounded);

  const reactSelectProps = {
    inputId: rest.id || name,
    "data-component-name": "Select",
    unstyled: true,
    classNames: {
      control: (state: ControlProps): string =>
        classNames(
          "py-0.5 px-1.5",
          selectControlVariantClasses,
          {
            [`${selectControlFocusVariantClasses}`]: state.isFocused,
          },
          selectControlValidationsClasses,
          {
            [`${selectControlValidationFocusClasses}`]: state.isFocused,
          },
          selectDimensionClasses,
          appConfig.transition,
          className
        ),
      option: (state: OptionPropsExtend): string =>
        classNames("px-1.5 py-1", appConfig.transition, {
          [`bg-${color}-${colorIntensity} text-white`]:
            state.isFocused || state.isSelected,
          [`${textColor}`]: state.isFocused,
          "opacity-50": state?.data?.isDisabled,
        }),
      menu: () =>
        classNames(
          "bg-accent-600 dark:bg-accent-700 text-text-100 dark:text-text-100 overflow-hidden shadow-lg",
          [`${rounded}`]
        ),
      group: () =>
        classNames("border-zinc-500/25", "[&:not(:last-child)]:border-b"),
      groupHeading: () =>
        classNames("font-semibold", "px-1.5", "pt-1.5", "pb-0.5"),
      placeholder: () =>
        classNames("text-text-100/50", "dark:text-text-100/50"),
      indicatorSeparator: () => classNames("rounded", "!bg-transparent"),
      multiValue: (state: MultiValuePropsExtends): string =>
        classNames(
          `bg-${color}-${colorIntensity}`,
          "m-0.5",
          "ltr:pl-1 rtl:pr-1",
          [`${textColor}`],
          [`${roundedCustom(-2)}`],
          {
            "ltr:pr-1 rtl:pl-1": state?.data?.isFixed,
          }
        ),
      multiValueRemove: (state: MultiValueRemovePropsExtend): string =>
        classNames(
          "hover:bg-red-500 ml-1",
          [`${roundedCustom(-2)}`],
          appConfig.transition,
          {
            "!hidden": state?.data?.isFixed,
            "opacity-50 pointer-events-none": state?.data?.isDisabled,
          }
        ),
    } as ClassNamesConfig<TSelectOption, boolean, GroupBase<TSelectOption>>,
    isDisabled: disabled || rest?.isDisabled,
    ...rest,
  };

  if (isCreatable)
    return (
      <CreatableSelect
        components={components}
        {...reactSelectProps}
        menuPlacement="auto"
      />
    );
  return <ReactSelect {...reactSelectProps} />;
};
SelectReact.displayName = "Select";

export default SelectReact;
