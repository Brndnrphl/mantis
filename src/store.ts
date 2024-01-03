import { create } from "zustand";
import { ObjectId } from "mongodb";

interface Note {
  _id?: ObjectId;
  title?: string;
  lower_title?: string;
  content?: string;
  userId?: string;
  bookmarked?: boolean;
  createdAt?: string;
}
interface userState {
  userId: string | null;
  setUserId: (userId: string) => void;
}
interface NotesState extends userState {
  notes: Note[];
  searchedNotes: Note[];
  note: Note;
  noteTitle: string;
  noteContent: string;
  bookmarkedNotes: Note[];
  getNotes: (
    sort?: "asc" | "desc",
    field?: "title" | "createdAt"
  ) => Promise<void>;
  getNote: (noteId: string) => Promise<void>;
  getBookmarkedNotes: () => Promise<void>;
  toggleBookmark: (noteId: string, bookmarkState: boolean) => Promise<void>;
  searchNotes: (title: string) => Promise<void>;
}

export const useNoteStore = create<NotesState>((set) => ({
  notes: [],
  note: {},
  searchedNotes: [],
  noteTitle: "",
  noteContent: "",
  bookmarkedNotes: [],
  userId: null,
  setUserId: (id) => set(() => ({ userId: id })),

  getNotes: async (sort, field) => {
    const userId = useNoteStore.getState().userId;
    if (userId) {
      try {
        let url = `/api/notes?userId=${userId}`;
        if (sort) {
          url += `&sort=${sort}`;
        }
        if (field) {
          url += `&field=${field}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const fetchedNotes = await response.json();
          set(() => ({ notes: fetchedNotes }));
        } else {
          console.log("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  },
  getNote: async (noteId) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`);
      const fetchedNote = await response.json();
      set(() => ({ note: fetchedNote }));
      set(() => ({
        noteTitle: fetchedNote.title,
        noteContent: fetchedNote.content,
      }));
    } catch (error) {
      console.error("Error fetching note:", error);
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
  searchNotes: async (title: string) => {
    const userId = useNoteStore.getState().userId;
    const response = await fetch(
      `/api/notes/search/results?userId=${userId}&title=${title}`
    );
    if (response.ok) {
      const searchedNotes = await response.json();
      set(() => ({ searchedNotes }));
      console.log(searchedNotes);
    }
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
