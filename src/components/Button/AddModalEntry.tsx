import { useEditorModalDispatch, useEditorModalState } from "../../contexts/hooks";
import { Button } from "./Button";

export const AddModalEntry = () => {
  const { addModalEntry } = useEditorModalDispatch();
  const { content } = useEditorModalState();

  const handleClick = () => addModalEntry();

  return (
    <Button type="button" onClick={handleClick}>
      {`Add ${content.title} Item`}
    </Button>
  );
};
