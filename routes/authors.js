const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All authors route
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query
    });
  } catch (err) {
    res.redirect("/");
  }
});

//New authors route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create author
router.post("/", async (req, res) => {
  const newAuthor = new Author({
    name: req.body.name
  });
  try {
    const author = await newAuthor.save();
    res.redirect("authors");
  } catch (err) {
    res.render("authors/new", {
      author: newAuthor ? newAuthor : new Author(),
      errorMessage: "there is an error"
    });
  }
});

module.exports = router;
