const dateOptions = [
  "en-US",
  {
    year: "numeric",
    month: "2-digit",
  },
] as const;

export const getShortDate = (d: Date) => {
  return d.toLocaleDateString(...dateOptions);
};
