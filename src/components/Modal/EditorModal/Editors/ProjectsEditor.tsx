import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, useState } from "react";
import { Project } from "types/resumeState";

export const ProjectsEditor = ({ data, index }: { data: Project; index: number }) => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const [project, setProject] = useState<Project>(data);
  const { accomplishments, name, url } = project;

  const handleChange = (key: keyof Project) => (e: ChangeEvent<HTMLInputElement>) => {
    setProject(
      produce((draftProject) => {
        if (key === "accomplishments") {
          // TODO: handle accomplishments
          return;
        }
        draftProject[key] = e.target.value;
        return draftProject;
      })
    );
  };

  const handleSave = () => {
    updateDataEntry({ data: project, section: "Projects", index });
    setOpen(false);
  };

  return (
    <div>
      <label>
        Project Name
        <input onChange={handleChange("name")} value={name} />
      </label>
      <label>
        URL
        <input onChange={handleChange("url")} value={url ?? ""} />
      </label>
      {/* TODO: acheivements */}
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
