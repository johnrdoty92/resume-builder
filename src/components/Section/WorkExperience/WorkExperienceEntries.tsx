import { EditButton } from "components/Button/EditButton";
import classes from "./WorkExperience.module.css";
import { useResumeState } from "contexts/hooks";
import { getShortDate } from "utils/stringUtils";

export const WorkExperienceEntries = () => {
  const { data } = useResumeState()["Work Experience"];
  return (
    <>
      {data.map((experience, i) => {
        const { company, dates, jobTitle, responsibilities, location } = experience;
        const { start, end } = dates;
        return (
          <div className={classes.workExperience} key={`workExperience-${i}`}>
            <div className={classes.header}>
              <p className={classes.jobTitle}>{jobTitle}</p>
              <p>&nbsp;{"| " + company}</p>
              {location && <p>&nbsp;{"| " + location}</p>}
              <p className={classes.dates}>{`${getShortDate(start)} - ${
                end ? getShortDate(end) : "Present"
              }`}</p>
            </div>
            <ul className={classes.responsibilities}>
              {responsibilities.map((r, i) => {
                return <li key={`${r}${i}`}>{r}</li>;
              })}
            </ul>
            <EditButton index={i} sectionData={{ section: "Work Experience", data: experience }} />
          </div>
        );
      })}
    </>
  );
};
