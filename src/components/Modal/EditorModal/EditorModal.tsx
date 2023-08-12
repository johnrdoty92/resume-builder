import { useEditorModalDispatch, useEditorModalState, useResumeDispatch } from "contexts/hooks";
import { Modal } from "../Modal";
import { Button } from "components/Button/Button";
import { WorkExperienceEditor } from "./Editors/WorkExperienceEditor";
import { FormEventHandler } from "react";

const ContentEditor = () => {
  const { content } = useEditorModalState();

  switch (content.section) {
    case "Education": {
      return <>{JSON.stringify(content.data)}</>;
    }
    case "Projects": {
      return <>{JSON.stringify(content.data)}</>;
    }
    case "Work Experience": {
      return (
        <>
          {content.data.map((d, i) => (
            <WorkExperienceEditor key={i} experienceData={d} />
          ))}
        </>
      );
    }
    case "Skills": {
      return <>{JSON.stringify(content.data)}</>;
    }
    default: {
      throw "invalid resume section";
    }
  }
};

export const EditorModal = () => {
  const { setOpen } = useEditorModalDispatch();
  const { saveChanges } = useResumeDispatch();
  const { open, content } = useEditorModalState();
  const { section, heading } = content;
  const handleClose = () => setOpen(false);

  const handleSave: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: validate form data and dispatch changes
    // saveChanges({section, heading, data: {}});
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form onSubmit={handleSave}>
        <h3>{section}</h3>
        <ContentEditor />
        <Button type="submit">Save changes</Button>
        <Button type="button" onClick={handleClose}>
          Cancel
        </Button>
      </form>
    </Modal>
  );
};
