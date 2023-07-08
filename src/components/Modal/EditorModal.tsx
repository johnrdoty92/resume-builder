import { useEditorModalDispatch, useEditorModalState } from "../../contexts/hooks";
import { Modal } from "./Modal";

export const EditorModal = () => {
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { id, title, entries } = content;
  // TODO: call resume dispatch to add/update section

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    // TODO: create enum of all the keys in the input names
    // TODO: Parse formData to update resume state
    e.preventDefault();
    closeModal();
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" defaultValue={title} />
        </label>
        {entries.map((entry) => {
          return (
            <div key={entry.primaryInfo + entry.details}>
            {/* TODO: Create hashmap of section title to default fields available */}
            {/* Ex: primaryInfo for Work Experience should be an input labelled with "Role" */}
            </div>
          );
        })}
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};
