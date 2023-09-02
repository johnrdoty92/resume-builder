import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useEditorModalState, useResumeState } from "contexts/hooks";

export const DataEntryNavigatorButtons = () => {
  const { changeEntryIndex } = useEditorModalDispatch();
  const { index = 0, section } = useEditorModalState();
  const state = useResumeState();
  const isFirstPage = index <= 0;
  const isLastPage = section && section !== "Header" && index >= state[section].data.length - 1;

  const handleNextEntry = () => changeEntryIndex((i) => i + 1);
  const handlePrevEntry = () => changeEntryIndex((i) => i - 1);

  return (
    <div>
      <Button disabled={isFirstPage} onClick={handlePrevEntry}>
        Previous
      </Button>
      <Button disabled={isLastPage} onClick={handleNextEntry}>
        Next
      </Button>
    </div>
  );
};
