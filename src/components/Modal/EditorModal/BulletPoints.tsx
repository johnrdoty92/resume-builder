import {
  ElementRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useEntryEditorContext } from "./EntryEditorContext/useEntryEditorContext";
import { DELIMITER } from "constants/editorModal";

type DetailEditorProps = {
  detail: string;
  handleUpdate: (newValue?: string) => void;
};

const DetailEditor = ({ detail, handleUpdate }: DetailEditorProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableDetail, setEditableDetail] = useState(detail);
  const inputRef = useRef<ElementRef<"input">>(null);

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    setIsEditMode((mode) => !mode);
  };

  const handleBlur = () => setIsEditMode((mode) => !mode);

  const handleSave = () => {
    handleUpdate(editableDetail);
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
    <p onClick={handleClick} key={detail}>
      {detail}
      <button type="button" onClick={handleClick}>
        Edit
      </button>
      <button type="button" onClick={() => handleUpdate(undefined)}>
        Delete
      </button>
    </p>
  );
};

export const BulletPoints = () => {
  const { id, entry, labels } = useEntryEditorContext();
  const [details, setDetails] = useState(entry.bulletPoints);
  const [currentDetail, setCurrentDetail] = useState("");

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && currentDetail) {
      e.preventDefault();
      setDetails((prev) => [...prev, currentDetail]);
      setCurrentDetail("");
    }
  };

  const handleClick = () => {
    setDetails((prev) => [...prev, currentDetail]);
    setCurrentDetail("");
  };

  const handleUpdateItem: (i: number) => DetailEditorProps["handleUpdate"] = (i) => (newValue) => {
    setDetails((prev) => {
      const copy = [...prev];
      !newValue ? copy.splice(i, 1) : copy.splice(i, 1, newValue);
      return copy;
    });
  };

  return (
    <div>
      <h6>{labels.bulletPointsLabel}</h6>
      {details.map((detail, i) => (
        <DetailEditor key={detail} detail={detail} handleUpdate={handleUpdateItem(i)} />
      ))}
      <label>
        Add {labels.bulletPointsLabel}
        <input
          value={currentDetail}
          onChange={(e) => setCurrentDetail(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        <button type="button" disabled={!currentDetail} onClick={handleClick}>
          Add
        </button>
      </label>
      <input hidden={true} value={details.join(DELIMITER)} name={`details-${id}`} readOnly />
    </div>
  );
};
