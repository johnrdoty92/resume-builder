import { ResumeEntry, Section, SectionTitle } from "../../contexts/ResumeStateContext";
import {
  useEditorModalDispatch,
  useEditorModalState,
  useResumeDispatch,
} from "../../contexts/hooks";
import { Modal } from "./Modal";

const validateSectionData = (data: FormData): any => {
  // TODO: add better type safety to form validation
  const validKeys: (keyof ResumeEntry)[] = ["date", "details", "primaryInfo", "secondaryInfo"];
  // const sectionDataEntries: Record<keyof ResumeEntry, ResumeEntry[keyof ResumeEntry]> = {};
  const sectionDataEntries: any = {};
  for (const [key, value] of data.entries()) {
    const [inputName] = key.split("-");
    const validKey = validKeys.find((k) => k === inputName);
    if (!validKey) continue;
    if (validKey === "date" || validKey === "details" || validKey === "secondaryInfo") {
      const copy = sectionDataEntries[validKey];
      sectionDataEntries[validKey] = [...(copy ?? []), value];
    } else {
      sectionDataEntries[validKey] = value;
    }
  }
  return sectionDataEntries;
};

type ResumeEntryValuesAsStrings = { [Key in keyof ResumeEntry]: string };

const entryLabels: Record<SectionTitle, ResumeEntryValuesAsStrings> = {
  "Work Experience": {
    primaryInfo: "Role",
    details: "Responsibilities",
    date: "Dates",
  },
  Education: {
    primaryInfo: "Degree",
    date: "Date of Completion",
    details: "Location",
    secondaryInfo: "University / School",
  },
  Projects: {
    primaryInfo: "Project Title",
    secondaryInfo: "Link",
    details: "Achievements",
  },
};

export const EditorModal = () => {
  const { saveSection } = useResumeDispatch();
  const { closeModal } = useEditorModalDispatch();
  const { content, open } = useEditorModalState();
  const { id, title, entries } = content;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sectionData = validateSectionData(formData);
    saveSection({ id, sectionData });
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      <form onSubmit={handleSubmit}>
        <label>
          Section Title
          <input name="title" defaultValue={title} />
        </label>
        {entries.map((entry) => {
          return (
            <fieldset
              key={entry.primaryInfo + entry.details}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <legend>Details</legend>
              <label>
                {entryLabels[title].primaryInfo}
                <input name="primaryInfo" defaultValue={entry.primaryInfo} />
              </label>
              {/* BULLET POINTS */}
              <p>{entryLabels[title].details}</p>
              {entry.details.map((detail, i) => {
                return <input key={`${detail}-${i}`} name={`details-${i}`} defaultValue={detail} />;
              })}
              {/* SECONDARY INFO */}
              {entry.secondaryInfo && (
                <>
                  <p>{entryLabels[title].secondaryInfo}</p>
                  {entry.secondaryInfo?.map((secondaryDetail, i) => {
                    return (
                      <input
                        name={`secondaryInfo-${i}`}
                        key={`${secondaryDetail}-${i}`}
                        defaultValue={secondaryDetail}
                      />
                    );
                  })}
                </>
              )}
              {/* TODO: create component that handles dates and secondary input as chip array, etc */}
              {entry.date && (
                <>
                  <p>{entryLabels[title].date}</p>
                  {entry.date instanceof Date ? (
                    <input type="date" name="date" defaultValue={entry.date.toDateString()} />
                  ) : (
                    <>
                      <input
                        type="date"
                        name="date-0"
                        defaultValue={entry.date[0].toDateString()}
                      />
                      <input
                        type="date"
                        name="date-1"
                        defaultValue={
                          typeof entry.date[1] === "string"
                            ? entry.date[1]
                            : entry.date[1].toDateString()
                        }
                      />
                    </>
                  )}
                </>
              )}
            </fieldset>
          );
        })}
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </Modal>
  );
};
