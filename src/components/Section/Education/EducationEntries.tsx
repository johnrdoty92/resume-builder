import { EditButton } from "components/Button/EditButton";
import { useResumeState } from "contexts/hooks";
import { getShortDate } from "utils/stringUtils";
import classes from "./Education.module.css";

export const EducationEntries = () => {
  const { data } = useResumeState().Education;
  return (
    <>
      {data.map((education, i) => {
        const { dateOfCompletion, degreeOrCertificate, institution, description, gpa, location } =
          education;
        return (
          <div className={classes.education} key={`institution-${i}`}>
            <div className={classes.header}>
              <p className={classes.degreeOrCertificate}>{degreeOrCertificate}</p>
              <p>&nbsp;{"| " + institution}</p>
              {location && <p>&nbsp;{"| " + location}</p>}
              <p>&nbsp;{"| " + gpa}</p>
              <p className={classes.date}>{getShortDate(dateOfCompletion)}</p>
            </div>
            <p>{description}</p>
            <EditButton index={i} section="Education" />
          </div>
        );
      })}
    </>
  );
};
