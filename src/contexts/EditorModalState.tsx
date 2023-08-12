import { Reducer, createContext, useMemo, useReducer } from "react";
import { ResumeSection, ResumeState } from "./ResumeStateContext";
import { PLACEHOLDER_DATA } from "constants/editorModal";

export type EditorModalState = {
  open: boolean;
  content: {
    [Section in ResumeSection]: {
      section: Section;
    } & ResumeState[Section];
  }[ResumeSection];
};

export const EditorModalStateContext = createContext<EditorModalState | null>(null);

type ACTION =
  | {
      type: "openWithContent";
      payload: EditorModalState["content"];
    }
  // TODO: add "remove" dispatch to be called in the editor modal context
  // payload should have ResumeSection, objectKey and index of item to remove
  | {
      type: "addNewSection";
      payload: ResumeSection;
    }
  | {
      type: "setOpen";
      payload: boolean;
    };

type EditorModalDispatch = {
  [Action in ACTION as Action["type"]]: (payload: Action["payload"]) => void;
};

const editorModalStateReducer: Reducer<EditorModalState, ACTION> = (state, { type, payload }) => {
  switch (type) {
    case "openWithContent": {
      return {
        open: true,
        content: payload,
      };
    }
    case "addNewSection": {
      return {
        open: true,
        content: PLACEHOLDER_DATA[payload],
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
      addNewSection(payload) {
        dispatch({ payload, type: "addNewSection" });
      },
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
