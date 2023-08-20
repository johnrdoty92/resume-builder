import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, useState } from "react";
import { Education } from "types/resumeState";

export const EducationEditor = ({ data, index }: { data: Education; index: number }) => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const [education, setEducation] = useState<Education>(data);
  const { dateOfCompletion, degreeOrCertificate, institution, description, gpa, location } =
    education;

  const handleChange = (key: keyof Education) => (e: ChangeEvent<HTMLInputElement>) => {
    setEducation(
      produce((draftProject) => {
        if (key === "dateOfCompletion") {
          // TODO: handle date of completion
          return;
        }
        draftProject[key] = e.target.value;
        return draftProject;
      })
    );
  };

  const handleSave = () => {
    updateDataEntry({ data: education, section: "Education", index });
    setOpen(false);
  };

  return (
    <div>
      <label>
        Degree
        <input onChange={handleChange("degreeOrCertificate")} value={degreeOrCertificate} />
      </label>
      <label>
        Institution
        <input onChange={handleChange("institution")} value={institution} />
      </label>
      <label>
        Location
        <input onChange={handleChange("location")} value={location ?? ""} />
      </label>
      <label>
        GPA
        <input onChange={handleChange("gpa")} value={gpa ?? ""} />
      </label>
      <label>
        Description
        <input onChange={handleChange("description")} value={description ?? ""} />
      </label>
      {/* TODO: date */}
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
