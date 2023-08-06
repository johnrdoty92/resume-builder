import { SectionEntry, Section, SectionType } from "contexts/ResumeStateContext";

export type SectionEntryLabels = { [Key in keyof SectionEntry as `${Key}Label`]: string };

export const entryLabels: Record<SectionType, SectionEntryLabels> = {
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
  Skills: {
    // TODO: fix this
    primaryInfoLabel: "Skill",
    detailsLabel: "Skills",
  },
};

export const placeholders: Record<SectionType, Section> = {
  "Work Experience": {
    type: "Work Experience",
    heading: "Work Experience",
    entries: [{ primaryInfo: "", details: ["", ""] }],
  },
  Education: {
    type: "Education",
    heading: "Education",
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
    type: "Projects",
    heading: "Projects",
    entries: [{ primaryInfo: "", details: ["", ""] }],
  },
  Skills: {
    type: "Skills",
    heading: "Skills",
    // TODO: this should just be an array of skills, no primary info needed
    entries: [{ primaryInfo: "", details: [""] }],
  },
};
