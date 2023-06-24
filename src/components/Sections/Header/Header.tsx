import classes from "./Header.module.css";

type DetailKey = "email" | "phone" | (string & {});

type HeaderProps = {
  name: string;
  details?: Partial<Record<DetailKey, string>>;
};
export const Header = ({ name, details = {} }: HeaderProps) => {
  return (
    <section className={classes.header}>
      <h1 className={classes.name}>{name}</h1>
      <div className={classes.detailsContainer}>
        {Object.entries(details).map(([detailType, detailInfo], i) => {
          return (
            <p key={i} className={classes.detail}>
              <b>{detailType}</b>:&nbsp;{detailInfo}
            </p>
          );
        })}
      </div>
    </section>
  );
};
