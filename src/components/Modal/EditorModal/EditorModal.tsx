import { useEditorModalDispatch, useEditorModalState } from "contexts/hooks";
import { Modal } from "../Modal";
import { Button } from "components/Button/Button";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";

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
          // TODO:
          // case "Skills":
          // case "Projects":
          // case "Education":
        }
      })()}
      <Button onClick={handleClose}>Cancel</Button>
    </Modal>
  );
};
