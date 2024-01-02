import { useState } from "react";
import clsx from "clsx";

const Tooltip = // biome-ignore format: would make too many lines
  ({ text, children }: { text: string; children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="relative inline-block"
      >
        {children}
        <div
          className={clsx(
            "whitespace-nowrap z-20 px-2 transition-all duration-200 delay-100 absolute bottom-3 left-12 flex border-[1px] border-slate-400 rounded bg-white shadow-sm items-center justify-center",
            isVisible ? "visible delay-200" : "invisible"
          )}
        >
          {text}
        </div>
      </div>
    );
  };

export default Tooltip;
