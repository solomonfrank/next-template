import { useState, useRef, useEffect } from "react";
import { Keyboard } from "./icons/keyboard";
import { Button } from "./ui";

export const KeyboardShortcut = () => {
  const ref = useRef<HTMLDivElement>(null);
  const illustrationWrapper = useRef<HTMLDivElement>(null);
  const timeoutId = useRef<NodeJS.Timeout>();
  const activeShortcut = useRef(0);
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

  // const schduleTimeout = () => {
  //   timeoutId.current = setTimeout(() => {
  //     gotoShortcutHandler(activeShortcut.current + (1 % shortcuts.length));
  //   }, 2000);

  const schduleTimeout = () => {
    timeoutId.current = setTimeout(goToNextShortcut, 2000);
  };

  useEffect(() => {
    schduleTimeout();

    return () => {
      clearTimeout(timeoutId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    gotoShortcutHandler(index);
  };

  const goToNextShortcut = () =>
    gotoShortcutHandler((activeShortcut.current + 1) % shortcuts.length);

  const gotoShortcutHandler = (index: number) => {
    clearTimeout(timeoutId.current);
    const activeButton = ref.current?.querySelector<HTMLButtonElement>(
      `button:nth-child(${index + 1})`
    );

    if (!activeButton) return;

    const keys = activeButton.dataset?.shortcutkeys ?? "";
    console.log("activeButton", keys);

    if (!ref.current) return;

    ref.current.scrollTo({
      left: activeButton.offsetLeft - ref.current.clientWidth / 2,
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

    activeShortcut.current = index;

    schduleTimeout();
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
                onClick={(e) => handleClick(e, idx)}
                className="snap-center shrink-0 first:ml-[50vw] last:mr-[50vw]"
                key={idx}
                variant="secondary"
                size="small"
                data-index={idx}
                data-shortcutKeys={shortcut.keys}
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
