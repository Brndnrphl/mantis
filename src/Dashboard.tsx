import { Link } from "react-router-dom";
import IconButton from "./components/iconButton";
import { FaTrashAlt, FaSortAlphaDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import NoteCard from "./components/NoteCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

interface Note {
  _id: string;
  content: string;
  title: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);

  const getStorageKey = () => {
    return `notes-${user?.sub}`;
  };

  const [notes, setNotes] = useState(() => {
    const key = getStorageKey();
    const savedNotes = localStorage.getItem(key);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(notes));
  }, [notes, getStorageKey]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      setLoading(true);
      const res = await fetch(`/api/notes?userId=${user?.sub}`);
      const data = await res.json();
      setLoading(false);
      setNotes(data);
    };
    if (notes.length <= 0) {
      fetchUserNotes();
    }
  }, [user, notes]);

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
          {loading && (
            <ColorRing
              visible={loading}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#000000"]}
            />
          )}
        </div>
        <IconButton
          label="Delete Note"
          icon={FaTrashAlt}
          bgColor="bg-red-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note: Note) => (
          <NoteCard
            key={note._id}
            note={note.content}
            title={note.title}
            timestamp={note.createdAt}
          />
        ))}
      </div>
    </>
  );
}
