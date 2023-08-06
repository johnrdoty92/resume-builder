import { Reducer, createContext, useReducer } from "react";
import { Section } from "./ResumeStateContext";
import { placeholders } from "../constants/editorModal";

export type EditorModalState = {
  open: boolean;
  content: Section;
};

export const EditorModalStateContext = createContext<EditorModalState | null>(null);

type EditorModalDispatch = {
  openModalWithContent: (content: EditorModalState["content"]) => void;
  addModalEntry: () => void;
  closeModal: () => void;
};

export const EditorModalDispatchContext = createContext<EditorModalDispatch | null>(null);

type ACTION =
  | {
      type: "open";
      content: EditorModalState["content"];
    }
  // TODO: add "remove" dispatch to be called in the editor modal context
  | {
      type: "add";
      content?: never;
    }
  | {
      type: "close";
      content?: never;
    };

const editorModalStateReducer: Reducer<EditorModalState, ACTION> = (state, { type, content }) => {
  switch (type) {
    case "add": {
      const newEntry = placeholders[state.content.heading].entries;
      return {
        ...state,
        content: {
          ...state.content,
          entries: [...state.content.entries, ...newEntry],
        },
      };
    }
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
    content: { type: "Education", heading: "Education", entries: [] },
  });

  const openModalWithContent = (content: EditorModalState["content"]) => {
    dispatch({ type: "open", content });
  };

  const addModalEntry = () => {
    dispatch({ type: "add" });
  };

  const closeModal = () => {
    dispatch({ type: "close" });
  };

  return (
    <EditorModalStateContext.Provider value={state}>
      <EditorModalDispatchContext.Provider
        value={{ openModalWithContent, closeModal, addModalEntry }}
      >
        {children}
      </EditorModalDispatchContext.Provider>
    </EditorModalStateContext.Provider>
  );
};
