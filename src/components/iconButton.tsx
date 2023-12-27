import { IconType } from "react-icons";

interface IconButtonProps {
  label?: string;
  icon: IconType;
  bgColor: string;
  textColor?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon: Icon,
  bgColor,
  textColor = "text-white",
  className,
}) => {
  return (
    <button
      type="button"
      className={`${bgColor} ${textColor} py-2 px-3 flex items-center space-x-2 rounded-md hover:-translate-y-[0.15rem] transition-all ease-in-out ${className}`}
    >
      <Icon />
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
