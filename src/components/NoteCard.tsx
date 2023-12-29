import { Link } from "react-router-dom";
import { FaRegBookmark as BookmarkIcon } from "react-icons/fa";
import IconButton from "./iconButton";
import { marked } from "marked";

interface NoteCardProps {
  note: string;
  title: string;
  timestamp: string;
}

export default function NoteCard({ note, title, timestamp }: NoteCardProps) {
  const renderedNote = marked.parse(note);
  return (
    <>
      <Link
        className="border shadow-sm rounded-lg p-4 relative w-80 h-52 overflow-y-scroll"
        to="#"
      >
        <IconButton
          icon={BookmarkIcon}
          bgColor="bg-white"
          textColor="black"
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
        <p className="text-xs text-gray-400">{timestamp}</p>
      </Link>
    </>
  );
}
