import { ResumeSection, ResumeState } from "contexts/ResumeStateContext";

type Placeholders = {
  [Section in ResumeSection]: {
    section: Section;
    heading: string;
    data: ResumeState[Section]["data"];
  };
};

export const PLACEHOLDER_DATA: Placeholders = {
  Skills: {
    section: "Skills",
    heading: "Skills",
    data: [],
  },
  "Work Experience": {
    section: "Work Experience",
    heading: "Work Experience",
    data: [
      { jobTitle: "", responsibilities: [], company: "", dates: { start: new Date(), end: null } },
    ],
  },
  Projects: {
    section: "Projects",
    heading: "Projects",
    data: [{ accomplishments: [], name: "", url: "" }],
  },
  Education: {
    section: "Education",
    heading: "Education",
    data: [
      {
        degreeOrCertificate: "",
        institution: "",
        dateOfCompletion: new Date(),
        gpa: "",
        location: "",
        description: "",
      },
    ],
  },
};

export const DELIMITER = "%%%";
