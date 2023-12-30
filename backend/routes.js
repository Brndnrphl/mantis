import express from "express";
const router = express.Router();
import { addNote, getAllNotes, getSingleNote } from "./mongo.js";

// router.get("/", (req, res) => {
//   res.send(`${process.env.clientId} and ${process.env.domain} `);
// });

// POST NEW NOTE
router.post("/", addNote);

// GRAB ONE NOTE
router.get("/:id", getSingleNote);

// GRAB ALL NOTES
router.get("/", getAllNotes);

// UPDATE NOTE

// DELETE NOTE

export default router;
