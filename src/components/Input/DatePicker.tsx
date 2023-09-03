import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import classes from "./Input.module.css";
type DatePickerProps = {
  label?: React.ReactNode;
} & ReactDatePickerProps;

export const DatePicker = ({ label, ...props }: DatePickerProps) => {
  return label ? (
    <label className={classes.label}>
      {label}
      <ReactDatePicker wrapperClassName={classes.dateInput} {...props} />
    </label>
  ) : (
    <ReactDatePicker wrapperClassName={classes.dateInput} {...props} />
  );
};
