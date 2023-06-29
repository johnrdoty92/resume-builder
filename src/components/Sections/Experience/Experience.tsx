import { Section } from "../Section";
import classes from "./Experience.module.css";

type ExperienceEntry = {
  workplace: string;
  role: string;
  location: string;
  dates: string;
  bulletPoints: string[];
};

type ExperienceProps = { entries: ExperienceEntry[] };

export const Experience = ({ entries }: ExperienceProps) => {
  return (
    <Section title="Experience">
      {entries.map(({ workplace, role, location, dates, bulletPoints }, i) => (
        <div className={classes.experienceEntry} key={workplace + i}>
          <div className={classes.experienceDetails}>
            <p>{role}</p>
            <p>{workplace}</p>
            <p>{location}</p>
            <p>{dates}</p>
          </div>
          <ul>
            {bulletPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
};
