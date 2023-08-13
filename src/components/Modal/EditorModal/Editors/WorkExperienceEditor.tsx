import { WorkExperience } from "contexts/ResumeStateContext";
import { BulletPoints } from "../BulletPoints";
import { Dates } from "../Dates";
import { splitCamelCaseWords } from "utils/stringUtils";
import { useEditorModalDispatch } from "contexts/hooks";
import { Button } from "components/Button/Button";
import { Fragment } from "react";

export const WorkExperienceEditor = ({ data }: { data: WorkExperience[] }) => {
  const { removeItemByIndex, addItem } = useEditorModalDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {data.map((experience, i) => (
        <Fragment key={i}>
          {Object.entries(experience).map(([key, value]) => {
            const id = `experience${i}`;
            if (typeof value === "string") {
              return (
                <label key={`${key}${i}`}>
                  {splitCamelCaseWords(key)}
                  <input name={`${key}-${id}`} defaultValue={value} />
                </label>
              );
            } else if (Array.isArray(value)) {
              return <BulletPoints key={`${key}${i}`} id={id} bulletPoints={value} label={key} />;
            } else {
              return <Dates key={`${key}${i}`} id={id} dates={value} />;
            }
          })}
          <Button type="button" onClick={() => removeItemByIndex(i)}>
            Remove
          </Button>
        </Fragment>
      ))}
      <Button type="button" onClick={addItem}>
        Add Entry
      </Button>
    </div>
  );
};
