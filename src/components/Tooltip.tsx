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
            "z-20 px-2 opacity-0 transition-all duration-300 delay-100 absolute bottom-3 left-12 flex border-[1px] border-slate-400 rounded bg-white shadow-sm items-center justify-center",
            isVisible && "opacity-95 delay-300"
          )}
        >
          {text}
        </div>
      </div>
    );
  };

export default Tooltip;
