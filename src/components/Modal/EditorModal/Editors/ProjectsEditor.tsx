import { Project } from "contexts/ResumeStateContext";
import { useId } from "react";
import { splitCamelCaseWords } from "utils/stringUtils";
import { BulletPoints } from "../BulletPoints";

export const ProjectsEditor = ({ data }: { data: Project }) => {
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
        } else {
          return <BulletPoints key={key} id={id} bulletPoints={value} label={key} />;
        }
      })}
    </div>
  );
};
