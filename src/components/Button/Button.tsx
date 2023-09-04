import { clsx } from "clsx";
import { ComponentProps } from "react";
import classes from "./Button.module.css";

export type ButtonProps = {
  color?: "primary" | "secondary" | "error";
} & ComponentProps<"button">;

export const Button = ({ className, color = "primary", ...props }: ButtonProps) => {
  return <button {...props} className={clsx([classes.button, classes[color], className])} />;
};
