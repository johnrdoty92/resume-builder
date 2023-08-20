import { useResumeState } from "contexts/hooks";
import classes from "./Skills.module.css";
import { EditButton } from "components/Button/EditButton";

export const SkillsList = () => {
  const { data } = useResumeState().Skills;
  return (
    <>
      <div className={classes.skillsList}>
        {data.map((skill, i) => {
          return <p key={`${skill}-${i}`}>{skill}</p>;
        })}
      </div>
      {/* TODO: add button to open modal for skills */}
    </>
  );
};
