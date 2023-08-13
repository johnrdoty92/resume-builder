import { Education } from "contexts/ResumeStateContext";
import { useId } from "react";
import { splitCamelCaseWords } from "utils/stringUtils";
import { Date } from "../Dates";

export const EducationEditor = ({ data }: { data: Education }) => {
  const id = useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "string") {
          return (
            <label key={key}>
              <p>{splitCamelCaseWords(key)}</p>
              <input name={`${key}-${id}`} defaultValue={value} />
            </label>
          );
        } else {
          return <Date key={key} id={id} date={value} />;
        }
      })}
    </div>
  );
};
