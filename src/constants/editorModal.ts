import { ResumeEntry, Section, SectionTitle } from "../contexts/ResumeStateContext";

export type ResumeEntryValuesAsStrings = { [Key in keyof ResumeEntry]: string };

export const entryLabels: Record<SectionTitle, ResumeEntryValuesAsStrings> = {
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

export const placeholders: Record<SectionTitle, Section> = {
  "Work Experience": {
    title: "Work Experience",
    entries: [{ primaryInfo: "", details: ["", ""] }],
  },
  Education: {
    title: "Education",
    entries: [
      {
        primaryInfo: "",
        date: [new Date(), "Current"],
        secondaryInfo: ["", ""],
        details: [""],
      },
    ],
  },
  Projects: {
    title: "Projects",
    entries: [{ primaryInfo: "", details: ["", ""] }],
  },
};
