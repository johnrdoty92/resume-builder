import { SectionEntry, Section, SectionType } from "contexts/ResumeStateContext";
import { useEditorModalDispatch, useEditorModalState, useResumeDispatch } from "contexts/hooks";
import { AddModalEntry } from "components/Button/AddModalEntry";
import { Modal } from "../Modal";
import { BulletPoints } from "./BulletPoints";
import { EntryEditorProvider } from "./EntryEditorContext/EntryEditorProvider";
import { PrimaryInfo } from "./PrimaryInfo";
import { SecondaryInfo } from "./SecondaryInfo";
import { Dates } from "./Dates";
import { DELIMITER } from "constants/editorModal";

export const EditorModal = () => {
  const { saveSection } = useResumeDispatch();
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { type, heading, entries } = content;

  const validateSectionData = (data: FormData): Section => {
    const title = data.get("title") as SectionType;
    const entryMap: Map<string, SectionEntry> = new Map();
    for (const [key, value] of data.entries()) {
      if (key === "title" || typeof value !== "string") continue;
      const [resumeEntryKey, uuid] = key.split("-");
      const entryInfo = entryMap.get(uuid) ?? { primaryInfo: "", bulletPoints: [] };
      if (resumeEntryKey === "bulletPoints") {
        const details = value.split(DELIMITER);
        entryMap.set(uuid, { ...entryInfo, [resumeEntryKey]: details });
      } else if (resumeEntryKey === "secondaryInfo") {
        // TODO: handle secondaryInfo to also split value by delimiter
        // secondaryInfo is currently only used to hold school info (uni name, gpa, major)
        const details = [...(entryInfo[resumeEntryKey] ?? []), value];
        entryMap.set(uuid, { ...entryInfo, [resumeEntryKey]: details });
      } else {
        entryMap.set(uuid, { ...entryInfo, [resumeEntryKey]: value });
      }
    }
    return {
      type,
      heading: title,
      entries: Array.from(entryMap.values()),
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const sectionData = validateSectionData(new FormData(e.currentTarget));
    saveSection({ type, sectionData });
    closeModal();
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title
          <input name="title" defaultValue={heading} />
        </label>
        {entries.map((entry) => {
          return (
            <EntryEditorProvider type={type} entry={entry} key={type}>
              <PrimaryInfo />
              <BulletPoints />
              <SecondaryInfo />
              <Dates />
            </EntryEditorProvider>
          );
        })}
        <AddModalEntry />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};
