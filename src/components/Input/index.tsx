import clsx from "clsx";
import { ComponentProps } from "react";
import classes from "./Input.module.css";

type InputProps = {
  label?: React.ReactNode;
} & ComponentProps<"input">;

export const Input = ({ label, className, ...props }: InputProps) => {
  return label ? (
    <label className={classes.label}>
      {label}
      <input {...props} className={clsx([className, classes.input])} />
    </label>
  ) : (
    <input {...props} className={clsx([className, classes.input])} />
  );
};
