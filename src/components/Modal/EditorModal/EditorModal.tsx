import { entryLabels } from "../../../constants/editorModal";
import { Section, SectionTitle } from "../../../contexts/ResumeStateContext";
import {
  useEditorModalDispatch,
  useEditorModalState,
  useResumeDispatch,
} from "../../../contexts/hooks";
import { AddModalEntry } from "../../Button/AddModalEntry";
import { Modal } from "../Modal";
import { BulletPoints } from "./BulletPoints";
import { PrimaryInfo } from "./PrimaryInfo";
import { SecondaryInfo } from "./SecondaryInfo";

export const EditorModal = () => {
  const { saveSection } = useResumeDispatch();
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { id, title, entries } = content;
  const { details, primaryInfo, date, secondaryInfo } = entryLabels[title];

  const validateSectionData = (data: FormData): Section => {
    const title = data.get("title") as SectionTitle;
    for (const [key, value] of data.entries()) {
      const [resumeEntryKey] = key.split("-");
      // TODO: Group entries by ids, eg primaryInfo-{index}-{identifier} can be split to figure out
      // which entry the value should go into
    }
    return {
      title,
      entries: [],
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sectionData = validateSectionData(formData);
    saveSection({ id, sectionData });
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title
          <input name="title" defaultValue={title} />
        </label>
        {/* TODO: create single component that takes "entry" and index to generate inputs */}
        {entries.map((entry, i) => {
          return (
            <fieldset
              key={entry.primaryInfo + entry.details + i.toString()}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <legend>Details</legend>
              <PrimaryInfo label={primaryInfo} value={entry.primaryInfo} />
              <BulletPoints label={entryLabels[title].details} details={entry.details} />
              <SecondaryInfo label={secondaryInfo} details={entry.secondaryInfo} />
              {/* TODO: create component that handles dates and secondary input as chip array, etc */}
              {entry.date && (
                <>
                  <p>{entryLabels[title].date}</p>
                  {entry.date instanceof Date ? (
                    <input type="date" name="date" defaultValue={entry.date.toDateString()} />
                  ) : (
                    <>
                      <input
                        type="date"
                        name="date-0"
                        defaultValue={entry.date[0].toDateString()}
                      />
                      <input
                        type="date"
                        name="date-1"
                        defaultValue={
                          typeof entry.date[1] === "string"
                            ? entry.date[1]
                            : entry.date[1].toDateString()
                        }
                      />
                    </>
                  )}
                </>
              )}
            </fieldset>
          );
        })}
        <AddModalEntry />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};
