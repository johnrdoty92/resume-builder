import { MouseEventHandler } from "react";
import { useEditorModalDispatch } from "../../contexts/hooks";
import { Button } from "./Button";

export const AddModalEntry = () => {
  const { addModalEntry } = useEditorModalDispatch();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addModalEntry();
  };

  return <Button onClick={handleClick}>Add Item</Button>;
};
