// @ts-nocheck
import { Link } from "react-router-dom";
import IconButton from "./components/iconButton";
import {
  FaTrashAlt,
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
  FaCheck,
  FaSortAmountUp,
  FaSortAmountDown,
} from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import NoteCard from "./components/NoteCard";
import { useEffect, useState } from "react";
import { useNoteStore } from "./store";
import Tooltip from "./components/Tooltip";

export default function Dashboard() {
  const notes = useNoteStore((state) => state.notes);
  const getNotes = useNoteStore((state) => state.getNotes);
  const [deleteMode, setDeleteMode] = useState(false);
  const [clickedCardIds, setClickedCardIds] = useState(new Set<string>());
  const [sortConfig, setSortConfig] = useState({
    sort: "desc",
    field: "title",
  });

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

  const handleDeletion = async () => {
    const response = await fetch("/api/notes/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteIds: Array.from(clickedCardIds) }),
    });
    resetClickedCards();
    toggleDeleteMode();
    getNotes();
  };

  const handleSort = async () => {
    if (sortConfig.field === "title") {
      if (sortConfig.sort === "asc") {
        await getNotes(sortConfig.sort, sortConfig.field);
        setSortConfig({ sort: "desc", field: "title" });
      } else {
        await getNotes(sortConfig.sort, sortConfig.field);
        setSortConfig({ sort: "asc", field: "title" });
      }
    }
  };

  const handleSortTime = async () => {
    sortConfig.field = "createdAt";
    if (sortConfig.sort === "asc") {
      await getNotes(sortConfig.sort, sortConfig.field);
      setSortConfig({ sort: "desc", field: "createdAt" });
    } else {
      await getNotes(sortConfig.sort, sortConfig.field);
      setSortConfig({ sort: "asc", field: "createdAt" });
    }
  };

  const handleSortText = () => {
    if (sortConfig.sort === "asc") {
      return "a-z";
    }
    return "z-a";
  };

  const handleSortTextTime = () => {
    if (sortConfig.sort === "asc") {
      return "oldest first";
    }
    return "newest first";
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
          <Tooltip text={`Sort by title: ${handleSortText()}`}>
            <IconButton
              icon={
                sortConfig.sort === "asc" && sortConfig.field === "title"
                  ? FaSortAlphaDown
                  : FaSortAlphaUpAlt
              }
              bgColor="bg-white"
              textColor="black"
              className="border-[1px] border-slate-400"
              onClick={handleSort}
            />
          </Tooltip>
          <Tooltip text={`Sort by created at: ${handleSortTextTime()}`}>
            <IconButton
              icon={
                sortConfig.sort === "asc" && sortConfig.field === "createdAt"
                  ? FaSortAmountDown
                  : FaSortAmountUp
              }
              bgColor="bg-white"
              textColor="black"
              className="border-[1px] border-slate-400"
              onClick={handleSortTime}
            />
          </Tooltip>
        </div>
        <div className="flex flex-row gap-4 transition-all ease-in-out">
          {deleteMode && (
            <IconButton
              label="Confirm Delete"
              icon={FaCheck}
              bgColor="bg-black"
              onClick={handleDeletion}
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
