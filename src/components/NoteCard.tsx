import { Link } from "react-router-dom";
import { FaRegBookmark as BookmarkIcon, FaBookmark } from "react-icons/fa";
import IconButton from "./iconButton";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { useState, useEffect } from "react";
import { useNoteStore } from "../store";
import { twMerge } from "tailwind-merge";
import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";
import parse from "html-react-parser";

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
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  const [markdown, setMarkdown] = useState("");
  const [bookmarkState, setBookmarkState] = useState(bookmarked);
  const cardStyle = ` ${className} border shadow-sm rounded-lg p-4 relative w-80 h-52 overflow-y-scroll scrollbar-thin scroll-m-2 scrollbar-thumb-black scrollbar-track-slate-300 transition-all ease-in-out`;
  const deleteModeClickedClass = "opacity-100 border-red-600";

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await toggleBookmark(id, bookmarkState);
    setBookmarkState(!bookmarkState);
  };

  useEffect(() => {
    const handleMarkdown = async () => {
      if (note) {
        const parsed = await marked.parse(note);
        setMarkdown(parsed);
      }
    };
    handleMarkdown();
  }, [marked, note]);

  return (
    <>
      <Link
        className={
          deleteMode
            ? twMerge(
                "border-2 opacity-50 rounded-lg p-4 relative w-80 h-52 overflow-y-scroll scrollbar-thin scroll-m-2 scrollbar-thumb-black scrollbar-track-slate-300 transition-all",
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
        >
          {parse(markdown)}
        </p>
      </Link>
    </>
  );
}
