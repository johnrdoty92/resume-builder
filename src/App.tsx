import { DragAndDrop } from "./components/DragAndDrop";
// import classes from "./components/DragAndDrop.module.css";
import { Education } from "./components/Sections/Education/Education";
import { Experience } from "./components/Sections/Experience/Experience";
import { Header } from "./components/Header/Header";
import { ResumeEntry } from "./components/ResumeEntry/ResumeEntry";
import { Section } from "./components/Sections/Section";
import { AddSectionButton } from "./components/Button/AddSectionButton";
import { EditorModal } from "./components/Modal/EditorModal";

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
  // TODO: call state hook
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
      <Education entries={education} />
      <Experience entries={experience} />
      {/* TODO: Map out state from context. Be sure to add DragAndDrop around both arrays */}
      {/* {state.map(([title, entries]) => (
        <Section title={title}>
          {entries.map((entry) => (
            <ResumeEntry {...entry} />
          ))}
        </Section>
      ))} */}
      <Section title="Work Experience">
        <ResumeEntry
          primaryInfo="Software Engineer"
          secondaryInfo={["Google", "USA"]}
          details={[
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, velit mollitia. Placeat, voluptas nisi reiciendis enim voluptates mollitia sunt eveniet id, dolor amet itaque! Culpa ex atque fuga natus nam.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, velit mollitia. Placeat, voluptas nisi reiciendis enim voluptates mollitia sunt eveniet id, dolor amet itaque! Culpa ex atque fuga natus nam.",
          ]}
          date={[new Date(1, 10, 2020), "Current"]}
        />
        <ResumeEntry
          primaryInfo="Software Engineer"
          secondaryInfo={["Google", "USA"]}
          details={[
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, velit mollitia. Placeat, voluptas nisi reiciendis enim voluptates mollitia sunt eveniet id, dolor amet itaque! Culpa ex atque fuga natus nam.",
          ]}
          date={new Date(1, 10, 2020)}
        />
      </Section>
      {/* <DragAndDrop nodes={nodes} /> */}
      {/* <DragAndDrop
        nodes={[
          <Education key="education" entries={education} />,
          <Experience key="experience" entries={experience} />,
        ]}
      /> */}
      {/* TODO: group and style */}
      <AddSectionButton title="Education" />
      <AddSectionButton title="Work Experience" />
      <EditorModal />
    </main>
  );
}

export default App;
