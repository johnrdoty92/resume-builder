import { placeholders } from "../../constants/editorModal";
import { SectionTitle } from "../../contexts/ResumeStateContext";
import { useEditorModalDispatch } from "../../contexts/hooks";
import { Button } from "./Button";

type AddSectionButtonProps = {
  title: SectionTitle;
};

export const AddSectionButton = ({ title }: AddSectionButtonProps) => {
  const { openModalWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openModalWithContent({ id: crypto.randomUUID(), ...placeholders[title] });
  };

  return <Button onClick={handleClick}>ADD {title} SECTION</Button>;
};
