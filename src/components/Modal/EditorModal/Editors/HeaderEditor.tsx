import { Input } from "components/Input";
import { useResumeDispatch, useResumeState } from "contexts/hooks";
import { ChangeEvent } from "react";

export const HeaderEditor = () => {
  const { Header } = useResumeState();
  const { updateHeader } = useResumeDispatch();

  const handleChange = (key: keyof typeof Header) => (e: ChangeEvent<HTMLInputElement>) => {
    updateHeader({ [key]: e.target.value });
  };

  return (
    <div>
      {Object.entries(Header).map(([key, value]) => {
        return (
          <Input
            onChange={handleChange(key as keyof typeof Header)}
            key={key}
            label={key}
            value={value ?? ""}
          />
        );
      })}
    </div>
  );
};
