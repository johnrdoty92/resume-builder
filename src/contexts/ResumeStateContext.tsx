import {
  Dispatch,
  DispatchWithoutAction,
  Reducer,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ResumeSection, ResumeState, SectionDataEntry } from "types/resumeState";
import { produce } from "immer";
import { DEFAULT_RESUME_STATE, DEV_DEFAULT_RESUME_STATE } from "constants/defaults";

export const ResumeStateContext = createContext<ResumeState>(DEFAULT_RESUME_STATE);

type ResumeAction =
  | {
      type: "updateSectionTitle";
      payload: { section: ResumeSection; value: string };
    }
  | {
      type: "addDataEntry";
      payload: SectionDataEntry;
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
  return produce(state, (resumeDraft) => {
    switch (type) {
      case "updateSectionTitle": {
        const { section, value } = payload;
        resumeDraft[section].heading = value;
        return resumeDraft;
      }
      case "addDataEntry": {
        const { data, section } = payload;
        (resumeDraft[section].data as (typeof data)[]).push(data);
        return resumeDraft;
      }
      case "placeholder": {
        return state;
      }
    }
  });
};

const localStorageKey = "resume-builder-app";

const initializeResumeState = () => {
  const persisted = localStorage.getItem(localStorageKey);
  if (import.meta.env.DEV) {
    localStorage.setItem(localStorageKey, JSON.stringify(DEV_DEFAULT_RESUME_STATE));
    return DEV_DEFAULT_RESUME_STATE;
  }
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
      addDataEntry(payload) {
        dispatch({ type: "addDataEntry", payload });
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
