import { MongoClient, ObjectId } from "mongodb";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mongoose from "mongoose";
import Note from "./models.js";

mongoose.connect(process.env.MONGOOSE_URI);
// setTimeout(() => console.log(mongoose.connection.readyState), 1000);

// Add a note
export const addNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      lower_title: req.body.title.toLowerCase(),
      content: req.body.value,
      userId: req.body.userId,
      bookmarked: false,
      createdAt: new Date().toISOString(),
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single note
export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    let sortField = req.query.field || "title";
    const sortDirection = req.query.sort || "asc";
    if (sortField === "title") {
      sortField = "lower_title";
    }
    const sortOptions = {};
    sortOptions[sortField] = sortDirection === "desc" ? -1 : 1;
    const notes = await Note.find({ userId: req.query.userId }).sort(
      sortOptions
    );
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookmarked notes for a user
export const getBookmarkedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.params.id,
      bookmarked: true,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    const updated = await note.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const noteIds = req.body.noteIds;
    if (!noteIds || !Array.isArray(noteIds)) {
      return res.status(400).json({ message: "Invalid note IDs provided" });
    }
    const result = await Note.deleteMany({ _id: { $in: noteIds } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No notes found to delete" });
    }
    res.json({
      message: "Notes deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search a note by title
export const searchNotes = async (req, res) => {
  try {
    if (!req.query.title || req.query.title.trim() === "") {
      // If the title query is empty, return an empty array
      return res.json([]);
    }
    const searchPattern = new RegExp(req.query.title, "i");
    const searchedNotes = await Note.find({
      title: { $regex: searchPattern },
      userId: req.query.userId,
    });
    res.json(searchedNotes);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
