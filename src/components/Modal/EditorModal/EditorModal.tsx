import { entryLabels } from "constants/editorModal";
import { ResumeEntry, Section, SectionTitle } from "contexts/ResumeStateContext";
import { useEditorModalDispatch, useEditorModalState, useResumeDispatch } from "contexts/hooks";
import { AddModalEntry } from "components/Button/AddModalEntry";
import { Modal } from "../Modal";
import { BulletPoints } from "./BulletPoints";
import { EntryEditorProvider } from "./EntryEditorContext/EntryEditorProvider";
import { PrimaryInfo } from "./PrimaryInfo";
import { SecondaryInfo } from "./SecondaryInfo";

export const EditorModal = () => {
  const { saveSection } = useResumeDispatch();
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { id, title, entries } = content;

  const validateSectionData = (data: FormData): Section => {
    // This will take one group of content and add it to the resume. It will be a single section,
    // identified by a title and containing one or more entries
    const title = data.get("title") as SectionTitle;
    // to prevent clashing, the "key" will be {resumeEntryKey}-{react useId value}
    // this way, we can group values correctly with a map or something
    // some items (like bullet points) have multiple values that associate with a single
    // react useId value. In that case, use {resumeEntryKey}-{id}-{index} and push onto an array
    const entryMap: Map<string, Partial<ResumeEntry>> = new Map();
    // TODO: check this logic. Some of the entries aren't showing up on Add Item
    for (const [key, value] of data.entries()) {
      const [resumeEntryKey, uuid, index] = key.split("-");
      const currentEntryInfo = entryMap.get(uuid) ?? {};
      if (index) {
        const details = [
          ...((currentEntryInfo[resumeEntryKey as keyof ResumeEntry] as string[]) ?? []),
          value,
        ];
        entryMap.set(uuid, { ...currentEntryInfo, [resumeEntryKey]: details });
      } else {
        entryMap.set(uuid, { ...currentEntryInfo, [resumeEntryKey]: value });
      }
    }
    return {
      title,
      entries: Array.from(entryMap).map(([, entry]) => entry) as unknown as ResumeEntry[], //TODO: assert the entries
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const sectionData = validateSectionData(new FormData(e.currentTarget));
    saveSection({ id, sectionData });
    closeModal();
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title
          <input name="title" defaultValue={title} />
        </label>
        {entries.map((entry, i) => {
          return (
            <EntryEditorProvider title={title} entry={entry} key={entry.primaryInfo + i.toString()}>
              <PrimaryInfo />
              <BulletPoints />
              <SecondaryInfo />
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
            </EntryEditorProvider>
          );
        })}
        <AddModalEntry />
        <button type="submit">Save</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};
