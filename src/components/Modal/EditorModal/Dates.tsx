import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";

export const Dates = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const { dateLabel } = labels;
  // TODO: create component that handles dates and secondary input as chip array, etc
  // TODO: handle date names for parsing
  return entry.date && dateLabel ? (
    <>
      <p>{dateLabel}</p>
      {entry.date instanceof Date ? (
        <input type="date" name={`date-${id}`} defaultValue={entry.date.toDateString()} />
      ) : (
        <>
          <input type="date" name={`date-${id}-0`} defaultValue={entry.date[0].toDateString()} />
          <input
            type="date"
            name={`date-${id}-1`}
            defaultValue={
              typeof entry.date[1] === "string" ? entry.date[1] : entry.date[1].toDateString()
            }
          />
        </>
      )}
    </>
  ) : (
    <></>
  );
};
