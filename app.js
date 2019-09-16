const express = require("express");

const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

const db = require("./config/db.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(express.static("public"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const port = process.env.PORT || 5000;

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(port, () => console.log(`server listening on port ${port}`));
