import {
  Dispatch,
  DispatchWithoutAction,
  Reducer,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ResumeSection, ResumeState } from "types/resumeState";

const DEFAULT_RESUME_STATE: ResumeState = {
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

export const ResumeStateContext = createContext<ResumeState>(DEFAULT_RESUME_STATE);

type ResumeAction =
  | {
      type: "updateSectionTitle";
      payload: { section: ResumeSection; value: string };
    }
  | {
      type: "placeholder";
      payload?: never;
    };

type ResumeDispatch = {
  [Action in ResumeAction as Action["type"]]: Action extends { payload?: never }
    ? DispatchWithoutAction
    : Dispatch<Action["payload"]>;
};

export const ResumeDispatchContext = createContext<null | ResumeDispatch>(null);

const resumeStateReducer: Reducer<ResumeState, ResumeAction> = (state, { type, payload }) => {
  switch (type) {
    case "updateSectionTitle": {
      const { section, value } = payload;
      return {
        ...state,
        [section]: {
          ...state[section],
          heading: value,
        },
      };
    }
    case "placeholder": {
      return state;
    }
  }
};

const localStorageKey = "resume-builder-app";

const initializeResumeState = () => {
  const persisted = localStorage.getItem(localStorageKey);
  try {
    if (!persisted) throw "no persisted resume state";
    const parsedState = JSON.parse(persisted);
    // TODO: validate parsed data as ResumeState
    return parsedState as ResumeState;
  } catch (error) {
    console.error(error);
    localStorage.setItem(localStorageKey, JSON.stringify(DEFAULT_RESUME_STATE));
    return DEFAULT_RESUME_STATE;
  }
};

export const ResumeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [resumeState, dispatch] = useReducer(resumeStateReducer, initializeResumeState());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(resumeState));
  }, [resumeState]);

  const resumeDispatch: ResumeDispatch = useMemo(
    () => ({
      updateSectionTitle(payload) {
        dispatch({ type: "updateSectionTitle", payload });
      },
      placeholder() {
        return;
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
