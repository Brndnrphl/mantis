import { IconType } from "react-icons";

interface IconButtonProps {
  label?: string;
  icon: IconType;
  bgColor: string;
  hoverColor: string;
  textColor?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon: Icon,
  bgColor,
  hoverColor,
  textColor = "text-white",
  className,
}) => {
  return (
    <button
      type="button"
      className={`${bgColor} ${textColor} h-10 py-2 px-3 flex items-center space-x-2 rounded-md hover:bg-${hoverColor} transition-all ease-in-out ${className}`}
    >
      <Icon />
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
