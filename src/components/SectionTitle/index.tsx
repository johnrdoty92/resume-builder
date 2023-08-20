import { useResumeDispatch, useResumeState } from "contexts/hooks";
import { ResumeSection } from "types/resumeState";
import classes from "./SectionTitle.module.css";

export const SectionTitle = ({ title }: { title: ResumeSection }) => {
  const resumeState = useResumeState();
  const { updateSectionTitle } = useResumeDispatch();
  return (
    <h2 className={classes.sectionTitle}>
      <input
        defaultValue={resumeState[title].heading}
        onChange={(e) => updateSectionTitle({ section: title, value: e.target.value })}
      />
    </h2>
  );
};
