import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { ProjectEntries } from "./ProjectEntries";

export const Projects = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Projects" />
      <ProjectEntries />
    </section>
  );
};
