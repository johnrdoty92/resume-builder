import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const PrimaryInfo = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { primaryInfo } = labels;
  return (
    <div>
      <h6>{primaryInfo}</h6>
      <input name={`primaryInfo-${id}`} defaultValue={entry.primaryInfo} />
    </div>
  );
};
