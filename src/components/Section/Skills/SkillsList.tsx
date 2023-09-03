import { EditButton } from "components/Button/EditButton";
import { useResumeState } from "contexts/hooks";
import classes from "./Skills.module.css";

export const SkillsList = () => {
  const { data } = useResumeState().Skills;
  return (
    <div className={classes.skillsListContainer}>
      <p className={classes.skillsList}>
        {data.map((skill, i, arr) => {
          const delimiter = i === arr.length - 1 ? "" : ",";
          return <span key={`${skill}-${i}`}>{skill + delimiter}</span>;
        })}
      </p>
      <EditButton section="Skills" />
    </div>
  );
};
