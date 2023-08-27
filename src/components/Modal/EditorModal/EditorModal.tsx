import { Button } from "components/Button/Button";
import { RemoveDataEntryButton } from "components/Button/RemoveDataEntryButton";
import { useEditorModalDispatch, useEditorModalState } from "contexts/hooks";
import { Modal } from "../Modal";
import { EducationEditor } from "./Editors/EducationEditor";
import { HeaderEditor } from "./Editors/HeaderEditor";
import { ProjectsEditor } from "./Editors/ProjectsEditor";
import { SkillsEditor } from "./Editors/SkillsEditor";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { open, content } = useEditorModalState();

  const handleClose = () => setOpen(false);

  if (!content) {
    return null;
  } else if ("name" in content) {
    return (
      <Modal open={open} setOpen={setOpen}>
        <HeaderEditor />
        <Button onClick={handleClose}>Close</Button>
      </Modal>
    );
  } else {
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
  }
};
