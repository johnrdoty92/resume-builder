import { useContext } from "react";
import { ResumeStateContext } from "./ResumeStateContext";

export const useResumeState = () => {
  const value = useContext(ResumeStateContext);
  if (!value) throw "Must use ResumeStateContext within provider";
  return value;
};
