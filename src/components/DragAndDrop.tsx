import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import classes from "./DragAndDrop.module.css";
import { useRef } from "react";

const HEIGHTS = ["50px", "100px", "35px", "45px", "80px"] as const;

function assertHTMLElement(element: unknown): asserts element is HTMLElement {
  if (!(element instanceof HTMLElement))
    throw "Cannot access HTMLElement properties on invalid element";
}

type PositionData = {
  offset: number; // target - origin
  target: number;
} & NodeOriginData;

type NodeOriginData = {
  node: HTMLElement;
  originY: number;
  domIndex: number;
};

const getNodePositions = (target: EventTarget) => {
  assertHTMLElement(target);
  if (!target.parentElement) throw "No parent on dragged element";

  const nodePositions = Array.from(target.parentElement.childNodes)
    .reduce<NodeOriginData[]>((acc, node, i) => {
      assertHTMLElement(node);
      let originY: number;
      // If it's the first node, origin is just the top of the parent element
      if (i === 0) {
        assertHTMLElement(node.parentElement);
        originY = node.parentElement.getBoundingClientRect().top;
      } else {
        // Otherwise, it's the sum of the previous node's origin and height
        const prev = acc[i - 1];
        // TODO: if using scale, add reliable way to get the node's original height
        const { height } = prev.node.getBoundingClientRect();
        originY = prev.originY + height;
      }
      acc.push({ node, originY, domIndex: i });
      return acc;
    }, [])
    .sort(
      ({ node: a }, { node: b }) =>
        a.getBoundingClientRect().top - b.getBoundingClientRect().top
    )
    .reduce<PositionData[]>((acc, curr, i) => {
      // at this point, curr will have an "origin"
      // use this to calculate the new `y` value (offset)
      // figure out where it SHOULD be (target): parent.top if index 0, else acc[i - 1].target + height
      // return offset as (target - origin)
      const { node, originY } = curr;
      let target: number;
      if (i === 0) {
        assertHTMLElement(node.parentElement);
        target = node.parentElement.getBoundingClientRect().top;
      } else {
        const prev = acc[i - 1];
        // TODO: Add reliable way to get node height if scaling
        target = prev.target + prev.node.getBoundingClientRect().height;
      }
      acc.push({ ...curr, target, offset: target - originY });
      return acc;
    }, []);
  return nodePositions.reduce<Map<number, PositionData>>((acc, curr) => {
    acc.set(curr.domIndex, curr);
    return acc;
  }, new Map());
};

export const DragAndDrop = () => {
  const ITEM_COUNT = 5;
  const items = useRef(
    Array(ITEM_COUNT)
      .fill(0)
      .map((_, index) => index)
  );
  const [springs, api] = useSprings(ITEM_COUNT, (i) => {
    return {
      y: 0,
      zIndex: 0,
    };
  });
  const bind = useDrag(
    ({ args: [boundIndex], down, active, movement: [, my], currentTarget }) => {
      const nodePositions = getNodePositions(currentTarget);
      api.start((i, controller) => {
        const isCurrentElement = boundIndex === i;
        const isDragging = active && isCurrentElement;
        if (isDragging) {
          return {
            // TODO: account for offset so that element doesn't fly back to its origin
            // position when dragging
            y: my,
            zIndex: 10,
            immediate: (key: string) => key === "zIndex",
          };
        } else {
          return {
            y: nodePositions.get(i)?.offset ?? 0,
            zIndex: 0,
          };
        }
      });
    }
  );
  return (
    <div>
      {springs.map((props, domIndex) => (
        <animated.div
          key={domIndex}
          {...bind(domIndex)}
          style={{
            ...props,
            touchAction: "none",
            backgroundColor: `rgb(${255 / (domIndex + 1)}, 150, 160)`,
            height: HEIGHTS[domIndex],
          }}
          className={classes.draggable}
        ></animated.div>
      ))}
    </div>
  );
};
