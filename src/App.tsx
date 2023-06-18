import { DragAndDrop } from "./components/DragAndDrop";
import classes from "./components/DragAndDrop.module.css";

const HEIGHTS = ["50px", "100px", "35px", "45px", "80px"] as const;
const nodes = HEIGHTS.map((height, i) => (
  <div
    className={classes.draggable}
    style={{ height, backgroundColor: `rgb(${255 / (i + 1)}, 150, 160)` }}
  />
));

function App() {
  return <DragAndDrop nodes={nodes} />;
}

export default App;
