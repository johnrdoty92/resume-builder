import { useEditorModalDispatch } from "contexts/hooks";
import { Button } from "./Button";
import { SectionUpdatePayload } from "types/resumeState";
import { ComponentProps } from "react";

type EditButtonProps = SectionUpdatePayload & { buttonProps?: ComponentProps<typeof Button> };

export const EditButton = ({ buttonProps, ...payload }: EditButtonProps) => {
  const { openWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openWithContent(payload);
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      style={{
        position: "absolute",
        transform: "translateY(-50%)",
        top: "50%",
        left: "-10%",
        ...buttonProps?.style,
      }}
    >
      Edit
    </Button>
  );
};
