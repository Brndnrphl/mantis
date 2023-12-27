import { IconType } from "react-icons";

interface IconButtonProps {
  label: string;
  icon: IconType;
  bgColor: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon: Icon,
  bgColor,
}) => {
  return (
    <button
      type="button"
      className={`${bgColor} text-white py-2 px-3 flex items-center space-x-2 rounded-md hover:-translate-y-[0.15rem] transition-all ease-in-out`}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
