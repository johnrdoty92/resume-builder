import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { WorkExperienceEntries } from "./WorkExperienceEntries";
import { AddDataEntryButton } from "components/Button/AddDataEntryButton";

export const WorkExperience = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Work Experience" />
      <WorkExperienceEntries />
      <AddDataEntryButton section="Work Experience">Add</AddDataEntryButton>
    </section>
  );
};
