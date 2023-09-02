import { produce } from "immer";
import {
  createContext,
  Dispatch,
  DispatchWithoutAction,
  Reducer,
  SetStateAction,
  useMemo,
  useReducer,
} from "react";
import { ResumeState } from "types/resumeState";

export type EditorModalState =
  | {
      open: true;
      section: keyof ResumeState;
      index?: number;
    }
  | {
      open: false;
      section?: keyof ResumeState;
      index?: number;
    };

export const EditorModalStateContext = createContext<EditorModalState | null>(null);

type EditorModalAction =
  | {
      type: "openSection";
      payload: { section: keyof ResumeState; index?: number };
    }
  | {
      type: "changeEntryIndex";
      payload: number | SetStateAction<number>;
    }
  | {
      type: "setOpen";
      payload: boolean;
    };

type EditorModalDispatch = {
  [Action in EditorModalAction as Action["type"]]: Action["payload"] extends never
    ? DispatchWithoutAction
    : Dispatch<Action["payload"]>;
};

const editorModalStateReducer: Reducer<EditorModalState, EditorModalAction> = (
  state,
  { type, payload }
) => {
  return produce(state, (modalStateDraft) => {
    switch (type) {
      case "openSection": {
        const { section, index } = payload;
        return {
          open: true,
          section,
          index,
        };
      }
      case "changeEntryIndex": {
        const index = typeof payload === "number" ? payload : payload(modalStateDraft.index ?? 0);
        modalStateDraft.index = index;
        return modalStateDraft;
      }
      case "setOpen": {
        modalStateDraft.open = payload;
        return modalStateDraft;
      }
    }
  });
};

export const EditorModalDispatchContext = createContext<EditorModalDispatch | null>(null);

export const EditorModalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(editorModalStateReducer, { open: false });

  const editorModalDispatch: EditorModalDispatch = useMemo(
    () => ({
      setOpen(payload) {
        dispatch({ payload, type: "setOpen" });
      },
      changeEntryIndex(payload) {
        dispatch({ payload, type: "changeEntryIndex" });
      },
      openSection(payload) {
        dispatch({ payload, type: "openSection" });
      },
    }),
    []
  );

  return (
    <EditorModalStateContext.Provider value={state}>
      <EditorModalDispatchContext.Provider value={editorModalDispatch}>
        {children}
      </EditorModalDispatchContext.Provider>
    </EditorModalStateContext.Provider>
  );
};
