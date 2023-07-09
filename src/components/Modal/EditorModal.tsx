import { Section } from "../../contexts/ResumeStateContext";
import {
  useEditorModalDispatch,
  useEditorModalState,
  useResumeDispatch,
} from "../../contexts/hooks";
import { Modal } from "./Modal";

const validateSectionData = (data: unknown): data is Section => {
  // TODO: handle "details" array. Change from type predicate to assertion function
  return Boolean(typeof data === "object" && data && "primaryInfo" in data && "details" in data);
};

export const EditorModal = () => {
  const { saveSection } = useResumeDispatch();
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { id, title, entries } = content;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    // TODO: create enum of all the keys in the input names
    const sectionData = Object.fromEntries(formData.entries());
    const isValid = validateSectionData(sectionData);
    if (isValid) {
      saveSection({ id, sectionData });
      e.preventDefault();
      closeModal();
    } else {
      // TODO: Display error?
      console.log(sectionData);
    }
  };

  const handleCancel = () => {
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
              <label>
                Primary
                <input name="primaryInfo" defaultValue={entry.primaryInfo} />
              </label>
              {/* TODO: map out details array */}
              <label>
                Details
                <input name="details" defaultValue={entry.details} />
              </label>
            </div>
          );
        })}
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </Modal>
  );
};
