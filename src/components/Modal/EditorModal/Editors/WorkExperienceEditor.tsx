import "react-datepicker/dist/react-datepicker.css";
import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { WorkExperience } from "types/resumeState";

export const WorkExperienceEditor = ({ data, index }: { data: WorkExperience; index: number }) => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const [workExperience, setWorkExperience] = useState<WorkExperience>(data);
  const { company, dates, jobTitle, responsibilities, location } = workExperience;

  const handleChange =
    (key: Exclude<keyof WorkExperience, "dates">) => (e: ChangeEvent<HTMLInputElement>) => {
      setWorkExperience(
        produce((draftWorkExperience) => {
          if (key === "responsibilities") {
            // TODO: handle responsibilities
            return;
          }
          draftWorkExperience[key] = e.target.value;
          return draftWorkExperience;
        })
      );
    };

  const handleDateChange = (type: "start" | "end") => (date: Date | null) => {
    if (!date) return;
    setWorkExperience(
      produce((draftExperience) => {
        draftExperience.dates[type] = date;
        return draftExperience;
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
      <DatePicker selected={dates.start} onChange={handleDateChange("start")} />
      <DatePicker selected={dates.end} onChange={handleDateChange("end")} />
      {/* TODO: responsibilities */}

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
