import { clsx } from "clsx";
import { ButtonProps } from "./Button";
import classes from "./Button.module.css";

type ChipProps = {} & ButtonProps;

export const Chip = ({ className, color = "primary", ...props }: ChipProps) => {
  return <button {...props} className={clsx([classes.chip, classes[color], className])} />;
};
