import { EditorModalState } from "contexts/EditorModalState";
import { useEditorModalDispatch } from "contexts/hooks";
import { ComponentProps } from "react";
import { Button } from "./Button";
import classes from "./Button.module.css";

type EditButtonProps = Omit<Extract<EditorModalState, { open: true }>, "open"> & {
  buttonProps?: ComponentProps<typeof Button>;
};

export const EditButton = ({ buttonProps, ...payload }: EditButtonProps) => {
  const { openSection } = useEditorModalDispatch();

  const handleClick = () => {
    openSection(payload);
  };

  return (
    <Button {...buttonProps} className={classes.editButton} onClick={handleClick}>
      Edit
    </Button>
  );
};
