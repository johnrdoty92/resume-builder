import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { EditorModalStateProvider } from "./contexts/EditorModalState.tsx";
import { ResumeStateProvider } from "./contexts/ResumeStateContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ResumeStateProvider>
      <EditorModalStateProvider>
        <App />
      </EditorModalStateProvider>
    </ResumeStateProvider>
  </React.StrictMode>
);
