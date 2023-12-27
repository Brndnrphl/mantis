import { LinkButton } from "./LinkButton";
import { FaPlus } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <nav className="fixed z-10 flex flex-col border-b-[1px] border-r-[1px] border-b-gray-300 border-r-gray-300 p-4 bg-gray-50 min-h-screen w-3/12">
      <ul>
        <li>
          <LinkButton to="/new_note" icon={<FaPlus />} label="New Note" />
        </li>
        <li>
          <LinkButton
            to="/dashboard"
            icon={<MdSpaceDashboard />}
            label="Dashboard"
          />
        </li>
      </ul>
    </nav>
  );
}
