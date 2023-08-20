import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { EducationEntries } from "./EducationEntries";

export const Education = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Education" />
      <EducationEntries />
    </section>
  );
};
