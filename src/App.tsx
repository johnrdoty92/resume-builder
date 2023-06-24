import { DragAndDrop } from "./components/DragAndDrop";
import classes from "./components/DragAndDrop.module.css";
import { Header } from "./components/Sections/Header/Header";

const HEIGHTS = ["50px", "100px", "35px", "45px", "80px"] as const;
const nodes = HEIGHTS.map((height, i) => (
  <div
    key={i}
    className={classes.draggable}
    style={{ height, backgroundColor: `rgb(${255 / (i + 1)}, 150, 160)` }}
  />
));

function App() {
  return (
    <main style={{ background: "white" }}>
      <Header name="John Doe" details={{ email: "name@email.com" }} />
      <DragAndDrop nodes={nodes} />
    </main>
  );
}

export default App;
