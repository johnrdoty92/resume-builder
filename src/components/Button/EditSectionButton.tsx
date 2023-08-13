import { ResumeSection } from "contexts/ResumeStateContext";
import { useEditorModalDispatch, useResumeState } from "contexts/hooks";
import { Button } from "./Button";
import { PLACEHOLDER_DATA } from "constants/editorModal";
import { EditorModalState } from "contexts/EditorModalState";

type EditSectionButtonProps = {
  section: ResumeSection;
};

export const EditSectionButton = ({ section }: EditSectionButtonProps) => {
  const resumeState = useResumeState();
  const { openWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    const content = resumeState[section];

    openWithContent(
      content
        ? ({ section, ...content } as EditorModalState["content"])
        : { ...PLACEHOLDER_DATA[section] }
    );
  };

  return <Button onClick={handleClick}>ADD {section} SECTION</Button>;
};
