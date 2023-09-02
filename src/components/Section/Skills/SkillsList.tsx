import { EditButton } from "components/Button/EditButton";
import { useResumeState } from "contexts/hooks";
import classes from "./Skills.module.css";

export const SkillsList = () => {
  const { data } = useResumeState().Skills;
  return (
    <div className={classes.skillsListContainer}>
      <div className={classes.skillsList}>
        {data.map((skill, i) => {
          return <p key={`${skill}-${i}`}>{skill}</p>;
        })}
      </div>
      <EditButton section="Skills" />
    </div>
  );
};
