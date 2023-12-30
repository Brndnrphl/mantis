import { MongoClient, ObjectId } from "mongodb";
import process from "process";

export const addNote = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("md_notes");
    const notes = await db.collection("notes").find({}).toArray();
    const result = await db.collection("notes").insertOne({
      title: req.body.title,
      content: req.body.value,
      userId: req.body.userId,
      bookmarked: false,
      // createdAt: new Date()
    }); // Assuming the note data is in the request body
    res.status(201).json({
      insertedId: result.insertedId,
      message: "Note inserted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
};

// Function to grab a single note by ID
export const getSingleNote = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db("md_notes");
    const notes = database.collection("notes");
    const note = await notes.findOne({ _id: new ObjectId(req.params.id) });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
};

// Function to grab all notes
export const getAllNotes = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const userId = req.query.userId;

  try {
    await client.connect();
    const db = client.db("md_notes");
    const notes = await db.collection("notes").find({ userId }).toArray();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
};
