import { DragAndDrop } from "./components/DragAndDrop";
// import classes from "./components/DragAndDrop.module.css";
import { Education } from "./components/Sections/Education/Education";
import { Experience } from "./components/Sections/Experience/Experience";
import { Header } from "./components/Header/Header";
import { ResumeEntry } from "./components/ResumeEntry/ResumeEntry";
import { Section } from "./components/Sections/Section";
import { EditSectionButton } from "./components/Button/EditSectionButton";
import { EditorModal } from "./components/Modal/EditorModal/EditorModal";
import { useResumeState } from "./contexts/hooks";

// const HEIGHTS = ["50px", "100px", "35px", "45px", "80px"] as const;
// const nodes = HEIGHTS.map((height, i) => (
//   <div
//     key={i}
//     className={classes.draggable}
//     style={{ height, backgroundColor: `rgb(${255 / (i + 1)}, 150, 160)` }}
//   />
// ));

const SAMPLE_PROPS = {
  header: {
    name: "John Doe",
    email: "name@email.com",
  },
  education: [
    {
      name: "Big University",
      date: "2020",
      location: "New York",
      degreeOrCertificate: "BS in Science",
    },
    {
      name: "Small College",
      date: "2016",
      location: "New York",
      degreeOrCertificate: "BA in Something",
    },
  ],
  experience: [
    {
      workplace: "Acme Inc",
      role: "Customer Service",
      location: "New York, USA",
      dates: "Dec 2011 - Dec 2018",
      bulletPoints: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"],
    },
  ],
  skills: {},
};

function App() {
  const { header, education, experience } = SAMPLE_PROPS;
  const resumeState = useResumeState();
  return (
    <main
      style={{
        background: "white",
        width: "8in",
        maxHeight: "11in",
        marginInline: "auto",
        padding: "0.5in",
      }}
    >
      <Header name={header.name} details={{ email: header.email }} />
      <pre>{JSON.stringify(resumeState, null, 2)}</pre>
      <EditSectionButton section="Education" />
      <EditSectionButton section="Work Experience" />
      <EditSectionButton section="Projects" />
      <EditSectionButton section="Skills" />
      <EditorModal />
    </main>
  );
}

export default App;
