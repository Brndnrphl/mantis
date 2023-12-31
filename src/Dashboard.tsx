import { Link } from "react-router-dom";
import IconButton from "./components/iconButton";
import { FaTrashAlt, FaSortAlphaDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import NoteCard from "./components/NoteCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNotes } from "./NoteContext";

export default function Dashboard() {
  const { user } = useAuth0();
  const { notes, fetchNotes, getLocalStorage, setLocalStorage } = useNotes();
  const userID = user?.sub;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (userID) {
      fetchNotes(userID);
      setLocalStorage(userID);
      getLocalStorage(userID);
    }
  }, [fetchNotes, userID]);

  return (
    <>
      <div className="flex flex-row items-start place-content-between p-1">
        <div className="flex flex-row space-x-4 justify-start">
          <h1 className="font-bold text-3xl mb-4">Notes</h1>
          <Link to="/new_note">
            <IconButton
              icon={FaPlus}
              bgColor="bg-white"
              textColor="black"
              className="border-[1px] border-slate-400"
            />
          </Link>
          <IconButton
            icon={FaSortAlphaDown}
            bgColor="bg-white"
            textColor="black"
            className="border-[1px] border-slate-400"
          />
        </div>
        <IconButton
          label="Delete Note"
          icon={FaTrashAlt}
          bgColor="bg-red-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <NoteCard
            index={index}
            key={note._id}
            note={note.content}
            title={note.title}
            id={note._id}
            bookmarked={note.bookmarked}
            link={`/notes/${note._id}`}
          />
        ))}
      </div>
    </>
  );
}
