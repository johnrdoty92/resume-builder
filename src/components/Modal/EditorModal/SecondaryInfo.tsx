import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const SecondaryInfo = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { secondaryInfo } = labels;
  return entry.secondaryInfo && secondaryInfo ? (
    <div>
      <h6>{secondaryInfo}</h6>
      {entry.details.map((detail, i) => (
        <input name={`secondaryInfo-${id}-${i}`} key={`${detail}-${i}`} defaultValue={detail} />
      ))}
    </div>
  ) : (
    <></>
  );
};
