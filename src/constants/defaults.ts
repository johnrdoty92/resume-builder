import { ResumeSection, ResumeState, SectionDataBlankDefault } from "types/resumeState";

export const BLANK_SECTIONS: { [Section in ResumeSection]: SectionDataBlankDefault<Section> } = {
  "Work Experience": {
    company: "",
    dates: {
      start: new Date(),
      end: null,
    },
    jobTitle: "",
    responsibilities: [],
    location: "",
  },
  Education: {
    dateOfCompletion: new Date(),
    degreeOrCertificate: "",
    institution: "",
    description: "",
    gpa: "",
    location: "",
  },
  Projects: {
    accomplishments: [],
    name: "",
    url: "",
  },
  Skills: '',
};

export const DEFAULT_RESUME_STATE: ResumeState = {
  "Work Experience": {
    heading: "Work Experience",
    data: [],
  },
  Education: {
    heading: "Education",
    data: [],
  },
  Projects: {
    heading: "Projects",
    data: [],
  },
  Skills: {
    heading: "Skills",
    data: [],
  },
};

export const DEV_DEFAULT_RESUME_STATE: ResumeState = {
  "Work Experience": {
    heading: "Work Experience",
    data: [
      {
        company: "ACME Inc",
        dates: {
          start: new Date("2020-11-01"),
          end: null,
        },
        jobTitle: "Employee",
        responsibilities: ["Job duty a", "Job duty b", "Job duty c"],
        location: "Remote",
      },
    ],
  },
  Education: {
    heading: "Education",
    data: [
      {
        institution: "Harvard University",
        location: "Cambridge, MA",
        dateOfCompletion: new Date("2020-05-20"),
        degreeOrCertificate: "BS",
        description: "Learned a lot",
        gpa: "4.0",
      },
    ],
  },
  Projects: {
    heading: "Projects",
    data: [
      {
        name: "Big Project",
        accomplishments: ["Accomplishment a", "Accomplishment b"],
        url: "example.com",
      },
    ],
  },
  Skills: {
    heading: "Skills",
    data: ["Organized", "Microsoft Office"],
  },
};
