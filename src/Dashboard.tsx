import { Link } from "react-router-dom";
import IconButton from "./components/iconButton";
import { FaTrashAlt, FaSortAlphaDown, FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import NoteCard from "./components/NoteCard";
import { useEffect, useState } from "react";
import { useNoteStore } from "./store";

export default function Dashboard() {
  const notes = useNoteStore((state) => state.notes);
  const getNotes = useNoteStore((state) => state.getNotes);
  const [deleteMode, setDeleteMode] = useState(false);
  const [clickedCardIds, setClickedCardIds] = useState(new Set<string>());

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getNotes();
  }, []);

  const toggleDeleteMode = () => {
    if (deleteMode) {
      resetClickedCards();
    }
    setDeleteMode(!deleteMode);
  };

  const resetClickedCards = () => {
    setClickedCardIds(new Set());
  };

  const handleCardClick = (noteId: string) => {
    setClickedCardIds((prevClickedCardIds) => {
      const newClickedCardIds = new Set(prevClickedCardIds);
      if (newClickedCardIds.has(noteId)) {
        newClickedCardIds.delete(noteId);
      } else {
        newClickedCardIds.add(noteId);
      }
      return newClickedCardIds;
    });
  };

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
        <div className="flex flex-row gap-4 transition-all ease-in-out">
          {deleteMode && (
            <IconButton
              label="Confirm Delete"
              icon={FaCheck}
              bgColor="bg-black"
              onClick={toggleDeleteMode}
            />
          )}
          <IconButton
            label={deleteMode ? "Cancel" : "Delete"}
            icon={FaTrashAlt}
            bgColor="bg-red-500"
            onClick={toggleDeleteMode}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <NoteCard
            index={index}
            key={note._id.toString()}
            note={note.content}
            title={note.title}
            id={note._id.toString()}
            bookmarked={note.bookmarked}
            deleteMode={deleteMode}
            isClicked={clickedCardIds.has(note._id.toString())}
            link={!deleteMode ? `/notes/${note._id.toString()}` : ""}
            onClick={() => handleCardClick(note._id.toString())}
          />
        ))}
      </div>
    </>
  );
}
