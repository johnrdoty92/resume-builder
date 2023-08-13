import { useEditorModalDispatch, useEditorModalState, useResumeDispatch } from "contexts/hooks";
import { Modal } from "../Modal";
import { Button } from "components/Button/Button";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";
import { FormEventHandler } from "react";
import { EducationEditor } from "./Editors/EducationEditor";
import { ProjectsEditor } from "./Editors/ProjectsEditor";
import { SkillsEditor } from "./Editors/SkillsEditor";

const validateFormData = (formData: FormData) => {
  const entryGroupById = new Map<string, {}>();
  for (const [key, value] of formData.entries()) {
    const [name, id] = key.split("-");
    const entry = entryGroupById.get(id) ?? {};
    entryGroupById.set(id, { ...entry, [name]: value });
  }
  // TODO: return the "data" object for saveChanges
  console.log(entryGroupById);
};

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { saveChanges } = useResumeDispatch();
  const { open, content } = useEditorModalState();
  const { section, heading, data } = content;

  const handleClose = () => setOpen(false);

  const handleSave: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validateFormData(new FormData(e.currentTarget));
    // saveChanges({ section, heading, data: {} });
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form onSubmit={handleSave}>
        <h3>{section}</h3>
        {(() => {
          switch (section) {
            case "Work Experience": {
              return <WorkExperienceEditor data={data} />;
            }
            case "Education": {
              return <EducationEditor data={data} />;
            }
            case "Projects": {
              return <ProjectsEditor data={data} />;
            }
            case "Skills": {
              return <SkillsEditor data={data} />;
            }
          }
        })()}
        <Button type="submit">Save changes</Button>
        <Button type="button" onClick={handleClose}>
          Cancel
        </Button>
      </form>
    </Modal>
  );
};
