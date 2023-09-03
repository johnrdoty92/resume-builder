import { clsx } from "clsx";
import { ComponentProps } from "react";
import classes from "./Button.module.css";

export const Button = ({ className, ...props }: ComponentProps<"button">) => {
  return <button {...props} className={clsx([classes.button, className])} />;
};
