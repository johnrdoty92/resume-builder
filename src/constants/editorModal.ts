import { SectionEntry, Section, SectionType } from "contexts/ResumeStateContext";

export type SectionEntryLabels = { [Key in keyof SectionEntry as `${Key}Label`]: string };

export const entryLabels: Record<SectionType, SectionEntryLabels> = {
  "Work Experience": {
    primaryInfoLabel: "Role",
    bulletPointsLabel: "Responsibilities",
    dateLabel: "Dates",
  },
  Education: {
    primaryInfoLabel: "Degree",
    dateLabel: "Date of Completion",
    bulletPointsLabel: "Location",
    secondaryInfoLabel: "University / School",
  },
  Projects: {
    primaryInfoLabel: "Project Title",
    secondaryInfoLabel: "Link",
    bulletPointsLabel: "Achievements",
  },
  Skills: {
    // TODO: fix this
    primaryInfoLabel: "Skill",
    bulletPointsLabel: "Skills",
  },
};

export const placeholders: Record<SectionType, Section> = {
  "Work Experience": {
    type: "Work Experience",
    heading: "Work Experience",
    entries: [{ primaryInfo: "", bulletPoints: [] }],
  },
  Education: {
    type: "Education",
    heading: "Education",
    entries: [
      {
        primaryInfo: "",
        date: [new Date(), "Current"],
        secondaryInfo: ["", ""],
        bulletPoints: [""],
      },
    ],
  },
  Projects: {
    type: "Projects",
    heading: "Projects",
    entries: [{ primaryInfo: "", bulletPoints: [] }],
  },
  Skills: {
    type: "Skills",
    heading: "Skills",
    // TODO: this should just be an array of skills, no primary info needed
    entries: [{ primaryInfo: "", bulletPoints: [""] }],
  },
};

export const DELIMITER = "%%%";
