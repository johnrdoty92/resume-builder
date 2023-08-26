import {
  Dispatch,
  DispatchWithoutAction,
  Reducer,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  ResumeSection,
  ResumeState,
  SectionDataEntry,
  SectionUpdatePayload,
} from "types/resumeState";
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
      type: "updateDataEntry";
      payload: SectionUpdatePayload;
    }
  | {
      type: "removeDataEntry";
      payload: { section: ResumeSection; index: number };
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
        if (section === "Skills") return resumeDraft;
        (resumeDraft[section].data as (typeof data)[]).push(data);
        return resumeDraft;
      }
      case "updateDataEntry": {
        const { data, index, section } = payload;
        if (section === "Skills") {
          resumeDraft[section].data = data;
          return resumeDraft;
        }
        if (!resumeDraft[section].data[index]) throw `Index ${index} does not exist in ${section}`;
        (resumeDraft[section].data as (typeof data)[]).splice(index, 1, data);
        return resumeDraft;
      }
      case "removeDataEntry": {
        const { index, section } = payload;
        resumeDraft[section].data.splice(index, 1);
        return resumeDraft;
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
      updateDataEntry(payload) {
        dispatch({ type: "updateDataEntry", payload });
      },
      removeDataEntry(payload) {
        dispatch({ type: "removeDataEntry", payload });
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
