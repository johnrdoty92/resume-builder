import {
  ElementRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

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
    <div>
      <input
        ref={inputRef}
        onChange={(e) => setEditableDetail(e.target.value)}
        value={editableDetail}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  ) : (
    <p onClick={handleClick} key={value}>
      {value}
      <button type="button" onClick={handleClick}>
        Edit
      </button>
      <button type="button" onClick={() => handleUpdate(index)}>
        Delete
      </button>
    </p>
  );
};
