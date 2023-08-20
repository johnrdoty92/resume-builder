import { useEditorModalDispatch } from "contexts/hooks";
import { Button } from "./Button";
import { SectionDataEntry } from "types/resumeState";
import { ComponentProps } from "react";

type EditButtonProps = { sectionData: SectionDataEntry; index: number } & ComponentProps<
  typeof Button
>;

export const EditButton = ({ sectionData, index, style, ...buttonProps }: EditButtonProps) => {
  const { openWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openWithContent({ ...sectionData, index });
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
        ...style,
      }}
    >
      Edit
    </Button>
  );
};
