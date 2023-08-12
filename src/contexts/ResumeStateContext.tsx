import { Reducer, createContext, useEffect, useMemo, useReducer } from "react";

export type WorkExperience = {
  role: string;
  responsibilities: string[];
  company: string;
  location?: string;
  dates: [Date, Date | null];
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

export type ResumeState = {
  Skills: {
    heading: string;
    data: string[];
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

type ACTION =
  | {
      type: "saveChanges";
      payload: {
        [Section in ResumeSection]: {
          section: Section;
        } & ResumeState[Section];
      }[ResumeSection];
    }
  | {
      type: "clearSection";
      payload: ResumeSection;
    }
  | {
      type: "clearAll";
      payload?: never;
    };

export const ResumeStateContext = createContext<Partial<ResumeState>>({});

type ResumeDispatch = {
  [Action in ACTION as Action["type"]]: Action["payload"] extends never
    ? () => void
    : (payload: Action["payload"]) => void;
};

export const ResumeDispatchContext = createContext<null | ResumeDispatch>(null);

const resumeStateReducer: Reducer<Partial<ResumeState>, ACTION> = (state, { type, payload }) => {
  switch (type) {
    case "saveChanges": {
      const { section, data } = payload;
      return {
        ...state,
        [section]: data,
      };
    }
    case "clearSection": {
      return {
        ...state,
        [payload]: undefined,
      };
    }
    case "clearAll": {
      return {};
    }
  }
};

const localStorageKey = "resume-builder-app";

const initializeResumeState = () => {
  const persisted = localStorage.getItem(localStorageKey);
  try {
    if (!persisted) throw "no persisted resume state";
    const parsedState = JSON.parse(persisted);
    return parsedState as ResumeState;
  } catch (error) {
    console.error(error);
    const defaultState = {};
    localStorage.setItem(localStorageKey, JSON.stringify(defaultState));
    return defaultState;
  }
};

export const ResumeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeState, dispatch] = useReducer(resumeStateReducer, initializeResumeState());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(resumeState));
  }, [resumeState]);

  const resumeDispatch: ResumeDispatch = useMemo(
    () => ({
      saveChanges(payload) {
        dispatch({ type: "saveChanges", payload });
      },
      clearSection(payload) {
        dispatch({ type: "clearSection", payload });
      },
      clearAll() {
        dispatch({ type: "clearAll" });
      },
    }),
    []
  );

  return (
    <ResumeStateContext.Provider value={resumeState}>
      <ResumeDispatchContext.Provider value={resumeDispatch}>
        {children}
      </ResumeDispatchContext.Provider>
    </ResumeStateContext.Provider>
  );
};
