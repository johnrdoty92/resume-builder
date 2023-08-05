import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const BulletPoints = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { details } = labels;
  return (
    <div>
      <h6>{details}</h6>
      {/* TODO: this doesn't return anything when Add Item is clicked */}
      {entry.details.map((detail, i) => (
        <input key={`${detail}${i}`} name={`details-${id}-${i}`} defaultValue={detail} />
      ))}
    </div>
  );
};
