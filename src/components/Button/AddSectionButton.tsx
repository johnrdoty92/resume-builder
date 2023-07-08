import { EditorModalState } from "../../contexts/EditorModalState";
import { useEditorModalDispatch } from "../../contexts/hooks";

type SectionTitle = "Work Experience" | "Education" | "Skills" | "Projects";

// TODO: Create real placeholder values
const placeholders: Record<SectionTitle, EditorModalState["content"]> = {
  "Work Experience": <div>Work Experience</div>,
  Education: <div>Education</div>,
  Projects: <div>Projects</div>,
  Skills: <div>Skills</div>,
};

type AddSectionButtonProps = {
  title: SectionTitle;
};

export const AddSectionButton = ({ title }: AddSectionButtonProps) => {
  const { openModalWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openModalWithContent(placeholders[title]);
  };

  return <button onClick={handleClick}>ADD {title} SECTION</button>;
};
