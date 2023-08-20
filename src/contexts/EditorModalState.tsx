import {
  Dispatch,
  DispatchWithoutAction,
  Reducer,
  createContext,
  useMemo,
  useReducer,
} from "react";
import { SectionUpdatePayload } from "types/resumeState";
import { produce } from "immer";

export type EditorModalState =
  | {
      open: true;
      content: SectionUpdatePayload;
    }
  | {
      open: false;
      content?: SectionUpdatePayload;
    };

export const EditorModalStateContext = createContext<EditorModalState | null>(null);

type EditorModalAction =
  | {
      type: "openWithContent";
      payload: SectionUpdatePayload;
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
      case "openWithContent": {
        return {
          open: true,
          content: payload,
        };
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
      openWithContent(payload) {
        dispatch({ payload, type: "openWithContent" });
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
