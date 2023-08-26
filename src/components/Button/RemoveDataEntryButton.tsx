import { ComponentProps } from "react";
import { Button } from "./Button";
import { useResumeDispatch } from "contexts/hooks";
import { ResumeSection } from "types/resumeState";
import classes from "./Button.module.css";

type RemoveDataEntryButtonProps = {
  section: ResumeSection;
  index: number;
} & ComponentProps<typeof Button>;

export const RemoveDataEntryButton = ({
  index,
  section,
  ...buttonProps
}: RemoveDataEntryButtonProps) => {
  const { removeDataEntry } = useResumeDispatch();

  const handleClick = () => {
    removeDataEntry({ section, index });
  };

  return (
    <Button {...buttonProps} className={classes.removeDataEntryButton} onClick={handleClick} />
  );
};
