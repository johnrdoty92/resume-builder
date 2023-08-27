import { useContext } from "react";
import { EditorModalDispatchContext, EditorModalStateContext } from "./EditorModalState";
import { ResumeDispatchContext, ResumeStateContext } from "./ResumeStateContext";

export const useResumeState = () => {
  const value = useContext(ResumeStateContext);
  if (!value) throw "Must use ResumeStateContext within provider";
  return value;
};

export const useResumeDispatch = () => {
  const value = useContext(ResumeDispatchContext);
  if (!value) throw "Must use ResumeDispatchContext within provider";
  return value;
};

export const useEditorModalState = () => {
  const value = useContext(EditorModalStateContext);
  if (!value) throw "Must use EditorModalStateContext within provider";
  return value;
};

export const useEditorModalDispatch = () => {
  const value = useContext(EditorModalDispatchContext);
  if (!value) throw "Must use EditorModalDispatchContext within provider";
  return value;
};
