import { useEditorModalDispatch, useEditorModalState } from "contexts/hooks";
import { Modal } from "../Modal";
import { Button } from "components/Button/Button";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";
import { EducationEditor } from "./Editors/EducationEditor";
import { ProjectsEditor } from "./Editors/ProjectsEditor";
import { RemoveDataEntryButton } from "components/Button/RemoveDataEntryButton";
import { SkillsEditor } from "./Editors/SkillsEditor";

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { open, content } = useEditorModalState();

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} setOpen={setOpen}>
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
          case "Skills": {
            return <SkillsEditor />;
          }
        }
      })()}
      {content?.section && content?.index !== undefined ? (
        <RemoveDataEntryButton section={content.section} index={content.index}>
          Remove Entry
        </RemoveDataEntryButton>
      ) : null}
      <Button onClick={handleClose}>Cancel</Button>
    </Modal>
  );
};
