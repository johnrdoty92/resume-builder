import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import classes from "./DragAndDrop.module.css";

const HEIGHTS = ["50px", "100px", "35px", "45px", "80px"] as const;

const calculatePosition = <T extends { node: HTMLElement }>(
  node: Node,
  index: number,
  accumulator: T[],
  targetKey: keyof T
) => {
  if (index === 0) {
    assertHTMLElement(node.parentElement);
    return node.parentElement.getBoundingClientRect().top;
  } else {
    const prev = accumulator[index - 1];
    const { height } = prev.node.getBoundingClientRect();
    return (prev[targetKey] as number) + height;
  }
};

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
    // Save each node's originating y position
    .reduce<NodeOriginData[]>((acc, node, i) => {
      assertHTMLElement(node);
      const originY = calculatePosition(node, i, acc, "originY");
      acc.push({ node, originY, domIndex: i });
      return acc;
    }, [])
    // Sort nodes according to where they stand visually
    .sort(
      ({ node: a }, { node: b }) =>
        a.getBoundingClientRect().top - b.getBoundingClientRect().top
    )
    // Calculate offset Y positions
    .reduce<PositionData[]>((acc, curr, i) => {
      const { node, originY } = curr;
      const target = calculatePosition(node, i, acc, "target");
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
  const [springs, api] = useSprings(ITEM_COUNT, () => {
    return {
      y: 0,
      zIndex: 0,
    };
  });
  const bind = useDrag(
    ({ args: [boundIndex], active, xy: [, mouseY], currentTarget }) => {
      const nodePositions = getNodePositions(currentTarget);
      api.start((i) => {
        const currentNode = nodePositions.get(i);
        if (!currentNode) throw "Accessing out of bounds node";
        const { originY, node } = currentNode;
        const isCurrentElement = boundIndex === i;
        const isDragging = active && isCurrentElement;
        if (isDragging) {
          return {
            y: mouseY - (originY + node.getBoundingClientRect().height / 2),
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
