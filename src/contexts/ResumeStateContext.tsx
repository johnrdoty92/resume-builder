import { Reducer, createContext, useReducer } from "react";
// TODO: create union of various types
// TODO: remove secondaryInfo and add in "schoolInfo" and "skills" to respective SectionType
export type SectionEntry = {
  primaryInfo: string;
  secondaryInfo?: string[];
  date?: Date | [Date, Date | "Current"];
  bulletPoints: string[];
};

export type SectionType = "Work Experience" | "Education" | "Projects" | "Skills";

// TODO: explicitly set "type" and use different entries types accordingly
export type Section = {
  type: SectionType;
  heading: SectionType;
  entries: SectionEntry[];
};

type ResumeState = Partial<Record<SectionType, Section>>;

type ACTION =
  | {
      type: "SAVE_SECTION";
      payload: { type: SectionType; sectionData: Section };
    }
  | {
      type: "DELETE_SECTION";
      payload: SectionType;
    }
  | {
      type: "RESET";
      payload?: never;
    };

const resumeStateReducer: Reducer<ResumeState, ACTION> = (state, { type, payload }) => {
  switch (type) {
    case "SAVE_SECTION": {
      const { type, sectionData } = payload;
      return {
        ...state,
        [type]: sectionData,
      };
    }
    case "DELETE_SECTION": {
      const copy = { ...state };
      if (!(payload in copy)) throw `Cannot delete nonexistent id ${payload}`;
      delete copy[payload];
      return copy;
    }
    case "RESET": {
      return {};
    }
  }
};

export const ResumeStateContext = createContext<ResumeState>({});

type ResumeDispatch = {
  saveSection(payload: { type: string; sectionData: Section }): void;
  deleteSection(type: string): void;
};

export const ResumeDispatchContext = createContext<null | ResumeDispatch>(null);

export const ResumeStateProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: set initializer to fetch from localStorage
  const [resumeState, dispatch] = useReducer(resumeStateReducer, {});

  // TODO: useEffect that save changes to localStorage whenever resumeState changes

  const saveSection = (payload: { type: SectionType; sectionData: Section }) => {
    dispatch({ type: "SAVE_SECTION", payload });
  };

  const deleteSection = (id: SectionType) => {
    dispatch({ type: "DELETE_SECTION", payload: id });
  };

  return (
    <ResumeStateContext.Provider value={resumeState}>
      <ResumeDispatchContext.Provider value={{ saveSection, deleteSection }}>
        {children}
      </ResumeDispatchContext.Provider>
    </ResumeStateContext.Provider>
  );
};
