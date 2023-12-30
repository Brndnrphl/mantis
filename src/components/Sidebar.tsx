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
        <li>
          <LinkButton
            to="/notes/659029b0bfb2a66b0f9aa39a"
            icon={<MdSpaceDashboard />}
            label="Test Note"
          />
        </li>
        <li>
          <LinkButton
            to="/notes/658fdd12440ce27895d3ca33"
            icon={<MdSpaceDashboard />}
            label="Test Note!"
          />
        </li>
      </ul>
    </nav>
  );
}
