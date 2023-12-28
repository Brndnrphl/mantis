import express from "express";
const router = express.Router();
import { marked } from "marked";
import { addNote } from "./mongo.js";

router.get("/", (req, res) => {
  res.send(`${process.env.clientId} and ${process.env.domain} `);
});

// POST NEW NOTE
router.post("/", addNote);

// GRAB ONE NOTE
// router.post("/login", login);

// GRAB ALL NOTES

// UPDATE NOTE

// DELETE NOTE

export default router;
