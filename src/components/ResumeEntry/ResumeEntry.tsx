import classes from "./ResumeEntry.module.css";

type ResumeEntryProps = {
  primaryInfo: string;
  secondaryInfo?: string[];
  date?: Date | [Date, Date | "Current"];
  details: string[];
};

export const ResumeEntry = ({
  primaryInfo,
  secondaryInfo = [],
  date,
  details,
}: ResumeEntryProps) => {
  return (
    <div className={classes.resumeEntry}>
      <div className={classes.resumeEntryHeader}>
        <p>{primaryInfo}</p>
        {secondaryInfo.map((info, i) => (
          <p key={i}>{info}</p>
        ))}
        {date &&
          (Array.isArray(date) ? (
            <p className={classes.resumeEntryDate}>
              {date.map((d, i, arr) => (
                <span key={i}>
                  {d.toLocaleString("en-US", { dateStyle: "short" })}
                  {i < arr.length - 1 ? " - " : ""}
                </span>
              ))}
            </p>
          ) : (
            <p className={classes.resumeEntryDate}>
              {date.toLocaleString("en-US", { dateStyle: "short" })}
            </p>
          ))}
      </div>
      {details.length > 1 ? (
        <ul className={classes.resumeEntryBulletpoints}>
          {details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      ) : (
        <p>{details[0]}</p>
      )}
    </div>
  );
};
