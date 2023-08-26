import { ComponentProps } from "react";
import { Button } from "./Button";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
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
  const { setOpen } = useEditorModalDispatch();

  const handleClick = () => {
    removeDataEntry({ section, index });
    setOpen(false);
  };

  return (
    <Button {...buttonProps} className={classes.removeDataEntryButton} onClick={handleClick} />
  );
};
