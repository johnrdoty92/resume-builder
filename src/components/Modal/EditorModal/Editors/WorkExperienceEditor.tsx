import { WorkExperience } from "contexts/ResumeStateContext";
import { useId } from "react";
import { BulletPoints } from "../BulletPoints";
import { Dates } from "../Dates";

export const WorkExperienceEditor = ({ experienceData }: { experienceData: WorkExperience }) => {
  const id = useId();
  const { role, company, dates, responsibilities, location } = experienceData;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <label>
        Job title
        <input defaultValue={role} name={`role-${id}`} />
      </label>
      <label>
        Company
        <input defaultValue={company} name={`company-${id}`} />
      </label>
      <label>
        Location
        <input defaultValue={location} name={`location-${id}`} />
      </label>
      <Dates id={id} dates={dates} />
      <BulletPoints id={id} bulletPoints={responsibilities} label="responsibility" />
    </div>
  );
};
