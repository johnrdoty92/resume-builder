import { animated, config, useTransition } from "@react-spring/web";
import classes from "./Modal.module.css";

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  children: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ open, children, setOpen, onClose }: ModalProps) => {
  const transitions = useTransition([open], {
    from: { opacity: 0, translateY: 50, blur: 0, pointerEvents: "initial" } as const,
    enter: { opacity: 1, translateY: 0, blur: 8, pointerEvents: "initial" },
    leave: { opacity: 0, translateY: 50, blur: 0, pointerEvents: "none" },
    onRest: () => onClose?.(),
    immediate: (key) => key === "pointerEvents",
    config: config.stiff,
  });

  return (
    <>
      {transitions(
        ({ opacity, translateY, blur, pointerEvents }, isOpen) =>
          isOpen && (
            <animated.div
              style={{
                opacity,
                pointerEvents,
                backdropFilter: blur.to((v) => `blur(${v}px)`),
                WebkitBackdropFilter: blur.to((v) => `blur(${v}px)`),
              }}
              onClick={() => setOpen(false)}
              className={classes.modal}
            >
              <animated.div
                style={{ translateY }}
                onClick={(e) => e.stopPropagation()}
                className={classes.modalContent}
              >
                {children}
              </animated.div>
            </animated.div>
          )
      )}
    </>
  );
};
