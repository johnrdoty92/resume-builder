import { SectionTitle } from "components/SectionTitle";
import classes from "../Section.module.css";
import { SkillsList } from "./SkillsList";

export const Skills = () => {
  return (
    <section className={classes.resumeSection}>
      <SectionTitle title="Skills" />
      <SkillsList />
    </section>
  );
};
