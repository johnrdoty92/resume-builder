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
  | {
      type: "removeItemByIndex";
      payload: number;
    }
  | {
      type: "addItem";
      payload?: never;
    }
  | {
      type: "setOpen";
      payload: boolean;
    };

type EditorModalDispatch = {
  [Action in ACTION as Action["type"]]: Action["payload"] extends never | undefined
    ? () => void
    : (payload: Action["payload"]) => void;
};

const editorModalStateReducer: Reducer<EditorModalState, ACTION> = (state, { type, payload }) => {
  switch (type) {
    case "openWithContent": {
      return {
        open: true,
        content: payload,
      };
    }
    case "removeItemByIndex": {
      const contentCopy = structuredClone(state.content);
      contentCopy.data.splice(payload, 1);
      return {
        ...state,
        content: contentCopy,
      };
    }
    case "addItem": {
      const newEntry = PLACEHOLDER_DATA[state.content.section].data;
      return {
        ...state,
        content: {
          ...state.content,
          data: [...state.content.data, ...newEntry],
        },
      } as EditorModalState;
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
      removeItemByIndex(payload) {
        dispatch({ payload, type: "removeItemByIndex" });
      },
      addItem() {
        dispatch({ type: "addItem" });
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
