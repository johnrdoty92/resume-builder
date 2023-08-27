import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useResumeDispatch } from "contexts/hooks";
import { produce } from "immer";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { Project } from "types/resumeState";
import { BulletPointEditor } from "../BulletPoints";

type AccomplishmentsProps = {
  accomplishments: string[];
  addAccomplishment: (value: string) => void;
  updateAccomplishment: (index: number, value?: string) => void;
};

const Accomplishments = ({
  accomplishments,
  addAccomplishment,
  updateAccomplishment,
}: AccomplishmentsProps) => {
  const [currentAccomplishment, setCurrentAccomplishment] = useState("");

  const handleSaveCurrent = () => {
    addAccomplishment(currentAccomplishment);
    setCurrentAccomplishment("");
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && currentAccomplishment) {
      handleSaveCurrent();
    }
  };

  return (
    <>
      {accomplishments.map((acc, i) => {
        return (
          <BulletPointEditor
            key={`${acc}${i}`}
            index={i}
            value={acc}
            handleUpdate={updateAccomplishment}
          />
        );
      })}
      <input
        value={currentAccomplishment}
        onChange={(e) => setCurrentAccomplishment(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button onClick={handleSaveCurrent}>Add Accomplishment</Button>
    </>
  );
};

export const ProjectsEditor = ({ data, index }: { data: Project; index: number }) => {
  const { updateDataEntry } = useResumeDispatch();
  const { setOpen } = useEditorModalDispatch();
  const [project, setProject] = useState<Project>(data);
  const { accomplishments, name, url } = project;

  const handleChange =
    (key: Exclude<keyof Project, "accomplishments">) => (e: ChangeEvent<HTMLInputElement>) => {
      setProject(
        produce((draftProject) => {
          draftProject[key] = e.target.value;
          return draftProject;
        })
      );
    };

  const handleSave = () => {
    updateDataEntry({ data: project, section: "Projects", index });
    setOpen(false);
  };

  const handleUpdateAccomplishment = (index: number, value?: string): void => {
    setProject(
      produce((draftProject) => {
        if (value) {
          draftProject.accomplishments.splice(index, 1, value);
        } else {
          draftProject.accomplishments.splice(index, 1);
        }
        return draftProject;
      })
    );
  };

  const addAccomplishment = (value: string) => {
    setProject(
      produce((draftProject) => {
        draftProject.accomplishments.push(value);
        return draftProject;
      })
    );
  };

  return (
    <div>
      <label>
        Project Name
        <input onChange={handleChange("name")} value={name} />
      </label>
      <label>
        URL
        <input onChange={handleChange("url")} value={url ?? ""} />
      </label>
      <Accomplishments
        accomplishments={accomplishments}
        addAccomplishment={addAccomplishment}
        updateAccomplishment={handleUpdateAccomplishment}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
