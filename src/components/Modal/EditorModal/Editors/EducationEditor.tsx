import { Education } from "contexts/ResumeStateContext";
import { splitCamelCaseWords } from "utils/stringUtils";
import { Date } from "../Dates";
import { Fragment } from "react";
import { Button } from "components/Button/Button";
import { useEditorModalDispatch } from "contexts/hooks";

export const EducationEditor = ({ data }: { data: Education[] }) => {
  const { removeItemByIndex, addItem } = useEditorModalDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      {data.map((education, i) => (
        <Fragment key={i}>
          {Object.entries(education).map(([key, value]) => {
            const id = `education${i}`;
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
