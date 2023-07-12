import { Reducer, createContext, useReducer } from "react";
import { Section } from "./ResumeStateContext";

export type EditorModalState = {
  open: boolean;
  content: { id: string } & Section;
};

export const EditorModalStateContext = createContext<EditorModalState | null>(null);

type EditorModalDispatch = {
  openModalWithContent: (content: EditorModalState["content"]) => void;
  closeModal: () => void;
};

export const EditorModalDispatchContext = createContext<EditorModalDispatch | null>(null);

type ACTION =
  | {
      type: "open";
      content: EditorModalState["content"];
    }
  | {
      type: "close";
      content?: never;
    };

const editorModalStateReducer: Reducer<EditorModalState, ACTION> = (state, { type, content }) => {
  switch (type) {
    case "open": {
      return {
        open: true,
        content,
      };
    }
    case "close": {
      return {
        ...state,
        open: false,
      };
    }
  }
};

export const EditorModalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(editorModalStateReducer, {
    open: false,
    content: { id: "", title: "Education", entries: [] },
  });

  const openModalWithContent = (content: EditorModalState["content"]) => {
    dispatch({ type: "open", content });
  };

  const closeModal = () => {
    dispatch({ type: "close" });
  };

  return (
    <EditorModalStateContext.Provider value={state}>
      <EditorModalDispatchContext.Provider value={{ openModalWithContent, closeModal }}>
        {children}
      </EditorModalDispatchContext.Provider>
    </EditorModalStateContext.Provider>
  );
};
