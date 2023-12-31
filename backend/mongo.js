import { MongoClient, ObjectId } from "mongodb";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mongoose from "mongoose";
import Note from "./models.js";

mongoose.connect(process.env.MONGOOSE_URI);
setTimeout(() => console.log(mongoose.connection.readyState), 1000);

// Add a note
export const addNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.value,
      userId: req.body.userId,
      bookmarked: false,
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
    const notes = await Note.find({ userId: req.query.userId });
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
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
