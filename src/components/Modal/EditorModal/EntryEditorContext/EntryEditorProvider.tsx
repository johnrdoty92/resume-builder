import { PropsWithChildren, createContext, useId } from "react";
import { SectionEntry, SectionType } from "contexts/ResumeStateContext";
import { SectionEntryLabels, entryLabels } from "constants/editorModal";

type EntryEditorContextValue = {
  id: string;
  labels: SectionEntryLabels;
  entry: SectionEntry;
};

type EntryEditorProviderProps = PropsWithChildren<{ type: SectionType; entry: SectionEntry }>;

export const EntryEditorContext = createContext<EntryEditorContextValue | null>(null);

export const EntryEditorProvider = ({ children, type: type, entry }: EntryEditorProviderProps) => {
  const id = useId();
  const labels = entryLabels[type];
  return (
    <EntryEditorContext.Provider value={{ id, labels, entry }}>
      <fieldset style={{ display: "flex", flexDirection: "column" }}>
        <legend>Details</legend>
        {children}
      </fieldset>
    </EntryEditorContext.Provider>
  );
};
