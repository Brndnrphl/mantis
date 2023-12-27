import express from 'express';
const router = express.Router();
import { marked } from 'marked';
import {addNote} from './mongo.js'

router.get('/', (req, res) => {
    res.send("test")
});

router.post("/", addNote)

// Add more routes as needed

export default router;