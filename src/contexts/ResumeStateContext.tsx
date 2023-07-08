import { Reducer, createContext, useReducer } from "react";

type SectionId = string;

export type ResumeEntry = {
  primaryInfo: string;
  secondaryInfo?: string[];
  date?: Date | [Date, Date | "Current"];
  details: string[];
};

export type Section = {
  title: string;
  entries: ResumeEntry[];
};

type ResumeState = Record<SectionId, Section>;

// TODO: Add "RESET" action to clear out local storage
// TODO: ADD_SECTION/UPDATE_SECTION are similar. Maybe just have a "SAVE_CHANGES" dispatch
// that takes an id, tries to overwrite if exists, otherwise creates a new entry.
type ACTION =
  | {
      type: "ADD_SECTION";
      payload: { id: SectionId; placeholders: Section };
    }
  | {
      type: "UPDATE_SECTION";
      payload: { id: SectionId; updatedEntries: ResumeEntry[] };
    }
  | {
      type: "DELETE_SECTION";
      payload: SectionId;
    };

const resumeStateReducer: Reducer<ResumeState, ACTION> = (state, { type, payload }) => {
  switch (type) {
    case "ADD_SECTION": {
      const { id, placeholders } = payload;
      return {
        ...state,
        [id]: placeholders,
      };
    }
    case "UPDATE_SECTION": {
      const { id, updatedEntries } = payload;
      const currentSectionInfo = state[id];
      if (!currentSectionInfo) throw `Missing info for id ${id}`;
      return {
        ...state,
        [id]: {
          ...currentSectionInfo,
          entries: updatedEntries,
        },
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
  addSection(payload: { id: string; placeholders: Section }): void;
  updateSection(payload: { id: string; updatedEntries: ResumeEntry[] }): void;
  deleteSection(id: string): void;
};

export const ResumeDispatchContext = createContext<null | ResumeDispatch>(null);

export const ResumeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeState, dispatch] = useReducer(resumeStateReducer, {}); // TODO: set initializer to fetch from localStorage

  // TODO: useEffect that save changes to localStorage whenever resumeState changes

  const addSection = (payload: { id: string; placeholders: Section }) => {
    dispatch({ type: "ADD_SECTION", payload });
  };

  const updateSection = (payload: { id: string; updatedEntries: ResumeEntry[] }) => {
    dispatch({ type: "UPDATE_SECTION", payload });
  };

  const deleteSection = (id: string) => {
    dispatch({ type: "DELETE_SECTION", payload: id });
  };
  return (
    <ResumeStateContext.Provider value={resumeState}>
      <ResumeDispatchContext.Provider value={{ addSection, updateSection, deleteSection }}>
        {children}
      </ResumeDispatchContext.Provider>
    </ResumeStateContext.Provider>
  );
};
