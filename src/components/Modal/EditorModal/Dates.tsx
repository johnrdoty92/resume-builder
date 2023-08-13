import { Education, WorkExperience } from "contexts/ResumeStateContext";

type DateProps = {
  id: string;
  date: Education["dateOfCompletion"];
};

export const Date = ({ id, date }: DateProps) => {
  return (
    <label>
      Date of Completion
      <input type="date" name={`dateOfCompletion-${id}`} defaultValue={date.toDateString()} />
    </label>
  );
};

type DatesProps = {
  id: string;
  dates: WorkExperience["dates"];
};

export const Dates = ({ id, dates }: DatesProps) => {
  // TODO: create component that handles dates and secondary input as chip array, etc
  const { start, end } = dates;
  return (
    <>
      <h3>Dates</h3>
      <label>
        Start Date
        <input type="date" name={`dates-${id}-1`} defaultValue={start.toDateString()} />
      </label>
      <label>
        End Date
        <input type="date" name={`dates-${id}-2`} defaultValue={end?.toDateString() ?? ""} />
      </label>
    </>
  );
};
