export type WorkExperience = {
  jobTitle: string;
  responsibilities: string[];
  company: string;
  location?: string;
  dates: {
    start: Date;
    end: Date | null;
  };
};

export type Project = {
  name: string;
  url?: string;
  accomplishments: string[];
};

export type Education = {
  degreeOrCertificate: string;
  institution: string;
  dateOfCompletion: Date;
  gpa?: string;
  location?: string;
  description?: string;
};

export type Skill = string;

export type ResumeState = {
  Skills: {
    heading: string;
    data: Skill[];
  };
  "Work Experience": {
    heading: string;
    data: WorkExperience[];
  };
  Projects: {
    heading: string;
    data: Project[];
  };
  Education: {
    heading: string;
    data: Education[];
  };
};

export type ResumeSection = keyof ResumeState;
