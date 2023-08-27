import "react-datepicker/dist/react-datepicker.css";
import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import { WorkExperience } from "types/resumeState";
import { BulletPointEditor } from "../BulletPoints";

type ResponsibilitiesProps = {
  responsibilities: string[];
  addResponsibility: (value: string) => void;
  updateResponsibility: (index: number, value?: string) => void;
};

const Responsibilities = ({
  responsibilities,
  addResponsibility,
  updateResponsibility,
}: ResponsibilitiesProps) => {
  const [currentResponsibility, setCurrentResponsiblity] = useState("");

  const handleSaveCurrent = () => {
    addResponsibility(currentResponsibility);
    setCurrentResponsiblity("");
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && currentResponsibility) {
      handleSaveCurrent();
    }
  };

  return (
    <>
      {responsibilities.map((acc, i) => {
        return (
          <BulletPointEditor
            key={`${acc}${i}`}
            index={i}
            value={acc}
            handleUpdate={updateResponsibility}
          />
        );
      })}
      <input
        value={currentResponsibility}
        onChange={(e) => setCurrentResponsiblity(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button onClick={handleSaveCurrent}>Add Accomplishment</Button>
    </>
  );
};

export const WorkExperienceEditor = ({ data, index }: { data: WorkExperience; index: number }) => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const [workExperience, setWorkExperience] = useState<WorkExperience>(data);
  const { company, dates, jobTitle, responsibilities, location } = workExperience;

  const handleChange =
    (key: Exclude<keyof WorkExperience, "dates" | "responsibilities">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setWorkExperience(
        produce((draftWorkExperience) => {
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

  const handleUpdateResponsibility = (index: number, value?: string): void => {
    setWorkExperience(
      produce((draftExperience) => {
        if (value) {
          draftExperience.responsibilities.splice(index, 1, value);
        } else {
          draftExperience.responsibilities.splice(index, 1);
        }
        return draftExperience;
      })
    );
  };

  const addResponsibility = (value: string) => {
    setWorkExperience(
      produce((draftExperience) => {
        draftExperience.responsibilities.push(value);
        return draftExperience;
      })
    );
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
      <Responsibilities
        addResponsibility={addResponsibility}
        responsibilities={responsibilities}
        updateResponsibility={handleUpdateResponsibility}
      />

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
