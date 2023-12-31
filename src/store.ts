import { create } from "zustand";
import { ObjectId } from "mongodb";

interface Note {
  _id: ObjectId;
  title: string;
  content: string;
  userId: string;
  bookmarked: boolean;
}
interface userState {
  userId: string | null;
  setUserId: (userId: string) => void;
}
interface NotesState extends userState {
  notes: Note[];
  bookmarkedNotes: Note[];
  getNotes: () => Promise<void>;
  getBookmarkedNotes: () => Promise<void>;
  updateNote: (noteId: string, note: Note) => Promise<void>;
  toggleBookmark: (noteId: string, bookmarkState: boolean) => Promise<void>;
}

export const useNoteStore = create<NotesState>((set) => ({
  notes: [],
  bookmarkedNotes: [],
  userId: null,
  setUserId: (id) => set(() => ({ userId: id })),
  getNotes: async () => {
    const userId = useNoteStore.getState().userId;
    if (userId) {
      try {
        const response = await fetch(`/api/notes?userId=${userId}`);
        if (response.ok) {
          const fetchedNotes = await response.json();
          set(() => ({ notes: fetchedNotes }));
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  },
  getBookmarkedNotes: async () => {
    const userId = useNoteStore.getState().userId;
    try {
      const response = await fetch(`/api/notes/bookmarked/${userId}`);
      if (response.ok) {
        const bookmarkedNotes = await response.json();
        set(() => ({ bookmarkedNotes }));
      } else {
        console.error("Failed to fetch bookmarked notes");
      }
    } catch (error) {
      console.error("Error fetching bookmarked notes:", error);
    }
  },
  updateNote: async () => {
    // implementation
  },
  toggleBookmark: async (noteId: string, bookmarkState: boolean) => {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarked: !bookmarkState }),
    });
    if (response.ok) {
      useNoteStore.getState().getNotes();
      useNoteStore.getState().getBookmarkedNotes();
    } else {
      console.error("failed to update bookmark", response);
    }
  },
}));
