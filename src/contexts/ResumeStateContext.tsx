import { createContext, useState } from "react";

type SectionTitle = string;
type ResumeEntry = {
  primaryInfo: string;
  secondaryInfo?: string[];
  date?: Date | [Date, Date | "Current"];
  details: string[];
};
type ResumeState = Record<SectionTitle, ResumeEntry[]>;

export const ResumeStateContext = createContext<ResumeState>({});

export const ResumeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeState, setResumeState] = useState({});
  return <ResumeStateContext.Provider value={resumeState}>{children}</ResumeStateContext.Provider>;
};
