import { ResumeEntry } from "../contexts/ResumeStateContext";
//TODO: eventually remove these once the editor modal context is done
export const getUniqueFormName = (
  prefix: keyof ResumeEntry,
  index: number
): `${keyof ResumeEntry}-${number}-${string}` => {
  const id = crypto.randomUUID().split("-").join("");
  return `${prefix}-${index}-${id}`;
};

export const assertFormName = (key: string) => {
  const resumeEntryKeys: (keyof ResumeEntry)[] = [
    "primaryInfo",
    "secondaryInfo",
    "date",
    "details",
  ];
  const [title, index, uuid] = key.split("-");
  if (!resumeEntryKeys.find((k) => k !== title) || !index || isNaN(parseInt(index)) || !uuid) {
    throw `Invalid form name: ${key}`;
  }
  return key as `${keyof ResumeEntry}-${number}-${string}`;
};
