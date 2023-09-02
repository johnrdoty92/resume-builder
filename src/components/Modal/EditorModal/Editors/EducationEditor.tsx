import "react-datepicker/dist/react-datepicker.css";
import { Button } from "components/Button/Button";
import { Input } from "components/Input";
import {
  useEditorModalDispatch,
  useEditorModalState,
  useResumeDispatch,
  useResumeState,
} from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Education } from "types/resumeState";
import { DataEntryNavigatorButtons } from "../DataEntryNavigatorButtons";
import classes from "./Editor.module.css";

export const EducationEditor = () => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const { index = 0 } = useEditorModalState();
  const { Education } = useResumeState();
  const [education, setEducation] = useState<Education>(Education.data[index]);
  const {
    dateOfCompletion,
    degreeOrCertificate: degree,
    institution,
    description,
    gpa,
    location,
  } = education;

  useEffect(() => {
    const nextEducationData = Education.data[index];
    if (nextEducationData) setEducation(nextEducationData);
  }, [index, Education.data]);

  const handleChange = (key: keyof Education) => (e: ChangeEvent<HTMLInputElement>) => {
    if (key === "dateOfCompletion") return;
    setEducation(
      produce((draftEducation) => {
        draftEducation[key] = e.target.value;
        return draftEducation;
      })
    );
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setEducation(
      produce((draftEducation) => {
        draftEducation.dateOfCompletion = date;
        return draftEducation;
      })
    );
  };

  const handleSave = () => {
    updateDataEntry({ data: education, section: "Education", index });
    setOpen(false);
  };

  return (
    <div className={classes.editorInputs}>
      <Input label="Degree" onChange={handleChange("degreeOrCertificate")} value={degree} />
      <Input label="Institution" onChange={handleChange("institution")} value={institution} />
      <Input label="Location" onChange={handleChange("location")} value={location ?? ""} />
      <Input label="GPA" onChange={handleChange("gpa")} value={gpa ?? ""} />
      <Input label="Description" onChange={handleChange("description")} value={description ?? ""} />
      <DatePicker selected={dateOfCompletion} onChange={handleDateChange} />
      <Button onClick={handleSave}>Save</Button>
      <DataEntryNavigatorButtons />
    </div>
  );
};
