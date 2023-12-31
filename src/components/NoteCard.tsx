import { Link } from "react-router-dom";
import { FaRegBookmark as BookmarkIcon, FaBookmark } from "react-icons/fa";
import IconButton from "./iconButton";
import { marked } from "marked";
import { useState } from "react";
import { useNoteStore } from "../store";
import { twMerge } from "tailwind-merge";

interface NoteCardProps {
  index: number;
  note: string;
  title: string;
  timestamp?: string;
  link: string;
  id: string;
  bookmarked: boolean;
  className?: string;
  deleteMode: boolean;
  isClicked: boolean;
  onClick?: () => void;
}

export default function NoteCard({
  index,
  note,
  title,
  link,
  id,
  bookmarked,
  className,
  deleteMode,
  isClicked,
  onClick,
}: NoteCardProps) {
  const toggleBookmark = useNoteStore((state) => state.toggleBookmark);
  const renderedNote = marked.parse(note);
  const [bookmarkState, setBookmarkState] = useState(bookmarked);
  const cardStyle = ` ${className} border shadow-sm rounded-lg p-4 relative w-80 h-52 overflow-y-scroll scrollbar-thin scroll-m-2 scrollbar-thumb-black scrollbar-track-slate-300 transition-all ease-in-out`;
  const deleteModeClickedClass = "opacity-100 border-2 border-red-600";

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await toggleBookmark(id, bookmarkState);
    setBookmarkState(!bookmarkState);
  };

  return (
    <>
      <Link
        className={
          deleteMode
            ? twMerge(
                "border opacity-50 rounded-lg p-4 relative w-80 h-52 overflow-y-scroll scrollbar-thin scroll-m-2 scrollbar-thumb-black scrollbar-track-slate-300 transition-all ease-in-out",
                isClicked ? deleteModeClickedClass : ""
              )
            : cardStyle
        }
        to={link}
        id={index.toString()}
        onClick={onClick}
      >
        <IconButton
          icon={bookmarked ? FaBookmark : BookmarkIcon}
          bgColor="bg-white"
          textColor="black"
          onClick={
            deleteMode ? (e) => e.preventDefault() : (e) => handleBookmark(e)
          }
          className="border-[1px] border-slate-400 absolute right-2 top-2"
        />
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p
          className="
          text-md mb-2 
          prose
          prose-indigo   
          max-w-none
          prose-pre:rounded-lg
          prose-pre:p-4
          prose-code:font-normal"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: renderedNote }}
        />
      </Link>
    </>
  );
}
