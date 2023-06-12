import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import classes from "./DragAndDrop.module.css";

const handleDrag =
  (active: boolean, my: number, activeIndex: number) => (i: number) => {
    return active && activeIndex === i
      ? {
          top: my,
          scale: 1.1,
        }
      : {
          top: 0,
          scale: 1,
        };
  };

export const DragAndDrop = () => {
  const ITEM_COUNT = 5;
  const [springs, api] = useSprings(ITEM_COUNT, (i) => {
    return {
      scale: 1,
      top: 0,
    };
  });
  const bind = useDrag(({ args: [index], down, active, movement: [, my] }) => {
    // change order of array of items
    // using index as the key to each item, sort items by "my"
    console.log(
      Object.entries({
        index,
        down,
        active,
        my,
      })
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ")
    );
    api.start(handleDrag(active, my, index));
  });
  return (
    <div>
      {springs.map((props, i) => (
        <animated.div
          key={i}
          {...bind(i)}
          style={{
            ...props,
            backgroundColor: `rgb(${255 / (i + 1)}, 150, 160)`,
            position: "relative",
          }}
          className={classes.draggable}
        ></animated.div>
      ))}
    </div>
  );
};
