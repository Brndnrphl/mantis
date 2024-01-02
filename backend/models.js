import mongoose from "mongoose";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  lower_title: {
    type: String,
  },
  content: {
    type: String,
  },
  userId: {
    type: String,
  },
  bookmarked: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
});

const Note = mongoose.model("notes", NoteSchema);

export default Note;
