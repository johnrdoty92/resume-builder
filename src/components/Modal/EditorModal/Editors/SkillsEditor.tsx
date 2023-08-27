import { ReactComponent as CloseIcon } from "assets/icons/close.svg";
import { Button } from "components/Button/Button";
import { Chip } from "components/Button/Chip";
import { useResumeDispatch, useResumeState } from "contexts/hooks";
import { KeyboardEventHandler, useState } from "react";

const SkillChip = ({ skill, index }: { skill: string; index: number }) => {
  const { removeDataEntry } = useResumeDispatch();

  const handleClick = () => removeDataEntry({ section: "Skills", index });

  return (
    <Chip onClick={handleClick}>
      {skill}
      <CloseIcon />
    </Chip>
  );
};

export const SkillsEditor = () => {
  const {
    Skills: { data: skills },
  } = useResumeState();
  const { addDataEntry } = useResumeDispatch();
  const [currentValue, setCurrentValue] = useState("");

  const saveCurrentSkill = () => {
    addDataEntry({ section: "Skills", data: currentValue });
    setCurrentValue("");
  };

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && currentValue) {
      e.preventDefault();
      saveCurrentSkill();
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.5em" }}>
        {skills.map((skill, i) => (
          <SkillChip key={`${skill}${i}`} index={i} skill={skill} />
        ))}
      </div>
      <input
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={handleEnterKey}
      />
      <Button type="button" disabled={!currentValue} onClick={saveCurrentSkill}>
        Add Skill
      </Button>
    </>
  );
};
