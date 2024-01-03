import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Profile from "./Profile";
import { useNoteStore } from "../store";
import { useState } from "react";
import clsx from "clsx";

const Header = () => {
  const [isInputFocused, setInputFocused] = useState(false);
  const searchNotes = useNoteStore((state) => state.searchNotes);
  const searchedNotes = useNoteStore((state) => state.searchedNotes);
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await searchNotes(e.target.value);
  };

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
          <li
            className="justify-self-center"
            onFocus={() => setInputFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setInputFocused(false);
              }, 100)
            }
          >
            <form className="relative w-full">
              <IoIosSearch className="absolute left-[0.45rem] top-[0.45rem] h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes..."
                className={clsx(
                  "w-96 bg-white shadow-none appearance-none pl-8 p-1 border-[1px] border-gray-300 outline-none focus:border-gray-400",
                  isInputFocused ? "rounded-t-lg" : "rounded-lg"
                )}
                onChange={handleSearch}
              />
              <div className="flex flex-col absolute w-full">
                {isInputFocused &&
                  searchedNotes.map((note) => (
                    <Link
                      key={note._id?.toString()}
                      to={`/notes/${note._id?.toString()}`}
                      className="bg-white border-x border-t border-gray-300 p-2 w-full cursor-pointer drop-shadow last:rounded-b-lg"
                    >
                      {note.title}
                    </Link>
                  ))}
              </div>
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
