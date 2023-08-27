import { useEditorModalDispatch } from "contexts/hooks";
import { ComponentProps } from "react";
import { SectionUpdatePayload } from "types/resumeState";
import { Button } from "./Button";
import classes from "./Button.module.css";

type EditButtonProps = SectionUpdatePayload & { buttonProps?: ComponentProps<typeof Button> };

export const EditButton = ({ buttonProps, ...payload }: EditButtonProps) => {
  const { openWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openWithContent(payload);
  };

  return (
    <Button {...buttonProps} className={classes.editButton} onClick={handleClick}>
      Edit
    </Button>
  );
};
