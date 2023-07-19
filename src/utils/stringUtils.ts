import { ResumeEntry } from "../contexts/ResumeStateContext";

export const getUniqueFormName = (prefix: keyof ResumeEntry): `${keyof ResumeEntry}-${string}` => {
  const id = crypto.randomUUID();
  return `${prefix}-${id}`;
};
