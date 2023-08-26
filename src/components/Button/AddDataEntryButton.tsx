import { useEditorModalDispatch, useResumeDispatch, useResumeState } from "contexts/hooks";
import { Button } from "./Button";
import { BLANK_SECTIONS } from "constants/defaults";
import { ResumeSection, SectionDataEntry } from "types/resumeState";
import { ComponentProps } from "react";
import classes from "./Button.module.css";

type AddDataEntryButtonProps = {
  section: ResumeSection;
} & ComponentProps<typeof Button>;

export const AddDataEntryButton = ({ section, ...buttonProps }: AddDataEntryButtonProps) => {
  const resumeState = useResumeState();
  const { addDataEntry } = useResumeDispatch();
  const { openWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    const dataEntry = {
      data: BLANK_SECTIONS[section],
      section,
    } as SectionDataEntry;
    addDataEntry(dataEntry);
    openWithContent({ ...dataEntry, index: resumeState[section].data.length });
  };

  return <Button {...buttonProps} className={classes.addDataEntryButton} onClick={handleClick} />;
};
