import { Button } from "components/Button/Button";
import { Input } from "components/Input";
import {
  ElementRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "../EditorModal/EditorModal.module.css";

type BulletPointEditorProps = {
  value: string;
  index: number;
  handleUpdate: (index: number, value?: string) => void;
};

export const BulletPointEditor = ({ value, index, handleUpdate }: BulletPointEditorProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableDetail, setEditableDetail] = useState(value);
  const inputRef = useRef<ElementRef<"input">>(null);

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    setIsEditMode((mode) => !mode);
  };

  const handleBlur = () => setIsEditMode((mode) => !mode);

  const handleSave = () => {
    handleUpdate(index, editableDetail);
    setIsEditMode(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  useEffect(() => {
    if (!isEditMode) return;
    inputRef.current?.focus();
  }, [isEditMode]);

  return isEditMode ? (
    <div className={classes.bulletPoint}>
      <Input
        ref={inputRef}
        onChange={(e) => setEditableDetail(e.target.value)}
        value={editableDetail}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <Button type="button" onClick={handleSave}>
        Save
      </Button>
    </div>
  ) : (
    <div className={classes.bulletPoint} onClick={handleClick} key={value}>
      <p>{value}</p>
      <Button type="button" onClick={handleClick}>
        Edit
      </Button>
      <Button color="error" type="button" onClick={() => handleUpdate(index)}>
        Delete
      </Button>
    </div>
  );
};
