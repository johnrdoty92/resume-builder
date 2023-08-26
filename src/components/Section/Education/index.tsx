import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { EducationEntries } from "./EducationEntries";
import { AddDataEntryButton } from "components/Button/AddDataEntryButton";

export const Education = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Education" />
      <EducationEntries />
      <AddDataEntryButton section="Education">Add</AddDataEntryButton>
    </section>
  );
};
