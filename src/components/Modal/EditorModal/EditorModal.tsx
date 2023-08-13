import { useEditorModalDispatch, useEditorModalState, useResumeDispatch } from "contexts/hooks";
import { Modal } from "../Modal";
import { Button } from "components/Button/Button";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";
import { FormEventHandler } from "react";
import { EducationEditor } from "./Editors/EducationEditor";
import { ProjectsEditor } from "./Editors/ProjectsEditor";
import { SkillsEditor } from "./Editors/SkillsEditor";

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { saveChanges } = useResumeDispatch();
  const { open, content } = useEditorModalState();
  const { section, heading, data } = content;
  const handleClose = () => setOpen(false);

  const handleSave: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: validate form data and dispatch changes
    // saveChanges({section, heading, data: {}});
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form onSubmit={handleSave}>
        <h3>{section}</h3>
        {(() => {
          switch (section) {
            case "Work Experience": {
              return data.map((d, i) => <WorkExperienceEditor key={i} data={d} />);
            }
            case "Education": {
              return data.map((d, i) => <EducationEditor key={i} data={d} />);
            }
            case "Projects": {
              return data.map((d, i) => <ProjectsEditor key={i} data={d} />);
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
