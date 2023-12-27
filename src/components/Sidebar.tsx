import { LinkButton } from "./LinkButton";
import { FaPlus } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <nav className="fixed z-10 flex flex-col border-b-[1px] border-r-[1px] border-b-gray-300 border-r-gray-300 p-4 bg-gray-50 min-h-screen w-3/12">
      <ul className="">
        <li className="">
          <LinkButton to="/new_note" icon={<FaPlus />} label="New Note" />
        </li>
      </ul>
    </nav>
  );
}
