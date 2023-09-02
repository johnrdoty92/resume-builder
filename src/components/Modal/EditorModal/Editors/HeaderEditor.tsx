import { Button } from "components/Button/Button";
import { Input } from "components/Input";
import { useEditorModalDispatch, useResumeDispatch, useResumeState } from "contexts/hooks";
import { ChangeEvent } from "react";
import classes from "./Editor.module.css";

export const HeaderEditor = () => {
  const { Header } = useResumeState();
  const { updateHeader } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();

  const handleChange = (key: keyof typeof Header) => (e: ChangeEvent<HTMLInputElement>) => {
    updateHeader({ [key]: e.target.value });
  };

  const handleClose = () => setOpen(false);

  return (
    <div className={classes.editorInputs}>
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
      <Button onClick={handleClose}>Save & Close</Button>
    </div>
  );
};
