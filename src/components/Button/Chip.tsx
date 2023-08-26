import { ComponentProps } from "react";
import { clsx } from "clsx";
import classes from "./Button.module.css";

type ChipProps = {} & ComponentProps<"button">;

export const Chip = ({ className, ...props }: ChipProps) => {
  return <button {...props} className={clsx([classes.chip, className])} />;
};
