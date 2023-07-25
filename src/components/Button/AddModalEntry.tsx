import { useEditorModalDispatch } from "../../contexts/hooks";
import { Button } from "./Button";

export const AddModalEntry = () => {
  const { addModalEntry } = useEditorModalDispatch();

  const handleClick = () => addModalEntry();

  return (
    <Button type="button" onClick={handleClick}>
      Add Item
    </Button>
  );
};
