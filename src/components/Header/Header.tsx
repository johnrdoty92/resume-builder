import { useResumeState } from "contexts/hooks";
import classes from "./Header.module.css";

export const Header = () => {
  const {
    Header: { name, address, email, phone, socialMedia },
  } = useResumeState();
  return (
    <div className={classes.header}>
      <h1 className={classes.name}>{name}</h1>
      <div className={classes.detailsContainer}>
        {!!address && <p>{address}</p>}
        {!!email && <p>{email}</p>}
        {!!phone && <p>{phone}</p>}
        {!!socialMedia && <p>{socialMedia}</p>}
      </div>
    </div>
  );
};
