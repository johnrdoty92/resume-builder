import { useEditorModalDispatch, useEditorModalState } from "../../contexts/hooks";
import { Modal } from "./Modal";

export const EditorModal = () => {
  const { content, open } = useEditorModalState();
  const { closeModal } = useEditorModalDispatch();
  // TODO: call resume dispatch to add/update section

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    // TODO: Parse formData to update resume state
    e.preventDefault();
    closeModal();
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      <form onSubmit={handleSubmit}>
        {content}
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};
