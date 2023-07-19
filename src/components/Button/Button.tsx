import { ComponentProps } from "react";
import classes from "./Button.module.css";

export const Button = (props: ComponentProps<"button">) => {
  return <button {...props} className={classes.button} />;
};
