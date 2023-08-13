import { Project } from "contexts/ResumeStateContext";
import { splitCamelCaseWords } from "utils/stringUtils";
import { BulletPoints } from "../BulletPoints";
import { Fragment } from "react";
import { Button } from "components/Button/Button";
import { useEditorModalDispatch } from "contexts/hooks";

export const ProjectsEditor = ({ data }: { data: Project[] }) => {
  const { removeItemByIndex, addItem } = useEditorModalDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {data.map((project, i) => (
        <Fragment key={i}>
          {Object.entries(project).map(([key, value]) => {
            const id = `project${i}`;
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
