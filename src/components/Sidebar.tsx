import { LinkButton } from "./LinkButton";
import { FaPlus } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const { user } = useAuth0();
  const userID = user?.sub;
  const [bookmarkedNotes, setBookmarkedNotes] = useState([]);
  const fetchBookmarked = async (userID: string) => {
    try {
      const response = await fetch(`/api/notes/bookmarked/${userID}`);
      if (response.ok) {
        const bookmarkedNotes = await response.json();
        setBookmarkedNotes(bookmarkedNotes);
      } else {
        console.error("Failed to fetch bookmarked notes");
      }
    } catch (error) {
      console.error("Error fetching bookmarked notes:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchBookmarked(userID);
    }
  }, [userID]);

  return (
    <nav className="fixed z-10 flex flex-col border-b-[1px] border-r-[1px] border-b-gray-300 border-r-gray-300 p-4 bg-gray-50 min-h-screen w-3/12">
      <ul>
        <li>
          <LinkButton to="/new_note" icon={<FaPlus />} label="New Note" />
        </li>
        <li>
          <LinkButton
            to="/dashboard"
            icon={<MdSpaceDashboard />}
            label="Dashboard"
          />
        </li>
        <li>
          <p className="text-gray-500 flex flex-row items-center group p-2 mt-8 mb-4 transition-all ease-in-out border-b-[1px]">
            <FaBookmark className="ml-2" />
            <span className="ml-2">Bookmarked Notes</span>
          </p>
        </li>
        {bookmarkedNotes.map((bookmarkedNote) => {
          return (
            <li key={bookmarkedNote._id}>
              <LinkButton
                to={`/notes/${bookmarkedNote._id}`}
                icon={<FaBookmark />}
                label={bookmarkedNote.title}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
