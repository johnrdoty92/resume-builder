import { Section, SectionTitle } from "../../contexts/ResumeStateContext";
import { useEditorModalDispatch } from "../../contexts/hooks";

const placeholders: Record<SectionTitle, Section> = {
  "Work Experience": {
    title: "Work Experience",
    entries: [{ primaryInfo: "", details: ["", ""] }],
  },
  Education: {
    title: "Education",
    entries: [
      {
        primaryInfo: "",
        date: [new Date(), "Current"],
        secondaryInfo: ["", ""],
        details: [""],
      },
    ],
  },
  Projects: {
    title: "Projects",
    entries: [{ primaryInfo: "", details: ["", ""] }],
  },
};

type AddSectionButtonProps = {
  title: SectionTitle;
};

export const AddSectionButton = ({ title }: AddSectionButtonProps) => {
  const { openModalWithContent } = useEditorModalDispatch();

  const handleClick = () => {
    openModalWithContent({ id: crypto.randomUUID(), ...placeholders[title] });
  };

  return <button onClick={handleClick}>ADD {title} SECTION</button>;
};
