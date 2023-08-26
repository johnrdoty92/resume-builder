import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { ProjectEntries } from "./ProjectEntries";
import { AddDataEntryButton } from "components/Button/AddDataEntryButton";

export const Projects = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Projects" />
      <ProjectEntries />
      <AddDataEntryButton section="Projects">Add</AddDataEntryButton>
    </section>
  );
};
