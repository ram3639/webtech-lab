const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  await client.connect();
  db = client.db("bookdb");
  console.log("MongoDB Connected");
}

connectDB();

/* 1 SEARCH BOOK BY TITLE */
app.get("/books/search", async (req, res) => {
  const title = req.query.title;

  const books = await db
    .collection("books")
    .find({
      title: { $regex: title, $options: "i" },
    })
    .toArray();

  res.json(books);
});

/* 2 FILTER BY CATEGORY */
app.get("/books/category/:category", async (req, res) => {
  const category = req.params.category;

  const books = await db
    .collection("books")
    .find({
      category: category,
    })
    .toArray();

  res.json(books);
});

/* 3 SORT BOOKS */
app.get("/books/sort/:type", async (req, res) => {
  const type = req.params.type;

  let sortQuery = {};

  if (type === "price") sortQuery = { price: 1 };

  if (type === "rating") sortQuery = { rating: -1 };

  const books = await db.collection("books").find().sort(sortQuery).toArray();

  res.json(books);
});

/* 4 TOP RATED BOOKS */
app.get("/books/top", async (req, res) => {
  const books = await db
    .collection("books")
    .find({ rating: { $gte: 4 } })
    .limit(5)
    .toArray();

  res.json(books);
});

/* 5 PAGINATION */
app.get("/books", async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const limit = 5;

  const skip = (page - 1) * limit;

  const books = await db
    .collection("books")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  res.json(books);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
