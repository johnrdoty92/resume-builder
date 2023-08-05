import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const BulletPoints = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { detailsLabel } = labels;
  return (
    <div>
      <h6>{detailsLabel}</h6>
      {entry.details.map((detail, i) => (
        <input key={`${detail}${i}`} name={`details-${id}`} defaultValue={detail} />
      ))}
    </div>
  );
};
