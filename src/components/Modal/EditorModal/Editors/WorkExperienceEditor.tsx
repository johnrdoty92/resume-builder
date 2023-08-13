import { WorkExperience } from "contexts/ResumeStateContext";
import { useId } from "react";
import { BulletPoints } from "../BulletPoints";
import { Dates } from "../Dates";
import { splitCamelCaseWords } from "utils/stringUtils";

export const WorkExperienceEditor = ({ data }: { data: WorkExperience }) => {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "string") {
          return (
            <label key={key}>
              {splitCamelCaseWords(key)}
              <input name={`${key}-${id}`} defaultValue={value} />
            </label>
          );
        } else if (Array.isArray(value)) {
          return <BulletPoints key={key} id={id} bulletPoints={value} label={key} />;
        } else {
          return <Dates key={key} id={id} dates={value} />;
        }
      })}
    </div>
  );
};
