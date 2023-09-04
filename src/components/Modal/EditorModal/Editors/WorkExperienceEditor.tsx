import { Button } from "components/Button/Button";
import { Input } from "components/Input";
import { DatePicker } from "components/Input/DatePicker";
import {
  useEditorModalDispatch,
  useEditorModalState,
  useResumeDispatch,
  useResumeState,
} from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { WorkExperience } from "types/resumeState";
import { BulletPointEditor } from "../BulletPoints";
import { DataEntryNavigatorButtons } from "../DataEntryNavigatorButtons";
import classes from "./Editor.module.css";

type ResponsibilitiesProps = {
  header?: React.ReactNode;
  responsibilities: string[];
  addResponsibility: (value: string) => void;
  updateResponsibility: (index: number, value?: string) => void;
};

const Responsibilities = ({
  header,
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
      <div className={classes.addEntryGroup}>
        <Input
          label="Add Accomplishment"
          value={currentResponsibility}
          onChange={(e) => setCurrentResponsiblity(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Button onClick={handleSaveCurrent}>Add</Button>
      </div>
      {header}
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
    </>
  );
};

export const WorkExperienceEditor = () => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const { index = 0 } = useEditorModalState();
  const WorkExperience = useResumeState()["Work Experience"];
  const [workExperience, setWorkExperience] = useState<WorkExperience>(WorkExperience.data[index]);
  const { company, dates, jobTitle, responsibilities, location } = workExperience;

  useEffect(() => {
    const nextWorkExperienceData = WorkExperience.data[index];
    if (nextWorkExperienceData) setWorkExperience(nextWorkExperienceData);
  }, [index, WorkExperience.data]);

  const handleChange = (key: keyof WorkExperience) => (e: ChangeEvent<HTMLInputElement>) => {
    if (key === "dates" || key === "responsibilities") return;
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
    <div className={classes.editorInputs}>
      <Input label="Job Title" onChange={handleChange("jobTitle")} value={jobTitle} />
      <Input label="Company" onChange={handleChange("company")} value={company} />
      <Input label="Location" onChange={handleChange("location")} value={location ?? ""} />
      <DatePicker label="Start" selected={dates.start} onChange={handleDateChange("start")} />
      <DatePicker label="End" selected={dates.end} onChange={handleDateChange("end")} />
      <Responsibilities
        header={<h5>Accomplishments</h5>}
        addResponsibility={addResponsibility}
        responsibilities={responsibilities}
        updateResponsibility={handleUpdateResponsibility}
      />

      <Button onClick={handleSave}>Save</Button>
      <DataEntryNavigatorButtons />
    </div>
  );
};
