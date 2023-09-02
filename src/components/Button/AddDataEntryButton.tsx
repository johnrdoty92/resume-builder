import { BLANK_SECTIONS } from "constants/defaults";
import { useEditorModalDispatch, useResumeDispatch, useResumeState } from "contexts/hooks";
import { ComponentProps } from "react";
import { ResumeSection, SectionDataEntry } from "types/resumeState";
import { Button } from "./Button";
import classes from "./Button.module.css";

type AddDataEntryButtonProps = {
  section: ResumeSection;
} & ComponentProps<typeof Button>;

export const AddDataEntryButton = ({ section, ...buttonProps }: AddDataEntryButtonProps) => {
  const resumeState = useResumeState();
  const { addDataEntry } = useResumeDispatch();
  const { openSection } = useEditorModalDispatch();

  const handleClick = () => {
    const dataEntry = {
      data: BLANK_SECTIONS[section],
      section,
    } as SectionDataEntry;
    addDataEntry(dataEntry);
    openSection({ section, index: resumeState[section].data.length });
  };

  return <Button {...buttonProps} className={classes.addDataEntryButton} onClick={handleClick} />;
};
