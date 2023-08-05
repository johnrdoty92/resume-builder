import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const PrimaryInfo = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { primaryInfoLabel } = labels;
  return (
    <div>
      <h6>{primaryInfoLabel}</h6>
      <input name={`primaryInfo-${id}`} defaultValue={entry.primaryInfo} />
    </div>
  );
};
