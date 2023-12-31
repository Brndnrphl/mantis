import { Link } from "react-router-dom";
import { FaRegBookmark as BookmarkIcon, FaBookmark } from "react-icons/fa";
import IconButton from "./iconButton";
import { marked } from "marked";
import { useState } from "react";

interface NoteCardProps {
  index: number;
  note: string;
  title: string;
  timestamp?: string;
  link: string;
  id: string;
  bookmarked: boolean;
}

export default function NoteCard({
  index,
  note,
  title,
  link,
  id,
  bookmarked,
}: NoteCardProps) {
  const renderedNote = marked.parse(note);
  const [bookmark, setBookmark] = useState(bookmarked);

  const updateBookmarked = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newBookmarkState = !bookmark;
    const response = await fetch(`/api/notes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarked: newBookmarkState }),
    });
    if (response.ok) {
      setBookmark(newBookmarkState);
    } else {
      console.log("failed to update bookmark", response);
    }
  };

  return (
    <>
      <Link
        className="border shadow-sm rounded-lg p-4 relative w-80 h-52 overflow-y-scroll scrollbar-thin scroll-m-2 scrollbar-thumb-black scrollbar-track-slate-300 transition-all ease-in-out"
        to={link}
        id={index.toString()}
      >
        <IconButton
          icon={bookmarked ? FaBookmark : BookmarkIcon}
          bgColor="bg-white"
          textColor="black"
          onClick={(e) => updateBookmarked(e)}
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
