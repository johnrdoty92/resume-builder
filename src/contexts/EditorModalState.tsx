import { Reducer, createContext, useReducer } from "react";

export type EditorModalState = {
  open: boolean;
  // TODO: Content should be data that can be mapped out into fields
  // It may also need access to an id that can be used to update resume state
  content: React.ReactNode;
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
      content: React.ReactNode;
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
  const [state, dispatch] = useReducer(editorModalStateReducer, { open: false, content: null });

  const openModalWithContent = (content: React.ReactNode) => {
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
