import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { WorkExperienceEntries } from "./WorkExperienceEntries";

export const WorkExperience = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Work Experience" />
      <WorkExperienceEntries />
    </section>
  );
};
