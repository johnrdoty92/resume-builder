import { useContext } from "react";
import { EntryEditorContext } from "./EntryEditorProvider";

export const useEntryEditorContext = () => {
  const value = useContext(EntryEditorContext);
  if (!value) throw "Must use EntryEditorContext within provider";
  return value;
};
