import { MouseEvent, useRef } from "react";
import { Keyboard } from "./icons/keyboard";
import { Button } from "./ui";

export const KeyboardShortcut = () => {
  const ref = useRef<HTMLDivElement>(null);
  const illustrationWrapper = useRef<HTMLDivElement>(null);
  const shortcuts = [
    { text: "Opens command line", keys: "⌘k" },
    { text: "Assign issue to me", keys: "i" },
    { text: "Assign issue to", keys: "a" },
    { text: "Change issue status", keys: "s" },
    { text: "Set issue priority", keys: "p" },
    { text: "Add issue labels", keys: "l" },
    { text: "Set due date", keys: "⇧d" },
    { text: "Set parent issue", keys: "⇧⌘p" },
    { text: "Add sub-issue", keys: "⇧⌘o" },
    { text: "Create new issue", keys: "c" },
    { text: "Create new issue from template", keys: "⌥c" },
    { text: "Move to project", keys: "⇧p" },
  ];

  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    keys: string,
    index: number
  ) => {
    e.preventDefault();
    if (!ref.current) return;

    ref.current.scrollTo({
      left: e.currentTarget.offsetLeft - ref.current.clientWidth / 2,
      behavior: "smooth",
    });

    if (!illustrationWrapper.current) return;

    illustrationWrapper.current
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));

    const keyArr = keys.split("");
    const elements = keyArr.map((key) => {
      return illustrationWrapper.current?.querySelector(`[data-key=${key}]`);
    });

    elements.forEach((el) => el?.classList.add("active"));
  };

  return (
    <>
      <div
        ref={illustrationWrapper}
        className="w-full h-auto mask-keyboard mt-[-6.4rem]"
      >
        <Keyboard />
      </div>

      <div className="my-8 overflow-hidden h-[4rem] min-h-[4rem] w-full">
        <div
          ref={ref}
          className=" pb-8 mask-short snap-x snap-mandatory min-h-[4rem] flex gap-2 w-full max-w-full whitespace-nowrap overflow-auto "
        >
          {shortcuts.map((shortcut, idx) => {
            return (
              <Button
                onClick={(e) => handleClick(e, shortcut.keys, idx)}
                className="snap-center shrink-0 first:ml-[50vw] last:mr-[50vw]"
                key={idx}
                variant="secondary"
                size="small"
              >
                <span>{shortcut.keys}</span>
                <span>{shortcut.text}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};
