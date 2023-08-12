import { ResumeSection } from "contexts/ResumeStateContext";
import { useEditorModalDispatch } from "contexts/hooks";
import { Button } from "./Button";

type AddSectionButtonProps = {
  section: ResumeSection;
};

export const AddSectionButton = ({ section }: AddSectionButtonProps) => {
  const { addNewSection } = useEditorModalDispatch();

  const handleClick = () => {
    addNewSection(section);
  };

  return <Button onClick={handleClick}>ADD {section} SECTION</Button>;
};
