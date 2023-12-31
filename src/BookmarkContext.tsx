// BookmarkContext.js
import { createContext, useState, useContext } from "react";

interface BookmarkContextType {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  bookmarkedNotes: any[];
  fetchBookmarked: (userID: string) => Promise<void>;
  updateBookmarked: (
    noteID: string,
    toggledBookmarkState: boolean
  ) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarkedNotes: [],
  fetchBookmarked: async () => {},
  updateBookmarked: async () => {},
});

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkedNotes, setBookmarkedNotes] = useState([]);

  // Fetches notes that are bookmarked and sets them to the bookmarkedNotes state
  const fetchBookmarked = async (userID: string) => {
    try {
      const response = await fetch(`/api/notes/bookmarked/${userID}`);
      console.log(`/api/notes/bookmarked/${userID}`);
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

  // function to update the bookmarked property when a note is bookmarked / unbookmarked
  const updateBookmarked = async (
    noteID: string,
    toggledBookmarkState: boolean
  ) => {
    const response = await fetch(`/api/notes/${noteID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarked: toggledBookmarkState }),
    });
    if (!response.ok) {
      console.log("failed to update bookmark", response);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedNotes, fetchBookmarked, updateBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
