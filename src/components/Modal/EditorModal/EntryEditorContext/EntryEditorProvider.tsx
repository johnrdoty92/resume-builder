import { PropsWithChildren, createContext, useId } from "react";
import { ResumeEntry, SectionTitle } from "contexts/ResumeStateContext";
import { ResumeEntryValuesAsStrings, entryLabels } from "constants/editorModal";

type EntryEditorContextValue = {
  id: string;
  labels: ResumeEntryValuesAsStrings;
  entry: ResumeEntry;
};

type EntryEditorProviderProps = PropsWithChildren<{ title: SectionTitle; entry: ResumeEntry }>;

export const EntryEditorContext = createContext<EntryEditorContextValue | null>(null);

export const EntryEditorProvider = ({ children, title, entry }: EntryEditorProviderProps) => {
  const id = useId();
  const labels = entryLabels[title];
  return (
    <EntryEditorContext.Provider value={{ id, labels, entry }}>
      <fieldset style={{ display: "flex", flexDirection: "column" }}>
        <legend>Details</legend>
        {children}
      </fieldset>
    </EntryEditorContext.Provider>
  );
};
