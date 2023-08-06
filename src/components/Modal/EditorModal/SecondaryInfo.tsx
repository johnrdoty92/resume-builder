import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const SecondaryInfo = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { secondaryInfoLabel } = labels;
  return entry.secondaryInfo && secondaryInfoLabel ? (
    <div>
      <h6>{secondaryInfoLabel}</h6>
      {entry.bulletPoints.map((detail, i) => (
        <input key={`${detail}${i}`} name={`secondaryInfo-${id}`} defaultValue={detail} />
      ))}
    </div>
  ) : (
    <></>
  );
};
