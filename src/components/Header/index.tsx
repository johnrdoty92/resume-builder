import { Button } from "components/Button/Button";
import { useEditorModalDispatch, useResumeState } from "contexts/hooks";
import buttonClasses from "../Button/Button.module.css";
import classes from "./Header.module.css";

export const Header = () => {
  const { Header } = useResumeState();
  const { name, address, email, phone, socialMedia } = Header;
  const { openSection } = useEditorModalDispatch();

  const handleOpenModal = () => {
    openSection({ section: "Header" });
  };

  return (
    <div className={classes.header}>
      <h1 className={classes.name}>{name}</h1>
      <div className={classes.detailsContainer}>
        {!!address && <p>{address}</p>}
        {!!email && <p>{email}</p>}
        {!!phone && <p>{phone}</p>}
        {!!socialMedia && <p>{socialMedia}</p>}
      </div>
      <Button className={buttonClasses.editButton} onClick={handleOpenModal}>
        Edit
      </Button>
    </div>
  );
};
