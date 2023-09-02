import { Button } from "components/Button/Button";
import { RemoveDataEntryButton } from "components/Button/RemoveDataEntryButton";
import { useEditorModalDispatch, useEditorModalState } from "contexts/hooks";
import { Modal } from "../Modal";
import { EducationEditor } from "./Editors/EducationEditor";
import { HeaderEditor } from "./Editors/HeaderEditor";
import { ProjectsEditor } from "./Editors/ProjectsEditor";
import { SkillsEditor } from "./Editors/SkillsEditor";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";

const Editor = () => {
  const { section } = useEditorModalState();
  switch (section) {
    case "Header": {
      return <HeaderEditor />;
    }
    case "Education": {
      return <EducationEditor />;
    }
    case "Projects": {
      return <ProjectsEditor/>
    }
    case "Skills": {
      return <SkillsEditor/>
    }
    case "Work Experience": {
      return <WorkExperienceEditor/>
    }
    default: {
      return <></>;
    }
  }
};

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { open } = useEditorModalState();

  return (
    <Modal open={open} setOpen={setOpen}>
      <Editor />
    </Modal>
  );
};
