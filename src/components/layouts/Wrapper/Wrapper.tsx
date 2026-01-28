import { FC, ReactNode } from "react";
import classNames from "classnames";
import appConfig from "../../../config/app.config";

interface IWrapperProps {
  children: ReactNode;
  className?: string;
}
const Wrapper: FC<IWrapperProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <section
      data-component-name="Wrapper"
      className={classNames(
        "flex flex-auto flex-col",
        appConfig.transition,
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Wrapper;
