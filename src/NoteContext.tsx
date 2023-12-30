// src/NoteContext.tsx
import React, { createContext, useContext, useState } from "react";

// Define the shape of the note object
interface Note {
  _id: string;
  title: string;
  content: string;
}

// Define the shape of the context state
interface NoteContextState {
  notes: Note[];
  note: Note;
  fetchNotes: (userId: string) => void;
  fetchNote: (noteId: string) => void;
  setLocalStorage: (userId: string) => void; // Update the type definition
  getLocalStorage: (userId: string) => void; // Update the type definition
  sortNotesAscending: () => void;
  sortNotesDescending: () => void;
}

// Create the context with a default value
const NoteContext = createContext<NoteContextState>({
  notes: [],
  note: {},
  fetchNotes: () => {},
  fetchNote: () => {},
  setLocalStorage: () => {},
  getLocalStorage: () => {},
  sortNotesAscending: () => {},
  sortNotesDescending: () => {},
});

// Create a provider component
export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>({} as Note);

  // Function to fetch all user notes
  const fetchNotes = async (userId: string) => {
    try {
      const response = await fetch(`/api/notes?userId=${userId}`);
      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } else {
        // Handle errors
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Function to fetch the data of a singular note
  const fetchNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`);
      if (response.ok) {
        const fetchedNote = await response.json();
        setNote(fetchedNote);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  // Function to store the notes data in local storage
  const setLocalStorage = (userId: string) => {
    localStorage.setItem(`notes-${userId} `, JSON.stringify(notes));
  };

  // Function to fetch the data stored in local storage
  const getLocalStorage = (userId: string) => {
    const savedNotes = localStorage.getItem(userId);
    return savedNotes ? JSON.parse(savedNotes) : [];
  };

  // Function to sort notes in ascending order
  const sortNotesAscending = () => {
    const sortedNotes = [...notes].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setNotes(sortedNotes);
  };

  // Function to sort notes in descending order
  const sortNotesDescending = () => {
    const sortedNotes = [...notes].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setNotes(sortedNotes);
  };

  // Provide the state and the fetchNotes function to the context
  return (
    <NoteContext.Provider
      value={{
        notes,
        note,
        fetchNotes: (userId: string) => fetchNotes(userId),
        fetchNote: (noteId: string) => fetchNote(noteId),
        setLocalStorage: (userId: string) => setLocalStorage(userId), // Update the function definition
        getLocalStorage: (userId: string) => getLocalStorage(userId), // Update the function definition
        sortNotesAscending,
        sortNotesDescending,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Custom hook to use the NoteContext
export const useNotes = () => useContext(NoteContext);
