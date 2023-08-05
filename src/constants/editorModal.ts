import { ResumeEntry, Section, SectionTitle } from "../contexts/ResumeStateContext";

export type ResumeEntryLabels = { [Key in keyof ResumeEntry as `${Key}Label`]: string };

export const entryLabels: Record<SectionTitle, ResumeEntryLabels> = {
  "Work Experience": {
    primaryInfoLabel: "Role",
    detailsLabel: "Responsibilities",
    dateLabel: "Dates",
  },
  Education: {
    primaryInfoLabel: "Degree",
    dateLabel: "Date of Completion",
    detailsLabel: "Location",
    secondaryInfoLabel: "University / School",
  },
  Projects: {
    primaryInfoLabel: "Project Title",
    secondaryInfoLabel: "Link",
    detailsLabel: "Achievements",
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
