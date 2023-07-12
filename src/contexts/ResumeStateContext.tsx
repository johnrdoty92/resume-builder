import { Reducer, createContext, useReducer } from "react";

type SectionId = string;

export type ResumeEntry = {
  primaryInfo: string;
  secondaryInfo?: string[];
  date?: Date | [Date, Date | "Current"];
  details: string[];
};

// TODO: Add Skills and update Section type. Skills should be like chip array.
export type SectionTitle = "Work Experience" | "Education" | "Projects";

export type Section = {
  title: SectionTitle;
  entries: ResumeEntry[];
};

type ResumeState = Record<SectionId, Section>;

// TODO: Add "RESET" action to clear out local storage

type ACTION =
  | {
      type: "SAVE_SECTION";
      payload: { id: SectionId; sectionData: Section };
    }
  | {
      type: "DELETE_SECTION";
      payload: SectionId;
    };

const resumeStateReducer: Reducer<ResumeState, ACTION> = (state, { type, payload }) => {
  switch (type) {
    case "SAVE_SECTION": {
      const { id, sectionData } = payload;
      return {
        ...state,
        [id]: sectionData,
      };
    }
    case "DELETE_SECTION": {
      const copy = { ...state };
      if (!(payload in copy)) throw `Cannot delete nonexistent id ${payload}`;
      delete copy[payload];
      return copy;
    }
  }
};

export const ResumeStateContext = createContext<ResumeState>({});

type ResumeDispatch = {
  saveSection(payload: { id: string; sectionData: Section }): void;
  deleteSection(id: string): void;
};

export const ResumeDispatchContext = createContext<null | ResumeDispatch>(null);

export const ResumeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeState, dispatch] = useReducer(resumeStateReducer, {}); // TODO: set initializer to fetch from localStorage

  // TODO: useEffect that save changes to localStorage whenever resumeState changes

  const saveSection = (payload: { id: string; sectionData: Section }) => {
    dispatch({ type: "SAVE_SECTION", payload });
  };

  const deleteSection = (id: string) => {
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
