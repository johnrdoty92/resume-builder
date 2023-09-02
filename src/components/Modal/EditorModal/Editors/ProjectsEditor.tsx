import { Button } from "components/Button/Button";
import { Input } from "components/Input";
import {
  useEditorModalDispatch,
  useEditorModalState,
  useResumeDispatch,
  useResumeState,
} from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { Project } from "types/resumeState";
import { BulletPointEditor } from "../BulletPoints";
import { DataEntryNavigatorButtons } from "../DataEntryNavigatorButtons";
import classes from "./Editor.module.css";

type AccomplishmentsProps = {
  accomplishments: string[];
  addAccomplishment: (value: string) => void;
  updateAccomplishment: (index: number, value?: string) => void;
};

const Accomplishments = ({
  accomplishments,
  addAccomplishment,
  updateAccomplishment,
}: AccomplishmentsProps) => {
  const [currentAccomplishment, setCurrentAccomplishment] = useState("");

  const handleSaveCurrent = () => {
    addAccomplishment(currentAccomplishment);
    setCurrentAccomplishment("");
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && currentAccomplishment) {
      handleSaveCurrent();
    }
  };

  return (
    <>
      {accomplishments.map((acc, i) => {
        return (
          <BulletPointEditor
            key={`${acc}${i}`}
            index={i}
            value={acc}
            handleUpdate={updateAccomplishment}
          />
        );
      })}
      <input
        value={currentAccomplishment}
        onChange={(e) => setCurrentAccomplishment(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button onClick={handleSaveCurrent}>Add Accomplishment</Button>
    </>
  );
};

export const ProjectsEditor = () => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const { index = 0 } = useEditorModalState();
  const { Projects } = useResumeState();
  const [project, setProject] = useState<Project>(Projects.data[index]);
  const { accomplishments, name, url } = project;

  useEffect(() => {
    const nextProjectData = Projects.data[index];
    if (nextProjectData) setProject(nextProjectData);
  }, [index, Projects.data]);

  const handleChange = (key: keyof Project) => (e: ChangeEvent<HTMLInputElement>) => {
    if (key === "accomplishments") return;
    setProject(
      produce((draftProject) => {
        draftProject[key] = e.target.value;
        return draftProject;
      })
    );
  };

  const handleSave = () => {
    updateDataEntry({ data: project, section: "Projects", index });
    setOpen(false);
  };

  const handleUpdateAccomplishment = (index: number, value?: string): void => {
    setProject(
      produce((draftProject) => {
        if (value) {
          draftProject.accomplishments.splice(index, 1, value);
        } else {
          draftProject.accomplishments.splice(index, 1);
        }
        return draftProject;
      })
    );
  };

  const addAccomplishment = (value: string) => {
    setProject(
      produce((draftProject) => {
        draftProject.accomplishments.push(value);
        return draftProject;
      })
    );
  };

  return (
    <div className={classes.editorInputs}>
      <Input label="Project Name" onChange={handleChange("name")} value={name} />
      <Input label="URL" onChange={handleChange("url")} value={url ?? ""} />
      <Accomplishments
        accomplishments={accomplishments}
        addAccomplishment={addAccomplishment}
        updateAccomplishment={handleUpdateAccomplishment}
      />
      <Button onClick={handleSave}>Save</Button>
      <DataEntryNavigatorButtons />
    </div>
  );
};
