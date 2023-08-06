import { placeholders } from "constants/editorModal";
import { SectionType } from "contexts/ResumeStateContext";
import { useEditorModalDispatch } from "contexts/hooks";
import { Button } from "./Button";

type AddSectionButtonProps = {
  title: SectionType;
};

export const AddSectionButton = ({ title }: AddSectionButtonProps) => {
  const { openModalWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openModalWithContent({ ...placeholders[title] });
  };

  return <Button onClick={handleClick}>ADD {title} SECTION</Button>;
};
