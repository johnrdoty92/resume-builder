import { useEditorModalDispatch, useEditorModalState } from "contexts/hooks";
import { Modal } from "../Modal";
import { Button } from "components/Button/Button";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";
import { EducationEditor } from "./Editors/EducationEditor";
import { ProjectsEditor } from "./Editors/ProjectsEditor";

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { open, content } = useEditorModalState();

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} setOpen={setOpen}>
      <pre>{JSON.stringify(content, null, 2)}</pre>
      {(() => {
        if (!content) return null;
        switch (content.section) {
          case "Work Experience": {
            const { data, index } = content;
            return <WorkExperienceEditor data={data} index={index} />;
          }
          case "Education": {
            const { data, index } = content;
            return <EducationEditor data={data} index={index} />;
          }
          case "Projects": {
            const { data, index } = content;
            return <ProjectsEditor data={data} index={index} />;
          }
          // case "Skills":
        }
      })()}
      <Button onClick={handleClose}>Cancel</Button>
    </Modal>
  );
};
