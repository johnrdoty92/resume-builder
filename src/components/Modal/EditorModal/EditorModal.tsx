import { ResumeEntry, Section, SectionTitle } from "contexts/ResumeStateContext";
import { useEditorModalDispatch, useEditorModalState, useResumeDispatch } from "contexts/hooks";
import { AddModalEntry } from "components/Button/AddModalEntry";
import { Modal } from "../Modal";
import { BulletPoints } from "./BulletPoints";
import { EntryEditorProvider } from "./EntryEditorContext/EntryEditorProvider";
import { PrimaryInfo } from "./PrimaryInfo";
import { SecondaryInfo } from "./SecondaryInfo";
import { Dates } from "./Dates";

export const EditorModal = () => {
  const { saveSection } = useResumeDispatch();
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { id, title, entries } = content;

  const validateSectionData = (data: FormData): Section => {
    //TODO: title is editable, could be unpredictable
    const title = data.get("title") as SectionTitle;
    const entryMap: Map<string, ResumeEntry> = new Map();
    for (const [key, value] of data.entries()) {
      if (key === "title") continue;
      const [resumeEntryKey, uuid] = key.split("-");
      const entryInfo = entryMap.get(uuid) ?? { primaryInfo: "", details: [] };
      if (resumeEntryKey === "details" || resumeEntryKey === "secondaryInfo") {
        const details = [...(entryInfo[resumeEntryKey] ?? []), value];
        entryMap.set(uuid, { ...entryInfo, [resumeEntryKey]: details });
      } else {
        entryMap.set(uuid, { ...entryInfo, [resumeEntryKey]: value });
      }
    }
    return {
      title,
      entries: Array.from(entryMap.values()),
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
              <Dates />
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
