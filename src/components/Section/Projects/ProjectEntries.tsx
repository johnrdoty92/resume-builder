import { EditButton } from "components/Button/EditButton";
import { useResumeState } from "contexts/hooks";
import classes from "./Project.module.css";

export const ProjectEntries = () => {
  const { data } = useResumeState().Projects;

  return (
    <>
      {data.map((project, i) => {
        const { accomplishments, name, url } = project;
        return (
          <div className={classes.project} key={`name-${i}`}>
            <div className={classes.header}>
              <p className={classes.projectName}>{name}</p>
              {url && <p>&nbsp;{"| " + url}</p>}
            </div>
            <ul className={classes.achievements}>
              {accomplishments.map((a, i) => {
                return <li key={`${a}${i}`}>{a}</li>;
              })}
            </ul>
            <EditButton index={i} section="Projects" />
          </div>
        );
      })}
    </>
  );
};
