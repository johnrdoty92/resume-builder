import { Button } from "components/Button/Button";
import { DELIMITER } from "constants/editorModal";
import { KeyboardEventHandler, useState } from "react";

export const SkillsEditor = ({ data }: { data: string[] }) => {
  const [skills, setSkills] = useState(data);
  const [currentValue, setCurrentValue] = useState("");

  const removeSkill = (index: number) => {
    const skillsCopy = [...skills];
    skillsCopy.splice(index, 1);
    setSkills(skillsCopy);
  };

  const saveCurrentSkill = () => {
    setSkills((prev) => [...prev, currentValue]);
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
          <div style={{ backgroundColor: "lightgray" }} key={`${skill}${i}`}>
            <p>
              {skill} <span onClick={() => removeSkill(i)}>X</span>
            </p>
          </div>
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
      <input hidden={true} value={skills.join(DELIMITER)} name="skills" readOnly />
    </>
  );
};
