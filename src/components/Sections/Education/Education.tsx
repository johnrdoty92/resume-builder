import { Section } from "../Section";
import classes from "./Education.module.css";

type EducationEntry = {
  name: string;
  date: string;
  location?: string;
  degreeOrCertificate: string;
};

type EducationProps = { entries: EducationEntry[] };

export const Education = ({ entries }: EducationProps) => {
  return (
    <Section title="Education">
      <div className={classes.educationItemsContainer}>
        {entries.map(({ date, degreeOrCertificate, name, location }) => (
          <div key={name + degreeOrCertificate}>
            <div className={classes.educationItemRow}>
              <p className={classes.educationName}>{name}</p>
              {location && <p>{location}</p>}
              <p>{date}</p>
            </div>
            <div className={classes.educationItemRow}>
              <p>{degreeOrCertificate}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
