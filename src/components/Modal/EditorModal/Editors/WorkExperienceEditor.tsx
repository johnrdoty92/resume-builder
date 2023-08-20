import { ChangeEvent, useState } from "react";
import { WorkExperience } from "types/resumeState";
import { produce } from "immer";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
import { Button } from "components/Button/Button";

export const WorkExperienceEditor = ({ data, index }: { data: WorkExperience; index: number }) => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const [workExperience, setWorkExperience] = useState<WorkExperience>(data);
  const { company, dates, jobTitle, responsibilities, location } = workExperience;

  const handleChange = (key: keyof WorkExperience) => (e: ChangeEvent<HTMLInputElement>) => {
    setWorkExperience(
      produce((draftWorkExperience) => {
        if (key === "dates") {
          // TODO: handle dates
          return;
        } else if (key === "responsibilities") {
          // TODO: handle responsibilities
          return;
        }
        draftWorkExperience[key] = e.target.value;
        return draftWorkExperience;
      })
    );
  };

  const handleSave = () => {
    updateDataEntry({ data: workExperience, section: "Work Experience", index });
    setOpen(false);
  };

  return (
    <div>
      <label>
        Job Title
        <input onChange={handleChange("jobTitle")} value={jobTitle} />
      </label>
      <label>
        Company
        <input onChange={handleChange("company")} value={company} />
      </label>
      <label>
        Location
        <input onChange={handleChange("location")} value={location ?? ""} />
      </label>
      {/* TODO: dates, responsibilities */}
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
