const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let db;

async function connectDB() {
    await client.connect();
    db = client.db("studentdb");
    console.log("MongoDB Connected");
}

connectDB();


// Add Note
app.post("/notes", async (req, res) => {
    const note = req.body;
    note.created_date = new Date().toISOString().split("T")[0];

    const result = await db.collection("notes").insertOne(note);
    res.json(result);
});


// View Notes
app.get("/notes", async (req, res) => {
    const notes = await db.collection("notes").find().toArray();
    res.json(notes);
});


// Update Note
app.put("/notes/:id", async (req, res) => {
    const id = req.params.id;

    const result = await db.collection("notes").updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
    );

    res.json(result);
});


// Delete Note
app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;

    const result = await db.collection("notes").deleteOne({
        _id: new ObjectId(id)
    });

    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});