import {
  Dispatch,
  DispatchWithoutAction,
  Reducer,
  createContext,
  useMemo,
  useReducer,
} from "react";
import { PLACEHOLDER_DATA } from "constants/editorModal";
import { SectionDataEntry } from "types/resumeState";

export type EditorModalState = {
  open: boolean;
  content: SectionDataEntry;
};

export const EditorModalStateContext = createContext<EditorModalState | null>(null);

type EditorModalAction =
  | {
      type: "openWithContent";
      payload: EditorModalState["content"];
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
  switch (type) {
    case "openWithContent": {
      return {
        open: true,
        content: payload,
      };
    }
    case "setOpen": {
      return {
        ...state,
        open: payload,
      };
    }
  }
};

export const EditorModalDispatchContext = createContext<EditorModalDispatch | null>(null);

export const EditorModalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(editorModalStateReducer, {
    open: false,
    content: PLACEHOLDER_DATA["Work Experience"],
  });

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
