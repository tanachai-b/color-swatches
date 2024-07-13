import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";

export function Tabs({
  options,
  selected,
  onSelect,
}: {
  options: ReactNode[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <Container>
      {options.map((option, index) => (
        <Tab key={index} isSelected={selected === index} onClick={() => onSelect(index)}>
          {option}
        </Tab>
      ))}
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-row",

        "text-[#ffffff40]",
        "text-[13px]",
      )}
    >
      {children}
    </div>
  );
}

function Tab({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: MouseEventHandler;
  children: ReactNode;
}) {
  return (
    <button
      className={cx(
        "flex-1",

        "py-[10px]",

        "text-center",

        isSelected ? "bg-[#ffffff00]" : "bg-[#ffffff10]",
        "hover:bg-[#ffffff00]",

        { "text-[#ffffffc0]": isSelected },
        "hover:text-[#ffffffc0]",
        "hover:font-bold",
        { "font-bold": isSelected },

        "transition-all",

        "leading-none",

        "cursor-pointer",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
