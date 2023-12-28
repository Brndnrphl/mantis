import { IconType } from "react-icons";
import clsx from "clsx";

interface IconButtonProps {
  label?: string;
  icon: IconType;
  bgColor: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
}

const colorMapping = {
  "bg-white": "hover:bg-zinc-100",
  "bg-black": "hover:bg-white",
  "bg-red-500": "hover:bg-red-600",
  // Add more mappings as needed
};

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon: Icon,
  bgColor,
  textColor = "text-white",
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        bgColor,
        textColor,
        "h-10 py-2 px-3 flex items-center space-x-2 rounded-md transition-all ease-in-out",
        className,
        //@ts-ignore
        colorMapping[bgColor]
      )}
    >
      <Icon />
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
