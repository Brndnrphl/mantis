import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="sticky top-0 z-20">
      <nav className="border-b-[1px] border-b-gray-300 p-2 bg-gray-50">
        <ul className="grid grid-cols-3 items-center">
          <li className="justify-self-start">
            <Link
              to="/dashboard"
              className="font-bold text-xl flex flex-row items-center p-2"
            >
              <FaBook className="mr-1" /> MANTIS
            </Link>
          </li>
          <li className="justify-self-center">
            <form className="relative">
              <IoIosSearch className="absolute left-[0.45rem] top-[0.45rem] h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-96 bg-white shadow-none appearance-none pl-8 p-1 rounded border-[1px] border-gray-300 outline-none focus:border-gray-400"
              />
            </form>
          </li>
          <li className="justify-self-end">
            <Profile />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
