import express from "express";
const router = express.Router();
import {
  addNote,
  getNotes,
  getBookmarkedNotes,
  getNote,
  deleteNote,
  updateNote,
  searchNotes,
} from "./mongo.js";

// POST NEW NOTE
router.post("/", addNote);

// GRAB ONE NOTE
router.get("/:id", getNote);

// GRAB ALL NOTES
router.get("/", getNotes);

// GRAB ALL BOOKMARKED NOTES
router.get("/bookmarked/:id", getBookmarkedNotes);

// UPDATE NOTE
router.patch("/:id", updateNote);

// DELETE NOTE
router.delete("/delete", deleteNote);

// SEARCH NOTES
router.get("/search/results", searchNotes);

export default router;
